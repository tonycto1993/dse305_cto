var express = require('express');
var router = express.Router();
 var https = require('https');

router.get('/', function(req,res,next){
    console.log("tttt");
});

/**search book by keyword**/
router.post('/searchBooksByKeyword', function(req,res,next){
    console.log('--search book by keyword--');
    var keyword = req.body.keyword;
    var msg = 'start search book by keyword';
    var sendData;
    var error = 0;
    if(keyword == null || keyword == '' || keyword.length < 1){
        console.log("keyword should be has content.");
        msg = 'keyword should be has content';
        error = 1;
        //return false;
    }else{
        /**get book detail from google api by keyword**/
        var url = 'https://www.googleapis.com/books/v1/volumes?q='+keyword+'&maxResults=40&orderBy=newest&filter=free-ebooks';//&start=11
        https.get(url, function(response){
            var body = '';
        
            response.on('data', function(chunk){
                body += chunk;
            });
        
            response.on('end', function(){
                var responseData = JSON.parse(body);
               
                if(responseData.totalItems == 0){
                    console.log("Nothing responese.");
                    msg = 'Nothing responese';
                    error = 2;
                }else{
                    msg = 'responese has data';
                    
                }
                sendData = responseData;
                console.log("Got a response: ", sendData);
                res.setHeader('content-type', 'application/json')
                res.status(res.statusCode).send({status: error, message: msg, data: sendData})
                res.end()
            });
            
        }).on('error', function(e){
              console.log("Got an error: ", e);
              msg = 'Got an error';
              error = 3;
        }).end();

    }
    
    
});

/**search book by volume id**/
router.get('/searchBookByVolumeID/:volumeID', function(req,res,next){
    console.log('--search book by volume id--');
    //var volumeID = req.body.volumeID;
    var volumeID = req.params.volumeID;
    var msg = 'start search book by volume id';
    var error = 0;
    var sendData;
    if(volumeID == null || volumeID == '' || volumeID.length < 1){
        console.log("volumeID should be has content.");
        msg = "volumeID should be has content";
        error = 1;
    }else{
        /**get book detail from google api by volume id**/
        var url = 'https://www.googleapis.com/books/v1/volumes/'+volumeID;//1ebwAAAAMAAJ
        var https = require('https');
        //var http = require('http');
        https.get(url, function(response){
            var body = '';
        
            response.on('data', function(chunk){
                body += chunk;
            });
        
            response.on('end', function(){
                var responseData = JSON.parse(body);
                
                if(typeof responseData.error !== 'undefined'){
                    if(responseData.error['code'] == 404){
                        console.log("", responseData.error['message']);
                        msg = responseData.error['message'];
                        error = 2;
                    }
                    if(responseData.error['code'] == 503){
                        console.log("", responseData.error['message']);
                        msg = responseData.error['message'];
                        error = 3;
                    }
                    //return false;
                }else{
                    msg = 'response has data';
                    error = 4;
                }
                console.log(responseData);
                sendData = responseData;
                res.setHeader('content-type', 'application/json')
                res.status(res.statusCode).send({status: error, message: msg, data: sendData})
                res.end()
            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
              msg = "Got an error";
        });
    }
});

module.exports = router;