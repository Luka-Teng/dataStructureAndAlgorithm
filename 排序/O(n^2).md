### 冒泡排序

```typescript
function bubbleSort (arr: number[]): void {
  const length = arr.length

  if (length <= 1) return

  for (let i = length - 2; i >= 0; i--) {
    let flag = true
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    if (flag) return
  }
}

/**
 * 复杂度分析
 * 可以按照有序度来分析
 * 最坏的情况下要交换n*(n-1)/2次，最好n-1次， 平均O(n^2)
 */
```

### 插入排序

```typescript
function insertSort (arr: number[]) {
  const length = arr.length

  if (length <= 1) return

  for (let i = 1; i < length; i++) {
    const value = arr[i]
    let j = i - 1

    for (; j >= 0; j--) {
      if (value >= arr[j]) {
        break
      }
      arr[j + 1] = arr[j]
    }

    a[j + 1] = value
  }
}

/**
 * 最坏的情况下要交换n*(n-1)/2次，最好n-1次， 平均O(n^2)
 */
```

### 选择排序

```typescript
function selectionSort (arr: number[]) {
  const length = arr.length

  if (length <= 1) return

  for (let i = 0; i < length - 1; i++) {
    let min = i
    for (let j = i; j < length - 1; j++) {
      if (arr[min] > arr[j + 1]) {
        min = j + 1
      }
    }

    let temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
  }
}


/**
 * 最坏的情况下要交换n*(n-1)/2次，最好也是n*(n-1)/2次， 平均O(n^2)
 */
```



