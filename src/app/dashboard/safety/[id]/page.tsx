import { notFound } from "next/navigation";
import IngredientReviewDetail from "@/components/dashboard/health-safety-review/ingredient-review-detail";

export default async function IngredientReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (id === "claims" || id === "disclaimers") {
    notFound();
  }

  return <IngredientReviewDetail />;
}
