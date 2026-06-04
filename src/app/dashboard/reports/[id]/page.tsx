import { notFound } from "next/navigation";
import ReportDetail from "@/components/dashboard/user-report/report-detail";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  if (resolvedParams.id === "correction") {
    notFound();
  }

  return <ReportDetail reportId={resolvedParams.id} />;
}
