'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import NotodoPopover from "./notodo-popover";

interface NotodoListboxProps {
  userId: string;
}

export default function NotodoListbox({ userId }: NotodoListboxProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Notodo">
        <NotodoPopover userId={userId} />
      </ListboxItem>
    </Listbox >
  )
}
