/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode/
 * 
 * 利用迭代的方法进行前中后序的遍历
 * leetcode的官方解答不是特别的好理解，可以看第二个推荐，本质上是添加状态来进行迭代过程不同情况的处理
 * 利用迭代法代替递归本质还是要用堆栈来模拟节点的进出栈
 */

/**
 * 前序遍历是根节点 -> 左子树 -> 右子树
 * 拆分步骤为
 * 1. 从节点A开始，找到最左子叶L，过程中依次记录A -> L
 * 2. 返回L节点的父节点P右子叶R，并重复步骤
 * 上面的步骤中我们称A，R为起始点，表示它们是需要一个完整的迭代的，而R点是需要一个栈来维护的
 */
var preOrderTraversal = function(root) {
  const output = []
  const nodeArray = []
  
  if (root) nodeArray.push(root)
  
  while (nodeArray.length > 0) {
    let currentNode = nodeArray.shift()
    
    while (currentNode) {
      if (currentNode.right) {
        nodeArray.unshift(currentNode.right)
      }
      output.push(currentNode.val)
      currentNode = currentNode.left
    }
  }
  
  return output
}

/**
 * 中序遍历是左子树 -> 根节点 -> 右子树
 * 拆分步骤为
 * 1. 从节点A开始，寻找到最左叶L，并记录L
 * 2. 返回L节点的父节点P，并记录
 * 3. 找到P的右子叶R，并重复步骤
 * 上面的步骤中我们称A，R为起始点，表示它们是需要一个完整的迭代的，P点是需要一个栈来维护的
 * leetcode中的curr不是特别的好理解，这边使用isStartNode来表示是否是起始点
 */
var inOrderTraversal = function(root) {
  const output = []
  const nodeArray = []
  
  if (root) nodeArray.push({
    isStartNode: true,
    node: root
  })
  
  while (nodeArray.length > 0) {
    let {isStartNode, node: currentNode} = nodeArray.shift()
    
    if (!isStartNode) {
      /* 不是起始点的情况，直接输出，并循环右子叶 */
      output.push(currentNode.val)
      
      if (currentNode.right) {
        nodeArray.unshift({
          isStartNode: true,
          node: currentNode.right
        })
      }
    } else {
      /* 如果是起始点，将左子叶依次推入，直到找到最左子叶 */
      while (currentNode) {
        nodeArray.unshift({
          isStartNode: false,
          node: currentNode
        })
        
        currentNode = currentNode.left
      }
    }
  }
  
  return output
}

 /**
 * 后序遍历是左子树 -> 右子树 -> 根节点
 * 处理情况和中序雷同，只是推入时机和顺序的变化
 */
var postOrderTraversal = function(root) {
  const output = []
  const nodeArray = []
  
  if (root) nodeArray.push({
    isStartNode: true,
    node: root
  })
  
  while (nodeArray.length > 0) {
    let {isStartNode, node: currentNode} = nodeArray.shift()
    
    if (!isStartNode) {
      /* 如果不是起始点，直接推入 */
      output.push(currentNode.val)
    } else {
      /* 起始点推入底部 */
      nodeArray.unshift({
        isStartNode: false,
        node: currentNode
      })

      while (currentNode) {
        /* 有节点优先级低于左节点 */
        if (currentNode.right) {
          nodeArray.unshift({
            isStartNode: true,
            node: currentNode.right
          })
        }
        
        /* 左节点推入顶部 */
        if (currentNode.left) {
          nodeArray.unshift({
            isStartNode: false,
            node: currentNode.left
          })
        }
        
        currentNode = currentNode.left
      }
    }
  }
  
  return output
}