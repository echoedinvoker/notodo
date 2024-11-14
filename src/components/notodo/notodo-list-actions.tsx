'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import NotodoForm from "./notodo-form";
import * as actions from "@/actions"
import { ConsumePoints, ThePopoverExt } from "../common";

interface NotodoListboxProps {
  userId: string;
  totalScore: number;
  totalWeight: number;
}

export default function NotodoListActions({ userId, totalScore, totalWeight }: NotodoListboxProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Notodo">
        <ThePopoverExt
          startContent={<div><FaPlus size="10" /></div>}
          text="Create Notodo"
        >
          {(setIsOpen) => (
            <NotodoForm
              formStateAction={actions.createNotodo.bind(null, userId)}
              onSubmitSuccess={() => setIsOpen(false)}
            />
          )}
        </ThePopoverExt>
      </ListboxItem>
      <ListboxItem key="consume" className="p-0 m-0" textValue="Consume points"
        color="primary">
        <ConsumePoints totalScore={totalScore} totalWeight={totalWeight} />
      </ListboxItem>
    </Listbox >
  )
}
