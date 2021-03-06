/* global d3 */

// Our canvas
const width = 1100,
  height = 300,
  margin = 20,
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  let data = []
  
  d3.tsv('afcw-results.tsv', (rows) => {
    // console.log(JSON.stringify(rows));
    let dataset = rows.map(dataRows => {
      // console.log(dataRows);
      // console.log(dataRows.GoalsScored);
      data.push(JSON.parse(dataRows.GoalsScored))
    })
  console.log(data);
  redraw(data)  
  })
}

// redraw function
let redraw = (datas) => {
  // console.log(datas);
  // Your data to graph here
  const yScale = d3.scaleLinear()
    .domain([0,d3.max(datas)])
    .range([0,height])
    
  const xScale = d3.scaleLinear()
    .domain([0,datas.length])
    .range([0,width])
    
  const yAxisScale = d3.scaleLinear()
    .domain([d3.max(datas),0])
    .range([0, height])
    
  const yAxis = d3.axisLeft(yAxisScale).ticks(d3.max(datas))  
  const xAxis = d3.axisBottom(xScale).ticks(datas.length)
  
  svg.append("g")
  .attr("transform", "translate(20)")
  .call(yAxis); 
  
  svg.append("g")
  .attr("transform", `translate(0,280)`)
  .call(xAxis); 
    
  svg.selectAll('rect')
    .data(datas)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('x', (d,i) => {
      return i * 22 + marginLeft
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yScale(d)
    })
    
}

reload()
