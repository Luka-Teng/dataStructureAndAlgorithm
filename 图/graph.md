### 图

有向图：边是包含具体方向的

无向图：边是不包含具体方向的

#### 无向图

```javascript
/* 简单的邻接图 */
class Graph {
  constructor (count) {
    this.count = count
    this.adj = []
    for (let i = 0; i < count; i++) {
      this.adj[i] = []
    }
  }

  addEdge (s, t) {
    if (!this.adj[s] || !this.adj[s]) {
      console.error('out of boundary')
      return
    }
    this.adj[s].push(t)
    this.adj[t].push(s)
  }
}

/* 初始化图 */
const graph = new Graph(8)
graph.addEdge(0, 1)
graph.addEdge(0, 3)
graph.addEdge(1, 2)
graph.addEdge(1, 4)
graph.addEdge(3, 4)
graph.addEdge(2, 5)
graph.addEdge(4, 5)
graph.addEdge(4, 6)
graph.addEdge(5, 7)
graph.addEdge(6, 7)

const print = (route, t) => {
  const path = [t]
  p = route[t]
  while (p !== undefined) {
    path.unshift(p)
    p = route[p]
  }

  console.log(path.join('->'))
}

/**
 * 广度遍历搜索
 * E = edge  v = vector
 * 时间复杂度O(E), 就是不断从边扩散
 * 可以找到次数最少的路径
 */
function bfs (graph, s, t) {
  let stacks = []
  const visited = []
  const route = []

  visited[s] = 1
  stacks.push(s)
  if (s === t) {
    stacks.shift()
    route[s] = t
  }

  if (!graph.adj[s]) {
    throw Error('the source is not valid in the graph')
  }
   
  while (stacks.length > 0) {
    const v = stacks.shift()

    if (!graph.adj[v]) return

    const adjs = graph.adj[v]

    for (let _v of adjs) {
      if (visited[_v] === 1) continue
      route[_v] = v
      if (_v === t) {
        return print(route, t)
      }
      visited[_v] = 1
      stacks.push(_v)
    }
  }
}

/* 深度遍历搜索 时间复杂度也是O(E)*/
function dfs (graph, s, t) {
  const visited = []
  const route = []
  let found = false

  visited[s] = 1

  const dfsSearch = (s, t) => {
    const adjs = graph.adj[s]

    if (!adjs) return

    visited[s] = 1

    if (s === t) {  
      found = true
      return
    }

    for (let v of adjs) {
      if (visited[v] !== 1 && !found) {
        route[v] = s
        dfsSearch(v, t)
      }
    }
  }

  dfsSearch(s, t)

  print(route, t)
}
```