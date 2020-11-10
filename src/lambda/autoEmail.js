//autoEmail.js
const fetchData = require('../utils/dataFetch');
const sendGrid = require('../utils/sendGrid');
const buildGraph = require('../utils/buildGraph');

exports.handler = async (event, context)=>{
    try{
        //Validate the request method and the authorization header
        if(event.httpMethod != 'POST') return {statusCode: 404}
        if(!event.headers.authorization)  return {statusCode: 404};

        //check for valid authorization value
        const basicAuth = (new Buffer.from(`${process.env.GATSBY_AUTH_USER}:${process.env.GATSBY_AUTH_PASS}`)).toString('base64')
        if(event.headers.authorization.split(' ')[1] !== basicAuth) return {statusCode: 404};

        //Get data 
        const data = await fetchData();
        const graphURL = await buildGraph(data.dwrData)
        
        await sendGrid(data, graphURL);
        // success
        return {statusCode: 200}
            
    }catch(err){
        console.log(err)
        //error
        return {statusCode: 500}
    }
}