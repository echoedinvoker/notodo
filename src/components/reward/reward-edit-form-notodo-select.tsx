'use client';

import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import type { NotodoWithData } from "@/db/queries/notodos";

interface RewardEditFormNotodoSelectProps {
  notodos: NotodoWithData[];
  defaultSelectedNotodos: string[];
}

export default function RewardEditFormNotodoSelect({ notodos, defaultSelectedNotodos }: RewardEditFormNotodoSelectProps) {
  return (
    <Select
      name="notodoIds"
      label="Associated Notodos"
      placeholder="Select associated notodos"
      selectionMode="multiple"
      defaultSelectedKeys={new Set(defaultSelectedNotodos)}
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
