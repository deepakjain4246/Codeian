const express=require('express');
const app=express();
const port=8000;

//use the express server
app.use('/',require('./routes/index.js'))


app.listen(port,function(err){
    if(err){
        console.log(`Error in running on port:${port}`);
    }
    console.log(`Server is up and running on port ${port}`);
});