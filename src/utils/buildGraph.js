const QuickChart = require('quickchart-js');
// TODO get all 10 days instead of 9 
function createDailyFrom15(dwrData){
    // DWR
      // 15 min data to hourly to daily 
    var item1,item2,item3,item4, count = 1, totalFlow = 0, hourCount=0, dailyArrayLabel=[], dailyArrayMeasure=[] ;
    
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
        dailyArrayLabel.push(`${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`);
        dailyArrayMeasure.push( totalFlow/24 );
        
        totalFlow=0;
        hourCount=0;
      }
    })
    // combine data
    return ({'labels': dailyArrayLabel, 'measures':dailyArrayMeasure })
  }
module.exports = async (data) => {
    const myChart = new QuickChart();
    console.log('data before ', data.flowRate)
    const dailyData = createDailyFrom15(data.flowRate)
    console.log('dailyData', dailyData)

   
    
   
    myChart.setConfig({
        "type": "line", 
        "data": {
            "labels":dailyData.labels, 
            "datasets": [{
                "label":"Hock-Discharge", 
                "data": dailyData.measures
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