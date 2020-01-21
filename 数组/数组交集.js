/**
 * 求两数组的交集
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出: [2,2]
 * 
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出: [4,9]
 * 
 * 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
 * 我们可以不考虑输出结果的顺序
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

/** 
 * 暴力法，遍历n*m次，并跳过被picked的数字
 * 时间复杂度O(n*m)
 */
var intersect = function(nums1, nums2) {
  const length1 = nums1.length
  const length2 = nums2.length
  const intersectArr = []
  const picked = []
  
  if (length1 === 0 || length2 === 0) return intersectArr

  for (let i = 0; i < length1; i++) {
    for (let j = 0; j < length2; j++) {
      if (picked[j] === true) continue

      if (nums1[i] === nums2[j]) {
        picked[j] = true
        intersectArr.push(nums2[j])
        break
      }
    }
  }

  return intersectArr
}

/** 
 * hash-table存储较短的nums的数字出现次数
 * 遍历keys少的那个hash-table，来算出重复数字的个数
 * 时间复杂度O(m + n)
 * 空间复杂度O(min(m, n))
 */
var intersect = function(nums1, nums2) {
  const length1 = nums1.length
  const length2 = nums2.length
  const intersectArr = []
  
  if (length1 === 0 || length2 === 0) return intersectArr

  const table = {}
  const mapNums = length1 > length2 ? nums2 : nums1
  const calNums = length1 > length2 ? nums1 : nums2

  for (let i = 0; i < mapNums.length; i++) {
    if (table[mapNums[i]] === undefined) {
      table[mapNums[i]] = 1
    } else {
      table[mapNums[i]] += 1
    }
  }

  for (let j = 0; j < calNums.length; j++) {
    if (table[mapNums[j]] === undefined || table[mapNums[j]] === 0) {
      continue
    } else {
      table[mapNums[j]] -= 1
      intersectArr.push(mapNums[j])
    }
  }

  return intersectArr
}

/**
 * 先排序，在用类似归并排序的排序方法进行双指针比对
 * 时间复杂度O(nlogn + mlogm)
 * 空间复杂度O(1)，不计算必须返回的这个数组
 * 比较简单，不作实现 
 */
