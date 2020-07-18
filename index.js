const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts')

const db=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('./assets'));

//extract Styles and Scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use the express server
app.use('/',require('./routes/index.js'))

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error in running on port:${port}`);
    }
    console.log(`Server is up and running on port ${port}`);
});