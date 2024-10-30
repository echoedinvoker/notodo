'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import ChallengeListActionGiveUp from "./challenge-list-action-giveup";

interface ChallengeShowActionsProps {
  notodoId: string;
}

export default function ChallengeShowActions({ notodoId }: ChallengeShowActionsProps) {

  return (
    <Listbox aria-label="Challenge Actions">
      <ListboxItem key="giveup" className="p-0 m-0" textValue="Give Up">
        <ChallengeListActionGiveUp notodoId={notodoId} />
      </ListboxItem>
    </Listbox>
  )
}
