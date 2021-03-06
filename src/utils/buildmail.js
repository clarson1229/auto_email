//File - buildmail.js
//creates the html email

function createRows15(dataMap){
    // DWR
      // 15 min data to hourly to daily 
    var item1,item2,item3,item4, count = 1, totalFlow = 0, averageFlow=0, multiplierValue, totalFlowUnits, hourCount=0, dailyArray=[];
    const unitType= dataMap.dwrData.flowRateUnits;
    if (unitType==='CFS'){
      multiplierValue=3600;
      totalFlowUnits='CF'; // depending on the flowrate units set the total flow units
    }else if (unitType==='GPM'){
      multiplierValue=60;
      totalFlowUnits='GALLONS';
    }else if (unitType==='ACRE_FEET_P_DAY'){
      multiplierValue=0.0416667;
      totalFlowUnits='ACRE_FEET';
    }
    var dwrData = dataMap.dwrData.flowRate;
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
          // Multiply by multiplierValue to get total volume that flowed out in that hour. 
          totalFlow+= (avgHourlyValue*multiplierValue) 
          averageFlow+=(avgHourlyValue)
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
        dailyArray.push({'dateTime': `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`,'measure':totalFlow, 'avgFlow': averageFlow/24 });
        
        averageFlow=0;
        totalFlow=0;
        hourCount=0;
      }
    })
    var dwrConvertedMap = dailyArray.map(item => ({'dateTime': item.dateTime, 'measure': item.measure,'avgFlow': item.avgFlow, 'dataType': 'DISCHARGE_TOTAL'}))
    
  
    // combine data
    return ({'dwrData': dwrConvertedMap})
  }

module.exports = (data, graphURL) => {
    
    let header=`
      <div style="font-style: bold; font-size:20; text-align:left;" >
        <h1 style="font-style: bold;">Hock Hocking Mine Discharge Report</h1>
        <h3 style="font-style: bold;">Reporting Period From ${data.dates.dateOne} to ${data.dates.dateTwo}</h3>
      </div>
    `
    let graphImg=' '
    if (graphURL){
      graphImg = `
        <img src=${graphURL}  width="100%" height="30%"/>
      ` 
    }

    let bodyElement = ' '
    if (data.error === false){
        dataMap= createRows15(data);
        const rows = dataMap.dwrData.map( (item, index) => 
        `<tr  key=${`Row-${index}`}>
          <td style="text-align:center; padding: 5; border: 1px solid #766d66; width:30%;">${item.dateTime}</td>
          <td style="text-align:center; padding: 5; border: 1px solid #766d66; width:30%;">${item.avgFlow.toFixed(2)} CFS</td>
          <td style="text-align:center; padding: 5; border: 1px solid #766d66; width:40%;">${(item.measure*0.000022956840904921).toFixed(2)} ACRE FEET </td>
        </tr>`
        ).join('')
        bodyElement=`
            <div style="textAlign: center;">
                <div>
                  <h3>Volumetric Caculations</h3>
                  <table style="width:100%; border: 1px solid #000; border-collapse: collapse; ">
                    <tr style ="background-color: #9cc2e2; ">
                      <th style="padding: 5; border: 1px solid #766d66; width:40%;">Average FlowRate </th>
                      <th style="padding: 5; border: 1px solid #766d66; width:40%;">Total Volume Discharged</th>
                    </tr>
                    <tr >
                      <td style="text-align:center; padding: 5; border: 1px solid #766d66; width:40%;">${data.avgFlowRate.toFixed(2)} CFS</td>
                      <td style="text-align:center; padding: 5; border: 1px solid #766d66; width:40%;">${(data.totalVolume*0.000022956840904921).toFixed(2)} ACRE FEET</td>
                    </tr>
                  </table>
                </div>
                <div>
                  <h3>Daily Averages</h3>
                  <table style="width:100%; border: 1px solid #000;  border-collapse: collapse;">
                    <tr style ="background-color: #9cc2e2; ">
                        <th style="padding: 5;border: 1px solid #766d66; width:30%;">Date</th>
                        <th style="padding: 5;border: 1px solid #766d66; width:30%;">Average Flow Rate</th>
                        <th style="padding: 5;border: 1px solid #766d66; width:40%;">Total Discharged</th>
                    </tr>
                    ${rows}
                  </table>
                </div>
            </div>
       `
    }else {
        bodyElement=`
            <div>
                <p>error Message = ${data.errorMsg} </p>
                <p>error object =  ${data.errorObject} </p>
            </div>
       `
    }
    let footer=`
      <div style= "font-size:16; height:550px;">
        <p>MineWater LLC</p>
        <p>10924 Leroy Drive</p>
        <p>Northglenn, CO 80233 US</p>
        <p>720-883-6700</p>
        <p>jgh@minewater.com</p>
        <p>www.minewater.com</p>
        <p></p>
      </div>
    `
    let email = `   
        <div style = "width: 95%; font-size: 1.2rem;">
          ${header}
          ${graphImg}
          ${bodyElement}
          ${footer}

        </div>
    
    `;
 
    return email;
}