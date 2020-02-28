var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const dbname = "handwriting_recog";
const url ="mongodb+srv://divyansh:divyansh11@cluster0-0qwqv.mongodb.net/test?retryWrites=true";
const mongoOptions = { useNewUrlParser : true};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));   // used to add external css files 

app.listen(3000,()=>{
    MongoClient.connect(url,mongoOptions,(err,client)=>{
        if(err) 
        throw err;
        
        let database = client.db(dbname);
        let collection = database.collection("logindata");
        console.log("Connected to`" + dbname + "`!");
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/REGISTER.html");
});
app.get('/',(req,res)=>{
    res.render("about",{});
});
 app.post('/about',(req,res)=>{
     
 MongoClient.connect(url,(err,db)=>{
        if(err)
        throw(err);
        let newData =
        {
            email:req.body.email1,
            username: req.body.username1,
            password: req.body.password1
        }
        let dbo = db.db("handwriting_recog");
        dbo.collection("logindata").insertOne(newData);
    })
    res.redirect("about.html") ;     // or use res.end()
})

