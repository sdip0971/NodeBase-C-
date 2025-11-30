import { InitialNode } from "@/components/ui/mycomponents/intialnode";
import { NodeType } from "@/generated/prisma/enums"
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
    [NodeType.INITIAl] : InitialNode,
    [NodeType.MANUAL_TRIGGER]:ManualTrigerNode ,
    [NodeType.HTTP_REQUEST]:HttpRequestNode,:

}
// {
//   "INITIAL": InitialNode
// }

export type RegisteredNodeType = keyof typeof nodeComponents;
