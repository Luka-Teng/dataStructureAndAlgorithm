/**
  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

  问总共有多少条不同的路径？
 */

/**
 * 典型可以分离出状态的题目
 * dp(i, j) = dp(i - 1, j) + dp(i, j - 1)
 */

/**
 * 基于动态规划 + 备忘录 从上至下
 */
var uniquePaths = function(m, n) {
  const note = {}
  const dp = (i, j) => {
    const noteName = i + '&' + j
    let result = null
    
    // 访问过得点直接提取缓存
    if (note[noteName]) return note[noteName] 
    
    if (i > 0 && j > 0) {
      // 不在边界上
      result = dp(i - 1, j) + dp(i, j - 1)
    } else {
      // 在边界上
      result = 1
    }
    
    note[noteName] = result
    return result
  }
  
  return dp(m - 1, n - 1)
};

/**
 * 基于动态规划 + 动态规划表 从下至上
 */
var uniquePaths = function(m, n) {
  // 初始化状态二维表
  const dpTable = new Array(m).fill(new Array(n).fill(1))
  
  // 纵向遍历
  for (let i = 0; i < dpTable.length; i++) {
    for (let j = 0; j < dpTable[i].length; j++) {
      if (i > 0 && j > 0) {
        dpTable[i][j] = dpTable[i - 1][j] + dpTable[i][j - 1]
      } else {
        dpTable[i][j] = 1
      }
    }
  }
  
  return dpTable[m - 1][n - 1]
};