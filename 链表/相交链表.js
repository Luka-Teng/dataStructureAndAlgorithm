/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/xiang-jiao-lian-biao-by-leetcode/
 * 
 * 编写一个程序，找到两个单链表相交的起始节点
 * 
 * 例如：
 * A - C - E - F
 *       /
 * B - D
 * 
 * 则输出节点F
 */

 /**
 * 解法1，暴力法
 * 用B的每个节点遍历A，时间复杂度O(n * m), 空间复杂度O(1)
 */

/**
 * 解法2, 哈希法
 * 遍历B，将B节点的地址记录在哈希表上，再遍历A查询
 * 时间复杂度O(m + n), 空间复杂度O(n)
 */

/**
 * 解法三
 * 相交链表可以分为三段：
 * 1. 链表A独有的链表: A
 * 2. 链表B独有的链表: B
 * 3. A，B共有的链表段： C
 * 
 * 虽然A，B长度不同，但是A + C + B = B + C + A
 * 因此利用双指针
 * 一个从A + C开始遍历，结束后在遍历B + C
 * 另一个从B + C开始遍历， 结束后开始遍历A + C
 * 如果遍历过程中有一个节点相同，则为交点，如果没有，则没有交点
 * 时间复杂度O(m + n), 空间复杂度O(1)
 */
var getIntersectionNode = function(headA, headB) {
  let p1 = headA
  let p1Reset = false
  
  let p2 = headB
  let p2Reset = false
  
  while (p1 && p2) {
    if (p1 === p2) return p1
    
    if (p1.next === null && !p1Reset) {
      p1 = headB
      p1Reset = true
    } else {
      p1 = p1.next
    }
    
    if (p2.next === null && !p2Reset) {
      p2 = headA
      p2Reset = true
    } else {
      p2 = p2.next
    }
  }
  
  return null
}