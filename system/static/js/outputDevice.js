let iconDevices = new Map();
iconDevices.set("phone", [56, 100]);
iconDevices.set("pad", [100, 100]);
iconDevices.set("r-phone", [80, 80]);
iconDevices.set("r-pad", [100, 100]);

iconDevices.set("iphone7", [56, 100]);
iconDevices.set("iphoneX", [56, 122]);
iconDevices.set("iphoneXR", [62, 134]);
iconDevices.set("ipad", [84, 112]);
iconDevices.set("ipads", [88, 140]);
iconDevices.set("r-phone7", [100, 56]);
iconDevices.set("riphoneX", [122, 56]);
iconDevices.set("riphoneXR", [134, 62]);
iconDevices.set("ripad", [112, 84]);
iconDevices.set("ripads", [140, 88]);

let backgroundInfo = new Map();
let selectPageNumNow = 1;

let backgroundTo = new Map();
setBackground();

function setBackground() {
  let desktopBackground = {
    Interaction_modality: "desktop",
    Size: {
      height: 1080,
      width: 1920,
    },
  };

  let iphone7Background = {
    Interaction_modality: "iphone7",
    Size: {
      width: 56,
      height: 100,
    },
  };
  backgroundTo.set("iphone7", iphone7Background);

  let iphoneXBackground = {
    Interaction_modality: "iphoneX",
    Size: {
      width: 56,
      height: 122,
    },
  };
  backgroundTo.set("iphoneX", iphoneXBackground);

  let riphoneXBackground = {
    Interaction_modality: "riphoneX",
    Size: {
      width: 122,
      height: 56,
    },
  };
  backgroundTo.set("riphoneX", riphoneXBackground);

  let iphoneXRBackground = {
    Interaction_modality: "iphoneXR",
    Size: {
      width: 62,
      height: 134,
    },
  };
  backgroundTo.set("iphoneXR", iphoneXRBackground);

  let riphoneXRBackground = {
    Interaction_modality: "riphoneXR",
    Size: {
      width: 134,
      height: 62,
    },
  };
  backgroundTo.set("riphoneXR", riphoneXRBackground);

  let ipadBackground = {
    Interaction_modality: "ipad",
    Size: {
      width: 84,
      height: 112,
    },
  };
  backgroundTo.set("ipad", ipadBackground);

  let ripadBackground = {
    Interaction_modality: "ripad",
    Size: {
      width: 112,
      height: 84,
    },
  };
  backgroundTo.set("ripad", ripadBackground);

  let ipadsBackground = {
    Interaction_modality: "ipads",
    Size: {
      width: 88,
      height: 140,
    },
  };
  backgroundTo.set("ipads", ipadsBackground);

  let ripadsBackground = {
    Interaction_modality: "ripads",
    Size: {
      width: 140,
      height: 88,
    },
  };
  backgroundTo.set("ripads", ripadsBackground);

  let padBackground = {
    Interaction_modality: "pad",
    Size: {
      height: 768,
      width: 1024,
    },
  };
  let rPhoneBackground = {
    Interaction_modality: "r-phone7",
    Size: {
      height: 56,
      width: 100,
    },
  };
  let rPadBackground = {
    Interaction_modality: "r-pad",
    Size: {
      height: 768,
      width: 1024,
    },
  };
  // backgroundTo.set('phone', phoneBackground);
  backgroundTo.set("pad", padBackground);
  backgroundTo.set("desktop", desktopBackground);
  backgroundTo.set("r-phone7", rPhoneBackground);
  backgroundTo.set("r-pad", rPhoneBackground);
}

function output(t) {
  $("#iphone").empty();
  if (t == "iphone7") {
    $("#iphone").append('<div class="d1">iPhone 7/8&nbsp(375x667)</div>');
  } else if (t == "r-phone7") {
    $("#iphone").append('<div class="d1">iPhone 7/8&nbsp(667x375)</div>');
  } else if (t == "iphoneX") {
    $("#iphone").append(
      '<div class="d1">iPhone X/XS/11/11 Pro&nbsp(375x812)</div>'
    );
  } else if (t == "riphoneX") {
    $("#iphone").append(
      '<div class="d1">iPhone X/XS/11/11 Pro&nbsp(812x375)</div>'
    );
  } else if (t == "iphoneXR") {
    $("#iphone").append(
      '<div class="d1">iPhone XR/11 Pro Max&nbsp(414x896)</div>'
    );
  } else if (t == "riphoneXR") {
    $("#iphone").append(
      '<div class="d1">iPhone XR/11 Pro Max&nbsp(896x414)</div>'
    );
  } else if (t == "ipad") {
    $("#iphone").append('<div class="d1">iPad Mini/Air&nbsp(1024x768)</div>');
  } else if (t == "ripad") {
    $("#iphone").append('<div class="d1">iPad Mini/Air&nbsp(768x1024)</div>');
  } else if (t == "ipads") {
    $("#iphone").append(
      '<div class="d1">Samsung Galaxy Tab&nbsp(1280x800)</div>'
    );
  } else if (t == "ripads") {
    $("#iphone").append(
      '<div class="d1">Samsung Galaxy Tab&nbsp(800x1280)</div>'
    );
  }
}

function dyDropDown(n) {
  let svgHeight = $("#output2-svg-panel").height();
  let svgWidth = $("#output2-svg-panel").width();

  $("#1").change(function () {
    let deviceNum = $("#1").val();
    $("#output2-svg-panel").empty();
    output("iphone7");
    backgroundInfo.clear();
    let x = 30;
    let y = 15;
    if (deviceNum == 1) {
      x = 100;
      y = 78;
      i = 1;
      d3.select("#output2-svg-panel")
        .append("image")
        .attr("class", "imgOut")
        .attr("id", "img" + i)
        .attr("href", "static/pic/iphone7.png")
        .attr("x", x)
        .attr("y", y)
        .attr("width", iconDevices.get("phone")[0])
        .attr("height", iconDevices.get("phone")[1]);
      var startX = 100;
      var startY = 100;
      Snap("#img" + i).drag(dragMove, dragStart, dragEnd);
      backgroundInfo.set(i, "iphone7");

      function dragStart(x, y, evt) {
        // figure out where the circle currently is
        startX = parseInt(Snap("#img" + i).attr("x"), 10);
        startY = parseInt(Snap("#img" + i).attr("y"), 10);
      }

      function dragMove(dx, dy, x, y, evt) {
        if (
          startX + dx >= 0 &&
          startX + dx <= svgWidth - iconDevices.get(backgroundInfo.get(i))[0] &&
          startY + dy >= 0 &&
          startY + dy <= svgHeight - iconDevices.get(backgroundInfo.get(i))[0]
        ) {
          Snap("#img" + i).attr({ x: startX + dx, y: startY + dy });
        }
      }

      function dragEnd(evt) {
        // no action required
      }
    } else if (deviceNum == 2) {
      x = 52;
      y = 78;
      for (let i = 1; i <= deviceNum; i++) {
        d3.select("#output2-svg-panel")
          .append("image")
          .attr("class", "imgOut")
          .attr("id", "img" + i)
          .attr("href", "static/pic/iphone7.png")
          .attr("x", x)
          .attr("y", y)
          .attr("width", iconDevices.get("phone")[0])
          .attr("height", iconDevices.get("phone")[1]);
        if (x <= 72) {
          x += iconDevices.get("phone")[0] + 50;
        }

        var startX = 100;
        var startY = 100;
        Snap("#img" + i).drag(dragMove, dragStart, dragEnd);
        backgroundInfo.set(i, "iphone7");

        function dragStart(x, y, evt) {
          // figure out where the circle currently is
          startX = parseInt(Snap("#img" + i).attr("x"), 10);
          startY = parseInt(Snap("#img" + i).attr("y"), 10);
        }

        function dragMove(dx, dy, x, y, evt) {
          if (
            startX + dx >= 0 &&
            startX + dx <=
              svgWidth - iconDevices.get(backgroundInfo.get(i))[0] &&
            startY + dy >= 0 &&
            startY + dy <= svgHeight - iconDevices.get(backgroundInfo.get(i))[0]
          ) {
            Snap("#img" + i).attr({ x: startX + dx, y: startY + dy });
          }
        }

        function dragEnd(evt) {
          // no action required
        }
      }
    } else if (deviceNum == 3) {
      x = 52;
      y = 18;
      for (let i = 1; i <= deviceNum; i++) {
        d3.select("#output2-svg-panel")
          .append("image")
          .attr("class", "imgOut")
          .attr("id", "img" + i)
          .attr("href", "static/pic/iphone7.png")
          .attr("x", x)
          .attr("y", y)
          .attr("width", iconDevices.get("phone")[0])
          .attr("height", iconDevices.get("phone")[1]);
        if (x <= 52) {
          x += iconDevices.get("phone")[0] + 39;
        } else {
          x = iconDevices.get("phone")[0] + 47;
          y += iconDevices.get("phone")[1] + 18;
        }
        var startX = 100;
        var startY = 100;
        Snap("#img" + i).drag(dragMove, dragStart, dragEnd);
        backgroundInfo.set(i, "iphone7");

        function dragStart(x, y, evt) {
          // figure out where the circle currently is
          startX = parseInt(Snap("#img" + i).attr("x"), 10);
          startY = parseInt(Snap("#img" + i).attr("y"), 10);
        }

        function dragMove(dx, dy, x, y, evt) {
          if (
            startX + dx >= 0 &&
            startX + dx <=
              svgWidth - iconDevices.get(backgroundInfo.get(i))[0] &&
            startY + dy >= 0 &&
            startY + dy <= svgHeight - iconDevices.get(backgroundInfo.get(i))[0]
          ) {
            Snap("#img" + i).attr({ x: startX + dx, y: startY + dy });
          }
        }

        function dragEnd(evt) {
          // no action required
        }
      }
    } else if (deviceNum == 4) {
      x = 52;
      y = 18;
      for (let i = 1; i <= deviceNum; i++) {
        d3.select("#output2-svg-panel")
          .append("image")
          .attr("class", "imgOut")
          .attr("id", "img" + i)
          .attr("href", "static/pic/iphone7.png")
          .attr("x", x)
          .attr("y", y)
          .attr("width", iconDevices.get("phone")[0])
          .attr("height", iconDevices.get("phone")[1]);
        if (x <= 52) {
          x += iconDevices.get("phone")[0] + 50;
        } else {
          x = iconDevices.get("phone")[0] - 4;
          y += iconDevices.get("phone")[1] + 18;
        }
        var startX = 100;
        var startY = 100;
        Snap("#img" + i).drag(dragMove, dragStart, dragEnd);
        backgroundInfo.set(i, "iphone7");

        function dragStart(x, y, evt) {
          // figure out where the circle currently is
          startX = parseInt(Snap("#img" + i).attr("x"), 10);
          startY = parseInt(Snap("#img" + i).attr("y"), 10);
        }

        function dragMove(dx, dy, x, y, evt) {
          if (
            startX + dx >= 0 &&
            startX + dx <=
              svgWidth - iconDevices.get(backgroundInfo.get(i))[0] &&
            startY + dy >= 0 &&
            startY + dy <= svgHeight - iconDevices.get(backgroundInfo.get(i))[0]
          ) {
            Snap("#img" + i).attr({ x: startX + dx, y: startY + dy });
          }
        }

        function dragEnd(evt) {
          // no action required
        }
      }
    } else if (deviceNum == 5) {
      x = 55;
      y = 32;
      for (let i = 1; i <= deviceNum; i++) {
        d3.select("#output2-svg-panel")
          .append("image")
          .attr("class", "imgOut")
          .attr("id", "img" + i)
          .attr("href", "static/pic/iphone7.png")
          .attr("x", x)
          .attr("y", y)
          .attr("width", iconDevices.get("phone")[0] - 11)
          .attr("height", iconDevices.get("phone")[1] - 20);
        if (x < 140) {
          x += iconDevices.get("phone")[0] + 40;
        } else {
          x = iconDevices.get("phone")[0] - 46;
          y = iconDevices.get("phone")[1] + 44;
        }

        var startX = 100;
        var startY = 100;
        Snap("#img" + i).drag(dragMove, dragStart, dragEnd);
        backgroundInfo.set(i, "iphone7");

        function dragStart(x, y, evt) {
          // figure out where the circle currently is
          startX = parseInt(Snap("#img" + i).attr("x"), 10);
          startY = parseInt(Snap("#img" + i).attr("y"), 10);
        }

        function dragMove(dx, dy, x, y, evt) {
          if (
            startX + dx >= 0 &&
            startX + dx <=
              svgWidth - iconDevices.get(backgroundInfo.get(i))[0] &&
            startY + dy >= 0 &&
            startY + dy <= svgHeight - iconDevices.get(backgroundInfo.get(i))[0]
          ) {
            Snap("#img" + i).attr({ x: startX + dx, y: startY + dy });
          }
        }

        function dragEnd(evt) {
          // no action required
        }
      }
    }

    //output creation device
    //clear the page number
    $(".svg-title").empty();

    // Add page number + initialize page i
    for (let i = 1; i <= deviceNum; i++) {
      $(".svg-title").append(
        '<a class="svg-title-1" id="svg-title' + i + '">' + i + "</a>"
      );

      backgroundView(backgroundTo.get("iphone7"), "right");
      $("#svg-title" + i).click(function () {
        selectPageNumNow = i;
        backgroundView(
          backgroundTo.get(backgroundInfo.get(selectPageNumNow)),
          "right"
        );
        d3.selectAll(".svg-title-1").style("background-color", "#fff");
        let div = document.getElementById("svg-title" + i);
        div.style.background = "#BEBDBE";
        output(backgroundInfo.get(i));
      });
    }
    //default The current page number is 1
    let div = document.getElementById("svg-title1");
    div.style.background = "#BEBDBE";
  });
  // Page click Show current page
  fff();
}

let selectImg;
function fff() {
  document.oncontextmenu = function (event) {
    event.preventDefault();
  };
  document.onmousedown = function (event) {
    let obj = event.target;
    if (obj.className["baseVal"] == "imgOut") {
      if (event.button == 2) {
        selectImg = obj.id;
        d3.select("#vis")
          .style("display", "block")
          .style("left", event.clientX + "px")
          .style("top", event.clientY - 30 + "px");
      }
    }
  };

  document.onmouseup = function (event) {
    let obj = event.target;
    if (
      obj.className == "accordion-button collapsed" ||
      obj.className == "accordion-button"
    ) {
      setTimeout(function () {
        if (event.target["ariaExpanded"] === "true") {
          $("#json" + obj.id).css("background-color", "#f1f0f2");
        } else if (event.target["ariaExpanded"] === "false") {
          $("#json" + obj.id).css("background-color", "white");
        }
      }, 60);
    }
  };
  //Cancel right click
  $("html")
    .on("contextmenu", function () {
      return false;
    })
    .click(function () {
      $("#vis").hide();
    });
}

backgroundToImg = new Map();
backgroundToImg.set("changeI7", ["iphone7", "56", "100"]);
backgroundToImg.set("changeIX", ["iphoneX", "56", "122"]);
backgroundToImg.set("changeIXR", ["iphoneXR", "62", "134"]);
backgroundToImg.set("changeTablet", ["ipad", "84", "112"]);
backgroundToImg.set("changeSam", ["ipads", "88", "140"]);

function changBackground(id) {
  d3.select("#" + selectImg)
    .attr("href", "static/pic/" + backgroundToImg.get(id)[0] + ".png")
    .attr("width", backgroundToImg.get(id)[1])
    .attr("height", backgroundToImg.get(id)[2]);
  d3.select("#vis").style("display", "none");
  if (selectPageNumNow == parseInt(selectImg.substring(3, selectImg.length))) {
    output(backgroundToImg.get(id)[0]);
  }
  backgroundInfo.set(
    parseInt(selectImg.substring(3, selectImg.length)),
    backgroundToImg.get(id)[0]
  );
  if (parseInt(selectImg.substring(3, selectImg.length)) == selectPageNumNow) {
    backgroundView(
      backgroundTo.get(backgroundInfo.get(selectPageNumNow)),
      "right"
    );
  }
}

function Rotate() {
  // console.log(id);
  let selectId = parseInt(selectImg.substring(3, selectImg.length));
  let selectRotate = backgroundInfo.get(selectId);
  if (selectRotate == "iphone7") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/riphone7.png")
      .attr("width", "100")
      .attr("height", "56");
    output("r-phone7");
    backgroundInfo.set(selectId, "r-phone7");
  } else if (selectRotate == "r-phone7") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/iphone7.png")
      .attr("width", "56")
      .attr("height", "100");
    output("iphone7");
    backgroundInfo.set(selectId, "iphone7");
  } else if (selectRotate == "iphoneX") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/riphone7.png")
      .attr("width", "122")
      .attr("height", "56");

    output("riphoneX");
    backgroundInfo.set(selectId, "riphoneX");
  } else if (selectRotate == "riphoneX") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/riphoneX.png")
      .attr("width", "56")
      .attr("height", "122");
    output("iphoneX");
    backgroundInfo.set(selectId, "iphoneX");
  } else if (selectRotate == "iphoneXR") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/riphoneXR.png")
      .attr("width", "134")
      .attr("height", "62");
    output("riphoneXR");
    backgroundInfo.set(selectId, "riphoneXR");
  } else if (selectRotate == "riphoneXR") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/iphone7.png")
      .attr("width", "62")
      .attr("height", "134");
    output("iphoneXR");
    backgroundInfo.set(selectId, "iphoneXR");
  } else if (selectRotate == "ipad") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/ripad.png")
      .attr("width", "112")
      .attr("height", "84");
    output("ripad");
    backgroundInfo.set(selectId, "ripad");
  } else if (selectRotate == "ripad") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/ipad.png")
      .attr("width", "84")
      .attr("height", "112");
    output("ipad");
    backgroundInfo.set(selectId, "ipad");
  } else if (selectRotate == "ipads") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/ripads.png")
      .attr("width", "140")
      .attr("height", "88");
    output("ripads");
    backgroundInfo.set(selectId, "ripads");
  } else if (selectRotate == "ripads") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/ipads.png")
      .attr("width", "88")
      .attr("height", "140");
    output("ipads");
    backgroundInfo.set(selectId, "ipads");
  } else if (selectRotate == "pad") {
    d3.select("#" + selectImg)
      .attr("href", "static/pic/ripad.png")
      .attr("width", "112")
      .attr("height", "84");
    backgroundInfo.set(selectId, "r-pad");
  } else if (selectRotate == "r-pad") {
    d3.select("#" + selectImg).attr("href", "static/pic/ipad.png");
    backgroundInfo.set(selectId, "pad");
  }
  if (selectId == selectPageNumNow) {
    backgroundView(
      backgroundTo.get(backgroundInfo.get(selectPageNumNow)),
      "right"
    );
  }
  d3.select("#vis").style("display", "none");
}
