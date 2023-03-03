import { Direction, directionsMap } from "./directions";

export function getDirectionFromEvent({ code }: KeyboardEvent): Direction {
  return directionsMap[code];
}

export type KeyEventHandler = (e: KeyboardEvent) => void;

export function getKeyEventHandler(navEngine: NavEngine): KeyEventHandler {
  return (e: KeyboardEvent) => {
    if (isDirectional(e)) {
      navEngine.handleNavigation(getDirectionFromEvent(e));
    } else if (isSelection(e)) {
      navEngine.handleSelect();
    }
  };
}
