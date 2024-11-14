'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState, ReactNode } from "react";

interface ThePopoverExtProps {
  children: ReactNode | ((setIsOpen: (isOpen: boolean) => void) => ReactNode);
  startContent: ReactNode;
  text: string;
}

export default function ThePopoverExt({
  children,
  startContent,
  text,
}: ThePopoverExtProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="left-start"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
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
        {typeof children === 'function' ? children(setIsOpen) : children}
      </PopoverContent>
    </Popover>
  )
}
