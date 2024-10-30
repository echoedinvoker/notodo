'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import NotodoShowActionDelete from "./notodo-show-action-delete";
import NotodoPopover from "./notodo-popover";
import { FaEdit } from "react-icons/fa";

interface NotodoShowActionsProps {
  notodoId: string;
}

export default function NotodoShowActions({ notodoId }: NotodoShowActionsProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="edit" className="p-0 m-0" textValue="Create Notodo">
        <NotodoPopover
          startContent={<div><FaEdit size="10" /></div>}
          text="Edit Notodo"
        >
          TODO: Edit Notodo Form
        </NotodoPopover>
      </ListboxItem>
      <ListboxItem key="delete" className="p-0 m-0" textValue="Delete Notodo">
        <NotodoShowActionDelete notodoId={notodoId} />
      </ListboxItem>
    </Listbox>
  )
}
