let legendState = true;
let axisState = new Map();
axisState.set("x", true);
axisState.set("y", true);
let titleState = new Map();
titleState.set("x", true);
titleState.set("y", true);

function svDisplay(view, viewport) {
  //viewDoor left/right
  //viewId view selection 0, 1, 2, 3
  // viewData json data
  // ViewRes vegalite format input data
  let viewArray = view.id.split("-");
  let viewDoor = viewArray[0];
  let viewId = viewArray[2].slice(9, viewArray[2].length);

  let viewData, viewRes, viewState;
  if (viewDoor == "left") {
    viewData = data;
    viewRes = res;
    viewState = leftInterfaceViewState;
  } else {
    viewData = rightData;
    viewRes = rightRes;
    if (totalTurnPage != 0) {
      viewState = rightInterfaceViewState[currentTurnPage];
    } else {
      viewState = rightInterfaceViewState[selectPageNumNow - 1];
    }
  }

  // Determine the height of the display
  d3.select("." + viewDoor + "-bottom-content")
    .select(".container")
    .selectAll("*")
    .remove();
  let boxHeight = d3.select("." + viewDoor + "-bottom-content").style("height");
  let titleHeight = d3.select("#" + viewDoor + "-bottom-title").style("height");
  let containerHeight = parseFloat(boxHeight) - parseFloat(titleHeight);

  // Divided into left and right side equal format
  let container = d3
    .select("." + viewDoor + "-bottom-content")
    .select(".container")
    .style("flex-direction", "row")
    .style("width", "100%")
    .style("height", containerHeight + "px")
    .style("padding-left", 0)
    .style("padding-right", 0)
    .style("padding-top", "0px")
    .style("padding-bottom", "0px");
  container
    .append("div")
    .attr("class", "bottomContent test-2")
    .attr("id", viewDoor + "buttonDisplay");
  container
    .append("div")
    .attr("class", "bottomContent  test-2")
    .attr("id", viewDoor + "grammarDisplay");

  buttonDisplay(
    viewDoor + "buttonDisplay",
    viewRes,
    viewId,
    viewData,
    view,
    viewDoor,
    viewport,
    viewState
  );
  jsonDisplay(viewDoor + "grammarDisplay", viewData, viewId, viewDoor);
}
function jsonDisplay(boxId, viewData, viewId, viewDoor) {
  let boxData = viewData["Interface"][viewId];
  let deviceWidth = viewData["Modality"]["Size"]["width"];
  let deviceHeight = viewData["Modality"]["Size"]["height"];
  let mark = {
    Mark: boxData["ViewType"],
  };
  let boundingbox = {
    BoundingBox: {
      cx: parseInt(boxData["BoundingBox"]["CenterPosition"]["x"] * deviceWidth),
      cy: parseInt(
        boxData["BoundingBox"]["CenterPosition"]["y"] * deviceHeight
      ),
      width: parseInt(boxData["BoundingBox"]["Size"]["width"] * deviceWidth),
      height: parseInt(boxData["BoundingBox"]["Size"]["height"] * deviceHeight),
    },
  };

  let x = {
    Encoding: { x: boxData["Encoding"]["x"] },
  };
  let y = {
    Encoding: { y: boxData["Encoding"]["y"] },
  };
  let flagxy = false;
  if (boxData["Encoding"].hasOwnProperty("x")) {
    flagxy = true;
  }
  let legend = 0;
  if (boxData["Encoding"].length == 2) {
    if (boxData["Encoding"][1].hasOwnProperty("color")) {
      legend = {
        Encoding: { color: boxData["Encoding"][1]["color"] },
      };
    } else if (boxData["Encoding"][1].hasOwnProperty("size")) {
      legend = {
        Encoding: { size: boxData["Encoding"][1]["size"] },
      };
    }
  } else {
    if (boxData["Encoding"].hasOwnProperty("color")) {
      legend = {
        Encoding: { color: boxData["Encoding"]["color"] },
      };
    } else if (boxData["Encoding"].hasOwnProperty("size")) {
      legend = {
        Encoding: { size: boxData["Encoding"]["size"] },
      };
    }
  }

  let boxesData = [mark, boundingbox, x, y, legend];
  let boxesId = ["ViewType", "BoundingBox", "x", "y", "legend"];
  // console.log(boxesData)
  for (let i = 0; i < boxesData.length; i++) {
    if (boxesData[i] == 0) {
      continue;
    }
    let element = document.getElementById(boxId);
    if (boxesId[i] == "x") {
      let jsonWindowPre = document.createElement("pre");
      let encoding = {
        Encoding: {},
      };
      jsonWindowPre.innerHTML = syntaxHighlight("encodingbefore", encoding);
      element.appendChild(jsonWindowPre);
    }
    if (
      (boxesId[i] == "x" && flagxy == false) ||
      (boxesId[i] == "y" && flagxy == false)
    ) {
      continue;
    } else {
      let jsonWindow = document.createElement("div");
      jsonWindow.className = "jsonWindowBox";
      jsonWindow.id = "json" + viewDoor + boxesId[i];
      if (boxesId[i] == "x" || boxesId[i] == "y" || boxesId[i] == "legend") {
      } else {
        jsonWindow.style.margin = "0px 5px 0spx 5px";
      }
      element.appendChild(jsonWindow);
      let jsonWindowPre = document.createElement("pre");
      jsonWindowPre.innerHTML = syntaxHighlight(boxesId[i], boxesData[i]);
      jsonWindow.appendChild(jsonWindowPre);
    }

    if ((legend == 0 && boxesId[i] == "y") || boxesId[i] == "legend") {
      let jsonWindowPre = document.createElement("pre");
      let encoding = {
        Encoding: {},
      };
      jsonWindowPre.innerHTML = syntaxHighlight("encodingafter", encoding);
      element.appendChild(jsonWindowPre);
    }
  }
}
//read json file
function syntaxHighlight(boxesId, json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.substring(1, json.length - 2);
  json = json.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
  if (boxesId == "BoundingBox") {
    let str1 = json.match(/\{[^\}]+\}/)[0];
    let s = str1.replace(/[\r\n]/g, "");
    String.prototype.splice = function (start, newStr) {
      return this.slice(0, start) + newStr + this.slice(start);
    };
    let index = s.indexOf("{");
    s = s.splice(index + 1, "\r\n");
    index = s.indexOf("}");
    s = s.splice(index - 1, "\r\n");

    let f1 = s.indexOf(","); // The return value is 1, i.e. the first character . The subscript position of
    let f2 = s.indexOf(",", f1 + 1);
    s = s.splice(f2 + 1, "\r\n");
    json = json.replace(str1, s);
  }

  if (boxesId == "encodingbefore") {
    json = json.replace("}", "");
  }
  if (boxesId == "encodingafter") {
    let index1 = json.indexOf('"');
    let index2 = json.indexOf("{");
    let delJson = json.substring(index1, index2 + 1);
    json = json.replace(delJson, "");
    json = json.substring(1, json.length);
  }
  if (boxesId == "x" || boxesId == "y" || boxesId == "legend") {
    let index1 = json.indexOf("{");
    json = json.substring(index1 + 1, json.length);
    let pos = json.indexOf("}");
    let position = [];
    while (pos > -1) {
      position.push(pos);
      pos = json.indexOf("}", pos + 1);
    }
    json = json.substring(0, position[position.length - 1] - 1);
    json = json.substring(1, position[position.length - 1] - 1);
    json = json.substring(0, json.length - 2);
    json = json.replace("datum", "data-type");
    if (json.indexOf("domain") !== -1) {
      let subString = json.substring(json.indexOf("domain"), json.length - 1);
      let index1 = subString.indexOf("[");
      let index2 = subString.indexOf("]");
      let subS1 = subString.substring(index1, index2 + 1);
      let newSubS1 = subS1.replace(/[\r\n]/g, "");
      newSubS1 = newSubS1.replace(/\ +/g, "");
      json = json.replace(subS1, newSubS1);
    }
  }
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

function buttonDisplay(
  boxId,
  viewRes,
  viewId,
  viewData,
  view,
  viewDoor,
  viewport,
  viewState
) {
  $("#" + boxId).append(
    '<div class="accordion ' +
      boxId +
      '" id=' +
      boxId +
      '"accordionExample">\n' +
      "</div>"
  );
  viewType(viewRes, viewId, boxId);
  boundingBox(boxId, viewData, viewId, viewDoor);
  legend(viewRes, viewId, boxId, view, viewDoor, viewState);
  setTimeout(function () {
    axisDisplay(
      boxId,
      "x",
      "axisX",
      "X",
      viewRes,
      view,
      viewId,
      viewData,
      viewDoor,
      viewport,
      viewState
    );
    axisDisplay(
      boxId,
      "y",
      "axisY",
      "Y",
      viewRes,
      view,
      viewId,
      viewData,
      viewDoor,
      viewport,
      viewState
    );
  }, 1000);
}

function axisDisplay(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport,
  viewState
) {
  if (
    !viewRes[parseInt(viewId)].hasOwnProperty("layer") &&
    viewRes[parseInt(viewId)]["mark"]["type"] !== "arc" &&
    !viewRes[parseInt(viewId)]["encoding"].hasOwnProperty("shape")
  ) {
    // console.log(viewRes);
    $("." + boxId).append(
      '<div class="accordion-item' +
        name +
        '">\n' +
        '<h2 class="accordion-header" id="' +
        boxId +
        "headingFour" +
        axis +
        '">\n' +
        '  <button class="accordion-button collapsed" id="' +
        viewDoor +
        axis +
        '" type="button" data-bs-toggle="collapse" data-bs-target="#' +
        boxId +
        "collapseFour" +
        axis +
        '" aria-expanded="false" aria-controls="' +
        boxId +
        "collapseFour" +
        axis +
        '">\n' +
        "    " +
        name +
        '  <img  id="' +
        viewDoor +
        "deleteOrAdd" +
        axis +
        '"></button>\n' +
        "</h2>\n" +
        '<div id="' +
        boxId +
        "collapseFour" +
        axis +
        '" class="accordion-collapse collapse" aria-labelledby="' +
        boxId +
        "headingFour" +
        axis +
        '" data-bs-parent="#' +
        boxId +
        'accordionExample">\n' +
        '  <div class="accordion-body' +
        name +
        '">\n' +
        "  </div>\n" +
        "</div>\n" +
        "</div>\n"
    );
    if (viewState.get(viewId + axis)) {
      d3.select("#" + viewDoor + "deleteOrAdd" + axis).attr(
        "src",
        "static/pic/minus.png"
      );
    } else {
      d3.select("#" + viewDoor + "deleteOrAdd" + axis).attr(
        "src",
        "static/pic/plus.png"
      );
    }

    axisIsDisplay(
      boxId,
      axis,
      Axis,
      name,
      viewRes,
      view,
      viewId,
      viewData,
      viewDoor,
      viewport,
      viewState
    );
    axisTitle(
      boxId,
      axis,
      Axis,
      name,
      viewRes,
      view,
      viewId,
      viewData,
      viewDoor,
      viewport,
      viewState
    );
    axisLabels(
      boxId,
      axis,
      Axis,
      name,
      viewRes,
      view,
      viewId,
      viewData,
      viewDoor,
      viewport,
      viewState
    );
  }
}
function axisIsDisplay(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport,
  viewState
) {
  $(".axis_switch" + boxId + axis).click(function () {
    if (axisState.get(axis)) {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = null;
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
    } else {
      delete viewRes[parseInt(viewId)]["encoding"][axis]["axis"];
      if (
        viewData["Interface"][parseInt(viewId)]["ViewType"].hasOwnProperty(
          "isRotated"
        ) &&
        axis == "x"
      ) {
        viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = { orient: "top" };
      }
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
      textWrap(viewId, viewData, viewDoor, viewport);
    }
    axisState.set(axis, !axisState.get(axis));
  });

  $("#" + viewDoor + "deleteOrAdd" + axis).click(function () {
    if (viewState.get(viewId + axis)) {
      d3.select("#" + viewDoor + "deleteOrAdd" + axis).attr(
        "src",
        "static/pic/plus.png"
      );
      d3.select("#" + viewDoor + axis).style("background-color", "#f5f5f5");
      document.styleSheets[0].addRule(
        "#" + viewDoor + axis + "::before",
        "background-image: url()"
      );
      $(".accordion-body" + name).css("display", "none");
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = null;
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
      viewState.set(viewId + axis, false);
    } else {
      d3.select("#" + viewDoor + "deleteOrAdd" + axis).attr(
        "src",
        "static/pic/minus.png"
      );
      d3.select("#" + viewDoor + axis).style("background-color", "#ffffff");
      $(".accordion-body" + name).css("display", "block");
      document.styleSheets[0].addRule(
        "#" + viewDoor + axis + "::before",
        "background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\")"
      );
      delete viewRes[parseInt(viewId)]["encoding"][axis]["axis"];
      if (
        viewData["Interface"][parseInt(viewId)]["ViewType"].hasOwnProperty(
          "isRotated"
        ) &&
        axis == "x"
      ) {
        viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = { orient: "top" };
      }
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
      textWrap(viewId, viewData, viewDoor, viewport);
      viewState.set(viewId + axis, true);
    }
  });
}

function axisTitle(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport,
  viewState
) {
  // axis title
  let height = "24px";
  let imgHeight = "20px";
  $("#" + boxId + "collapseFour" + axis + " > div").append(
    '<div class="containerRowAxis">\n' +
      '<div class="containerRowTTitleAxis">' +
      "Title:" +
      "</div>\n" +
      '<div class="containerRowContentAxis">' +
      '<input type="text" id="' +
      boxId +
      axis +
      'input" style="height:' +
      height +
      '; width: 50%; margin-left: 42px">' +
      '<img id = "' +
      boxId +
      axis +
      'cancel" style="height:' +
      imgHeight +
      "; width: " +
      imgHeight +
      ';padding-left: 5px">' +
      "</div>" +
      "</div>"
  );

  d3.select("#" + boxId + axis + "input").attr("value", function () {
    if (viewRes[parseInt(viewId)]["config"][Axis].hasOwnProperty("title")) {
      viewState.set(viewId + axis + "title", false);
      return "";
    } else if (
      viewRes[parseInt(viewId)]["encoding"][axis].hasOwnProperty("title")
    ) {
      if (viewRes[parseInt(viewId)]["encoding"][axis]["title"] == null) {
        viewState.set(viewId + axis + "title", false);
        return "";
      } else {
        return viewRes[parseInt(viewId)]["encoding"][axis]["title"];
      }
    } else {
      return viewRes[parseInt(viewId)]["encoding"][axis]["field"];
    }
  });

  if (viewState.get(viewId + axis + "title") == false) {
    d3.select("#" + boxId + axis + "cancel").attr("src", "static/pic/add1.png");
    d3.select("#" + boxId + axis + "input").attr("disabled", "true");
  } else {
    d3.select("#" + boxId + axis + "cancel").attr(
      "src",
      "static/pic/delete1.png"
    );
  }

  $("#" + boxId + axis + "input").keyup(function () {
    if (event.keyCode == 13) {
      viewRes[parseInt(viewId)]["encoding"][axis]["title"] = $(
        "#" + boxId + axis + "input"
      ).val();
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
      textWrap(viewId, viewData, viewDoor, viewport);
    }
  });

  d3.select("#" + boxId + axis + "cancel").on("click", function () {
    if (viewState.get(viewId + axis + "title")) {
      viewRes[parseInt(viewId)]["encoding"][axis]["title"] = null;
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
      textWrap(viewId, viewData, viewDoor, viewport);
      d3.select("#" + boxId + axis + "input").attr("disabled", "true");
      viewState.set(viewId + axis + "title", false);
      d3.select("#" + boxId + axis + "cancel").attr(
        "src",
        "static/pic/add1.png"
      );
    } else {
      viewRes[parseInt(viewId)]["encoding"][axis]["title"] = $(
        "#" + boxId + axis + "input"
      ).val();
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
      textWrap(viewId, viewData, viewDoor, viewport);
      viewState.set(viewId + axis + "title", true);
      $("#" + boxId + axis + "input").removeAttr("disabled");
      d3.select("#" + boxId + axis + "cancel").attr(
        "src",
        "static/pic/delete1.png"
      );
    }
  });
}

function axisLabels(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport,
  viewState
) {
  axisLabelsIsDisplay(
    boxId,
    axis,
    Axis,
    name,
    viewRes,
    view,
    viewId,
    viewData,
    viewDoor,
    viewport,
    viewState
  );
  axisLabelsSize(
    boxId,
    axis,
    Axis,
    name,
    viewRes,
    view,
    viewId,
    viewData,
    viewDoor,
    viewport
  );
  axisLabelsOrient(
    boxId,
    axis,
    Axis,
    name,
    viewRes,
    view,
    viewId,
    viewData,
    viewDoor,
    viewport
  );
}
function axisLabelsIsDisplay(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport,
  viewState
) {
  //axis label
  //display
  let imgHeight = "20px";
  $("#" + boxId + "collapseFour" + axis + " > div").append(
    '<div class="containerRowAxis" style="height: 28px; line-height: 28px; vertical-align: center;">\n' +
      '<div class="containerRowTitleAxis">' +
      "Label" +
      "</div>\n" +
      "</div>"
  );

  if (viewState.get(viewId + axis + "label")) {
    d3.select(".axis_switch_label" + boxId + axis).attr(
      "src",
      "static/pic/delete1.png"
    );
    d3.select("#" + viewDoor + boxId + axis + "orient").style(
      "display",
      "block"
    );
  } else {
    d3.select(".axis_switch_label" + boxId + axis).attr(
      "src",
      "static/pic/add1.png"
    );
    d3.select("#" + viewDoor + boxId + axis + "orient").style(
      "display",
      "none"
    );
  }
  $(".axis_switch_label" + boxId + axis).click(function () {
    if (viewState.get(viewId + axis + "label")) {
      axisLabel(viewRes, viewId, axis, view, false);
      viewState.set(viewId + axis + "label", false);
      d3.select(".axis_switch_label" + boxId + axis).attr(
        "src",
        "static/pic/add1.png"
      );
      d3.select("#" + viewDoor + boxId + axis + "orient").style(
        "display",
        "none"
      );
    } else {
      axisLabel(viewRes, viewId, axis, view, true);
      textWrap(viewId, viewData, viewDoor, viewport);
      viewState.set(viewId + axis + "label", true);
      d3.select(".axis_switch_label" + boxId + axis).attr(
        "src",
        "static/pic/delete1.png"
      );
      d3.select("#" + viewDoor + boxId + axis + "orient").style(
        "display",
        "block"
      );
    }
  });
}

function axisLabelsOrient(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport
) {
  //    orient
  $("#" + boxId + "collapseFour" + axis + " > div").append(
    '<div class="containerRowAxisOrient" id="' +
      viewDoor +
      boxId +
      axis +
      'orient">\n' +
      '<div class="containerRowTitleOrient">' +
      "Rotation:</div>\n" +
      '<div class="containerRowContentOrient">' +
      '<select id="' +
      boxId +
      "labelRotate" +
      axis +
      '"></select>' +
      "</div>" +
      "</div>"
  );

  let orientAngle = [-90, -45, -30, 0];
  let orientDefault = 0;

  if (viewRes[parseInt(viewId)]["config"][Axis].hasOwnProperty("labelAngle")) {
    orientDefault = viewRes[parseInt(viewId)]["config"][Axis]["labelAngle"];
  }
  for (let i = 0; i < orientAngle.length; i++) {
    let labelSelectItem = d3
      .select("#" + boxId + "labelRotate" + axis)
      .append("option")
      .attr("value", orientAngle[i])
      .text(orientAngle[i]);
    if (orientAngle[i] == orientDefault) {
      labelSelectItem.attr("selected", true);
    }
  }
  $("#" + boxId + "labelRotate" + axis).click(function () {
    if (viewRes[parseInt(viewId)]["encoding"][axis].hasOwnProperty("axis")) {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"]["labelAngle"] =
        parseInt($(this).children("option:selected").val());
    } else {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = {
        labelAngle: parseInt($(this).children("option:selected").val()),
      };
    }
    if (
      viewRes[parseInt(viewId)]["config"][Axis].hasOwnProperty("labelAngle")
    ) {
      viewRes[parseInt(viewId)]["config"][Axis]["labelAngle"] = parseInt(
        $(this).children("option:selected").val()
      );
    }
    vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
  });
}

function axisLabelsSize(
  boxId,
  axis,
  Axis,
  name,
  viewRes,
  view,
  viewId,
  viewData,
  viewDoor,
  viewport
) {
  let height = "24px";
  $("#" + boxId + "collapseFour" + axis + " > div").append(
    '<div class="containerRowAxislabelSize" id="' +
      viewDoor +
      boxId +
      axis +
      'size">\n' +
      '<div class="containerRowlabelSize">' +
      "Size:</div>\n" +
      '<div class="containerRowContentlabelSize">' +
      '<button class="btnOperate1' +
      axis +
      '" >-</button>' +
      '<input class="numOperate" id="' +
      boxId +
      axis +
      'inputLabelSize">' +
      '<button class="btnOperate2' +
      axis +
      '" >+</button>' +
      "</div>" +
      "</div>"
  );
  d3.select("#" + boxId + axis + "inputLabelSize").attr("value", function () {
    if (viewRes[parseInt(viewId)]["encoding"][axis].hasOwnProperty("axis")) {
      if (
        viewRes[parseInt(viewId)]["encoding"][axis]["axis"].hasOwnProperty(
          "labelFontSize"
        )
      ) {
        return viewRes[parseInt(viewId)]["encoding"][axis]["axis"][
          "labelFontSize"
        ];
      }
    } else {
      return parseInt(
        viewRes[parseInt(viewId)]["config"]["axis"]["labelFontSize"].toString()
      );
    }
  });
  $(".btnOperate1" + axis).click(function () {
    btnReduce(boxId + axis + "inputLabelSize");
    if (viewRes[parseInt(viewId)]["encoding"][axis].hasOwnProperty("axis")) {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"]["labelFontSize"] = $(
        "#" + boxId + axis + "inputLabelSize"
      ).val();
    } else {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = {
        labelFontSize: $("#" + boxId + axis + "inputLabelSize").val(),
      };
    }
    vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
  });

  $(".btnOperate2" + axis).click(function () {
    btnAdd(boxId + axis + "inputLabelSize");
    if (viewRes[parseInt(viewId)]["encoding"][axis].hasOwnProperty("axis")) {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"]["labelFontSize"] = $(
        "#" + boxId + axis + "inputLabelSize"
      ).val();
    } else {
      viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = {
        labelFontSize: $("#" + boxId + axis + "inputLabelSize").val(),
      };
    }
    vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
  });
}

function legend(viewRes, viewId, boxId, view, viewDoor, viewState) {
  //Legend
  if (viewRes[parseInt(viewId)]["config"].hasOwnProperty("legend")) {
    $("." + boxId).append(
      '<div class="accordion-itemlegend">\n' +
        '<h2 class="accordion-header" id="' +
        boxId +
        'headingThree">\n' +
        '  <button class="accordion-button collapsed" id="' +
        viewDoor +
        'legend" type="button" data-bs-toggle="collapse" data-bs-target="#' +
        boxId +
        'collapseThree" aria-expanded="false" aria-controls="' +
        boxId +
        'collapseThree">\n' +
        "    " +
        viewRes[parseInt(viewId)]["config"]["legend"]["reason"] +
        "\n" +
        '  <img class="delete close"  id="' +
        boxId +
        'deletelegend"></img></button>\n' +
        "</h2>\n" +
        '<div id="' +
        boxId +
        'collapseThree" class="accordion-collapse collapse" aria-labelledby="' +
        boxId +
        'headingThree" data-bs-parent="#' +
        boxId +
        'accordionExample">\n' +
        '  <div class="accordion-bodylegend">\n' +
        "  </div>\n" +
        "</div>\n" +
        "</div>\n"
    );
    if (viewState.get(viewId + "legend")) {
      d3.select("#" + boxId + "deletelegend").attr(
        "src",
        "static/pic/minus.png"
      );
      if (viewRes[parseInt(viewId)]["config"]["legend"]["reason"] == "Color") {
        if (boxId == "leftbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "290px");
        } else if (boxId == "rightbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "239px");
        }
      } else if (
        viewRes[parseInt(viewId)]["config"]["legend"]["reason"] == "Size"
      ) {
        if (boxId == "leftbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "300px");
        } else if (boxId == "rightbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "249px");
        }
      }
    } else {
      d3.select("#" + boxId + "deletelegend").attr(
        "src",
        "static/pic/plus.png"
      );
      if (viewRes[parseInt(viewId)]["config"]["legend"]["reason"] == "color") {
        if (boxId == "leftbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "290px");
        } else if (boxId == "rightbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "239px");
        }
      } else if (
        viewRes[parseInt(viewId)]["config"]["legend"]["reason"] == "Size"
      ) {
        if (boxId == "leftbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "300px");
        } else if (boxId == "rightbuttonDisplay") {
          d3.select("#" + boxId + "deletelegend").style("margin-left", "249px");
        }
      }
    }
    $("#" + boxId + "deletelegend").click(function () {
      if (viewRes[parseInt(viewId)]["config"].hasOwnProperty("legend")) {
        if (viewState.get(viewId + "legend")) {
          d3.select("#" + boxId + "deletelegend").attr(
            "src",
            "static/pic/plus.png"
          );
          d3.select("#" + viewDoor + "legend").style(
            "background-color",
            "#f5f5f5"
          );
          document.styleSheets[0].addRule(
            "#" + viewDoor + "legend::before",
            "background-image: url()"
          );
          $(".accordion-bodylegend").css("display", "none");
          viewRes[parseInt(viewId)]["config"]["legend"]["disable"] = true;
          viewState.set(viewId + "legend", false);
        } else {
          viewRes[parseInt(viewId)]["config"]["legend"]["disable"] = false;
          viewState.set(viewId + "legend", true);
          d3.select("#" + boxId + "deletelegend").attr(
            "src",
            "static/pic/minus.png"
          );
          d3.select("#" + viewDoor + "legend").style(
            "background-color",
            "#ffffff"
          );
          document.styleSheets[0].addRule(
            "#" + viewDoor + "legend::before",
            "background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\")"
          );
          $(".accordion-bodylegend").css("display", "block");
        }
      }
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
    });

    //Legend orient
    $("#" + boxId + "collapseThree > div").append(
      '<div class="containerRowLegend">\n' +
        '<div class="containerRowTitleLegend">' +
        "Position:</div>\n" +
        '<div class="containerRowContent' +
        boxId +
        'Legend">' +
        '<select id = "' +
        boxId +
        'orientLegend"></select>' +
        "</div>" +
        "</div>"
    );

    let orientPosition = [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ];
    let orientLegendDefault = "top-left";
    if (
      viewRes[parseInt(viewId)]["config"]["legend"].hasOwnProperty("orient")
    ) {
      orientLegendDefault =
        viewRes[parseInt(viewId)]["config"]["legend"]["orient"];
    }

    for (let i = 0; i < orientPosition.length; i++) {
      let legendSelectItem = d3
        .select("#" + boxId + "orientLegend")
        .append("option")
        .attr("value", orientPosition[i])
        .text(orientPosition[i]);
      if (orientPosition[i] == orientLegendDefault) {
        legendSelectItem.attr("selected", true);
      }
    }
    $("#" + boxId + "orientLegend").change(function () {
      viewRes[parseInt(viewId)]["config"]["legend"]["orient"] = $(this)
        .children("option:selected")
        .val();
      vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
    });
  }
}

function textWrap(i, data, idDoor, viewport) {
  setTimeout(function () {
    let adjustment;
    adjustment = judge(i, data, idDoor + "-middle-content1", viewport);
    if (adjustment.x.iflinebreak) {
      correct_label(i, idDoor + "-middle-content1");
    }
  }, 200);
}

function axisLabel(viewRes, viewId, axis, view, flag) {
  if (viewRes[parseInt(viewId)]["encoding"][axis].hasOwnProperty("axis")) {
    viewRes[parseInt(viewId)]["encoding"][axis]["axis"]["labels"] = flag;
  } else {
    viewRes[parseInt(viewId)]["encoding"][axis]["axis"] = { labels: flag };
  }

  vegaEmbed("#" + view.id, viewRes[parseInt(viewId)], { renderer: "svg" });
}

function viewType(viewRes, viewId, boxId) {
  //ViewType
  let type;
  if (viewRes[parseInt(viewId)].hasOwnProperty("projection")) {
    type = "map";
  } else if (viewRes[parseInt(viewId)].hasOwnProperty("layer")) {
    type = "pie";
  } else {
    type = viewRes[parseInt(viewId)]["mark"]["type"];
  }
  $("." + boxId).append(
    '<div class="accordion-item">\n' +
      '<span class="accordion-singleRow" id="ViewType' +
      boxId +
      '">\n' +
      "Mark Type:&nbsp;" +
      '<img class="leftrow " src="http://hkust-cival.com:5000/static/pic/chart ' +
      type +
      '.png">' +
      type +
      "</span>\n" +
      "</div>"
  );
}

function boundingBox(boxId, viewData, viewId, viewDoor) {
  //BoundingBox
  $("." + boxId).append(
    '<div class="accordion-item-bbox">\n' +
      '<h2 class="accordion-header" id=' +
      boxId +
      '"headingTwo">\n' +
      '  <button class="accordion-button collapsed" id ="' +
      viewDoor +
      'BoundingBox" type="button" data-bs-toggle="collapse" data-bs-target="#' +
      boxId +
      'collapseTwo" aria-expanded="false" aria-controls="' +
      boxId +
      'collapseTwo">\n' +
      "    Bounding Box\n" +
      "  </button>\n" +
      "</h2>\n" +
      '<div id="' +
      boxId +
      'collapseTwo" class="accordion-collapse collapse" aria-labelledby=' +
      boxId +
      '"headingTwo" data-bs-parent="#' +
      boxId +
      'accordionExample">\n' +
      '  <div class="accordion-body-bbox">\n' +
      "  </div>\n" +
      "</div>\n" +
      "</div>\n"
  );

  let deviceWidth = viewData["Modality"]["Size"]["width"];
  let deviceHeight = viewData["Modality"]["Size"]["height"];
  let bboxValues = viewData["Interface"][parseInt(viewId)]["BoundingBox"];
  let bboxValue = [
    parseInt(bboxValues["CenterPosition"]["x"] * deviceWidth),
    parseInt(bboxValues["CenterPosition"]["y"] * deviceHeight),
    parseInt(bboxValues["Size"]["width"] * deviceWidth),
    parseInt(bboxValues["Size"]["height"] * deviceHeight),
  ];

  let TT = ["Center", "Dimension"];
  let bbox = ["X", "Y", "Width", "Height"];
  for (let i = 0; i < bbox.length; i++) {
    if (i % 2 == 0) {
      $("#" + boxId + "collapseTwo > div").append(
        '<div class="containerRowTTitleBbox">' + TT[i / 2] + "</div>\n"
      );
    }
    $("#" + boxId + "collapseTwo > div").append(
      '<div class="containerRowBbox">\n' +
        '<div class="containerRowTitleBbox">' +
        bbox[i] +
        ":</div>\n" +
        '<div class="containerRowContentBbox">' +
        bboxValue[i].toString() +
        "</div>\n" +
        "</div>"
    );
  }
}
