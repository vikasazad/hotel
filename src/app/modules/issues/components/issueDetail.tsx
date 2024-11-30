"use client";
import React, { useEffect, useState } from "react";
import Cleanliness from "./cleanliness";

import { usePathname } from "next/navigation";

const IssueDetail = () => {
  const data: string = usePathname().split("/")[2];
  const [availableComponent, setAvailableComponent] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    const issues = [
      {
        id: "cleanliness",
        issues: [
          "General Cleanliness",
          "Bathroom",
          "Bedding",
          "Floors and Carpets",
        ],
      },
      {
        id: "functionality",
        issues: [
          "Electrical Outlets",
          "Lighting",
          "Heating/Cooling",
          "Plumbing",
        ],
      },
      {
        id: "safety%20and%20security",
        issues: ["Locks", "Smoke Detectors", "Fire Exits"],
      },
      {
        id: "amenities",
        issues: ["Wi-Fi", "Television", "Mini-bar", "Coffee Maker"],
      },
      {
        id: "aesthetics",
        issues: [
          "Decor and Furnishings",
          "Paint and Wallpaper",
          "Windows and Curtains",
        ],
      },
      { id: "noise", issues: ["External Noise", "Internal Noise"] },
      {
        id: "services",
        issues: ["Room Service", "Housekeeping", "Front Desk"],
      },
      {
        id: "miscellaneous",
        issues: ["Odors", "Insects or Pests", "Personal Items"],
      },
    ];

    const matchedComponent = issues.find((item) => item.id === data);
    setAvailableComponent(
      matchedComponent ? <Cleanliness data={matchedComponent} /> : null
    );
  }, [data]);

  return (
    <div>
      {availableComponent ? (
        <div className="p-4">{availableComponent}</div>
      ) : (
        <p>No matching component found.</p>
      )}
    </div>
  );
};

export default IssueDetail;
