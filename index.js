import express from "express"

const app = express();
const port = 3000;

let allPosts = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/post", (req, res) => {
    const newPost = {
        title: req.body["post-title"],
        content: req.body["post-content"],
        author: req.body["post-author"].length === 0 ? "anonimus" : req.body["post-author"],
        dateCreatd: new Date().toLocaleString()
    };

    allPosts.push(newPost);
    res.render("index.ejs", {posts: allPosts});
});

app.patch("/edit", (req, res) => {
    // res.render("index.ejs");
});

app.delete("/delete", (req, res) => {
    // res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});