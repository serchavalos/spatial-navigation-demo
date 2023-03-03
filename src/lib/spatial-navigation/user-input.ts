import { Direction, directionsMap } from "./directions";

export function getDirectionFromEvent({ code }: KeyboardEvent): Direction {
  return directionsMap[code];
}

export type KeyEventHandler = (e: KeyboardEvent) => void;
