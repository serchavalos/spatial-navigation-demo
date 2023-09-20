export const CYCLE_VERTICAL = "vertical" as const;
export const CYCLE_HORIZONTAL = "horizontal" as const;

export type NavNodeAttributes = {
  cycle: typeof CYCLE_VERTICAL | typeof CYCLE_HORIZONTAL;
};

export type NavNode = {
  id: string;
  ref?: HTMLElement;
  parentId: string;
  attr?: NavNodeAttributes;
};

export type RefWithRect = { ref: HTMLElement; rect: DOMRect };
