'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import ThresholdForm from "./threshold-form";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

interface ThresholdPopoverProps {
  userId: string;
  notodoId: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function ThresholdPopover({ userId, notodoId, onOpenChange }: ThresholdPopoverProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Popover
      placement="left-start"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange || setOpen}
    >
      <PopoverTrigger>
        <Button
          variant="light"
          className="no-hover-effect w-full flex items-center justify-start text-stone-700"
          startContent={<div><FaPlus /></div>}
        >
          Create Threshold
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ThresholdForm userId={userId} notodoId={notodoId} actionType="create" />
      </PopoverContent>
    </Popover>
  )
}
