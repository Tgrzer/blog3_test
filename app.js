var express = require('express'),
 app = express(),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://test:test@ds145292.mlab.com:45292/blog3")


var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	textArea: String

})

var Blog = mongoose.model('Blog', blogSchema);


// Blog.create({
// 	title: "Monday",
// 	image: "http://janessajaye.com/wp-content/uploads/2017/05/Unicorn-13.png",
// 	textArea: "Unicorn for Monday"

// })



app.get('/', function(req,res){
	res.redirect('/blogs');
})


//INDEX

app.get('/blogs', function(req,res){
	Blog.find({}, function(err,data){
		if(err) throw err;
		res.render("index", {blog: data});

	})
})

//NEW

app.get('/blogs/new', function(req,res){
	res.render("create.ejs");
})

//CREATE

app.post('/blogs', function(req,res){
	var title = req.body.title;
	var image = req.body.image;
	var textArea = req.body.textArea;
	var newBlog = {title:title, image:image, textArea:textArea}
	Blog.create(newBlog, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	})
})

//SHOW

app.get('/blogs/:id', function(req,res) {
	Blog.findById(req.params.id, function(err,data){
		if(err) {
			console.log(err);
		} else{
			res.render('show', {blog:data});
		}
	})

})


//EDIT

app.get('/blogs/:id/edit', function(req,res){
	Blog.findById(req.params.id, function(err,data){
		if(err) {
			console.log(err);
		} else {
			res.render('edit', {blog:data});
		}
	})
})

//UPDATE
app.put('/blogs/:id', function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,data){
		if(err) {
			console.log(err);
		} else {
			res.redirect('/blogs/' + req.params.id);
		}

	})
})



//DESTROY
app.delete('/blogs/:id', function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
	if(err){
		res.redirect('/blogs');
	} else {
				res.redirect('/blogs');

	}
});
});




app.listen(3000, function(){
	console.log("server is running");
})