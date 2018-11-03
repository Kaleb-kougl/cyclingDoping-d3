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

    const PADDING = 20;
    const HEIGHT = 500;
    const WIDTH = 840;

    // Determine axis scales
    const Y_MAX = d3.max(dataset, (d) => d['Seconds']);
    const Y_MIN = d3.min(dataset, (d) => d['Seconds']);
    const Y_SCALE = d3.scaleLinear()
                      .domain([Y_MIN, Y_MAX])
                      .range([PADDING, (HEIGHT - PADDING)]);
    const Y_AXIS = d3.axisLeft(Y_SCALE);
    const X_MAX = d3.max(dataset, (d) => d['Year']);
    const X_MIN = d3.min(dataset, (d) => d['Year']);
    const X_SCALE = d3.scaleLinear()
                      .domain([X_MIN, X_MAX])
                      .range([(PADDING + PADDING), (WIDTH - PADDING)]);
    const X_AXIS = d3.axisBottom(X_SCALE);

    let tempDate = new Date(dataset[1]['Time']);
    let format = d3.timeFormat("%M:%S");
    // console.log(format(new Date(dataset[1]['Time'])));
    console.log(tempDate);
    // console.log(new Date());
    let date = new Date();
    console.log(date);
    console.log(dataset[1]['Time']);

    let reg_split_time = /:/;
    let array = dataset[1]['Time'].split(reg_split_time);
    console.log(array);

    date.setMinutes(parseInt(array[0]), parseInt(array[1]));
    console.log(date);

    
    // Append data svg to html
    let svg = d3.select('div')
                .append('svg')
                .attr('id', 'svg')
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
       .attr('cx', (d, i) => X_SCALE(d['Year']))
       .attr('cy', (d, i) => Y_SCALE(d['Seconds']))
       .attr('r', 8)
       .attr('fill', 'red');

    svg.append('g')
       .attr('transform', 'translate(' + (PADDING + PADDING) + ', 0)')
       .attr('id', 'y-axis')
       .call(Y_AXIS);

    svg.append('g')
       .attr('transform', 'translate(0,' + (HEIGHT - PADDING) + ')')
       .attr('id', 'x-axis')
       .call(X_AXIS);
}
