var counter = 0;
var arrayplayer = [];
var playerid = [];
$(document).ready(function () {
  getpage();
  $("div.playersdivTable").on("change", "#selectedplayer", function (event) {
    let selectedtd = $(this).val();

    arrayplayer[counter] = selectedtd;
    let datalength = $(this).parent().parent().children().last().text();
    playerid[counter] = datalength;
    console.log(playerid);

    console.log(datalength);
    counter++;

    // if (arrayplayer.length >= 3) {
    //   //this.checked = false;
    //   console.log(this.checked);
    //   // return;
    // }

    if (counter >= 1) {
      $("#Player1scorelabel").text(arrayplayer[0]);

      $("#Player2scorelabel").text(arrayplayer[1]);
    }
  });
  $("form#playerform").submit(function (event) {
    event.preventDefault();
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;

    let selectedgroup = document.querySelector("#group").value;
    $.post("https://tournament-table.herokuapp.com/addplayer", {
      firstname: fname,
      lastname: lname,
      selectedgroup: selectedgroup,
    })
      .done(function (data) {
        $(".messagediv").append(data.message);

        $("form#playerform")[0].reset();
        setTimeout(() => {
          getpage();
        }, 1500);
        // console.log(data[0]["word"]);
      })
      .fail(function (err) {
        $(".messagediv").append(err);
      });
  });

  $("form#resultform").submit(function (event) {
    event.preventDefault();
    let player1score = $("#Player1score").val();
    let player2score = $("#Player2score").val();
    console.log(player1score + " and " + player2score);

    $.post("https://tournament-table.herokuapp.com/recordresult", {
      player1id: playerid[0],
      player1score: player1score,
      player2id: playerid[1],
      player2score: player2score,
    })
      .done(function (data) {
        $(".messagediv").append(data.message);

        $("form#playerform")[0].reset();
        setTimeout(() => {
          getpage();
        }, 1500);
        // console.log(data[0]["word"]);
      })
      .fail(function (err) {
        $(".messagediv").append(err);
      });
  });
});
$("#edit").click(function (event) {
  event.preventDefault();
  let player1score = $("#Player1score").val();
  let player2score = $("#Player2score").val();
  console.log(player1score + " and " + player2score);

  $.post("https://tournament-table.herokuapp.com/updateresult", {
    player1id: playerid[0],
    player1score: player1score,
    player2id: playerid[1],
    player2score: player2score,
  })
    .done(function (data) {
      $(".messagediv").append(data.message);

      $("form#playerform")[0].reset();
      setTimeout(() => {
        getpage();
      }, 1500);
      // console.log(data[0]["word"]);
    })
    .fail(function (err) {
      $(".messagediv").append(err);
    });
});

function getpage() {
  $.get("https://tournament-table.herokuapp.com/getall")
    .done(function (data) {
      loadingform(data);
    })
    .fail(function (data) {
      displayerror(data);
    });

  $.get("https://tournament-table.herokuapp.com/matchstat")
    .done(function (data) {
      loadingMatchStatForm(data);
    })
    .fail(function (data) {
      displayerror(data);
    });
  $.get("https://tournament-table.herokuapp.com/quarterFinal")
    .done(function (data) {
      loadingQuaretFinalForm(data);
    })
    .fail(function (data) {
      displayerror(data);
    });
}

function loadingMatchStatForm(data) {
  $(".matchstattable").empty();
  $(".messagediv").empty();
  let tablesadd = $(`<table id="ranktable"> <tr>
             
                 <th>Player1 Name</th>
                   <th>Player1 Goal</th>
                   <th>Player2 Goal</th>
                  <th>Player2 Name</th>
                
                  
                     
                      
            </tr>`);

  for (let i = 0; i < data.length; i++) {
    let forg = parseInt(data[i].goalfor);
    let agst = parseInt(data[i].goalagainst);
    let diff = parseInt(data[i].goalfor) - parseInt(data[i].goalagainst);
    let tradd = $(`<tr class="row${i + 1}">
 
        <td id="row${i + 1}" >${data[i].player1}</td>
         <td id="row${i + 1}" >${data[i].player1goal}</td>
        <td id="row${i + 1}"> ${data[i].player2goal} </td>
       <td id="row${i + 1}"> ${data[i].player2} </td>
    
      
    
    </tr>`);
    tablesadd.append(tradd);
  }
  $(".matchstattable").append(tablesadd);
}
function loadingQuaretFinalForm(data) {
  $(".quarterFinal").empty();
  $(".messagediv").empty();
  let tablesadd = $(`<table id="ranktable"> <tr>
             
                 <th>Players' Name</th>
            </tr>`);

  for (let i = 0; i < data.length; i++) {
    let forg = parseInt(data[i].goalfor);
    let agst = parseInt(data[i].goalagainst);
    let diff = parseInt(data[i].goalfor) - parseInt(data[i].goalagainst);
    let tradd = $(`<tr class="row${i + 1}">
 
        <td id="row${i + 1}" >${data[i].player1}</td>
         <td id="row${i + 1}" >${data[i].player1goal}</td>
        <td id="row${i + 1}"> ${data[i].player2goal} </td>
       <td id="row${i + 1}"> ${data[i].player2} </td>
    
      
    
    </tr>`);
    tablesadd.append(tradd);
  }
  $(".quarterFinal").append(tablesadd);
}

function loadingform(data) {
  console.log(data);

  $(".playersdivTable").empty();
  $(".messagediv").empty();
  let tablesadd = $(`<table id="ranktable"> <tr>
             
                 <th>First Name</th>
                  <th>Last Name</th>
                  <th>Played</th>
                   <th>Goal For</th>
                    <th>Goal Against</th>
                     <th>Goal Difference</th>
                     <th>Points</th>
                      <th>groupname</th>
                      <th>pick player for a match</th>
                     
                      
            </tr>`);

  for (let i = 0; i < data.length; i++) {
    let forg = parseInt(data[i].goalfor);
    let agst = parseInt(data[i].goalagainst);
    let diff = parseInt(data[i].goalfor) - parseInt(data[i].goalagainst);
    let tradd = $(`<tr class="row${i + 1}">
 
        <td id="row${i + 1}" >${data[i].firstname}</td>
    <td id="row${i + 1}"> ${data[i].lastname} </td>
    <td id="row${i + 1}"> ${data[i].played} </td>
    <td id="row${i + 1}">${forg}</td>
    <td id="row${i + 1}">${agst}</td>
    <td id="row${i + 1}">${data[i].goaldifference}</td>
    <td id="row${i + 1}">${data[i].points}</td>
    <td id="row${i + 1}">${data[i].groupname}</td>
    <td id="row${i + 1}"><input type="checkbox" value="${data[i].firstname}${
      data[i].lastname
    }" id="selectedplayer" name="selectedplayer" class="selectedplayer"></td>
    <td hidden>${data[i].id}</td>
    </tr>`);
    tablesadd.append(tradd);
  }
  $(".playersdivTable").append(tablesadd);
  $(".listplayer1").empty();
  let option1 = $(`  <select name="player1group" id="player1group">`);
  for (let index = 0; index < data.length; index++) {
    let eachoption = `<option value="Group1"> Group1</option>`;
  }
}
function displayerror(data) {
  $(".divTable").empty();
  $(".divTable").append(`<div class="divRow">${data.responseText}</div>`);
}
