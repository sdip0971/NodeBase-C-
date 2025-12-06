"use client"

import { NodeProps, Node, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import BaseExecutionNode from "@/components/ui/mycomponents/base-execution-node";
import { GlobeIcon } from "lucide-react";
import { HttpRequestDialog } from "./dialog";
type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;

};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen , setDialogOpen] = useState(false);
  const nodeStauts = "initial"
  const handleOpenSettings = ()=>setDialogOpen(true)
  const {setNodes} = useReactFlow()
    const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint ? `${nodeData.method || "GET"} ${nodeData.endpoint}` : "Not configured";
   const handleSubmit = (values: {
     endpoint: string;
     method: string;
     body?: string;
   }) => {
     setNodes((nodes) =>
       nodes.map((node) => {
         if (node.id === props.id) {
           return {
             ...node,
             data: {
               ...node.data,
               endpoint: values.endpoint,
               method: values.method,
               body: values.body,
             },
           };
         }
         return node;
       })
     );
   };

  return <>
  <HttpRequestDialog open={dialogOpen} onOpenChangeAction={setDialogOpen}  onSubmit={handleSubmit} defaultEndpoint={nodeData.endpoint} defaultMethod={nodeData.method || "GET"} defaultBody={nodeData.body} />
  <BaseExecutionNode  {...props} 
      id={props.id}
      icon={GlobeIcon} 
      name ="HTTP Request"
      description={description}
      onDoubleClick={()=>{handleOpenSettings}}
      onSettings={()=>{handleOpenSettings}}
       />
  </>
});
