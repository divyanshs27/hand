const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "page";
const url = "mongodb+srv://divyansh:divyansh27@cluster0-gnnsr.mongodb.net/test";
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
    res.sendFile(__dirname+"/login.html");
});
//app.get('/',(req,res)=>{
  //  res.render("login",{});
//});
app.post('/about',(req,res)=>{

 
  MongoClient.connect(url, function(err, db) {
    var dbo=db.db("page");
    var cursor = dbo.collection('page1').find({});

    cursor.each(function(err, doc) {
       /* if(doc.username==req.body.username11)
           {if(password==req.body.password11)
               {doc.res.redirect(about.html);}
            else
            {res.send("wrong password");}
            
           }
        else
            {res.send("not registered");}*/
        console.log(doc);

    });
}); 
    
});
