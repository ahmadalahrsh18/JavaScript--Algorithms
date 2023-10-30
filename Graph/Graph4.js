// Dijkstra’s Shortest Path – Algorithm 

class Vertex {
    constructor(name) {
        this.name = name;
        this.visited = false;
        this.totalLength = 0;
        this.sourceOfTotalLength = null;
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

    addEdges(vertexIndex, targets, weights) {
        this.vertices[vertexIndex].vertexLinks = targets.map((targetIndex, index) => {
            return new Edge(this.vertices[vertexIndex], this.vertices[targetIndex], weights[index]);
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

    dijkstra() {
        console.log("Dijkstra From Graph Class");
        for (let i = 1; i < this.vertices.length; i++) {
            this.vertices[i].totalLength = Number.POSITIVE_INFINITY;
        }

        for (let i = 0; i < this.vertices.length; i++) {
            const currentVertex = this.vertices[i];
            const destinations = currentVertex.vertexLinks;

            if (destinations === null) continue;

            for (let j = 0; j < destinations.length; j++) {
                const currentEdge = destinations[j];
                const newLength = currentVertex.totalLength + currentEdge.weight;
                if (newLength < currentEdge.target.totalLength) {
                    currentEdge.target.totalLength = newLength;
                    currentEdge.target.sourceOfTotalLength = currentVertex;
                }
            }
        }

        let path = this.vertices[this.vertices.length - 1].name;
        let v = this.vertices[this.vertices.length - 1];
        while (v.sourceOfTotalLength !== null) {
            path = v.sourceOfTotalLength.name + " - " + path;
            v = v.sourceOfTotalLength;
        }
        console.log(this.vertices[this.vertices.length - 1].totalLength);
        console.log(path);

        this.restoreVertices();
    }

    restoreVertices() {
        this.vertices.forEach(vertex => {
            vertex.visited = false;
            vertex.totalLength = 0;
            vertex.sourceOfTotalLength = null;
        });
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
}

const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const g = new Graph(names);
g.addEdges(0, [1, 2, 3], [2, 4, 3]);

g.addEdges(1, [4, 5, 6], [7, 4, 6]);
g.addEdges(2, [4, 5, 6], [3, 2, 4]);
g.addEdges(3, [4, 5, 6], [4, 1, 5]);

g.addEdges(4, [7, 8], [1, 4]);
g.addEdges(5, [7, 8], [6, 3]);
g.addEdges(6, [7, 8], [3, 3]);

g.addEdges(7, [9], [3]);
g.addEdges(8, [9], [4]);

g.dijkstra();
