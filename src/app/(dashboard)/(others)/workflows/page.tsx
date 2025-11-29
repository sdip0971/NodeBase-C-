import { requireAuth } from "@/lib/auth-utils";
import workflows, { WorkFlowContainer, WorkFLowError, WorkFLowLoading } from "@/features/workflows/components/workflows";
import { prefetchWorkflows } from "@/features/workflows/servers/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react";
import WorkflowList from "@/features/workflows/components/workflows";
import { SearchParams } from "nuqs/server";
import { workflowParamsLoader } from "@/features/workflows/servers/params-loader";
type Props = {
  searchParams : Promise <SearchParams>
}
export default async function WorkflowsPage({ searchParams} : Props) {
  await requireAuth()
  const params = await workflowParamsLoader(searchParams)
  prefetchWorkflows(params);
  
  return (
    <WorkFlowContainer>
    <HydrateClient>
      <ErrorBoundary fallback={<WorkFLowError/>}>
        <Suspense fallback={<WorkFLowLoading/>}></Suspense>
        <WorkflowList/>
      </ErrorBoundary>
    </HydrateClient>
    </WorkFlowContainer>
  );
}