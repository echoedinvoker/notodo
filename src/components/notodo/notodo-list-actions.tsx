'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import NotodoPopover from "./notodo-popover";
import { FaPlus } from "react-icons/fa";
import NotodoCreateForm from "./notodo-create-form";

interface NotodoListboxProps {
  userId: string;
}

export default function NotodoListbox({ userId }: NotodoListboxProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Notodo">
        <NotodoPopover
          startContent={<div><FaPlus size="10" /></div>}
          text="Create Notodo"
        >
          <NotodoCreateForm userId={userId} />
        </NotodoPopover>
      </ListboxItem>
    </Listbox >
  )
}
