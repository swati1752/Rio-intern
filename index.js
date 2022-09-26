const http = require('http');
const fs = require('fs');
const url = require('url');
var projects = require('./data-store');


const port = 8000;


function onRoutehit(req,res) {
    const purl = url.parse(req.url , true)
    const path = purl.pathname
    const id = purl.query.id
    try {
    if(path==='/projects'){
        if(id){
            const list = projects.k;
            var i , size = list.length;
            for(i=0 ; i<size ; i++)
            {
                if(list[i].id==id){
                    const jsonContent = JSON.stringify(list[i])
                    res.writeHead(200 , {'Content-Type': 'application/json'})
                    res.write(jsonContent)
                    break
                }
            }
            if(i==list.length)
            {
                res.writeHead(404)
                res.write('No matching Document')
            }
        }
        else{
            res.statusCode = 400
            // console.log('Id not found');
            const respData = {
                message:"BAD REQUEST",
            }
            const jsonContent = JSON.stringify(respData)
            res.writeHead(400 , {'Content-Type': 'application/json'})
            res.write(jsonContent)
        }
    }
} catch {
        res.statusCode = 404
        res.write('Invalid Request');
}
res.end()
 
}
  
http.createServer(onRoutehit).listen(port);