// Loading in data and defining filter buttons/inputs
// from data.js
const tableData = data;
// filter inputs
dtIn = d3.select('#dtIn')
cityIn = d3.select('#cityIn')
stIn = d3.select("#stateIn")
cntyIn = d3.select("#countryIn")
shapeIn = d3.select('#shapeIn')
// filter buttons
const submit = d3.select('#filter-btn')
const dateSwitch = d3.select('#dateSwitch')
const citySwitch = d3.select("#citySwitch")
const stateSwitch = d3.select("#stateSwitch")
const countrySwitch = d3.select("#cntySwitch")
const shapeSwitch = d3.select("#shapeSwitch")


// filter and rendering functions 

const renderData = function(d){
    const tbody = d3.select('tbody')
    tbody.selectAll("tr").remove() 
    d.forEach(e =>{
        let row = tbody.append("tr")
        row.append("td").text(e.datetime)
        row.append("td").text(e.city)
        row.append("td").text(e.state)
        row.append("td").text(e.country)
        row.append("td").text(e.shape)
        row.append("td").text(e.durationMinutes)
        row.append("td").text(e.comments)
    })
}

const filterBuild = function(){
    var inputArray = [['datetime',dtIn], ['city', cityIn], ['state', stIn], ['country', cntyIn],['shape', shapeIn]]
    var filterArray = {}
    inputArray.forEach(e => {
        if (e[1].property("disabled")){
            let inputVal = /\w/
            filterArray[e[0]] = inputVal
        }
        else if (e[1].property("value") == ""){
            let inputVal = /\w/
            filterArray[e[0]] = inputVal
        }
        else{
            inputVal = e[1].property("value")
            filterArray[e[0]] = inputVal}
    })
    return filterArray
}

const dataFilter = function(){
    var filterData = tableData.filter(e => {
        if (e.datetime.match(filterArray['datetime']) 
                && e.city.match(filterArray['city'])
                && e.state.match(filterArray['state'])
                && e.country.match(filterArray['country'])
                && e.shape.match(filterArray['shape'])
            ){return e}
        else{}})
    return filterData
}

const handler = function() {
    filterArray = filterBuild()   
    console.log(filterArray)
    filterData = dataFilter()         
    renderData(filterData)
}

const inputOnOff = function(inVar) {
    switchStatus = d3.select(inVar).property("disabled")
    if (switchStatus == false){
        d3.select(inVar).property("value", "")
        d3.select(inVar).property("disabled", true)
        handler()
    }
    else{
        d3.select(inVar).property("disabled", false)
    }
}


// loading data on init
renderData(tableData);

// EventHandlers
// filter switches
dateSwitch.on("change", function() {inputOnOff("#dtIn")})
citySwitch.on("change", function() {inputOnOff("#cityIn")})
stateSwitch.on("change", function() {inputOnOff("#stateIn")})
countrySwitch.on("change", function() {inputOnOff("#countryIn")})
shapeSwitch.on("change", function() {inputOnOff("#shapeIn")})
//filter inputs
dtIn.on("change", handler)
cityIn.on("change", handler)
stIn.on("change", handler)
cntyIn.on("change", handler)
shapeIn.on("change", handler)
// submit button
submit.on("click", handler)