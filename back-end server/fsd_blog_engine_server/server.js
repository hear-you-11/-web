const express = require("express")
const morgan = require('morgan')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

const articlesRoutes = require('./app/routes/articles.routes');
articlesRoutes(app); // 确保正确传递 app 对象给 article.routes 模块
// Server port
const usersRoutes = require('./app/routes/users.routes');
usersRoutes(app);

const commentsRoutes = require('./app/routes/comments.routes');
commentsRoutes(app);

const HTTP_PORT = 3333 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port: " + HTTP_PORT)
});

// Logging
app.use(morgan('tiny'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"status":"Alive"})
});

// Other API endpoints: Links go here...

// Default response for any other request
app.use(function(req, res){
    res.sendStatus(404);
});

