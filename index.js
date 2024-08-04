// library imports
var express = require("express");
var cors = require('cors');
var dotenv = require('dotenv');
// import components
var connnectDB = require('./config/mongoDB.js');
const mainRoutes = require('./routes/mainRoutes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const port = process.env.PORT || 4242;


connnectDB();

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to CPMC. Please visit https://www.cpmcdypcoe.club/",
  });
});

app.use(express.json());
app.use('/api', mainRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});