import ReceiptDetail from "@/components/dashboard/receipts/receipt-detail";
import OCRReview from "@/components/dashboard/receipts/OCR-review";
import ProductMatchReview from "@/components/dashboard/receipts/product-match-review";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReceiptDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  if (resolvedParams.id === "ocr") {
    return <OCRReview />;
  }
  if (resolvedParams.id === "match") {
    return <ProductMatchReview />;
  }
  return <ReceiptDetail />;
}
