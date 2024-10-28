'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import ChallengeListActionStart from "./challenge-list-action-start";
import ChallengeListActionGiveUp from "./challenge-list-action-giveup";
import type { Challenge } from "@prisma/client";

interface ChallengeListActionsProps {
  challenges: Challenge[];
  notodoId: string;
}

export default function ChallengeListActions({ challenges, notodoId }: ChallengeListActionsProps) {
  const disabledKeys = getDisabledKeys(challenges);

  return (
    <Listbox disabledKeys={disabledKeys} aria-label="Challenge Actions">
      <ListboxItem key="start" className="p-0 m-0" textValue="Start Challenge">
        <ChallengeListActionStart notodoId={notodoId} />
      </ListboxItem>
      <ListboxItem key="giveup" className="p-0 m-0" textValue="Give Up">
        <ChallengeListActionGiveUp notodoId={notodoId} />
      </ListboxItem>
    </Listbox>
  )
}

function getDisabledKeys(challenges: Challenge[]) {
  if (challenges.length === 0) return ['giveup'];
  if (challenges.some(challenge => challenge.endTime === null)) {
    return ['start'];
  } else {
    return ['giveup'];
  }
}
