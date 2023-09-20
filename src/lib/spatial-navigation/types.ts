export type NavNode = {
  id: string;
  ref?: HTMLElement;
  parentId: string;
};

export type RefWithRect = { ref: HTMLElement; rect: DOMRect };
