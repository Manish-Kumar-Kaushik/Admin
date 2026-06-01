import React from "react";
import AlternativeDetail from "@/components/dashboard/Alternatives/alternative-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alternative Detail | BuyWish Admin",
  description: "Review detailed comparison and make decisions on alternatives.",
};

export default function AlternativeDetailPage() {
  return <AlternativeDetail />;
}
