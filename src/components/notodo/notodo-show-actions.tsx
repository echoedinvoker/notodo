'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import NotodoShowActionDelete from "./notodo-show-action-delete";
import NotodoPopover from "./notodo-popover";
import { FaEdit } from "react-icons/fa";
import NotodoForm from "./notodo-form";
import * as actions from "@/actions"
import type { Notodo } from "@prisma/client";

interface NotodoShowActionsProps {
  notodo: Notodo;
}

export default function NotodoShowActions({ notodo }: NotodoShowActionsProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="edit" className="p-0 m-0" textValue="Create Notodo">
        <NotodoPopover
          startContent={<div><FaEdit size="10" /></div>}
          text="Edit Notodo"
        >
          <NotodoForm
            formStateAction={actions.editNotodo.bind(null, notodo.id)}
            defaultValues={{ title: notodo.title, content: notodo.content }}
          />
        </NotodoPopover>
      </ListboxItem>
      <ListboxItem key="delete" className="p-0 m-0" textValue="Delete Notodo">
        <NotodoShowActionDelete notodoId={notodo.id} />
      </ListboxItem>
    </Listbox>
  )
}
