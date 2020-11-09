//File - buildmail.js
//creates the html email

function createRows15(dataMap){
    // DWR
      // 15 min data to hourly to daily 
    var item1,item2,item3,item4, count = 1, totalFlow = 0, multiplierValue, totalFlowUnits, hourCount=0, dailyArray=[];
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
        dailyArray.push({'dateTime': `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`,'measure':totalFlow});
        
        totalFlow=0;
        hourCount=0;
      }
    })
    var dwrConvertedMap = dailyArray.map(item => ({'dateTime': item.dateTime, 'measure': item.measure, 'dataType': 'DISCHARGE_TOTAL'}))
    
  
    // combine data
    return ({'dwrData': dwrConvertedMap})
  }
module.exports = (data, graphURL) => {
    
    let header=`
      <div>
        <p>Reporting Period</p>
        <p>From to </p>
      </div>
    `
    //Wrap tweet elements in a div
    let graphImg=' '
    if (graphURL){
      graphImg = `
        <img src=${graphURL}  width="1400" height="600"/>
      ` 
    }
    //  width="500" height="600"   might go back in the image tag 
    let bodyElement = ' '
    if (data.error === false){
        dataMap= createRows15(data);
        const rows = dataMap.dwrData.map( (item, index) => 
        `<tr  key=${`Row-${index}`}>
          <th >${item.dateTime}</th>
          <th >${item.measure.toFixed(2)} ${data.dwrData.flowRateUnits} </th>
        </tr>`
        )

        bodyElement=`
            <div>
                <div>
                  <p>Total Volume ${data.totalVolume}</p>
                  <p>Average Flowrate ${data.avgFlowRate}</p>
                </div>
                <div>
                  <table style="width:100%">
                    <tr>
                        <th>Date</th>
                        <th>Total Discharged</th>
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
      <div>
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
        <div style = "width: 40rem; font-size: 1.2rem; margin: 0 auto">
          ${graphImg}
          ${bodyElement}
        </div>
    
    `;
 
    return email;
}