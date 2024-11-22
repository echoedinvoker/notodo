'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import type { Threshold } from "@prisma/client";
import { FaPlus } from "react-icons/fa";
import ThresholdForm from "./threshold-form";
import { ThePopoverExt } from "../common";

interface ThresholdListActionsProps {
  thresholds: Threshold[];
  notodoId: string;
  userId: string;
}

export default function ThresholdListActions({ thresholds, notodoId, userId }: ThresholdListActionsProps) {

  return (
    <Listbox aria-label="Threshold Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Threshold">
        <ThePopoverExt
          startContent={<div><FaPlus size="10" /></div>}
          text="Create Threshold"
        >
          {setIsOpen => (
            <ThresholdForm
              actionType='create'
              userId={userId}
              notodoId={notodoId}
              onSubmitSuccess={() => setIsOpen(false)}
            />
          )}
        </ThePopoverExt>
      </ListboxItem>
    </Listbox>
  )
}
