var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var _ = require('lodash');

let posts = [];

app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

var port =  process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.render('index',{posts});
})

app.get("/contact",(req,res) => {
    res.render('contact');
});

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/compose",(req,res) => {
    res.render('compose')
})

app.post("/compose",(req,res) => {
    const postObj = {
        title: req.body.postTitle,
        content: req.body.postBody
    }

    posts.push(postObj);

    res.redirect("/");
})

app.get("/post/:postName", (req,res) => {

    const reqPost = _.lowerCase(req.params.postName);
    posts.forEach(function(post){
        const AvaPost = _.lowerCase(post.title);
        if(reqPost === AvaPost) {
          res.render("post",{
              Title: post.title,
              Content: post.content
          })
        }
    })
    
})

app.listen(port,function() {
    console.log("server live at port:" + port);
})


