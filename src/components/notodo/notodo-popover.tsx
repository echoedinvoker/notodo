'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import NotodoCreateForm from "./notodo-create-form";
import { FaPlus } from "react-icons/fa";

interface NotodoPopoverProps {
  userId: string;
}

export default function NotodoPopover({ userId }: NotodoPopoverProps) {

  return (
    <Popover
      placement="left-start"
      backdrop="blur"
    >
      <PopoverTrigger>
        <Button
          variant="light"
          className="no-hover-effect w-full flex items-center justify-start text-stone-700"
          startContent={<div><FaPlus size="10" /></div>}
          size="sm"
        >
          Create Notodo
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-stone-50 p-2">
        <NotodoCreateForm userId={userId} />
      </PopoverContent>
    </Popover>
  )
}
