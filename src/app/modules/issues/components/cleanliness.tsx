import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ClipboardList, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getOnlineStaffFromFirestore, setOfflineRoom } from "../utils/issueApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  uploadImage,
  generateImagePath,
  convertToWebP,
} from "@/lib/firebase/storage";
import Image from "next/image";

export default function Cleanliness({ data }: { data: any }) {
  // console.log(data);
  const BookingData: any = useSelector(
    (state: RootState) => state.addBooking.bookingData
  );
  const router = useRouter();
  const [selectedIssue, setSelectedIssue] = useState("");
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setProcessing(true);
      try {
        // Convert image to WebP format with compression and resizing
        const webpFile = await convertToWebP(file);
        setSelectedImage(webpFile);

        // Create preview from converted file
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(webpFile);
      } catch (error) {
        console.error("Error converting image:", error);
        alert("Failed to process image. Please try again.");
      } finally {
        setProcessing(false);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset the input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  async function handleSubmit() {
    setUploading(true);

    try {
      let imageUrl = "";

      // Upload image if selected
      if (selectedImage) {
        const imagePath = generateImagePath(
          data.id,
          BookingData.bookingDetails.location || "unknown",
          selectedImage.name
        );
        imageUrl = await uploadImage(selectedImage, imagePath);
      }

      const _issue = {
        issue: data.id,
        subCategory: selectedIssue,
        description: input,
        location: BookingData.bookingDetails.location,
        imageUrl: imageUrl, // Include image URL if uploaded
      };
      console.log(_issue);

      const attendant: any = await getOnlineStaffFromFirestore(
        "vikumar.azad@gmail.com"
      );
      await setOfflineRoom(_issue, attendant);

      // Reset form after successful submission
      setSelectedIssue("");
      setInput("");
      removeImage();

      // Navigate back or show success message
      router.back();
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Button variant="ghost" className="mt-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <Card className="w-full max-w-md shadow-lg border-0 mb-10">
        <CardHeader className="space-y-1 pb-4 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Register Issues with {data.id}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">
                Complete in just a few steps
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Select
                value={selectedIssue}
                onValueChange={(value) => {
                  setSelectedIssue(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a issue type" />
                </SelectTrigger>
                <SelectContent>
                  {data.issues.map((value: any, i: number) => (
                    <SelectItem value={value} key={i}>
                      <div className="flex items-center gap-2">
                        <span>{value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedIssue && (
              <div className="space-y-2">
                <label
                  htmlFor="issue-details"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Issue Details
                </label>
                <Input
                  id="issue-details"
                  placeholder={`Describe the ${selectedIssue} issue...`}
                  className="w-full"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            )}
            {selectedIssue && (
              <div className="space-y-2">
                <label
                  htmlFor="image-upload"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Upload Image (Optional)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      className="flex items-center gap-2"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          {selectedImage ? "Change Image" : "Select Image"}
                        </>
                      )}
                    </Button>
                    {selectedImage && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeImage}
                        className="flex items-center gap-1"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="relative w-full max-w-xs">
                      <Image
                        src={imagePreview}
                        alt="Issue preview"
                        className="w-full h-32 object-cover rounded-md border"
                        width={100}
                        height={100}
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={removeImage}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {selectedIssue && (
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {selectedImage ? "Uploading..." : "Submitting..."}
                </>
              ) : (
                "Submit Issue"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
