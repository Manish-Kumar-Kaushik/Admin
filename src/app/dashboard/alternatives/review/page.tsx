import React from "react";
import AlternativeReview from "@/components/dashboard/Alternatives/alternative-review";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alternatives Review | BuyWish Admin",
  description: "Review and approve alternative product recommendations.",
};

export default function AlternativeReviewPage() {
  return <AlternativeReview />;
}
