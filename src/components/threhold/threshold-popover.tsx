'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import ThresholdForm from "./threshold-form";
import { FaPlus } from "react-icons/fa";

interface ThresholdPopoverProps {
  userId: string;
  notodoId: string;
}

export default function ThresholdPopover({ userId, notodoId }: ThresholdPopoverProps) {

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button
          variant="light"
          className="no-hover-effect flex items-center justify-start w-full"
          startContent={<FaPlus />}
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
