'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import NotodoShowActionDelete from "./notodo-show-action-delete";
import { FaEdit } from "react-icons/fa";
import NotodoForm from "./notodo-form";
import * as actions from "@/actions"
import type { Notodo } from "@prisma/client";
import { ThePopoverExt } from "../common";

interface NotodoShowActionsProps {
  notodo: Notodo;
}

export default function NotodoShowActions({ notodo }: NotodoShowActionsProps) {
  return (
    <Listbox aria-label="Notodo Actions">
      <ListboxItem key="edit" className="p-0 m-0" textValue="Create Notodo">
        <ThePopoverExt
          startContent={<div><FaEdit size="10" /></div>}
          text="Edit Notodo"
        >
          {(setIsOpen) => (
            <NotodoForm
              formStateAction={actions.editNotodo.bind(null, notodo.id)}
              defaultValues={notodo}
              onSubmitSuccess={() => setIsOpen(false)}
            />
          )}
        </ThePopoverExt>
      </ListboxItem>
    </Listbox>
  )
}
