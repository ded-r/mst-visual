let actualVertexId = -1;
let actualGraph = 0;


var executeAlgorithm = function (graph, opt) {
    switch (opt) {
        case "1" :
            executeKruskal(graph);
            break
        case "2":
            executeDijkstra(graph);
            break;
        case "3":
            executePrim(graph);
            break
    }
};

let executeKruskal = function (graph) {
    actualGraph = graph;
    let result = kruskal(graph);

    for (let i = 0; i < graph.directedEdges.length; i++) {
        graph.directedEdges[i].fill = '#DCDCDC';
        graph.directedEdges[i].fillText = '#DCDCDC';
    }
    updateEdges(result, 0);
}

let updateEdges = function (result, i) {
    actualGraph.update();

    let edge = result[i];
    edge.start.fill = '#D14836';
    edge.end.fill = '#D14836';
    edge.fill = '#D14836';
    edge.fillText = 'black';

    inversedEdge = actualGraph.searchDirectedEdge(edge.end, edge.start);
    if (inversedEdge != null) {
        inversedEdge.start.fill = '#D14836';
        inversedEdge.end.fill = '#D14836';
        inversedEdge.fill = '#D14836';
        inversedEdge.fillText = 'black';
    }

    count = i;
    results = result;

    if (i !== result.length) {
        setTimeout("updateEdges(results, count+1)", 1000)
    }
}

let kruskal = function (graph) {

    let queue = PriorityQueue({low: true});
    let n = graph.vertices.length;
    let acm = [];
    let l = new Array(graph.vertices.length);

    for (let i = 0; i < l.length; i++) {

        l[i] = [];
        l[i].push(i); // An array containing arrays with the index value of each array...
    }

    // Adding the edges to the queue...
    for (let i = 0; i < graph.directedEdges.length; i++) {
        queue.push(graph.directedEdges[i], graph.directedEdges[i].value);
    }

    while (acm.length < n - 1 && !queue.empty()) {

        let edge = queue.pop();

        let acm1 = kruskal_Find(edge.start.id - 1, l);
        let acm2 = kruskal_Find(edge.end.id - 1, l);

        if (acm1 !== acm2) {
            kruskal_Merge(acm1, acm2, l);
            acm.push(edge);
        }

    }

    return acm;
}

let kruskal_Find = function (idVertice, l) {
    for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[i].length; j++) {
            if (l[i][j] === idVertice) return i;
        }
    }
}

let kruskal_Merge = function (acm1, acm2, l) {
    while (l[acm2].length !== 0) {
        l[acm1].push(l[acm2].pop())
    }
}
