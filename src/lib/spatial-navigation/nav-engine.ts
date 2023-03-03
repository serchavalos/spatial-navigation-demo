import { createContext } from "react";
import { fallbackRect } from "./constants";
import { Direction, directionalFilters } from "./directions";
import { filterByAxis, pickClosestNode } from "./spatial";
import { NavNode } from "./types";

export class NavEngine {
  private nodes: NavNode[];
  private selectedNode: NavNode | undefined;

  constructor() {
    this.nodes = [];
  }

  registerNode(node: NavNode): void {
    this.nodes.push(node);
  }

  unregisterNode(nodeId: string): void {
    this.nodes = this.nodes.filter(({ id }) => id !== nodeId);
  }

  handleNavigation(direction: Direction): void {
    const directionalFilter = directionalFilters[direction];
    const fromReact =
      this.selectedNode?.ref.getBoundingClientRect() ?? fallbackRect;
    const nodesRefsWithRects = this.nodes.map((node) => ({
      ref: node.ref,
      rect: node.ref.getBoundingClientRect()
    }));

    // 1. Filter nodes by direction
    const filteredNodesByDirection = nodesRefsWithRects.filter((node) =>
      directionalFilter.startsAfterFromEnds(fromReact, node.rect)
    );

    // 2. Filter by main axis
    const filteredByAxis = filterByAxis(
      fromReact,
      filteredNodesByDirection,
      direction
    );

    // 3. Pick the closest one
    const foundElement = pickClosestNode(
      fromReact,
      filteredNodesByDirection,
      filteredByAxis,
      direction
    );

    if (foundElement) {
      this.selectedNode = this.nodes.find((leaf) => leaf.ref === foundElement);
    }
  }
}

export const NavNodesContext = createContext<NavEngine | undefined>(undefined);
