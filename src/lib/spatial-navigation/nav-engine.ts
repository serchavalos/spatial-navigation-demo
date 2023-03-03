import { createContext } from "react";
import { NavNode } from "./types";

export class NavEngine {
  private nodes: NavNode[];

  constructor() {
    this.nodes = [];
  }

  registerNode(node: NavNode): void {
    this.nodes.push(node);
  }

  unregisterNode(nodeId: string): void {
    this.nodes = this.nodes.filter(({ id }) => id !== nodeId);
  }
}

export const NavNodesContext = createContext<NavEngine | undefined>(undefined);
