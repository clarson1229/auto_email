//File - buildmail.js
//creates the html email
module.exports = (data) => {
    // let tweetElements = '';

    //insert tweet data into elements
    // tweets.forEach(tweet=>{
    //    tweetElements += `
    //             <div style = "width: 100%; border: 1px solid black; margin-bottom:10px; padding: 10px ">
    //             <p>@${tweet.user}</p>
    //             <p>${tweet.text}</p>
    //             <a style="color: white; padding:5px; background: black; text-decoration:none" href="${tweet.url}">Read Tweet </a>
    //             </div>
    //            `
    // })
    //Wrap tweet elements in a div

    // let bodyElement = ' '
    // if (data.error === false){
    //     bodyElement=`
    //         <div>
    //         <p>total volume ${data.totalVolume} </p>
    //         <p>average flowrate ${data.avgFlowRate} </p>
    //         </div>
    //    `
    // }else {
    //     bodyElement=`
    //         <div>
    //         <p>total volume  ${data.totalVolume} </p>
    //         <p>average flowrate ${data.avgFlowRate} </p>
    //         <p>error Message = ${data.errorMsg} </p>
    //         <p>error object =  ${data.errorObject} </p>
    //         </div>
    //    `
    // }
    let bodyElement =`
    <div>
    <p>${data.error} </p>
    <p>total volume  ${data.totalVolume} </p>
    <p>average flowrate ${data.avgFlowRate} </p>
    <p>error Message = ${data.errorMsg} </p>
    <p>error object =  ${data.errorObject} </p>
    </div>
    `
    let email = `   
        <div style = "width: 40rem; font-size: 1.2rem; margin: 0 auto">
            ${bodyElement}
        </div>
    
    `;
 
    return email;
}