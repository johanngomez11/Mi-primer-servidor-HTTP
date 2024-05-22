const http = require('http');
const fs = require('fs');

// En el request hay dos elementos:
//      Header{Hacia donde va la petición (URL), method: GET, POST, PUT, PATCH, DELETE...}
//      Body{params:[]}

// El response tiene los mismos elementos:
//      Header{Hacia donde va la petición (URL), method: GET, POST, PUT, PATCH, DELETE..., 
//              status: 200, content type}
//      Body{params:[]}

http.createServer((request, response)=>{
    const file = request.url == '/' ? './WWW/index.html' : `./WWW/${request.url}`;
    if(request.url == '/registro'){
        let data = [];
        request.on("data", value => {
            data.push(value);
        }).on("end", ()=>{
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        });
    }
    fs.readFile(file, (err, data)=>{
        if(err){
            // Mandar 404
            response.writeHead(404, {"Content-Type":"text/plain"})
            response.write("Not found");
            response.end();
        }else{
            const extension = request.url.split('.').pop();
            switch (extension) {
                case 'txt':
                    // Mandar 200
                    response.writeHead(200, {"Content-Type":"text/plain"})
                    break;
                case 'html':
                    // Mandar 200
                    response.writeHead(200, {"Content-Type":"text/html"})
                    break;
                case 'png':
                    // Mandar 200
                    response.writeHead(200, {"Content-Type":"image/jpeg"})
                    break;
            }
            response.write(data);
            response.end();
        }
    });
    
}).listen(4444);

