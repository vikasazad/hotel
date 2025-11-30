import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackForm {
  orderId: string;
  specificIssue: string;
  subIssue: string;
  description: string;
}

const IssuesDialog = ({
  orderIds,
  feedback,
}: {
  orderIds: string[];
  feedback: (response: any) => void;
}) => {
  const [formData, setFormData] = useState<FeedbackForm>({
    orderId: "",
    specificIssue: "",
    subIssue: "",
    description: "",
  });

  // Hotel issue categories and their sub-issues
  const hotelIssueCategories = {
    "General Cleanliness": [
      "Dust on surfaces",
      "Dirty floors",
      "Unclean windows",
      "Trash not emptied",
      "Overall room cleanliness",
    ],
    Bathroom: [
      "Dirty toilet",
      "Unclean shower/bathtub",
      "Dirty sink",
      "Towels not clean",
      "Bathroom floor dirty",
      "Mirror dirty",
    ],
    Bedding: [
      "Dirty sheets",
      "Stained pillows",
      "Uncomfortable mattress",
      "Missing pillows/blankets",
      "Bed not made properly",
    ],
    "Floors and Carpets": [
      "Stained carpet",
      "Dirty hardwood/tile",
      "Carpet needs vacuuming",
      "Floor sticky or wet",
      "Carpet odor",
    ],
    "Air Conditioning/Heating": [
      "AC not working",
      "Room too hot",
      "Room too cold",
      "Strange noises from AC",
      "AC remote not working",
    ],
    "Wi-Fi Connection": [
      "No internet connection",
      "Slow internet speed",
      "Connection keeps dropping",
      "Cannot connect to network",
      "Password not working",
    ],
    "Television/Entertainment": [
      "TV not turning on",
      "No signal/channels",
      "Remote control not working",
      "Sound issues",
      "Screen problems",
    ],
    Housekeeping: [
      "Room not cleaned",
      "Missed cleaning schedule",
      "Items moved/missing",
      "Cleaning supplies left behind",
      "Requested items not provided",
    ],
    "Noise Issues": [
      "Loud neighbors",
      "Street noise",
      "Construction noise",
      "HVAC noise",
      "Other disturbances",
    ],
    "Safety Concerns": [
      "Door lock issues",
      "Window lock problems",
      "Smoke detector issues",
      "Electrical safety concerns",
      "Other safety issues",
    ],
    "Other Hotel Issues": [
      "Elevator problems",
      "Key card not working",
      "Phone not working",
      "Lighting issues",
      "Other concerns",
    ],
  };

  // Issue subtypes based on order type
  const getIssueSubtypes = (orderId: string) => {
    if (orderId.startsWith("BOK")) {
      // Hotel booking issues - return main categories
      return Object.keys(hotelIssueCategories);
    } else if (orderId.startsWith("OR")) {
      // Food order issues
      return [
        "Wrong Order Delivered",
        "Missing Items",
        "Food Quality Issues",
        "Cold Food",
        "Late Delivery",
        "Incorrect Billing",
        "Allergic Reaction",
        "Portion Size Issues",
        "Spilled Food",
        "Other Food Issues",
      ];
    } else if (orderId.startsWith("SE")) {
      // Service-related issues
      return [
        "Service Not Available",
        "Poor Service Quality",
        "Staff Unprofessional",
        "Long Wait Time",
        "Booking/Reservation Issues",
        "Equipment Not Working",
        "Facility Closed Unexpectedly",
        "Incorrect Billing/Charges",
        "Service Not as Described",
        "Cleanliness Issues",
        "Safety Concerns",
        "Other Service Problems",
      ];
    }
    return [];
  };

  // Helper function to format order IDs with descriptive labels
  const formatOrderId = (orderId: string) => {
    if (orderId.startsWith("BOK")) {
      return `${orderId} - Hotel`;
    } else if (orderId.startsWith("OR")) {
      return `${orderId} - Food`;
    } else if (orderId.startsWith("SE")) {
      return `${orderId} - Service`;
    }
    return orderId;
  };

  // Get issue subtypes for selected order
  const getAvailableIssueSubtypes = () => {
    return formData.orderId ? getIssueSubtypes(formData.orderId) : [];
  };

  // Get hotel sub-issues for selected main issue category
  const getHotelSubIssues = () => {
    if (formData.orderId.startsWith("BOK") && formData.specificIssue) {
      return (
        hotelIssueCategories[
          formData.specificIssue as keyof typeof hotelIssueCategories
        ] || []
      );
    }
    return [];
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields");
      return;
    }

    const feedbackData = {
      orderId: formData.orderId,
      issueType: formData.specificIssue,
      subIssue: formData.subIssue || null,
      description: formData.description,
      time: new Date().toISOString(),
    };

    feedback(feedbackData);
  };

  const handleCancel = () => {
    feedback({ cancelled: true });
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    const hasOrderId = !!formData.orderId;
    const hasIssueType = !!formData.specificIssue;
    const hasDescription =
      !!formData.description.trim() && formData.description.trim().length > 5;

    // For hotel orders, also require sub-issue selection
    const isHotelOrder = formData.orderId.startsWith("BOK");
    const hasSubIssue = !isHotelOrder || !!formData.subIssue;

    return hasOrderId && hasIssueType && hasDescription && hasSubIssue;
  };

  return (
    <div>
      <AlertDialog open={true}>
        <AlertDialogContent className="w-[95vw] max-w-lg sm:mx-auto max-h-[90vh] overflow-y-auto px-1 py-4 rounded-xl">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-center text-lg sm:text-xl">
              Report an Issue
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm sm:text-base leading-relaxed px-2">
              Please select the relevant Order ID and describe the issue -
              we&apos;ll resolve it quickly.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 px-2">
            {/* Order ID Selection */}
            <div className="space-y-2">
              <Label htmlFor="orderId" className="text-sm font-medium">
                Order ID <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.orderId}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    orderId: value,
                    specificIssue: "",
                    subIssue: "",
                    description: "",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Order ID" />
                </SelectTrigger>
                <SelectContent>
                  {orderIds.map((orderId) => (
                    <SelectItem key={orderId} value={orderId}>
                      {formatOrderId(orderId)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Issue Type and Description - Show only after Order ID selection */}
            {formData.orderId && (
              <>
                {/* Issue Type Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="specificIssue"
                    className="text-sm font-medium"
                  >
                    Issue Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.specificIssue}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        specificIssue: value,
                        subIssue: "", // Reset sub-issue when main issue changes
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableIssueSubtypes().map((issue) => (
                        <SelectItem key={issue} value={issue}>
                          {issue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hotel Sub-Issue Selection - Show only for hotel orders after issue type selection */}
                {formData.orderId.startsWith("BOK") &&
                  formData.specificIssue && (
                    <div className="space-y-2">
                      <Label htmlFor="subIssue" className="text-sm font-medium">
                        Specific Issue <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.subIssue}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, subIssue: value }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select specific issue" />
                        </SelectTrigger>
                        <SelectContent>
                          {getHotelSubIssues().map((subIssue) => (
                            <SelectItem key={subIssue} value={subIssue}>
                              {subIssue}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                {/* Issue Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Issue Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </>
            )}
          </div>

          <AlertDialogFooter className=" gap-2 pt-4">
            <div className="flex  gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full sm:w-auto bg-[#ff8080] [box-shadow:var(--shadow-m)] text-white hover:bg-[#ff8080]/80 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save & Submit
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IssuesDialog;
