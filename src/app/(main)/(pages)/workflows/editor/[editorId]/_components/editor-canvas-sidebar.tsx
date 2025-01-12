"use client";

import { EditorCanvasTypes, EditorNodeType } from "@/src/lib/types";
import { useNodeConnections } from "@/src/providers/connections-provider";
import { useEditor } from "@/src/providers/editor-provider";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Separator } from "@/src/components/ui/separator";
import { EditorCanvasDefaultCardTypes } from "@/src/lib/constant";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper";

type Props = { nodes: EditorNodeType[] };

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  return (
    <aside>
      <Tabs defaultValue="actions" className="h-screen overflow-scroll pb-24">
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <Separator />

        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") ||
                (nodes.length && cardType.type === "Action")
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
