/**
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）
 */

/**
  输入: nums = [1,2,3]
  输出:
  [
    [3],
    [1],
    [2],
    [1,2,3],
    [1,3],
    [2,3],
    [1,2],
    []
  ]
 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
/**
 * pendingNums: 已经加载的nums
 * next:下一位
 */
var subsets = function(nums) {
  const result = []
  const length = nums.length
  
  if (length <= 0) return null
  
  const browser = (pendingNums, next) => {
    result.push(pendingNums)
    
    if (next <= length) {
      for (let i = next; i < length; i++) {
        browser([...pendingNums, nums[i]], i + 1)
      }
    }
  }
  
  browser([], 0)
  
  return result
};