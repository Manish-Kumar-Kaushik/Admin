"use client";

<<<<<<< HEAD
import dynamic from "next/dynamic";

const AiReviewDetail = dynamic(
  () => import("@/components/dashboard/ai-review-queue/ai-review-detail"),
  { ssr: false }
);

export default function AiReviewDetailPage() {
  return <AiReviewDetail />;
}
=======
import AiVerdictReview from "@/components/dashboard/ai-review-queue/ai-verdict-review";

export default function AiVerdictReviewPage() {
  return <AiVerdictReview />;
}

>>>>>>> af258eda14bc52c9db8fe898ffaa3441e277c349
