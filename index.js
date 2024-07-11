import express from "express"
import methodOverride from "method-override"

const app = express();
const port = 3000;
let totalCount = 0;

let allPosts = [];

app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: allPosts});
});

app.post("/", (req, res) => {
    const newPost = {
        id: totalCount++,
        title: req.body["post-title"],
        content: req.body["post-content"],
        author: req.body["post-author"].length === 0 ? "anonimus" : req.body["post-author"],
        dateCreated: new Date().toLocaleString()
    };
    
    allPosts.push(newPost);
    res.render("index.ejs", {posts: allPosts});
});

app.get('/posts/:id', (req, res) => {
    const postID = req.params.id;
    const requiredPost = allPosts.find(post => post.id == postID);

    requiredPost ? res.render("post.ejs", {post: requiredPost}) : res.sendStatus(404);
})

app.get("/posts/:id/edit", (req, res) => {
    const postID = req.params.id;
    const requiredPost = allPosts.find(post => post.id == postID);
    requiredPost ? res.render("editPost.ejs", {post: requiredPost}) : res.sendStatus(404);
});

app.patch("/posts/:id/save", (req, res) => {
    const postID = req.params.id;
    let requiredPost = allPosts.find(post => post.id == postID);
    if(requiredPost){
        requiredPost.content = req.body["post-content"];
        res.render("post.ejs", {post: requiredPost})
    }
    else{
        res.sendStatus(404);
    }
});

app.delete("/posts/:id/delete", (req, res) => {
    const postID = req.params.id;
    const deletedPostIndex = allPosts.findIndex(post => post.id == postID);
    if (deletedPostIndex !== -1) {
        allPosts.splice(deletedPostIndex, 1);
        res.render("index.ejs", {posts: allPosts});
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});