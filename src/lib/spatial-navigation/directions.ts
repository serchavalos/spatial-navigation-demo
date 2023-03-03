export enum Direction {
  RIGHT = "nextRight",
  DOWN = "nextDown",
  LEFT = "nextLeft",
  UP = "nextUp"
}

const KEY_ARROW_UP = "ArrowUp";
const KEY_ARROW_DOWN = "ArrowDown";
const KEY_ARROW_LEFT = "ArrowLeft";
const KEY_ARROW_RIGHT = "ArrowRight";
const KEY_ENTER = "Enter";

const DIRECTIONAL_EVENTS = [
  KEY_ARROW_UP,
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT
];

export const directionsMap: Record<string, Direction> = {
  [KEY_ARROW_UP]: Direction.UP,
  [KEY_ARROW_DOWN]: Direction.DOWN,
  [KEY_ARROW_LEFT]: Direction.LEFT,
  [KEY_ARROW_RIGHT]: Direction.RIGHT
};

export function isDirectional({ code }: KeyboardEvent): boolean {
  return DIRECTIONAL_EVENTS.includes(code);
}

export function isSelection({ code }: KeyboardEvent): boolean {
  return code === KEY_ENTER;
}
