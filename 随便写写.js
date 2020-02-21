/* 寻找数组的最大深度 */

/* 递归实现 */
const getDeepestNum = (arr) => {
  /* max(arr) = max(max(arr1) + 1, max(arr2) + 1, ...)*/
  const getMax = (arr) => {
    if (!(arr instanceof Array)) {
      return 0
    }

    /* 如果是数组，那至少一层 */
    let max = 1
    arr.forEach(a => {
      const _max = getMax(a) + 1
      if (_max > 0) {
        max = _max
      }
    })
    return max
  }

  return getMax(arr)
}

/* 迭代法 */
const getDeepestNum = (arr) => {
  let queue = []
  let nextQueue = []
  let max = 0

  if (!(arr instanceof Array)) return max

  arr.forEach(child => { 
    if (child instanceof Array) queue.push(child)
  })

  while (queue.length > 0) {
    const childArr = queue.shift()
    childArr.forEach(child => { 
      if (child instanceof Array) nextQueue.push(child)
    })
    if (queue.length === 0) {
      max++
      queue = nextQueue
      nextQueue = []
    }
  }

  return max + 1
}

/* 扁平化 */
const allFlat = (arr) => {
  if (!(arr instanceof Array)) throw new Error('only accept an array')

  const length = arr.length
  for (let i = 0; i < length; i++) {
    if (arr[i] instanceof Array) {
      arr[i] = flat(arr[i])
    }
  }
  return arr.reduce((result, a) => {
    if (a instanceof Array) {
      result.push(...flat(a))
    } else {
      result.push(a)
    }
    return result
  }, [])
}