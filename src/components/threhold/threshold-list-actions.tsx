'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import ThresholdPopover from "./threshold-popover";
import type { Threshold } from "@prisma/client";

interface ThresholdListActionsProps {
  thresholds: Threshold[];
  notodoId: string;
  userId: string;
}

export default function ThresholdListActions({ thresholds, notodoId, userId }: ThresholdListActionsProps) {

  return (
    <Listbox aria-label="Threshold Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Threshold">
        <ThresholdPopover userId={userId} notodoId={notodoId} />
      </ListboxItem>
    </Listbox>
  )
}
