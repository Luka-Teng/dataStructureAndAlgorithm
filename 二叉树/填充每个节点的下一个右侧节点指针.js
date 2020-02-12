/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/solution/tian-chong-mei-ge-jie-dian-de-xia-yi-ge-you-ce-j-3/
 *       A
 *    /     \
 *   B       C
 *  / \     / \
 * D   E   F   G
 * 
 * 将每层相邻节点相连
 * 
 *       A
 *    /     \
 *   B   -   C
 *  / \     / \
 * D - E - F - G
 */

/**
 * 类似深度遍历的做法
 * 需要维护一个数组来存放当层节点
 * 空间复杂度O(n)
 */
var connect1 = function(root) {
  const connectRow = (nodes) => {
    const length = nodes.length

    if (length === 0) return
    
    const newNodes = []
    nodes.forEach((node, index) => {
      if (node.left) {
        newNodes.push(node.left, node.right)
      }
      
      if (index === length - 1) {
        node.next = null
      } else {
        node.next = nodes[index + 1]
      }
    })

    if (newNodes.length !== 0) connectRow(newNodes)
  }
  connectRow(root ? [root] : [])
  return root
};

/**
 * 以某一层的左边第一个节点为起始点mostLeft，重复一下步骤
 * 1. 遍历当前层的节点 mostLeft -> mostRight
 * 2. 每个节点的left，right相连，每个节点交错的子节点相连，最后一个子节点指向null
 * 3. 更换下一层的leftMost，直到leftMost === null
 * 时间复杂度O(n), 空间复杂度O(1)
 */
var connect2 = function(root) {
  if (!root) return null
  
  let leftMostNode = root
  while (leftMostNode) {
    let currentNode = leftMostNode
    
    // 表示当前节点的右子叶
    let prevGapNode = null
    
    while (currentNode) {
      // 定义下一层的第一个节点
      if (currentNode === leftMostNode) {
        leftMostNode = currentNode.left
      }
      
      // 只有下一层存在才需要后续操作
      if (!currentNode.left) break
      
      if (prevGapNode) {
        prevGapNode.next = currentNode.left
      }
      currentNode.left.next = currentNode.right
      prevGapNode = currentNode.right
      currentNode = currentNode.next
    }
  }
  
  return root
};
