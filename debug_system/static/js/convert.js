//Convert function Calculation of indicators from one device to another
let rightData;

function convert() {
  document.getElementById("loading").style =
    "-webkit-animation: load 1.1s infinite linear;";
  document.getElementById("run").style = "display:none";

  //Get weight
  let sU = parseInt(document.getElementById("index_SU").value);
  let iF = parseInt(document.getElementById("index_IF").value);
  let aSChildNodes = document
    .getElementById("AS")
    .getElementsByTagName("input");
  let rSChildNodes = document
    .getElementById("RS")
    .getElementsByTagName("input");
  let aS = [];
  let rS = [];
  for (let i = 0; i < aSChildNodes.length; ) {
    let aSItem = {
      id: aSChildNodes[i].id.substring(16, aSChildNodes[i].id.length),
      value: document.getElementById(aSChildNodes[i].id).value,
    };
    let rSItem = {
      id: rSChildNodes[i].id.substring(16, rSChildNodes[i].id.length),
      value: document.getElementById(rSChildNodes[i].id).value,
    };
    aS.push(aSItem);
    rS.push(rSItem);
    i = i + 2;
  }
  let weight = [sU, iF, aS, rS];

  // Get device location and properties
  let allDevices = [
    {
      device: outputDeviceInfo["Interaction_modality"],
      x: 0,
      y: 0,
      width: outputDeviceInfo["Size"].width,
      height: outputDeviceInfo["Size"].height,
    },
  ];

  let Udata = JSON.stringify({
    device: allDevices,
    data: data,
    weight: weight,
    resultVega: res,
  });
  $.ajax({
    url: "http://127.0.0.1:5000/adaption",
    type: "post",
    contentType: "application/json; charset=UTF-8",
    data: Udata,
    success: function (item) {
      document.getElementById("run").style = "";
      document.getElementById("loading").style = "display:none";
      // right-end interface data returned by the back-end (here data is a json object)
      backgroundInfo.clear();
      recordInterfaceViewState("right", item);
      if (item[0].pages !== "scoll") {
        turnLeftOrRight(item);
      } else {
        scrollPage(item);
      }
    },
    error: function () {
      document.getElementById("run").style = "";
      document.getElementById("loading").style = "display:none";
      alert("error");
    },
  });
}

//left and right page turn
//Start Right side only
//end Only left
let totalTurnPage = 0;
let currentTurnPage = 0;
let backgroundInfo = new Map();
function turnLeftOrRight(item) {
  //show page 1
  d3.select("#turnRightBox").remove();
  d3.select("#turnLeftBox").remove();
  totalTurnPage = item.length;
  let backgroundToBox = backgroundView(outputDeviceInfo, "right");
  rightDisplay(backgroundToBox, item[0]);
  rightData = item[0];
  bottomDisplay("right-bottom-title", "right-middle-content1");
  if (item.length !== 1) {
    $(".right-middle").append(
      '<div style="position: absolute" id="turnRightBox">\n' +
        '<img id= "turnRight" src="static/pic/right.png" width="50px" height="50px">\n' +
        "</div>"
    );
    $(".right-middle").append(
      '<div style="position: absolute; display: none" id="turnLeftBox" >\n' +
        '<img id= "turnLeft" src="static/pic/left.png" width="50px" height="50px">\n' +
        "</div>"
    );
    if (currentTurnPage == item.length - 1) {
      $("#turnRightBox").css("display", "none");
    }
    let top = $("#right").position().top;
    let left = $("#right").position().left;

    $("#turnRightBox").css("top", top + rightNowBackgroundViewBox[3] / 2 + 20);
    $("#turnRightBox").css(
      "left",
      left + rightNowBackgroundViewBox[0] + rightNowBackgroundViewBox[2] + 50
    );

    // Find the location of the box

    $("#turnLeftBox").css("top", top + rightNowBackgroundViewBox[3] / 2 + 20);
    $("#turnLeftBox").css("left", left + rightNowBackgroundViewBox[0] - 100);

    d3.select("#turnRight").on("click", function () {
      currentTurnPage += 1;
      backgroundInfo.set(
        currentTurnPage,
        item[currentTurnPage]["Modality"]["Interaction_modality"]
          .replace(/\s/g, "")
          .toLowerCase()
      );
      let backgroundToBox = backgroundView(
        backgroundTo.get(backgroundInfo.get(currentTurnPage)),
        "right"
      );
      rightDisplay(backgroundToBox, item[currentTurnPage]);
      rightData = item[currentTurnPage];
      bottomDisplay("right-bottom-title", "right-middle-content1");
      if (currentTurnPage == 1) {
        d3.select("#turnLeftBox").style("display", "block");
      }
      if (currentTurnPage == item.length - 1) {
        d3.select("#turnRightBox").style("display", "none");
      }
    });
    $("#turnLeft").on("click", function () {
      currentTurnPage -= 1;
      backgroundInfo.set(
        currentTurnPage,
        item[currentTurnPage]["Modality"]["Interaction_modality"]
          .replace(/\s/g, "")
          .toLowerCase()
      );
      let backgroundToBox = backgroundView(
        backgroundTo.get(backgroundInfo.get(currentTurnPage)),
        "right"
      );
      rightDisplay(backgroundToBox, item[currentTurnPage]);
      rightData = item[currentTurnPage];
      bottomDisplay("right-bottom-title", "right-middle-content1");
      if (currentTurnPage == item.length - 2) {
        d3.select("#turnRightBox").style("display", "block");
      }
      if (currentTurnPage == 0) {
        d3.select("#turnLeftBox").style("display", "none");
      }
    });
  }
}

function scrollPage(item, viewport) {
  document.getElementById("right-middle-content1-svg").style.overflowY =
    "scroll";
  let addHeight = 0;
  totalTurnPage = 1;
  d3.select("#turnRightBox").remove();
  d3.select("#turnLeftBox").remove();
  let backgroundToBox = backgroundView(outputDeviceInfo, "right");
  for (let i = 1; i < item.length; i++) {
    addHeight += findHeight(item[i - 1]);
    for (let j = 0; j < item[i].Interface.length; j++) {
      let node = item[i].Interface[j];
      node.BoundingBox.CenterPosition.y += addHeight;
      item[0].Interface.push(node);
    }
  }

  rightData = item[0];
  rightDisplay(
    backgroundToBox,
    item[0],
    findHeight(item[item.length - 1]) * backgroundToBox[3]
  );
  bottomDisplay("right-bottom-title", "right-middle-content1");
}

function findHeight(item) {
  let maxHeight = -9999;
  for (let i = 0; i < item.Interface.length; i++) {
    let node = item.Interface[i].BoundingBox;
    maxHeight = Math.max(
      maxHeight,
      node.CenterPosition.y + node.Size.height / 2
    );
  }
  return maxHeight;
}
