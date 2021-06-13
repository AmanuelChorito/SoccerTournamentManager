const express = require("express");
const cors = require("cors");
const path = require("path");
const querydb = require("./query");
const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const corsOption = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/manage", function (req, res) {
  res.sendFile(__dirname + "/public/updatetable.html");
});
app.get("/getall", cors(corsOption), function (req, res) {
  querydb
    .listallplayers()
    .then(function (result) {
      if (result.length == 0) {
        throw "not found";
        console.log("err");
      }
      res.send(result);
    })
    .catch(function (err) {
      res.status(404).send(err);
    });
});
app.post("/addplayer", cors(corsOption), function (req, res) {
  //let numberold = req.body.inputnumberold;
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let sgroup = req.body.selectedgroup;

  querydb
    .addplayer(fname, lname, sgroup)
    .then(function (result) {
      //res.status(200).json(result);
      res.send(result);
    })
    .catch(function (err) {
      res.status(404).send(err);
    });
});
app.post("/recordresult", cors(corsOption), function (req, res) {
  //let numberold = req.body.inputnumberold;

  let player1id = parseInt(req.body.player1id);
  let player1score = parseInt(req.body.player1score);
  let player2id = parseInt(req.body.player2id);
  let player2score = parseInt(req.body.player2score);
  //console.log(player1id, player1score);
  querydb
    .recordresult(player1id, player1score, player2id, player2score)
    .then(function (result) {
      //res.status(200).json(result);
      res.send(result);
    })
    .catch(function (err) {
      res.status(404).send(err);
    });
});

app.listen(8089);
