//File - buildmail.js
//creates the html email
module.exports = (data) => {
    

    //Wrap tweet elements in a div

    let bodyElement = ' '
    if (data.error === false){
        bodyElement=`
            <div>
                <p>total volume ${data.totalVolume} </p>
                <p>average flowrate ${data.avgFlowRate} </p>
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
  
    let email = `   
        <div style = "width: 40rem; font-size: 1.2rem; margin: 0 auto">
            ${bodyElement}
        </div>
    
    `;
 
    return email;
}