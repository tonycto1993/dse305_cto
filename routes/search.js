var express = require('express');
var router = express.Router();
 var https = require('https');

router.get('/', function(req,res,next){
    console.log("tttt");
});

router.post('/searchBooksByKeyword', function(req,res,next){
    var keyword = req.body.keyword;
     if(keyword == null || keyword == '' || keyword.length < 1){
        console.log("keyword should be has content.");
        return false;
    }
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
                return false;
            }
            console.log("Got a response: ", responseData);
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
});

router.post('/searchBookByVolumeID', function(req,res,next){
    var volumeID = req.body.volumeID;
      if(volumeID == null || volumeID == '' || volumeID.length < 1){
        console.log("volumeID should be has content.");
        return false;
    }
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
                    
                }
                if(responseData.error['code'] == 503){
                    console.log("", responseData.error['message']);
                }
                return false;
            }
            console.log("Got a response: ", responseData);
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
});

module.exports = router;