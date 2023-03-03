import { Direction } from "./directions";
import { RefWithRect } from "./types";

type DOMEdge = Extract<keyof DOMRect, "left" | "right" | "top" | "bottom">;
type DOMLength = Extract<keyof DOMRect, "width" | "height">;

type MainAxis = { start: DOMEdge; end: DOMEdge };

type CrossAxis = {
  start: DOMEdge;
  end: DOMEdge;
  length: DOMLength;
};

type Axes = {
  mainAxis: MainAxis;
  crossAxis: CrossAxis;
};

export const axes: Record<Direction, Axes> = {
  [Direction.RIGHT]: {
    mainAxis: {
      start: "left",
      end: "right"
    },
    crossAxis: {
      start: "top",
      end: "bottom",
      length: "height"
    }
  },
  [Direction.DOWN]: {
    mainAxis: {
      start: "top",
      end: "bottom"
    },
    crossAxis: {
      start: "left",
      end: "right",
      length: "width"
    }
  },
  [Direction.LEFT]: {
    mainAxis: {
      start: "right",
      end: "left"
    },
    crossAxis: {
      start: "top",
      end: "bottom",
      length: "height"
    }
  },
  [Direction.UP]: {
    mainAxis: {
      start: "bottom",
      end: "top"
    },
    crossAxis: {
      start: "left",
      end: "right",
      length: "width"
    }
  }
};

type RectFilterFunction = (c: { rect: DOMRect }) => boolean;

function getCrossAxisCenter(
  rect: DOMRect,
  start: DOMEdge,
  length: DOMLength
): number {
  return rect[start] + rect[length] / 2;
}

function isItemIn5(
  fromRect: DOMRect,
  { start, end, length }: CrossAxis
): RectFilterFunction {
  const crossAxisCenter = getCrossAxisCenter(fromRect, start, length);
  return ({ rect }: { rect: DOMRect }): boolean => {
    const completelyContainedIn5 =
      rect[start] >= fromRect[start] && rect[end] <= fromRect[end];

    const overlapping5 =
      rect[start] < crossAxisCenter && rect[end] > crossAxisCenter;

    return completelyContainedIn5 || overlapping5;
  };
}

function sortByMainAxisDistance(
  fromRect: DOMRect,
  mainAxis: MainAxis,
  crossAxis: CrossAxis
) {
  return (a: RefWithRect, b: RefWithRect): number => {
    const diff =
      Math.abs(a.rect[mainAxis.start] - fromRect[mainAxis.end]) -
      Math.abs(b.rect[mainAxis.start] - fromRect[mainAxis.end]);

    if (diff === 0) {
      return a.rect[crossAxis.start] - b.rect[crossAxis.start];
    }

    return diff;
  };
}

function closestItemInMainAxis(
  fromRect: DOMRect,
  items: RefWithRect[],
  mainAxis: MainAxis,
  crossAxis: CrossAxis
): HTMLElement | undefined {
  const sortedItems = items.sort(
    sortByMainAxisDistance(fromRect, mainAxis, crossAxis)
  );
  return sortedItems[0]?.ref;
}

function getDistanceToCenter(
  crossAxisCenter: number,
  item: RefWithRect,
  { end, start }: CrossAxis
): number {
  return item.rect[end] < crossAxisCenter
    ? crossAxisCenter - item.rect[end]
    : item.rect[start] - crossAxisCenter;
}

function sortByCrossAxisDistance(
  crossAxis: CrossAxis,
  crossAxisCenter: number,
  fromRect: DOMRect,
  mainAxis: MainAxis
) {
  return (a: RefWithRect, b: RefWithRect): number => {
    const diff =
      getDistanceToCenter(crossAxisCenter, a, crossAxis) -
      getDistanceToCenter(crossAxisCenter, b, crossAxis);

    if (diff === 0) {
      return sortByMainAxisDistance(fromRect, mainAxis, crossAxis)(a, b);
    }

    return diff;
  };
}

function closestItemInCrossAxis(
  fromRect: DOMRect,
  items: RefWithRect[],
  mainAxis: MainAxis,
  crossAxis: CrossAxis
): HTMLElement | undefined {
  const crossAxisCenter = getCrossAxisCenter(
    fromRect,
    crossAxis.start,
    crossAxis.length
  );
  const sortedItems = items.sort(
    sortByCrossAxisDistance(crossAxis, crossAxisCenter, fromRect, mainAxis)
  );
  return sortedItems[0]?.ref;
}

export function findElementInDirection(
  fromRect: DOMRect,
  items: RefWithRect[],
  direction: Direction
): HTMLElement | undefined {
  const { mainAxis, crossAxis } = axes[direction];

  const itemsIn5 = items.filter(isItemIn5(fromRect, crossAxis));

  if (itemsIn5.length > 0) {
    return closestItemInMainAxis(fromRect, itemsIn5, mainAxis, crossAxis);
  }

  return closestItemInCrossAxis(fromRect, items, mainAxis, crossAxis);
}
