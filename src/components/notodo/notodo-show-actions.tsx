'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import NotodoShowActionDelete from "./notodo-show-action-delete";

interface NotodoShowActionsProps {
  notodoId: string;
}

export default function NotodoShowActions({ notodoId }: NotodoShowActionsProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="delete" className="p-0 m-0" textValue="Delete Notodo">
        <NotodoShowActionDelete notodoId={notodoId} />
      </ListboxItem>
    </Listbox>
  )
}
