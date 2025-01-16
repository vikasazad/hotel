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
import { ArrowLeft, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getOnlineStaffFromFirestore, setOfflineRoom } from "../utils/issueApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Cleanliness({ data }: { data: any }) {
  // console.log(data);
  const BookingData: any = useSelector(
    (state: RootState) => state.addBooking.bookingData
  );
  const router = useRouter();
  const [selectedIssue, setSelectedIssue] = useState("");
  const [input, setInput] = useState("");
  async function handleSubmit() {
    const _issue = {
      issue: data.id,
      subCategory: selectedIssue,
      description: input,
      location: BookingData.bookingDetails.location,
    };
    console.log(_issue);

    const attendant: any = await getOnlineStaffFromFirestore(
      "vikumar.azad@gmail.com"
    );
    await setOfflineRoom(_issue, attendant);
  }
  return (
    <>
      <Button variant="ghost" className="mt-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <Card className="w-full max-w-md shadow-lg border-0">
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
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
        {selectedIssue && (
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Submit Issue
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
