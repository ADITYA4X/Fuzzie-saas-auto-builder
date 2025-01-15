/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectionProviderProps } from "@/src/providers/connections-provider";
import React from "react";
import { Option } from "./content-based-on-title";

type Props = {
  currentService: string;
  nodeConnection: ConnectionProviderProps;
  channels?: Option[];
  setChannels?: (value: Option[]) => void;
};

const ActionButton = ({
  currentService,
  nodeConnection,
  channels,
  setChannels,
}: Props) => {
  return <div>ActionButton</div>;
};

export default ActionButton;
