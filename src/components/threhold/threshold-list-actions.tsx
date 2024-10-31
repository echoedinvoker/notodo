'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import type { Threshold } from "@prisma/client";
import ThePopover from "../common/the-popover";
import { FaPlus } from "react-icons/fa";
import ThresholdForm from "./threshold-form";

interface ThresholdListActionsProps {
  thresholds: Threshold[];
  notodoId: string;
  userId: string;
}

export default function ThresholdListActions({ thresholds, notodoId, userId }: ThresholdListActionsProps) {

  return (
    <Listbox aria-label="Threshold Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Threshold">
        <ThePopover
          startContent={<div><FaPlus size="10" /></div>}
          text="Create Threshold"
        >
          <ThresholdForm actionType='create' userId={userId} notodoId={notodoId} />
        </ThePopover>
      </ListboxItem>
    </Listbox>
  )
}
