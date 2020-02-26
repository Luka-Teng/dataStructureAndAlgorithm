/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/coin-change/solution/ling-qian-dui-huan-by-leetcode/
   给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

   示例 1:

   输入: coins = [1, 2, 5], amount = 11
   输出: 3 
   解释: 11 = 5 + 5 + 1
   示例 2:

   输入: coins = [2], amount = 3
   输出: -1
   说明:
   你可以认为每种硬币的数量是无限的。
 */

 /**
 * 假设取了n次数
 * 列举出每次可能产生的和，知道出现符合的值
 * 优化点：
 * 1. 重复出现的值跳过
 * 2. 大于总数的跳过
 */
var coinChange = function(coins, amount) {
  const isVisited = {}
  const length = coins.length
  let times = 1
  let currentAmountArr = []
  
  if (length <= 0) return -1
  
  if (amount === 0) return 0
  
  // 先进行排序
  coins = coins.sort((a, b) =>  a > b ? 1 : -1)
  
  // 初始化
  for (let i = 0; i < length; i++) {
    if (coins[i] < amount) {
      currentAmountArr.push(coins[i])
      isVisited[coins[i]] = true
    } else if (coins[i] === amount) {
      return 1
    }
  }
  
  while (true) {
    const tempAmountArr = []
    for (let i = 0; i < currentAmountArr.length; i++) {
      for (let j = 0; j < length; j++) {
        const currentAmount = currentAmountArr[i] + coins[j]
        if (currentAmount === amount) return times + 1
        
        if (currentAmount > amount) break
        
        if (isVisited[currentAmount]) continue
        
        isVisited[currentAmount] = true
        tempAmountArr.push(currentAmount)
      }
    }
    
    if (tempAmountArr.length > 0) {
      times++
      currentAmountArr = tempAmountArr
    } else {
      return -1
    }
  }
  
  return times
}