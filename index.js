const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "page";
const url = "mongodb+srv://divyansh:divyansh27@cluster0-gd3lq.mongodb.net/h4t";
const mongoOptions = {useNewUrlParser : true};

const app = express();

let ejs = require('ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));    // this cmd allows external css files to be used
app.set('view engine', 'ejs');
app.listen(3000,()=>{
    MongoClient.connect(url,mongoOptions,(error,client)=>{
    if(error) 
    throw(error);

    let database = client.db(dbname);
    let collection = database.collection("contests");
    console.log("Connected to`" + dbname + "`!");
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/REGISTER.html");
});
app.get('/',(req,res)=>{
    res.render("login",{});
});
 app.post('/about',(req,res)=>{
     
 MongoClient.connect(url,(err,db)=>{
        if(err)
        throw(err);
        let newData =
        {
            name: req.body.email1,
            username: req.body.username1,
            password: req.body.password1,
            //confirmPassword: req.body.conpass
        }
        let dbo = db.db("page");
        dbo.collection("page").insertOne(newData);
    })
    res.redirect("about.html")      // or use res.end()
})