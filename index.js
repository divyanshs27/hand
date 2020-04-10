const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "page";
const url ="mongodb+srv://divyansh:divyansh27@cluster0-gnnsr.mongodb.net/test";
const bcrypt = require("bcrypt");

const mongoOptions = {useNewUrlParser : true};

const app = express();

//let ejs = require('ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));    // this cmd allows external css files to be used
//app.set('view engine', 'ejs');
app.listen(3000,()=>{
    MongoClient.connect(url,mongoOptions,(error,client)=>{
    if(error) 
    throw(error);

    let database = client.db(dbname);
    let collection = database.collection("page1");
    console.log("Connected to`" + dbname + "`!");
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/REGISTER.html");
});
//app.get('/',(req,res)=>{
   // res.render("login",{});
//});
 app.post('/signup',(req,res)=>{
     
 MongoClient.connect(url,(err,db)=>{
        if(err)
        throw(err);
        const SALT_ROUND="12"
        let hashedPassword=bcrypt.hashSync(req.body.password1,SALT_ROUND)
        let newData =
        {
            name: req.body.email1,
            username: req.body.username1,
            password: hashedPassword
            //confirmPassword: req.body.conpass
        }
        let dbo = db.db("page");
        dbo.collection("page1").insertOne(newData);
    })
    res.redirect("about.html")      // or use res.end()
})