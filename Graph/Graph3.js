// Depth First Search – Algorithm


class Vertex {
    constructor(name) {
        this.name = name;
        this.visited = false;
        this.vertexLinks = [];
    }
}

class Edge {
    constructor(source, target, weight = 0) {
        this.source = source;
        this.target = target;
        this.weight = weight;
    }
}

class Graph {
    constructor(names) {
        this.lastIndex = 0;
        this.vertices = names.map(name => new Vertex(name));
    }

    addEdges(vertexIndex, targets) {
        this.vertices[vertexIndex].vertexLinks = targets.map(targetIndex => {
            return new Edge(this.vertices[vertexIndex], this.vertices[targetIndex]);
        });
    }

    bfs() {
        console.log("BFS From Graph Class");
        const v = this.vertices.length;
        const queue = [this.vertices[0]];
        this.vertices[0].visited = true;

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            const destinations = currentVertex.vertexLinks;

            for (let i = 0; i < destinations.length; i++) {
                const destination = destinations[i].target;
                if (!destination.visited) {
                    queue.push(destination);
                    destination.visited = true;
                    console.log(currentVertex.name + " - " + destination.name);
                }
            }
        }

        this.restoreVertices();
    }

    dfs() {
        console.log("DFS From Graph Class");
        this.dfsRecursion(this.vertices[0]);
        this.restoreVertices();
    }

    dfsRecursion(currentVertex) {
        currentVertex.visited = true;
        const destinations = currentVertex.vertexLinks;

        for (let i = 0; i < destinations.length; i++) {
            if (!destinations[i].target.visited) {
                console.log(currentVertex.name + " - " + destinations[i].target.name);
                this.dfsRecursion(destinations[i].target);
            }
        }
    }

    restoreVertices() {
        this.vertices.forEach(vertex => {
            vertex.visited = false;
        });
    }
}

const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const g = new Graph(names);
g.addEdges(0, [1, 2]);
g.addEdges(1, [0, 3, 4]);
g.addEdges(2, [0, 3, 5]);
g.addEdges(3, [1, 2, 4]);
g.addEdges(4, [1, 5]);
g.addEdges(5, [2, 3, 4, 7]);
g.addEdges(6, [7, 8]);
g.addEdges(7, [5, 6, 8]);
g.addEdges(8, [6, 7]);

g.bfs();
g.dfs();
