const express=require('express');
var bodyParser = require('body-parser');
const app=express();
app.use(require('./utils/cors'));
var maill=require('./db/helpers/info');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(express.static('public'));
app.use('/',require('./routes/user'));
app.use('/',require('./routes/admin'));

//app.use(require('./utils/jwtmiddleware'));
app.use('/',require('./routes/police'));


app.listen(process.env.PORT|| 3001,()=>{
    //app.use(require('./db/helpers/info'));
    console.log("Server Started, Browse to port no 3001...");
    maill.sendmail();
})