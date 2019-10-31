### 设计思路

> 暂时不去考虑Promise内部返回promise的情况

promise在我眼里本质上是干两件事

1. 改变自身的状态（同步或异步）
2. 与下一个promise串联，通过不同的串联器（then，catch）来决定，是否将状态下发还是将状态托管。

### rejet：

1. 改变状态为rejected
2. 回调下一个promise在reject事件中的注册的回调

### resolve：

1. 改变状态为fullfilled
2. 回调下一个promise在fullfilled事件中的注册的回调

### then

返回一个promise，该promise是与上一个promise串联的，其会向上一个promise的reject事件集合fullfilled事件集中都注册回调，reject回调仅仅是调用了自己的reject，而fullfilled则会先运行方法，再根据方法运行是否出错和值来决定是否调用自己的reject或resolve，简单来说该串联器then，本质上就是对上一个promise的reject状态进行传递，对上一个promise的fullfilled状态进行托管。

### catch

与then相反

---

```javascript
class Bromise {
  /**
   * state = 0: pending
   * state = 1: fullfilled
   * state = 2: rejected
   */
  state = 0

  value = undefined

  handlers = {
    fullfilled: [],
    rejected: []
  }

  notify = (type, data) => {
    /* 这里使用异步是为了保证回调能被正确拿到 */
    setTimeout(() => {
      if (type === 'fullfilled') {
        this.handlers.fullfilled.forEach((fn, i) => {
          fn(data)
          this.handlers.fullfilled.splice(i, 1)
        })
        return
      }

      if (type === 'rejected') {
        if (this.handlers.rejected.length === 0) throw data

        this.handlers.rejected.forEach((fn, i) => {
          fn(data)
          this.handlers.fullfilled.splice(i, 1)
        })
      }
    })
  }

  reject = (data) => {
    this.state = 2
    this.value = data
    this.notify('rejected', data)
  }

  resolve = (data) => {
    this.state = 1
    this.value = data
    this.notify('fullfilled', data)
  }

  push = (fn1, fn2) => {
    this.handlers.fullfilled.push(fn1)
    this.handlers.rejected.push(fn2)

    if (this.state === 1) {
      this.notify('fullfilled', this.value)
    }

    if (this.state === 2) {
      this.notify('rejected', this.value)
    }
  }

  then = (fn) => {
    return new Bromise((resolve, reject) => {
      this.push((data) => {
        try {
          const result = fn(data)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      }, (data) => {
        reject(data)
      })
    })
  }

  catch = (fn) => {
    return new Bromise((resolve, reject) => {
      this.push((data) => {
        resolve(data)
      }, (data) => {
        try {
          const result = fn(data)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  constructor (fn) {
    try {
      fn(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
}
```