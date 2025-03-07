import { RowResponseWithAddInfo, TreeResponse } from "./types"

const addDepthAndParent = (node: TreeResponse, depth: number, parent: string | null) => ({ ...node, _addInfo: { depth, parent } })

type FlatResponseTreeReturnType = [Record<string, RowResponseWithAddInfo>, string[]]

export const flatResponseTree = (rootNodes: TreeResponse[]): FlatResponseTreeReturnType => {
  const flattenArray = []
  const stack = [...rootNodes.map((rootNode) => addDepthAndParent(rootNode, 0, null))]
  const nodesMap: Record<string, RowResponseWithAddInfo> = {}

  while (stack.length) {
    const lastNode = stack.pop() as ReturnType<typeof addDepthAndParent>
    const reversedChildrenWithDepth = lastNode
      .child
      .reverse()
      .map((node) => addDepthAndParent(node, lastNode._addInfo.depth + 1, lastNode.id))

    stack.push(...reversedChildrenWithDepth)
    const { id, _addInfo, child, ...rest } = lastNode
    nodesMap[lastNode.id] = { ...rest, id, _addInfo }

    flattenArray.push(id)
  }

  return [nodesMap, flattenArray]
}