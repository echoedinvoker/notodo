'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import { ThePopoverExt } from "../common";
import { FaPlus } from "react-icons/fa";
import RewardForm from "./reward-form";

interface RewardListboxProps {
  userId: string;
}

export default function RewardListActions({ userId }: RewardListboxProps) {
  return (
    <Listbox aria-label="Reward Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Reward">
        <ThePopoverExt
          startContent={<div><FaPlus size="10" /></div>}
          text="Create Reward"
        >
          {(setIsOpen) => (
            <RewardForm
              onSubmitSuccess={() => setIsOpen(false)}
            />
          )}
        </ThePopoverExt>

      </ListboxItem>
    </Listbox>
  )
}
