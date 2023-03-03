import { Direction, directionsMap, isDirectional } from "./directions";

export function getDirectionFromEvent({ code }: KeyboardEvent): Direction {
  return directionsMap[code];
}

export type KeyEventHandler = (e: KeyboardEvent) => void;

export function getKeyEventHandler(): KeyEventHandler {
  return (e: KeyboardEvent) => {
    if (isDirectional(e)) {
      // eslint-disable-next-line
      console.log(e);
    }
  };
}
