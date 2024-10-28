'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import ThresholdPopover from "./threshold-popover";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

interface ThresholdListboxProps {
  userId: string;
  notodoId: string;
}

export default function ThresholdListbox({ userId, notodoId }: ThresholdListboxProps) {
  const [deleteFormState, deleteNotodoAction] = useFormState(actions.deleteNotodo.bind(null, notodoId), { errors: {} });

  return (
    <Listbox aria-label="Threshold Actions">
      <ListboxItem key="create" className="p-0 m-0" textValue="Create Threshold">
        <ThresholdPopover userId={userId} notodoId={notodoId} />
      </ListboxItem>
    </Listbox>
  )
}
