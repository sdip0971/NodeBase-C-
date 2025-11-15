'use client'
import React from 'react'
import { cn  } from '@/lib/utils'
import { createAuthClient } from 'better-auth/react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/features/auth/logout'
import { requireAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'
import { useTRPC } from '@/trpc/client'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
 function Page() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkFlows.queryOptions());
 const create = useMutation(trpc.createWorkflow.mutationOptions({
  onSuccess:()=>{
   toast.success("Workflow Created Successfully")
  }
 }))
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>
      {JSON.stringify(data)}
      {data && (
       <LogoutButton/>
      )}
      <Button disabled={create.isPending}onClick={()=>create.mutate()}>Create WorkFlows</Button>
   
    </div>
  )
}

export default Page
