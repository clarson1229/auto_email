const QuickChart = require('quickchart-js');

module.exports = async (data) => {
    const myChart = new QuickChart();
    const dwrdataMeasures = data.flowRate.map(item=> {return (item.measure)});
    const dwrdataLabels = data.flowRate.map(item=> {return (item.dateTime)});
    const tempLabel  = dwrdataLabels.splice(0,40);
    const tempMeasure= dwrdataMeasures.splice(0,40);
    
    const chartData= {
        labels: tempLabel, 
        datasets: [
            {
                label: `Hocking Discharge in `,
                data: tempMeasure,
                // backgroundColor: '#0000ff', // color of points 
                // borderColor: '#0000ff',   // color of line
                // borderWidth: 2, 
                // fill: false,
                // pointRadius: 0, 
                // steppedLine: true,
                // fontSize: '2',
                // yAxisID: 'discharge_point',
            }]
    }
    // ${dData.flowRateUnits}
    myChart.setConfig({
        "type": "line", 
        "data": {
            "labels":tempLabel, 
            "datasets": [{
                "label":"Hock-Discharge", 
                "data": tempMeasure
            }]
        },
        "options": {
            "scales": {
                "yAxes": [{   
                    "type": 'linear',
                    "gridLines": {
                        "display": false
                    }, 
                }],
                "xAxes": [{
                    "type": 'time',
                    "time": {
                        "unit": 'day'
                    },
                    "gridLines": {
                            "display": false
                    },
                }]
            }
        }
    }).setWidth(1400).setHeight(600);

    // You can send the URL to someone...
    const chartImageUrl = myChart.getUrl();

    return chartImageUrl;
}