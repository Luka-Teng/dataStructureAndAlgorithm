#### 回溯算法

回溯算法最经典的使用场景就是正则表达式和图的遍历搜索，很贪心算法每次都已局部最优解来寻求全局最优不同，回溯每次失败都会会到上一个分支继续迭代

##### 八皇后

```js
/**
 * 八行八列，每行一个子，保证每个棋子垂直，水平，对角方向上都没有棋子
 * 想法：
 * 从第一行开始，依次往下摆，哪一行所有位置都不行，就返回上一行
 * 直到最后一行成功，结束，需要有结束标识符
 */
function startNQueens (n) {
  const queens = []
  let isFinished = false

  function putQueen (row) {
    for (let column = 0; column < n; column++) {
      // 如果已经结束了，直接退出
      if (isFinished) return
      if (isCheckedOk(row, column)) {
        queens[row] = column
        
        // 如果这是最后一行，直接退出
        if (row === n - 1) {
          isFinished = true
          return
        }

        putQueen(row + 1)
      }
    }
  }

  function isCheckedOk (row, column) {
    for (let i = row -1; i >=0; i--) {
      const backTimes = row - i
      if (queens[i] === column
        || queens[i] === column - backTimes
        || queens[i] === column + backTimes
      ) return false
    }
    return true
  }

  putQueen(0)
  return queens
}
```

#### 背包问题

```js
/**
 * 背包总重量maxWeight, 物品重量items = [weight1, weight2]
 * 挑选的物品不能超过maxWeight，但是物品的总重量最大
 * 使用回溯是一种不太给力的算法，算法复杂度达到O(2^n)，主要是针对每个物品只有被拿和不拿两种情况
 * 可以使用大于maxWeight进行减枝，提高效率
 */
function pickItems (maxWeight, items) {
  let maxProcess = []
  let currentProcess = []
  const length = items.length
  let max = 0
  let lastIndex = 0
  
  function pickItem (currentIndex, preMount) {
    // 如果之前的总值大于最大值，直接打断后续递归
    if (preMount > maxWeight) return

    // 如果超过items的最大数量，直接返回
    if (currentIndex > length) return

    // 如果当前总和大于最大值，替换最大值，替换路径，标识最大节点
    if (max < preMount) {
      max = preMount
      maxProcess = [...currentProcess]
      lastIndex = currentIndex - 1
    }

    // 取物品
    currentProcess[currentIndex] = true
    pickItem(currentIndex + 1, preMount + items[currentIndex])

    // 不取物品
    currentProcess[currentIndex] = false
    pickItem(currentIndex + 1, preMount)
  }

  pickItem(0, 0)

  maxProcess = maxProcess.reduce((a, b, i) => {
    if (i > lastIndex) return a
    if (b === true) a.push(i)
    return a
  }, [])

  return [max, maxProcess]
}
```

#### 正则表达式，通配符*

```js
/**
 * 这边只做普通字符和通配符*, +, ?的匹配
 * 思路：
 * 双指针，指向匹配字符str和正则pattern
 * 普通字符：直接匹配是否相等，相等指针各自向后移动一位，否则返回错误
 * 通配符*，后面所有匹配成功的k位，每一位都可以的产生匹配成功和匹配不成功的情况，从这也可以看出，回溯就是枚举所有情况，并用减枝去做情况裁剪
 */
function match (str, pattern) {
  // 判断是否匹配成功，也用于减枝
  let isMatched = false

  // 匹配字符串的指针
  let si = 0

  // 正则表达式的指针
  let pi = 0

  // 判断是否是+匹配的第一个字符
  let metFirstPlus = true

  function patternMatch(si, pi) {
    // 减枝
    if (isMatched) return

    // 正则匹配到结尾，正确
    if (pi >= pattern.length) {
      isMatched = true
      return
    }

    // 文本匹配完了，失败返回
    if (
      si >= str.length
      && pattern[pi + 1] !== '*'
      && pattern[pi + 1] !== '?'
    ) return

    if (pattern[pi] === '*' || pattern[pi] === '+' || pattern[pi] === '?') {
      throw new Error('*, + or ? is not allowed in the head or repeated')
    } else if (pattern[pi + 1] === '*') {
      // 如果字符串匹配完，正则进入下一位
      if (str[si] === undefined) {
        patternMatch(si, pi + 2)
        return
      }

      // 如果当前字符相等，则再用*匹配字符串下一位
      if (pattern[pi] === str[si]) patternMatch(si + 1, pi)

      // 不匹配的分支
      patternMatch(si + 1, pi + 2)

    } else if (pattern[pi + 1] === '?') {

      // 如果字符串匹配完，正则进入下一位
      if (str[si] === undefined) {
        patternMatch(si, pi + 2)
        return
      }

      // 如果当前字符相等，字符串和正则都进入下一位匹配
      if (pattern[pi] === str[si]) patternMatch(si + 1, pi + 2)

      // 不匹配的分支
      patternMatch(si, pi + 2)

    } else if (pattern[pi + 1] === '+') {

      if (metFirstPlus && pattern[pi] !== str[si]) return

      if (pattern[pi] === str[si]) {
        metFirstPlus = false
        patternMatch(si + 1, pi)
      }

      metFirstPlus = true
      patternMatch(si + 1, pi + 2)

    } else {

      // 匹配普通字符
      if (pattern[pi] === str[si]) patternMatch(si + 1, pi + 1)

    }

    return
  }

  patternMatch(0, 0)

  return isMatched
}
```

对于回溯的理解，回溯本身理解是很简单，本质上就是枚举分支，列出所有可能存在的分支，并用裁剪技巧进行优化。
