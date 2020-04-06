const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "page";
const url = "mongodb+srv://divyansh:divyansh27@cluster0-gnnsr.mongodb.net/test";
const mongoOptions = {useNewUrlParser : true};
const bcrypt = require("bcrypt");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));    // this cmd allows external css files to be used

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

app.post('/about',(req,res)=>{
MongoClient.connect(url, (error, db) =>{
   if(error)
   throw(eror);
    var dbo=db.db("page");
     dbo.collection('page1').find({username : req.body.username11}).toArray((err,user)=>{
         if(err)throw err;
        if(!user[0])
        {console.log("user not found")
          res.status(404).send("user not found")
        }
        else
        {var bool=bcrypt.compareSync(user[0].password,req.body.password11)
          console.log(user[0].password)
          console.log(req.body.password11)
          console.log(bool)
        
           if(bool==true)
            {res.send("valid password")
            }
           else
            {
            res.send("incorrect")
            }
        }
   
    })
    db.close();
})

})