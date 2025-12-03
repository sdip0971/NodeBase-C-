"use client"
import React, { ReactNode } from 'react'
import { NodeProps,Position } from '@xyflow/react'
import Image from 'next/image'
import { BaseNode,BaseNodeContent } from '@/components/ui/react-flow/base-node'
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import { WorkflowNode } from '@/components/ui/mycomponents/workflow-node'
import { LucideIcon } from 'lucide-react'
interface BaseTriggerNodeProp extends NodeProps {
  name: string;
  description?: string;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  children?: ReactNode;
  icon : LucideIcon | string
}
function BaseTriggerNode({id,name,description,children,icon:Icon,onSettings,onDoubleClick}:BaseTriggerNodeProp) {
  const handleDelete = ()=>{

  }
  return (
    <div>
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
      >
        <BaseNode className='rounded-l-2xl relative group'onDoubleClick={onDoubleClick}>
          <BaseNodeContent>
            <div className="flex items-center justify-center w-8 h-8">
              {typeof Icon === "string" ? (
                <Image
                  src={Icon}
                  alt={name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              ) : (
                <Icon className="size-6 text-muted-foreground" />
              )}
              {children}

              <BaseHandle id="source1" type="source" position={Position.Right} />
            </div>
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    </div>
  );
}

export default BaseTriggerNode
