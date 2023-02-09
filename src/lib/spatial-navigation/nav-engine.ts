import { createContext } from "react";
import { NavNode } from "./types";

export class NavEngine {
  private nodes: NavNode[];

  constructor() {
    this.nodes = [];
  }

  registerNode(node: NavNode): void{
    console.log(`registerNode: ${node.id}`)
    this.nodes.push(node);
  }

  unregisterNode(nodeId: string): void {
    console.log(`unregisterNode: ${nodeId}`)
    this.nodes = this.nodes.filter(({ id }) => id !== nodeId);
  }

  getNodes(): NavNode[] {
    return this.nodes;
  }
}



export const NavNodesContext = createContext<NavEngine | undefined>(undefined);