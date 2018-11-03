const HTTP = new XMLHttpRequest();
const URL = ("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
HTTP.open("GET", URL);
HTTP.send();

let datasetJSON;

HTTP.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        dataset = JSON.parse(HTTP.responseText);
        // console.log(dataset);
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
    const X_MAX = d3.max(dataset, (d) => d['Year']);
    const X_MIN = d3.min(dataset, (d) => d['Year']);

    const TIME_FORMAT = d3.timeFormat("%M:%S");
    const REGEX_SPLIT_TIME = /:/;
    let dateArray = [];
    let yearArray = []
    for (let i = 0; i < dataset.length; i++){
        let date = new Date(1996, 0, );
        let year = new Date(dataset[i]['Year'], 0);
        yearArray.push(year);
        let tempArray = dataset[i]['Time'].split(REGEX_SPLIT_TIME);
        date.setMinutes(parseInt(tempArray[0]), parseInt(tempArray[1]));
        dateArray.push(date);
    }

    const MIN_YEAR = new Date(X_MIN, 0);
    const MAX_YEAR = new Date(X_MAX, 0);
    const YEAR_SCALE = d3.scaleTime()
                         .domain([MIN_YEAR, MAX_YEAR])
                         .range([(PADDING + PADDING), (WIDTH - PADDING)]);
    const X_AXIS = d3.axisBottom(YEAR_SCALE);  

    const MIN_DATE = dateArray[0];
    const MAX_DATE = dateArray[dateArray.length - 1];
    const Y_SCALE = d3.scaleTime()
                           .domain([MIN_DATE, MAX_DATE])
                           .range([PADDING, (HEIGHT - PADDING)]);
    const Y_AXIS = d3.axisLeft(Y_SCALE).tickFormat(TIME_FORMAT);

    
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
       .attr('cx', (d, i) => YEAR_SCALE(new Date(d['Year'], 0)))
       .attr('cy', (d, i) => Y_SCALE(dateArray[i]))
       .attr('r', 8)
       .attr('fill', 'red')
       .attr('class', 'dot')
       .attr('data-xvalue', (d, i) => d['Year'])
       .attr('data-yvalue', (d, i) => dateArray[i]);

    svg.append('g')
       .attr('transform', 'translate(' + (PADDING + PADDING) + ', 0)')
       .attr('id', 'y-axis')
       .call(Y_AXIS);

    svg.append('g')
       .attr('transform', 'translate(0,' + (HEIGHT - PADDING) + ')')
       .attr('id', 'x-axis')
       .call(X_AXIS);
}
