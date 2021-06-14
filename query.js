const mysql = require("mysql");
const conn = require("./db_connection");
const querydb = require("./query");
exports.listallplayers = function () {
  const sql = `SELECT *,(goalfor-goalagainst) as goaldifference FROM players WHERE status='active' ORDER BY groupname, points DESC,(goalfor-goalagainst) DESC`;
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, result) {
      if (err) throw reject(err);
      resolve(result);
    });
  });
};
exports.listallmatchs = function () {
  const sql = `select 
 (select firstname from heroku_082c330c1b339b6.players where player1id= heroku_082c330c1b339b6.players.id) as player1,
 (select firstname from heroku_082c330c1b339b6.players where player2id=heroku_082c330c1b339b6.players.id) as player2,
 player1goal, player2goal   from heroku_082c330c1b339b6.matchstat;`;
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, result) {
      if (err) throw reject(err);
      resolve(result);
    });
  });
};

exports.addplayer = function (fname, lname, sgroup) {
  console.log(fname, lname, sgroup);
  //INSERT INTO
  let sql = `INSERT INTO players(firstname, lastname,goalfor,goalagainst,points,groupname)  VALUES('${fname}','${lname}',0,0,0,'${sgroup}')`;
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      result.message = "Data Succesfully Inserted";
      resolve(result);
    });
  });
};

exports.recordresult = function (
  player1id,
  player1score,
  player2id,
  player2score
) {
  console.log(player1id, player1score, player2id, player2score);
  let player1point;
  let player2point;
  if (player1score > player2score) {
    player1point = 3;
    player2point = 0;
  } else if (player1score < player2score) {
    player2point = 3;
    player1point = 0;
  } else {
    player2point = 1;
    player1point = 1;
  }
  console.log("1", player1point, "2", player2point);
  let player1update = `update players set played=played+1, goalfor=goalfor+${player1score}, goalagainst=goalagainst+${player2score},points=points+${player1point} where id=${player1id}`;
  let player2update = `update players set played=played+1, goalfor=goalfor+${player2score}, goalagainst=goalagainst+${player1score},points=points+${player2point} where id=${player2id}`;
  updatePlayersReslult(player1update);
  updatePlayersReslult(player2update);
  let sql = `INSERT INTO matchstat(player1id,
     player2id,player1goal,player2goal,player1point,player2point)  VALUES(${player1id},${player2id},${player1score},${player2score},${player1point},${player2point})`;
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      result.message = "Data Succesfully Inserted";
      resolve(result);
    });
  });
};

updatePlayersReslult = function (sql) {
  conn.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    result.message = "Data Succesfully Inserted";
    //  resolve(result);
  });
};
exports.updateresult = function (
  player1id,
  player1score,
  player2id,
  player2score
) {
  console.log(player1id, player1score, player2id, player2score);
  let player1point;
  let player2point;
  if (player1score > player2score) {
    player1point = 3;
    player2point = 0;
  } else if (player1score < player2score) {
    player2point = 3;
    player1point = 0;
  } else {
    player2point = 1;
    player1point = 1;
  }
  console.log("1", player1point, "2", player2point);
  let player1update = `update players set  goalfor=${player1score}, goalagainst=${player2score},points=${player1point} where id=${player1id}`;
  let player2update = `update players set goalfor=${player2score}, goalagainst=${player1score},points=${player2point} where id=${player2id}`;
  updatePlayersReslult(player1update);
  updatePlayersReslult(player2update);
  let sql = `INSERT INTO matchstat(player1id,
     player2id,player1goal,player2goal,player1point,player2point)  VALUES(${player1id},${player2id},${player1score},${player2score},${player1point},${player2point})`;
  return new Promise(function (resolve, reject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      result.message = "Data Succesfully Inserted";
      resolve(result);
    });
  });
};

exports.res = function () {};
