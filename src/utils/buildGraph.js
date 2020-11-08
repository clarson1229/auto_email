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
                backgroundColor: '#0000ff', // color of points 
                borderColor: '#0000ff',   // color of line
                borderWidth: 2, 
                fill: false,
                pointRadius: 0, 
                pointHoverRadius: 5,
                steppedLine: true,
                fontSize: '2',
                yAxisID: 'discharge_point',
            }
        ]
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