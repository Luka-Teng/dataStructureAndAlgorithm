/**
  给定一个 没有重复 数字的序列，返回其所有可能的全排列
 */

/**
  输入: [1,2,3]
  输出:
  [
    [1,2,3],
    [1,3,2],
    [2,1,3],
    [2,3,1],
    [3,1,2],
    [3,2,1]
  ]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const length = nums.length
  const result = []
  
  if (length === 0) return null
  
  const print = (pendingNums, leftNums) => {
    const leftLength = leftNums.length
    
    if (leftLength === 0) {
      result.push(pendingNums)
      return
    }
    
    for (let i = 0; i < leftLength; i++) {
      const newPendingNums = [...pendingNums, leftNums[i]]
      const newLeftNums = leftNums.filter((num, index) => index !== i )
      print(newPendingNums, newLeftNums)
    }
  }
  
  print([], nums)
  return result
};