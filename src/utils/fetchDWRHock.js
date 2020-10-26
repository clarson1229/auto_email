const axios = require('axios');

module.exports = (fullLink) => { 
    return await axios(fullLink).then( result => {
      console.log('Successful Get, Results: ');
      return ({'error': false, 'errorMsg': '', 'data': result.data.ResultList});

      // iff error pops up user is prompted to reload page.  Most errors will come from poor network connection so this should fix that.
    }).catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log('Error in Response:', err.response);
            return({'error': true, 'errorMsg': err.message, 'errorObject': err.response })
          } else if (err.request) {
            // client never received a response, or request never left
            console.log('Error in Request:', err.request);
            return({'error': true, 'errorMsg': err.message,'errorObject': err.request  })

          } else {
            // anything else
            console.log('Errors have come up: ',err);
            return({'error': true, 'errorMsg': err.message,'errorObject': err  })
          }
    });
}