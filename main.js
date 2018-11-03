const HTTP = new XMLHttpRequest();
const URL = ("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
HTTP.open("GET", URL);
HTTP.send();

let datasetJSON;

HTTP.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        dataset = JSON.parse(HTTP.responseText);
        console.log(dataset);
        // dataset = datasetJSON["data"];
        d3Commands();
    } else {
        console.log("something went wrong");
    }
}

function d3Commands() {

    const PADDING = 40;
    const HEIGHT = 500;
    const WIDTH = 800;

    // Determine axis scales
    const Y_MAX = d3.max(dataset, (d) => d['Seconds']);
    const Y_MIN = d3.min(dataset, (d) => d['Seconds']);
    const Y_SCALE = d3.scaleLinear()
                      .domain([Y_MIN, Y_MAX])
                      .range([0, HEIGHT]);
    const X_MAX = d3.max(dataset, (d) => d['Year']);
    const X_MIN = d3.min(dataset, (d) => d['Year']);
    console.log(X_MIN);
    // const X_SCALE;

    // console.log('hello');
    let svg = d3.select('div')
                .append('svg')
                .attr('width', WIDTH)
                .attr('height', HEIGHT);

    svg.append('text')
       .attr('x', WIDTH / 2)
       .attr('y', PADDING)
       .attr('font-size', 24)
       .attr('text-anchor', 'center')
       .attr('id', 'title')
       .attr('text-decoration', 'underline')
       .text('Doping in Professional Bicycle Racing');

    svg.selectAll('circle')
       .data(dataset)
       .enter()
       .append('circle')
       .attr('cx', 50)
       .attr('cy', (d, i) => Y_SCALE(d['Seconds']))
       .attr('r', 10)
       .attr('fill', 'red');
}
