const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts')

const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const  MongoStore  = require('connect-mongo')(session);
const sassMiddleware= require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('./assets'));

//uploads path is available to browser now
app.use('/uploads', express.static(__dirname + '/uploads'));


//extract Styles and Scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
//create session for passport-local-strategy
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment
    secret:'blamerjdgdn',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled' 
        },
    function(err){
        console.log(err || 'connect-mongo-db ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use the express server
app.use('/',require('./routes/index.js'))


app.listen(port,function(err){
    if(err){
        console.log(`Error in running on port:${port}`);
    }
    console.log(`Server is up and running on port ${port}`);
});