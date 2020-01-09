/**
 * sunday算法
 * 地址：https://leetcode-cn.com/problems/implement-strstr/solution/python3-sundayjie-fa-9996-by-tes/
 * 主要的算法思想还是：预处理匹配串 + 快进
 * 主串: abcebcabc
 * 模式串: cab
 * 模式串快进表: c: 3, a: 2, b: 1
 * 1. 主串abc 匹配 模式串cba，失败
 * 2. 主串下一位e 查找模式串表，为空
 * 3. 模式串快进4（模式串长度）
 * 4. 主串bca 匹配 模式串cba，失败
 * 5. 主串下一位b 查找模式串表，为1
 * 6. 模式串快进1
 * 7. 主串cab 匹配 模式串cab，成功
 * 重算法难度而言，会比KMP,BM算法好理解多了
 */
var strStr2 = function(haystack, needle) {
  const haystackLength = haystack.length
  const needleLength = needle.length

  if (needleLength === 0) return 0
  if (haystackLength === 0) return -1

  /* 匹配表的创建 */
  const searchMap = {}
  for (let i = needleLength - 1; i >= 0; i--) {
    if (searchMap[needle[i]] === undefined) {
      searchMap[needle[i]] = needleLength - i
    }
  }

  let matchPoint = 0
  while (matchPoint <= haystackLength - needleLength) {
    let isAllMatch = true
    for (let i = 0; i < needleLength; i++) {
      /**
       * 如果匹配失败，主串下一个字符查找匹配表
       * 如果找到，模式串移动相应步数
       * 否则移动needleLength + 1步
       */
      if (haystack[matchPoint + i] !== needle[i]) {
        isAllMatch = false
        const fast = searchMap[haystack[matchPoint + needleLength]] || (needleLength + 1)
        matchPoint += fast
        break
      }
    }

    if (isAllMatch) return matchPoint
  }

  return -1
}