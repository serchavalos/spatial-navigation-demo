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

type DirectionalFilter = {
  startsAfterFromEnds: (from: DOMRect, to: DOMRect) => boolean;
  endsAfterFromEnds: (from: DOMRect, to: DOMRect) => boolean;
};

export const directionalFilters: Record<Direction, DirectionalFilter> = {
  [Direction.RIGHT]: {
    startsAfterFromEnds: (from, to) => from.right <= to.left,
    endsAfterFromEnds: (from, to) => from.right < to.right
  },
  [Direction.DOWN]: {
    startsAfterFromEnds: (from, to) => from.bottom <= to.top,
    endsAfterFromEnds: (from, to) => from.bottom < to.bottom
  },
  [Direction.LEFT]: {
    startsAfterFromEnds: (from, to) => from.left >= to.right,
    endsAfterFromEnds: (from, to) => from.left > to.left
  },
  [Direction.UP]: {
    startsAfterFromEnds: (from, to) => from.top >= to.bottom,
    endsAfterFromEnds: (from, to) => from.top > to.top
  }
};

export function isDirectional({ code }: KeyboardEvent): boolean {
  return DIRECTIONAL_EVENTS.includes(code);
}
