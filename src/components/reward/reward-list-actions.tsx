'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import { ConsumePoints, ThePopoverExt } from "../common";
import { FaPlus } from "react-icons/fa";
import RewardForm from "./reward-form";

interface RewardListboxProps {
  userId: string;
  totalScore: number;
}

export default function RewardListActions({ userId, totalScore }: RewardListboxProps) {
  return (
    <Listbox
      aria-label="Reward Actions"
      disabledKeys={['consume']}
    >
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
      <ListboxItem key="consume" className="p-0 m-0" textValue="Consume points"
        color="primary"
      >
        <ConsumePoints
          userId={userId}
          totalScore={totalScore}
        />
      </ListboxItem>
    </Listbox>
  )
}
