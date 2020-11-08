const QuickChart = require('quickchart-js');

module.exports = async (data) => {
    const myChart = new QuickChart();
    const dwrdataMeasures = data.flowRate.map(item=> {return (item.measure)});
    const dwrdataLabels = data.flowRate.map(item=> {return (item.dateTime)});
    
    
    const chartData= {
        labels: dwrdataLabels, 
        datasets: [
            {
                label: `Hocking Discharge in `,
                data: dwrdataMeasures,
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
        type: 'line',
        data: chartData, 
        options: {
            scales: {
                yAxes: [
                    {   
                        id: 'discharge_point',
                        type: 'linear',
                        scaleLabel:{
                            display:true,
                            labelString: 'CFS',
                            // fullDWRdata.flowRateUnits,
                            fontColor: '#0000ff',
                            fontSize: '14',
                            padding: '8',
                        },
                        ticks: {
                            // stepSize: .05,
                            fontSize: '14',
                            fontColor: '#0000ff'
                        }, 
                        gridLines: {
                            display: false
                        }, 
                    }
                ], 
                xAxes:[
                    {
                        type: 'time',
                        time: {
                            unit: xAxeslabels.axesUnit,
                            displayFormats: { 
                                minute: 'h:mm a',
                                day: 'M/D',
                                month: 'MMM YYYY',
                            },
                            distribution: 'series'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontSize: '15',
                        }, 
                        scaleLabel:{
                            display:true,
                            labelString: 'Date',
                            fontSize: '16',
                            fontColor: '#000'
                        }
                    }
                ]
            }}
    }).setWidth(400).setHeight(500);

    // You can send the URL to someone...
    const chartImageUrl = myChart.getUrl();
    return chartImageUrl;
}