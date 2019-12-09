#### 分治算法

将一个任务分解成数个小任务，任务时间互不关联，这是分治和动态规划最大的区别。

##### 计算一个数组的逆序度

思路：

1. 每个元素遍历一次比较，时间复杂度O(n^2)

2. 归并算法实际上就是使用了分治算法，我们可以在归并合并的时候去计算逆序给度，并返回，时间复杂度O(nlogn)。

```js
/**
 * countInner(1 ~ n) = countInner(1 ~ n/2) + countInner(n/2 ~ n)
 * countInner返回的是排序好的数组和排序的得出的逆序度
 */
function count (arr) {
  if (arr.length === 0 || arr.length === 1) return 0

  const [_arr, num] = countInner(arr, 0, arr.length - 1)

  return num
}

function countInner (arr, start, end) {
  /* 如果只留下一个元素，直接返回该元素，并且返回逆序为0 */
  if (end === start) return [[arr[start]], 0]

  const mid = Math.floor((end + start) / 2)
  const [left, num1] = countInner(arr, start, mid)
  const [right, num2] = countInner(arr, mid + 1, end)

  return mergeAndCount(left, right, num1 + num2)
}

function mergeAndCount (left, right, acc = 0) {
  let num = 0
  const newArr = []

  let leftPointer = 0
  let rightPointer = 0

  while ((leftPointer < left.length) && (rightPointer < right.length)) {
    if (left[leftPointer] <= right[rightPointer]) {
      newArr.push(left[leftPointer])
      leftPointer++
    } else {
      newArr.push(right[rightPointer])
      rightPointer++
      num += (left.length - leftPointer)
    }
  }

  newArr.push(
    ...left.splice(leftPointer, left.length - leftPointer),
    ...right.splice(rightPointer, right.length - rightPointer)
  )

  num += (left.length - leftPointer)

  return [newArr, num + acc]
}
```