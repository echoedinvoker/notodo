'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

interface NotodoPopoverProps {
  children: React.ReactNode;
  startContent: React.ReactNode;
  text: string;
}

export default function NotodoPopover({ children, startContent, text }: NotodoPopoverProps) {

  return (
    <Popover
      placement="left-start"
      backdrop="blur"
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
