/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/odd-even-linked-list/solution/qi-ou-lian-biao-by-leetcode/
 * 
 * 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
 * 请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。
 * 
 * 示例 1:
 * 输入: 1->2->3->4->5->NULL
 * 输出: 1->3->5->2->4->NULL
 */

 /**
 * 本题要求空间复杂度为O(1)，所以必须是原地算法
 * 本体的思路就是在遍历的过程中奇偶分链，并记录下奇偶链的尾结点
 * 然后在遍历完成后将奇偶链重新排列
 * 
 * 本题具体的思路可以参考leetcode手稿，有一句话很重要，解决链表的最好方式就是画出来
 */
var oddEvenList = function(head) {
  /* 边界条件，小于等于2长度的直接返回head */
  if (!head || !head.next || !head.next.next) return head
  
  /* 偶链的头尾结点 */
  const startEvenNode = head.next
  let lastEvenNode = head.next
  
  /* 奇链的头尾结点 */
  const startOddNode = head
  let lastOddNode = head
  
  
  /* 序号，用于判断当前操作的是奇链还是偶链 */
  let index = 0
  
  let currentNode = head
  while (currentNode) {
    if (!(currentNode.next && currentNode.next.next)) break
    if (index % 2 === 0) {
      /* 当前操作的是奇链 */
      lastOddNode.next = lastOddNode.next.next
      lastOddNode = lastOddNode.next
      currentNode = lastEvenNode
    } else {
      /* 当前操作的是偶链 */
      lastEvenNode.next = lastEvenNode.next.next
      lastEvenNode = lastEvenNode.next
      currentNode = lastOddNode
    }
    
    index++
  }
  
  /* 拼接奇偶链 */
  lastOddNode.next = startEvenNode
  lastEvenNode.next = null
  
  return startOddNode
}
 