/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/jump-game/solution/tiao-yue-you-xi-by-leetcode/
 * 给定一个非负整数数组，你最初位于数组的第一个位置。
    数组中的每个元素代表你在该位置可以跳跃的最大长度。

    判断你是否能够到达最后一个位置。

    示例 1:

    输入: [2,3,1,1,4]
    输出: true
    解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
    示例 2:

    输入: [3,2,1,0,4]
    输出: false
    解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。
 */

 /**
 * 回溯，并用状态缓存优化时间
 * state = [num]，用一维数组表示改点是否到达
 * 最简单的状态传递
 */
var canJump2 = function(nums) {
  const isJumped = []
  const length = nums.length
  
  const jumpTo = (pos) => {  
    if (pos === length - 1) {
      return true
    }
    
    isJumped[pos] = true
    const jumpNums = nums[pos]
    for (let i = 1; i <= jumpNums; i++) {
      if (!isJumped[pos + i] && (pos + i) < length) {
        if(jumpTo(pos + i)) return true
      }
    }
    return false
  }
  
  return jumpTo(0)
};

/**
 * 最大可覆盖路径
 * maxCover(i) = max(maxCover(i - 1), i + nums[i])
 * if (maxCover(i) >= length - 1) return true
 */
var canJump2 = function(nums) {
  let maxCover = 0
  let index = 0
  const length = nums.length
  
  if (length === 0) return false
  if (length === 1) return true
  
  while (index < nums.length - 1) {
    maxCover = Math.max(maxCover, index + nums[index])
    if (maxCover >= length - 1) return true
    
    if (maxCover > index) {
      index++
    } else {
      return false
    }
    
  }
  
  return false
};