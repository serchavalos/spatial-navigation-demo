import { createContext } from "react";
import { fallbackRect } from "./constants";
import { Direction, cycleRects, directionalFilters } from "./directions";
import { findElementInDirection } from "./spatial";
import {
  CYCLE_HORIZONTAL,
  CYCLE_VERTICAL,
  NavContainer,
  NavNode
} from "./types";

type Subscriber = VoidFunction;

function isNavNode(n: NavNode | NavContainer): n is NavNode {
  return (n as NavNode).ref !== undefined;
}

function isNavNodeRefDefined(
  n: NavNode
): n is Omit<NavNode, "ref"> & { ref: HTMLElement } {
  return Boolean(n.ref);
}

export class NavEngine {
  private nodes: Array<NavNode | NavContainer>;
  private selectedNode: NavNode | undefined;
  private subscriptions: Subscriber[];

  constructor() {
    this.nodes = [];
    this.subscriptions = [];
  }

  registerNode(node: NavNode | NavContainer): void {
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

  private findNextTargetElement(direction: Direction): HTMLElement | undefined {
    const directionalFilter = directionalFilters[direction];
    const fromReact =
      this.selectedNode?.ref?.getBoundingClientRect() ?? fallbackRect;
    const nodesRefsWithRects = this.nodes
      .filter(isNavNodeRefDefined)
      .map((node) => ({
        ref: node.ref,
        rect: node.ref.getBoundingClientRect()
      }))
      .filter((node) =>
        directionalFilter.startsAfterFromEnds(fromReact, node.rect)
      );

    return findElementInDirection(fromReact, nodesRefsWithRects, direction);
  }

  /**
   * It will cycle if:
   * 1. if the direction matches the type of cycling
   * 2. The parent has the attribute cycle (obviously)
   * 3. the current selected element and the next cycle element has different parent and are not the same
   */
  private shouldCycleNavigation(
    direction: Direction,
    parentNode: NavContainer
  ): boolean {
    const axis =
      direction === Direction.UP || direction === Direction.DOWN
        ? CYCLE_VERTICAL
        : CYCLE_HORIZONTAL;
    if (!parentNode?.attr?.cycle || parentNode.attr.cycle !== axis) {
      return false;
    }

    return true;
  }

  handleNavigation(direction: Direction): void {
    const targetElement = this.findNextTargetElement(direction);
    let targetNode =
      targetElement &&
      this.nodes.filter(isNavNode).find((node) => node.ref === targetElement);
    const parentNode = this.nodes.find(
      ({ id }) => id === this.selectedNode?.parentId
    );

    if (
      parentNode &&
      !isNavNode(parentNode) &&
      this.shouldCycleNavigation(direction, parentNode)
    ) {
      const childNodesRects = this.nodes
        .filter(isNavNode)
        .filter((node) => node.ref && node.parentId === parentNode.id)
        .map((node) => ({
          rect: node.ref?.getBoundingClientRect(),
          ref: node.ref
        }));
      const cycleTargetElement = findElementInDirection(
        cycleRects[direction],
        // TODO: Fix this TS warning
        // eslint-disable-next-line
        // @ts-ignore
        childNodesRects,
        direction
      );
      const cycleTargetNode = this.nodes
        .filter(isNavNode)
        .find((node) => node.ref === cycleTargetElement);
      if (targetNode?.parentId !== cycleTargetNode?.parentId) {
        targetNode = cycleTargetNode;
      }
    }

    if (targetNode) {
      this.selectedNode = targetNode;
      this.notifyAllSubscribers();
    }
  }

  handleSelect(): void {
    this.selectedNode?.ref?.click();
  }
}

export const NavEngineContext = createContext<NavEngine | undefined>(undefined);
