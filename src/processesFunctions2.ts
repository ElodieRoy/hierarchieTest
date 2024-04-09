import { Node } from "./data";

export function findAllFullPathByProcessName2(processesTree: (Node | null)[], targetProcessName: string): string[] | undefined {
  const targetNode = processesTree.find(t => t?.node.name === targetProcessName);
  if (!targetNode) return;

  const findAscPath = (node: Node, currentPath: string[] = []): string[] => {
    const parentNode = processesTree[node.node.ppid];
    return (!parentNode || parentNode.node.pid === 0) ? currentPath : findAscPath(parentNode, [parentNode.node.name].concat(currentPath));
  };

  const findDescPaths = (node: Node, currentPath: string[] = []): string[][] => {
    if (node.children.length === 0) return [currentPath.concat(node.node.name)];
    return node.children.reduce((path, child) => path.concat(findDescPaths(child, currentPath.concat(node.node.name))), [] as string[][])
  };

  return findDescPaths(targetNode, findAscPath(targetNode)).map(p => p.join('->'));
}