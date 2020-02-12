/**
 * 本题的leetcode的解题思路：
 * https://leetcode-cn.com/problems/number-of-islands/solution/dao-yu-shu-liang-by-leetcode/
 * 
 * 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。
 * 一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。
 * 示例 1:
    输入:
    11110
    11010
    11000
    00000
    输出: 1

 * 示例 2:
    输入:
    11000
    11000
    00100
    00011
    输出: 3
 */

/**
 * 解题思路
 * 利用一个二维数组connected来记录被连接的岛屿
 * 遇到的第一个1开始，进行深度遍历，并标注，遇到零则停止
 * 时间复杂度O(n), 空间复杂度O(n), n为总岛屿数
 */
var numIslands = function(grid) {
  let nums = 0
  let connected = {}
  const height = grid.length
  
  if (height === 0) return 0
  
  const width = grid[0].length
  
  /**
   * 从一个节点开始，进行岛屿的扩散
   * 从上下左右四个方向扩散
   * 如果遇到已扩散过得，直接跳过
   */
  const spread = (i, j) => {    
    connected[i + '&' + j] = true
    
    if ((j + 1 < width) && !connected[i + '&' + (j + 1)] && grid[i][j + 1] === '1') spread(i, j + 1)
    if ((j - 1 >= 0) && !connected[i + '&' + (j - 1)] && grid[i][j - 1] === '1') spread(i, j - 1)
    if ((i + 1) < height && !connected[(i + 1) + '&' + j] && grid[i + 1][j] === '1') spread(i + 1, j)
    if ((i - 1 >= 0) && !connected[(i - 1) + '&' + j] && grid[i - 1][j] === '1') spread(i - 1, j)
  }
  
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // 如果已经被连接，或者是水遍历下一个
      if (connected[i + '&' + j] || grid[i][j] === '0') {
        continue
      }

      // 这是一个岛屿的初始点
      nums++
      spread(i, j)
    }
  }
  
  return nums
}

/* 方法二，利用广度遍历去遍历，只是遍历方式上的区别，这边不做实现 */