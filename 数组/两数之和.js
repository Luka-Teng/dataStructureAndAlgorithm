/**
 * 两数之和
 * 给定 nums = [2, 7, 11, 15], target = 9

 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]应与元素在两个数组中出现的次数一致。
 * 我们可以不考虑输出结果的顺序
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/**
 * 第一种方法
 * 暴力法，遍历所有组合，找到和为9的两个数
 * 时间复杂度O(n^2)，空间复杂度O(1)
 * 实现比较简单，不做实现
 */

/**
 * 第二种方法
 * 基于第二种方法，去掉之前出现过的数字
 */
var twoSum1 = function(nums, target) {
  const length = nums.length
  
  if (length === 0 || length === 1) return null
  
  const passedNum = {}
  
  for (let i = 0; i < length; i++) {
    if (passedNum[nums[i]]) continue
    
    for (let j = i + 1; j < length; j++) {
      if (nums[i] + nums[j] === target) return [i, j]
    }
    
    passedNum[nums[i]] === true
  }
  
  return null
};

/**
 * 第三种方法
 * 基于hash table映射
 * 遍历两边，一遍创建hash table， 一遍查找
 * 时间复杂度 O(n) 
 * 空间复杂度 O(n)
 */
var twoSum2 = function(nums, target) {
  const length = nums.length
  
  if (length === 0 || length === 1) return null
  
  const table = {}
  
  for (let i = 0; i < length; i++) {
    const num = nums[i]
    if (table[num] === undefined) {
      table[num] = [] 
    }
    
    table[num].push(i)
  }
  
  for (let i = 0; i < length; i++) {
    const num = nums[i]
    const matchNum = target - num
    
    const matchIndex = table[matchNum]
    
    if (matchIndex) {
      if (num === matchNum) {
        if (matchIndex[1]) return [i, matchIndex[1]]
      } else {
        return [i, matchIndex[0]]
      }
    }
  }
  
  return null
};

/**
 * 第四种方法
 * 基于第三种方法，边创建hash边查找，只需要遍历一次
 */
var twoSum3 = function(nums, target) {
  const length = nums.length
  
  if (length === 0 || length === 1) return null
  
  const table = {}
  
  for (let i = 0; i < length; i++) {
    const num = nums[i]
    
    /* 查找 */
    const matchNum = target - num
    const matchIndex = table[matchNum]
    if (matchIndex !== undefined) {
      return [i, matchIndex]
    }
    
    /* hash创建 */
    if (table[num] === undefined) {
      table[num] = i
    }

  }
  
  return null
};