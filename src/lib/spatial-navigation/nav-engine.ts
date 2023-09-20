import { createContext } from "react";
import { fallbackRect } from "./constants";
import { Direction, directionalFilters } from "./directions";
import { findElementInDirection } from "./spatial";
import { NavNode } from "./types";

type Subscriber = VoidFunction;

// REVIEW: How to do this with TS (import `ref` and make it required)
type NodeWithRef = Omit<NavNode, "ref"> & { ref: HTMLElement };

function navNodesWithRef(n: NavNode | NodeWithRef): n is NodeWithRef {
  return n.ref !== undefined;
}

export class NavEngine {
  private nodes: NavNode[];
  private selectedNode: NavNode | undefined;
  private subscriptions: Subscriber[];

  constructor() {
    this.nodes = [];
    this.subscriptions = [];
  }

  registerNode(node: NavNode): void {
    this.nodes.push(node);
  }

  unregisterNode(nodeId: string): void {
    this.nodes = this.nodes.filter(({ id }) => id !== nodeId);
  }

  isFocused(nodeId: string): boolean {
    return this.selectedNode?.id === nodeId;
  }

  subscribe(subscriber: Subscriber): VoidFunction {
    this.subscriptions = [...this.subscriptions, subscriber];
    return (): void => {
      this.subscriptions = this.subscriptions.filter(
        (subscription) => subscription !== subscriber
      );
    };
  }

  private notifyAllSubscribers(): void {
    this.subscriptions.forEach((subscriber) => subscriber());
  }

  handleNavigation(direction: Direction): void {
    const directionalFilter = directionalFilters[direction];
    const fromReact =
      this.selectedNode?.ref?.getBoundingClientRect() ?? fallbackRect;
    const nodesRefsWithRects = this.nodes
      .filter(navNodesWithRef)
      .map((node) => ({
        ref: node.ref,
        rect: node.ref.getBoundingClientRect()
      }))
      .filter((node) =>
        directionalFilter.startsAfterFromEnds(fromReact, node.rect)
      );

    const foundElement = findElementInDirection(
      fromReact,
      nodesRefsWithRects,
      direction
    );

    if (foundElement) {
      this.selectedNode = this.nodes.find((leaf) => leaf.ref === foundElement);
      this.notifyAllSubscribers();
    }
  }

  handleSelect(): void {
    this.selectedNode?.ref?.click();
  }
}

export const NavEngineContext = createContext<NavEngine | undefined>(undefined);
