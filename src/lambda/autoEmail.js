//autoEmail.js
// const twitter = require('../utils/twitter');
const sendGrid = require('../utils/sendGrid');

exports.handler = async (event, context)=>{
    try{
        //Validate the request method and the authorization header
        if(event.httpMethod != 'POST') return {statusCode: 404}
        if(!event.headers.authorization)  return {statusCode: 404};

        //check for valid authorization value
        const basicAuth = (new Buffer(`${process.env.GATSBY_AUTH_USER}:${process.env.GATSBY_AUTH_PASS}`)).toString('base64')
        if(event.headers.authorization.split(' ')[1] !== basicAuth) return {statusCode: 404};

        //Get data 
        // Will call a function here to get the data
        //  const tweets = await twitter();

        //Send email if there are tweets available
        //  if(tweets.length > 0) await sendGrid(tweets);
        await sendGrid('This is a test email');
        // success
        return {statusCode: 200}
            
    }catch(err){
        console.log(err)
        //error
        return {statusCode: 500}
    }
}