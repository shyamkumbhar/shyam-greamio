var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// mongodb+srv://pms:admin@cluster0.eperl.mongodb.net/Sample
mongoose.connect("mongodb+srv://pms:admin@cluster0.eperl.mongodb.net/RegisterForm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));
//post api
app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var number = req.body.number;
  var email = req.body.email;
  var gender = req.body.gender;
  var address = req.body.address;
  var fees = req.body.fees;
  var preferableTime = req.body.preferableTime;

  var data = {
    name: name,
    email: email,
    number: number,
    gender: gender,
    address: address,
    fees: fees,
    fepreferableTimees: preferableTime,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("signup_success.html");
});

app
  .get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": "*" });
    return res.redirect("index.html");
  })
  .listen(3200);

console.log("Listening on PORT 3200");
