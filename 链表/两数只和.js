/**
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，
 * 并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/**
 * 最简单暴力
 * 两个链表一位一位相加
 * 时间复杂度O(n)
 * 空间复杂度O(n)，需要额外的链表输出
 */
var addTwoNumbers = function(l1, l2) {
  let extraNum = 0
  let startListNode = null
  let currentListNode = startListNode
  
  while (l1 !== null || l2 !== null || extraNum !== 0) {
    const val = ((l1 && l1.val) || 0) + ((l2 && l2.val) || 0) + extraNum
          
    const currentNum = val % 10
    extraNum = parseInt(val / 10)
    
    if (startListNode === null) {
      startListNode = new ListNode(currentNum)
      currentListNode = startListNode
    } else {
      currentListNode.next = new ListNode(currentNum)
      currentListNode = currentListNode.next
    }
    
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  
  return startListNode
};

/**
 * 递归实现，时间和空间同上
 */
var addTwoNumbers2 = function(l1, l2) {
  let startListNode = new ListNode(0)
  
  function pendingNode (l1, l2, extraNum, currentNode) {
    if (l1 !== null || l2 !== null || extraNum !== 0) {
      const val = ((l1 && l1.val) || 0) + ((l2 && l2.val) || 0) + extraNum
      const currentNum = val % 10
      const _extraNum = parseInt(val / 10)

      currentNode.next = new ListNode(currentNum)
      pendingNode(l1 && l1.next, l2 && l2.next, _extraNum, currentNode.next)
    }
  }
  
  pendingNode(l1, l2, 0, startListNode)
  
  return startListNode.next
};