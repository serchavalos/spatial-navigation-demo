export const CYCLE_VERTICAL = "vertical" as const;
export const CYCLE_HORIZONTAL = "horizontal" as const;
export type NavContainerAttributes = {
  cycle: typeof CYCLE_VERTICAL | typeof CYCLE_HORIZONTAL;
};

export type NavNode = {
  id: string;
  ref?: HTMLElement;
  parentId: string;
};

export type NavContainer = {
  id: string;
  parentId: string;
  attr: NavContainerAttributes;
};

export type RefWithRect = { ref: HTMLElement; rect: DOMRect };
