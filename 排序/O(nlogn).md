### 归并排序

```typescript
function mergeSort (arr) {
  const length = arr.length

  if (length <= 1) return

  const mid = Math.floor(length / 2)

  arr.splice(0, arr.length, ...merge(arr.slice(0, mid), arr.slice(mid, length)))
}

function merge (arr1, arr2) {
  if (arr1.length > 1) {
    const mid = Math.floor(arr1.length / 2)
    arr1 = merge(arr1.slice(0, mid), arr1.slice(mid, arr1.length))
  }

  if (arr2.length > 1) {
    const mid = Math.floor(arr2.length / 2)
    arr2 = merge(arr2.slice(0, mid), arr2.slice(mid, arr2.length))
  }
  
  /* 两个按需数组的merge，归并操作 */
  return mergeArray(arr1, arr2)
}

function mergeArray (arr1, arr2) {
  let i = 0, j = 0
  const temp = []
  
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] === undefined) {
      temp.push(arr2[j++])
      continue
    }

    if (arr2[j] === undefined) {
      temp.push(arr1[i++])
      continue
    }

    if (arr1[i] <= arr2[j]) {
      temp.push(arr1[i++])
    } else {
      temp.push(arr2[j++])
    }
  }

  return temp
}

/**
 * 复杂度分析O(nlogn)
 * T(1) = C
 * T(n) = 2 * T(n / 2) + n, 这边的n表示mergeArray的复杂度为O(n)
 * 递推得出：T(n) = 2^k * T(n/2^k) + k * n
 * n/2^k = 1 ==> k = k=log2n
 * 代入即可得出T(n)=Cn+nlog2n
 * 故复杂度为O(nlogn)
 */
```

### 快速排序

```typescript
function quickSort (arr) {
  const length = arr.length

  if (arr.length <= 1) return

  partition(arr, 0, length - 1)
}

/* 这边的pivot为最后一个元素 */
function partition (arr, start, end) {
  let i = start, j = start

  while (j < end) {
    if (arr[j] <= arr[end]) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
    }
    j++
  }

  const temp = arr[end]
  arr[end] = arr[i]
  arr[i] = temp

  if (i - start >1) {
    partition(arr, start, i - 1)
  }

  if (end - i >1) {
    partition(arr, i + 1, end)
  }
}

/**
 * 复杂度可以利用递推公式来推断，其递推公式和归并排序一样
 * T(1) = C
 * T(n) = 2 * T(n / 2) + n, 这边的n表示partition中排序的复杂度为O(n)
 * 故复杂度为O(nlogn)
 * 极端情况：[1，2，3，4，5] 满有序度的情况，会退化为O(n^2)
 */
```