const FetchDWRHock = require('./fetchDWRHock.js');

function getDate(typeDate){
    var todaysDate = new Date(); 
    if (typeDate === 'today'){
        last = new Date(todaysDate.getTime() - (10 * 24 * 60 * 60 * 1000));
        pDate  = last.getDate();    
        pMonth = last.getMonth() + 1;
        pYear  = last.getFullYear();
    }else{
        pDate  = todaysDate.getDate();    
        pMonth = todaysDate.getMonth() + 1;
        pYear  = todaysDate.getFullYear();
    }
    return `${pYear}-${pMonth}-${pDate}`;
}
function createLink(dateOne, dateTwo){
    // this Determines which API link to use. 
    var link = 'https://dwr.state.co.us/Rest/GET/api/v2/telemetrystations/telemetrytimeseriesraw/?';
    
    const endDate = createDate(dateTwo);
    const startDate = createDate(dateOne);
 
    const apiKey = process.env.GATSBY_DWR_API_KEY;      // Connor S API key
    // const apiKey = process.env.GATSBY_DWR_API_KEY_TWO;      // Connor L API key
    const fullLink = `${link}format=json&abbrev=HOCMINCO&endDate=${endDate}&parameter=DISCHRG&startDate=${startDate}&apiKey=${apiKey}`;
    return (fullLink);
}
function calcVolumeData15Min(dataMap, unitType){
    var item1,item2,item3,item4, count = 1, totalFlow = 0, multiplierValue, totalFlowUnits;
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
    dataMap.map((item)=> { 
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
          break;
        default:
          break;
      }
    });
    
    return ({ 'totalFlow' : totalFlow, 'totalFlowUnits': totalFlowUnits });
}
function calcAvgFlowRate(dataArray){
    var totalFlowRate=0; 
    dataArray.map(item=> totalFlowRate += item.measure);
    const avgFlowRate = totalFlowRate / dataArray.length; 
    return avgFlowRate;
}

module.exports = (data) => { 
    var dateOne = getDate('today');
    var dateTwo = getDate('past10');

    const fullLink = createLink(dateOne, dateTwo);
    // makes the API call 
    const dataResult = await FetchDWRHock(fullLink);
    if (dataResult.error === false ){
        var dataArray = dataResult.data.map((item) =>{ return ({'dateTime': item.measDateTime, 'measure': item.measValue}) });
        var tempFullData= {'error': false, 'errorMsg': '', 'flowRate': dataArray, 'flowRateUnits': 'CFS'}
        var totalVolume=calcVolumeData15Min(tempFullData.flowRate, tempFullData.flowRateUnits); // here 
        var avgFlowRate = calcAvgFlowRate(tempFullData.flowRate)
        return {'totalVolume': totalVolume, 'avgFlowRate': avgFlowRate}
    }else{
        return {'error': true, 'errorMsg': dataResult.errorMsg, 'errorObject': dataResult.errorObject}
    }


}
