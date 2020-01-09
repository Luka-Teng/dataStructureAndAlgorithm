/**
 * 寻找一个字符串数组的最长公共前缀
 * ["flower","flow","flight"]
 * 输出：'fl'
 * 地址：https://leetcode-cn.com/problems/longest-common-prefix/solution/zui-chang-gong-gong-qian-zhui-by-leetcode/
 */

/**
 * @param {string[]} strs
 * @return {string}
 */

 /* 暴力法，每一列都进行比较 */
var longestCommonPrefix1 = function(strs) {
  let prefix = ''
  let currIndex = 0
  const length = strs.length

  if (length === 0) return ''
  if (length === 1) return strs[0]

  while (true) {
    const firstElement = strs[0][currIndex]
    for (let i = 1; i < strs.length; i++) {
      if (
        currIndex > strs[i].length - 1
        || strs[i][currIndex] !== firstElement
      ) {
        return prefix
      }
    }
    prefix += firstElement
    currIndex++
  }
}

/** 
 * lcp(s1, s2, s3) = lcp(lcp(s1, s2), s3)
 */
var longestCommonPrefix2 = (strs) => {
  let prefix = strs[0]
  const length = strs.length

  if (length === 0) return ''
  if (length === 1) return strs[0]

  const findCommonPrefix = (str1, str2) => {
    let prefix = ''
    const length = str1.length > str2.length ? str2.length : str1.length

    for (let i = 0; i < length; i++) {
      if (str1[i] !== str2[i]) {
        return prefix
      }
      prefix += str1[i]
    }

    return prefix
  }

  for (let i = 1; i < length; i++) {
    if (prefix.length === 0) {
      return ''
    }
    prefix = findCommonPrefix(prefix, strs[i])
  }

  return prefix
}

/** 
 * 归并算法
 * 时间复杂度还是一样O(m * n)，还额外产生了空间
 */
var longestCommonPrefix3 = function(strs) {
  const length = strs.length

  if (length === 0) return ''
  if (length === 1) return strs[0]

  const findCommonPrefix = (str1, str2) => {
    let prefix = ''
    const length = str1.length > str2.length ? str2.length : str1.length

    for (let i = 0; i < length; i++) {
      if (str1[i] !== str2[i]) {
        return prefix
      }
      prefix += str1[i]
    }

    return prefix
  }

  /** 
   * lcs(0 - n) = lcs(0 - 1/2n) + lcs(1/2n - n)
   */
  const lcs = (start, end) => {
    if (end === start) return strs[start]

    if (end - start === 1) return findCommonPrefix(strs[end], strs[start])

    const mid = start + Math.floor((end - start) / 2)

    return findCommonPrefix(lcs(start, mid), lcs(mid + 1, end))
  }

  return lcs(0, length - 1)
}

/** 
 * 二分算法
 * 不断的对第一个字符串做二分拆分，进行比较
 * 拆分的两对子字符串a[1], a[2]
 * 然后让a[1]，去匹配剩余的字符串，如果不成功，a[1]在二分
 * 如果成功，对a[2]进行拆分再进行检查
 * 详细直接看leetcode
 */