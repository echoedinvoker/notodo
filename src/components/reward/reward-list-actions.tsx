'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import { ThePopoverExt } from "../common";
import { FaPlus } from "react-icons/fa";
import NotodoForm from "../notodo/notodo-form";
import * as actions from "@/actions"

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
            <NotodoForm
              formStateAction={actions.createNotodo.bind(null, userId)}
              onSubmitSuccess={() => setIsOpen(false)}
            />
          )}
        </ThePopoverExt>

      </ListboxItem>
    </Listbox>
  )
}
