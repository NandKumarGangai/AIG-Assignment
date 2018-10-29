const express = require('express');
const app = express();
const cors=require('cors');
var fs = require('fs');
var parser = require("body-parser");
app.use(parser.json());
app.use(cors());


app.get('/', (req, res) => {
    //console.log("Hello");
    fs.readFile('../JSON/products.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        var fileData = JSON.parse(data);
        //console.log(fileData);
        res.end(data);
    });
})

app.post("/remove", (req, res)=>{
    console.log("In server", req.body.id);
    res.end();
})

app.listen('8081', () => console.log('Listening on port 8081'));