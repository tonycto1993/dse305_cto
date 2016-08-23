var express = require('express');
var router = express.Router();
 var https = require('https');

router.get('/', function(req,res,next){
    console.log("tttt");
});

router.post('/searchBooksByKeyword', function(req,res,next){
    var keyword = req.body.keyword;
    var msg = 'start search book by keyword';
    if(keyword == null || keyword == '' || keyword.length < 1){
        console.log("keyword should be has content.");
        msg = 'keyword should be has content';
        //return false;
    }else{
        var url = 'https://www.googleapis.com/books/v1/volumes?q='+keyword+'&orderBy=newest&maxResults=1&filter=free-ebooks';
        https.get(url, function(res){
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var responseData = JSON.parse(body);
                if(responseData.totalItems == 0){
                    console.log("Nothing responese.");
                    msg = 'Nothing responese';
                }else{
                    msg = 'responese has data';
                }
                console.log("Got a response: ", responseData);
            });
           
            
        }).on('error', function(e){
              console.log("Got an error: ", e);
              msg = 'Got an error';
        });
    res.setHeader('content-type', 'application/json')
    res.status(res.statusCode).send({status: 1, message: msg})
    res.end()
    }
    
});

router.post('/searchBookByVolumeID', function(req,res,next){
    var volumeID = req.body.volumeID;
    var msg = 'start search book by volume id';
    if(volumeID == null || volumeID == '' || volumeID.length < 1){
        console.log("volumeID should be has content.");
        msg = "volumeID should be has content";
    }else{
        var url = 'https://www.googleapis.com/books/v1/volumes/'+volumeID;//_ojXNuzgHRcC
        var https = require('https');
        //var http = require('http');
        https.get(url, function(res){
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var responseData = JSON.parse(body);
                
                if(typeof responseData.error !== 'undefined'){
                    if(responseData.error['code'] == 404){
                        console.log("", responseData.error['message']);
                        msg = responseData.error['message'];
                    }
                    if(responseData.error['code'] == 503){
                        console.log("", responseData.error['message']);
                        msg = responseData.error['message'];
                    }
                    //return false;
                }else{
                    msg = 'response has data';
                }
                console.log("Got a response: ", responseData);
            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
              msg = "Got an error";
        });
        
    res.setHeader('content-type', 'application/json')
    res.status(res.statusCode).send({status: 1, message: msg})
    res.end()
    }
});

module.exports = router;