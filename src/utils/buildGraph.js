const QuickChart = require('quickchart-js');

module.exports = async (data) => {
    const myChart = new QuickChart();
    const dwrdataMeasures = data.flowRate.map(item=> {return (item.measure)});
    const dwrdataLabels = data.flowRate.map(item=> {return (item.dateTime)});
    console.log('labels', dwrdataLabels)
    console.log('measures', dwrdataMeasures)
    
    const chartData= {
        labels: ['1','2','3','4'], 
        datasets: [
            {
                label: `Hocking Discharge in `,
                data: [2,4,6,8],
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
        data: chartData
    }).setWidth(300).setHeight(150);

    // You can send the URL to someone...
    const chartImageUrl = myChart.getUrl();
    return chartImageUrl;
}