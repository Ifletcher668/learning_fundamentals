import http, { createServer } from 'http';
import url from 'url';
import util from 'util';
import formidable from 'formidable'; // great for form data
const StringDecoder = require('string_decoder').StringDecoder;
const port: number = 8000;

// const server: http.Server = createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
//     // console.log(req.headers); all the header information the browser sends to the server. the request
//     let parsedUrl = url.parse(req.url!, true); // because we call parse, and we pass true, we get the object
//     let path = parsedUrl.pathname;
//     // when receiving the request, only path.pathname, path.query and path.search are available
//     // path.port path.protocol path.origin will be null at first

//     // const SD = StringDecoder.StringDecoder;
//     // const decoder: StringDecoder.StringDecoder = new SD('utf-8');
//     // let buffer: string = ''; // an empty container

//     // a long stream comes from the server, but we need to take that as chunks
//     // string decoder takes chunks of the data stream
//     // and assembles it as a string. That's the buffer

//     // req.on('data', (chunk: Buffer) => (buffer += decoder.write(chunk))); // this fires every time we get data

//     // req.on('end', () => {
//     //     buffer += decoder.end();

//     // when request is finished, response is sent out

//     // more inclusive method for writing a server

//     if (req.method!.toLowerCase() === 'get') {
//         let form = new formidable.IncomingForm(); // object to parse post data
//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 // handle errors
//                 return console.error(err.message);
//             }
//             res.writeHead(200, { 'Content-Type': 'text/plain' });
//             res.write('The response coming from post\n\n');
//             res.end(util.inspect({ fields: fields, files: files }));
//         });
//     } else if (req.method!.toLowerCase() === 'post') {
//         const headers = {
//             'Content-type': 'text/plain',
//             'Allow-Control-Allow-Origin': '*',
//         };
//         res.writeHead(200, 'ok', headers); // only call writeHead once // We're sending back an OK message
//         res.write('the content\n'); // any content
//         res.write(util.inspect(parsedUrl.query));

//         // res.write(`\n${buffer}\n`);
//         res.end(`\nend of message to browser`); // the end of the content page
//     } else {
//         // put, delete, anything else
//     }

//     // look up methods with console.log(http.METHODS);
//     // look up status codes with console.log(http.STATUS_CODES);

//     // const data = {
//     //     id: 123,
//     //     name: 'Isiah',
//     //     email: 'Isiahfletcher7@gmail.com',
//     // };

//     // res.end(JSON.stringify(data)) if anything is being sent back, it must be a string
// });

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    let parsedUrl = url.parse(req.url!, true);
    let path = parsedUrl.pathname;

    // parsedUrlUrl object returned has:
    // parsedUrl.pathname parsedUrl.query

    // standardize the requested url by removing any '/' at start or end
    // e.g. '/folder/to/file/' becomes 'folder/to/file'
    path = path!.replace(/^\/+|\/+$/g, '');
    console.log(`path: ${path}`);

    let qs = parsedUrl.query;
    let headers = req.headers;
    let method = req.method!.toLowerCase();

    // if using the 'end' eventListener, you HAVE TO HAVE the 'data' listener, too.
    // even if you never use it
    req.on('data', () => {
        console.log('got some data');
        // if no data is passed, we don't see this message
        // but still need it so 'end' function works
    });

    req.on('end', () => {
        console.log('request.on("end") listener firing!');

        // this is a function, because the route variable
        // is assigned to the function typeof (...)
        let route: Function =
            typeof routes[path as string] === 'undefined'
                ? routes['notFound']
                : routes[path as string];

        const data: { [key: string]: any } = {
            path: path,
            queryString: qs,
            headers: headers,
            method: method,
        };
        // pass data in case we need info about request
        // pass response object because router is outside of scope
        route(data, res);
    });
});

const routes: { [key: string]: any } = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    kenny: (data: http.IncomingMessage, res: http.ServerResponse) => {
        const payload = {
            name: 'kenny',
        };
        let payloadStr = JSON.stringify(payload);
        res.writeHead(200, routes.headers);
        res.write(payloadStr);
        res.end('\n');
    },
    cartman: (data: http.IncomingMessage, res: http.ServerResponse) => {
        const payload = {
            name: 'cartman',
        };
        let payloadStr = JSON.stringify(payload);

        res.writeHead(200, routes.headers);
        res.write(payloadStr);
        res.end('\n');
    },
    stan: (data: http.IncomingMessage, res: http.ServerResponse) => {
        const payload = {
            name: 'stan',
        };
        let payloadStr = JSON.stringify(payload);

        res.writeHead(200, payloadStr);
        res.write(payloadStr);
        res.end('\n');
    },
    kyle: (data: http.IncomingMessage, res: http.ServerResponse) => {
        const payload = {
            name: 'kyle',
        };
        let payloadStr = JSON.stringify(payload);

        res.writeHead(200, payloadStr);
        res.write(payloadStr);
        res.end('\n');
    },
    notFound: (data: http.IncomingMessage, res: http.ServerResponse) => {
        let payload: { [key: string]: any } = {
            message: 'File Not Found',
            code: 404,
        };
        let payloadStr = JSON.stringify(payload);

        res.writeHead(200, routes.headers);
        res.write(payloadStr);
        res.end('\n');
    },
};

server.listen(port, () => console.log(`Listening on port ${port}`));
