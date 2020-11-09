const QuickChart = require('quickchart-js');

function createDailyFrom15(dwrData){
    // DWR
      // 15 min data to hourly to daily 
    var item1,item2,item3,item4, count = 1, totalFlow = 0, hourCount=0, dailyArray=[];
    
    if (dwrData.length%4 !== 0){
       dwrData.shift();// remove the first measure. 
    }
    dwrData.map((item, index)=> {
      switch (count) {
        case 1:
          item1 = item.measure;
          count+=1;
          break;
        case 2:
          item2 = item.measure;
          count+=1;
          break;
        case 3:
          item3 = item.measure;
          count+=1;
          break;
        case 4:
          item4 = item.measure;
          // Logic to reset counter 
          // Add all 4 values consiting of an hourly measure.  then divde by 4 to get an average cfs for the hour
          var avgHourlyValue = (item1+item2+item3+item4)/4;

          totalFlow+= (avgHourlyValue) 
          // reset count to 1. 
          count = 1;
          hourCount +=1;
          break;
        default:
          break;
      }
      if (hourCount===24){
        // subtract 12 hours from date (accounts for time change) then take just the date portion 
        var lastDate = new Date(item.dateTime).getTime() - (1000*60*60*12);
        var newDate = new Date(lastDate);
        dailyArray.push({'dateTime': `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`,'measure':totalFlow/24});
        
        totalFlow=0;
        hourCount=0;
      }
    })
    var dwrConvertedMap = dailyArray.map(item => ({'dateTime': item.dateTime, 'measure': item.measure, 'dataType': 'DISCHARGE_TOTAL'}))
    
  
    // combine data
    return ({'dwrData': dwrConvertedMap})
  }
module.exports = async (data) => {
    const myChart = new QuickChart();
    const dailyData = createDailyFrom15(data.flowRate)
    const dwrdataMeasures = dailyData.map(item=> {return (item.measure)});
    const dwrdataLabels = dailyData.map(item=> {return (item.dateTime)});
    
    
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
            "labels":dwrdataLabels, 
            "datasets": [{
                "label":"Hock-Discharge", 
                "data": dwrdataMeasures
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