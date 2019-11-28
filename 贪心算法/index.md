#### 贪心算法

贪心算法在存在一个期望值和一个限制值，其目的就是在限制之内保证期望值最高

贪心算法不好去描述，多做练习去理解

贪心算法和动态规划最大的区别感觉是，动态规划是去寻找全局最优解，而贪心是通过局部最优解法去寻找全局最优解，当然很多时候是不行的，相对于动态规划，贪心算法不会去做回溯

##### 区间覆盖

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

```
输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

```javascript
/**
 * 解题中的第一中解决方案，暴力递归，虽然时间复杂度很高但是比价锻炼逻辑
 * 其解题思路是
 * 1. 先排序
 * 2. min = min(noTaken(next, next + 1), taken(prev, next + 1) + 1)
 * 3. 一个区间如果和上一个重叠，则一定要被拿走, 递归taken
 * 4. 一个区间如果不重叠，则可拿可不拿
 * 5. 这个方法就是递归出所有情况
 */

/**
 * 动态规划
 * intervals事先进行小到大排序，保证不重叠区内，越靠后对应的intervals下标越大
 * max[i]记录的是前i个区间的最大不重叠数
 * max[i + 1]的判断如下
 * 1. intervals[i + 1]不和intervals[i]重叠，则max[i + 1] = max[i] + 1
 * 2. intervals[i + 1]和intervals[i]重叠, 则去判断是否和intervals[i - 1]重叠
 * 3. 不断重重复，知道找到不重叠的那个
 */
var eraseOverlapIntervals = function(intervals) {
  if (intervals.length === 0) return 0

  intervals.sort((prev, next) => {
    if (prev[0] < next[0]) return -1
    if (prev[0] === next[0]) return prev[1] - next[1]
    return 1
  })

  const max = []
  for (let i = 0; i < intervals.length; i++) {
    if (i === 0) {
      max[0] = 1
      continue
    }
    for (let j = i - 1; j >= 0; j--) {
      // 判断是否和上面的重叠
      if (intervals[i][0] >= intervals[j][1]) {
        max[i] = max[j] + 1
        break
      }
    }
    max[i] = max[i] || max[i - 1]
  }

  return intervals.length - max[intervals.length - 1]
}

/** 
 * 贪心算法
 * 先对区间进行排序 O(nlogn)
 * 在对区间进行比较 O(n)
 * 总复杂度O(nlogn)
 * 1. prev[1] <= next[0], push
 * 2. prev[0] <= next[0] && prev[1] > next[1], replace
 * 3. prev[0] <= next[0] && prev[1] <= next[1], drop
 * 我们用prev，next指针来制定要比较的两个区间，用max来表示可拥有的最大不重叠区间
 * 其中push，replace会改变prev的指向，push会增加max数量
 */
var eraseOverlapIntervals = function(intervals) {
  const length = intervals.length

  if (length === 0) return 0

  intervals.sort((prev, next) => {
    if (prev[0] < next[0]) return -1
    if (prev[0] === next[0]) return prev[1] - next[1]
    return 1
  })

  let prev = 0, next = 1, max = 1

  while (next < length) {
    const preBlock = intervals[prev]
    const nextBlock = intervals[next]
    if (preBlock[1] <= nextBlock[0]) {
      prev = next
      max++
    } else if (preBlock[1] > nextBlock[1]) {
      prev = next
    }
    next++
  }

  return length - max
}

/**
 * 上面的算法改递归
 */
var eraseOverlapIntervals = function(intervals) {
  const length = intervals.length

  var process = function (prev, next) {
    if (next >= length) return 1

    const preBlock = intervals[prev]
    const nextBlock = intervals[next]
    if (preBlock[1] <= nextBlock[0]) {
      return process(next, next + 1) + 1
    }
    
    if (preBlock[1] > nextBlock[1]) {
      return process(next, next + 1)
    }
    return process(prev, next + 1)
  }

  if (length === 0) return 0

  intervals.sort((prev, next) => {
    if (prev[0] < next[0]) return -1
    if (prev[0] === next[0]) return prev[1] - next[1]
    return 1
  })

  let prev = 0, next = 1

  return length - process(prev, next)
}
```

##### 从一个数字中移除k位，使其剩余组成的数字最小

```js
/**
 * 两位两位比较，如果prev > next, 删除prev，再将next接着以prev之前的数字比较，_prev大就删除，直到_prev小或者_prev到顶
 * 如果prev <= next，在进行下一位比较
 * 如果匹配完还有剩余k移除尾部
 */
var removeKdigits = function(num, k) {
  num = num.split('')
  const length = num.length
  let prev = 0, next = 1

  if (length === 0) return result

  while (next < num.length && k > 0) {
    let movedNum = 0
    if (num[prev] > num[next]) {
      k--
      num.splice(prev, 1)
      next--
      prev--
      // 向前回溯
      while (k !== 0 && prev >= 0 && num[prev] > num[next]) {
        num.splice(prev, 1)
        k--
        prev--
        next--
      }
    }
    prev++
    next++
  }

  if (k > 0) {
    num.splice(num.length - k, k)
  }

  return num.join('').replace(/^0+/, '') || '0'
}
```