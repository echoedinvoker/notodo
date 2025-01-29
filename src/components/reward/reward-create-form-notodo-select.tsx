'use client';

import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import type { NotodoWithData } from "@/db/queries/notodos";

interface RewardCreateFormNotodoSelectProps {
  notodos: NotodoWithData[];
}

export default function RewardCreateFormNotodoSelect({ notodos }: RewardCreateFormNotodoSelectProps) {
  return (
    <Select
      name="notodoIds"
      label="Associated Notodos"
      placeholder="Select associated notodos"
      selectionMode="multiple"
      className="w-full"
    >
      {notodos.map((notodo) => (
        <SelectItem key={notodo.id} value={notodo.id}>
          {notodo.title}
        </SelectItem>
      ))}
    </Select>
  );
}
