'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState } from "react";

interface ThePopoverProps {
  children: React.ReactNode;
  startContent: React.ReactNode;
  text: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function ThePopover({
  children,
  startContent,
  text,
  onOpenChange
}: ThePopoverProps) {
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
          startContent={startContent}
          size="sm"
        >
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-stone-50 p-2">
        {children}
      </PopoverContent>
    </Popover>
  )
}
