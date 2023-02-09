import { createContext } from "react";
import { NavNode } from "./types";
import { Direction } from "./user-input";

type Subscriber = () => void;

export class NavEngine {
  private nodes: NavNode[];
  private selectedNode: NavNode | undefined;
  private subscriptions: Subscriber[];

  constructor() {
    this.nodes = [];
    this.subscriptions = [];
  }

  registerNode(node: NavNode): void{
    this.nodes.push(node);
  }

  unregisterNode(nodeId: string): void {
    this.nodes = this.nodes.filter(({ id }) => id !== nodeId);
  }

  getNodes(): NavNode[] {
    return this.nodes;
  }

  isFocused(nodeId: string): boolean {
    return this.selectedNode?.id === nodeId;
  }

  subscribe(subscriber: Subscriber): VoidFunction {
    this.subscriptions = [...this.subscriptions, subscriber];
    return (): void => {
      this.subscriptions = this.subscriptions.filter(subscription => subscription !== subscriber);
    };
  }

  private notifyAllSubscribers(): void {
    this.subscriptions.forEach(subscriber => subscriber());
  }

  handleNavigation(direction: Direction): void {
    if(direction === Direction.DOWN) {
      this.selectedNode = this.nodes[0];
    } else if (direction === Direction.UP) {
      this.selectedNode = this.nodes[this.nodes.length - 1];
    }
    this.notifyAllSubscribers();
  }

  handleSelect(): void {
    throw new Error('Not implemented yet!')
  }
}


export const NavNodesContext = createContext<NavEngine | undefined>(undefined);