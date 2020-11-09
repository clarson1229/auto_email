const QuickChart = require('quickchart-js');

module.exports = async (data) => {
    const myChart = new QuickChart();
    const dwrdataMeasures = data.flowRate.map(item=> {return (item.measure)});
    const dwrdataLabels = data.flowRate.map(item=> {return (item.dateTime)});
    const tempLabel  = dwrdataLabels.splice(0,25);
    const tempMeasure= dwrdataMeasures.splice(0,25);
    
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
    // myChart.setConfig({
    //     type: 'line',
    //     data: chartData, 
    //     options: {
    //         scales: {
                // yAxes: [
                //     {   
                //         id: 'discharge_point',
                //         type: 'linear',
                //         scaleLabel:{
                //             display:true,
                //             labelString: 'CFS',
                //             // fullDWRdata.flowRateUnits,
                //             fontColor: '#0000ff',
                //             fontSize: '14',
                //             padding: '8',
                //         },
                //         ticks: {
                //             // stepSize: .05,
                //             fontSize: '14',
                //             fontColor: '#0000ff'
                //         }, 
                //         gridLines: {
                //             display: false
                //         }, 
                //     }
                // ], 
    //             xAxes:[
    //                 {
    //                     type: 'time',
    //                     time: {
    //                         unit: 'day',
    //                         distribution: 'series'
    //                     },
    //                     gridLines: {
    //                         display: false
    //                     },
    //                     ticks: {
    //                         fontSize: '15',
    //                     }, 
    //                     scaleLabel:{
    //                         display:true,
    //                         labelString: 'Date',
    //                         fontSize: '16',
    //                         fontColor: '#000'
    //                     }
    //                 }
    //             ]
    //         }}
    // }).setWidth(2000).setHeight(600);

    // You can send the URL to someone...
    // const chartImageUrl = myChart.getUrl();
    tempLabel
    tempMeasure

    const gConfig={
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
    }
    console.log(gConfig)
    return `https://quickchart.io/chart?c=${gConfig}`;
}