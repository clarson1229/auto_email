const QuickChart = require('quickchart-js');

module.exports = async (data) => {
    const myChart = new QuickChart();
    myChart.setConfig({
        type: 'bar',
        data: { labels: ['Hello world', 'Foo bar'], 
        datasets: [{ label: 'Foo', data: [1, 2] }] 
    },}).setWidth(300).setHeight(150);

    // You can send the URL to someone...
    const chartImageUrl = myChart.getUrl();
    return chartImageUrl;
}

// const { CanvasRenderService } = require('chartjs-node-canvas');
// const { ChartJS } = require('chart.js');

// const width = 400; //px
// const height = 400; //px
// const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });

// module.exports = async (data) => { 
//     const configuration = {
//         type: 'bar',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255,99,132,1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,
//                         callback: (value) => '$' + value
//                     }
//                 }]
//             }
//         }
//     };
//     const dataUrl = await canvasRenderService.renderToDataURL(configuration);
//     return dataUrl;
// }