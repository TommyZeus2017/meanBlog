// index.js

var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var flash     = require("connect-flash");
var session    = require("express-session");
var path = require('path');
var app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB_MEANBLOG);
var db = mongoose.connection;
db.once("open", function(){
    console.log("DB connected");
});
db.on("error", function(err){
    console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret"}));

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

// Port setting
app.listen(3000, function(){
    console.log("Server on!");
});