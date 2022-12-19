let oRRadius = 8;
let interfaceORcoordinates = {
  ORcoordinates: [],
  x: [],
  y: [],
  xMap: [],
  yMap: [],
};

function calinterfaceORcoordinates(div, num) {
  let clickDivTop = Number(div.style.top.slice(0, div.style.top.length - 2));
  let clickDivLeft = Number(div.style.left.slice(0, div.style.left.length - 2));
  let clickDivWidth = Number(
    div.style.width.slice(0, div.style.width.length - 2)
  );
  let clickDivHeight = Number(
    div.style.height.slice(0, div.style.height.length - 2)
  );

  let xyMap = xyinterfaceORcoordinates(
    clickDivTop,
    clickDivLeft,
    clickDivWidth,
    clickDivHeight,
    num
  );
  let oRcoordinates = {
    top: {
      top: clickDivTop - oRRadius,
      left: clickDivLeft + clickDivWidth / 2 - oRRadius,
      cursor: "s-resize",
      maps: xyMap.top,
      mapAxis: "yMap",
    },
    left: {
      top: clickDivTop + clickDivHeight / 2 - oRRadius,
      left: clickDivLeft - oRRadius,
      cursor: "w-resize",
      maps: xyMap.left,
      mapAxis: "xMap",
    },
    right: {
      top: clickDivTop + clickDivHeight / 2 - oRRadius,
      left: clickDivLeft + clickDivWidth - oRRadius,
      cursor: "w-resize",
      maps: xyMap.right,
      mapAxis: "xMap",
    },
    bottom: {
      top: clickDivTop + clickDivHeight - oRRadius,
      left: clickDivLeft + clickDivWidth / 2 - oRRadius,
      cursor: "s-resize",
      maps: xyMap.bottom,
      mapAxis: "yMap",
    },
  };
  // console.log(interfaceORcoordinates.ORcoordinates)
  interfaceORcoordinates.ORcoordinates[num] = oRcoordinates;
}

function xyinterfaceORcoordinates(
  clickDivTop,
  clickDivLeft,
  clickDivWidth,
  clickDivHeight,
  num
) {
  let x1 = parseInt(clickDivLeft);
  let x2 = parseInt(clickDivLeft + clickDivWidth);
  let y1 = parseInt(clickDivTop);
  let y2 = parseInt(clickDivTop + clickDivHeight);
  let x = [x1, x2];
  let xSpan = ["left", "right"];
  let y = [y1, y2];
  let ySpan = ["top", "bottom"];
  if (interfaceORcoordinates.x.length == 0) {
    interfaceORcoordinates.x.push(x1);
    interfaceORcoordinates.x.push(x2);
    interfaceORcoordinates.y.push(y1);
    interfaceORcoordinates.y.push(y2);
    interfaceORcoordinates.xMap.push(["div-" + num + "-left"]);
    interfaceORcoordinates.xMap.push(["div-" + num + "-right"]);
    interfaceORcoordinates.yMap.push(["div-" + num + "-top"]);
    interfaceORcoordinates.yMap.push(["div-" + num + "-bottom"]);
  } else {
    x.forEach((x, index) => {
      if (!interfaceORcoordinates.x.includes(x)) {
        interfaceORcoordinates.x.push(x);
        interfaceORcoordinates.xMap.push(["div-" + num + "-" + xSpan[index]]);
      } else {
        let xIndex = interfaceORcoordinates.x.indexOf(x);
        interfaceORcoordinates.xMap[xIndex].push(
          "div-" + num + "-" + xSpan[index]
        );
      }
    });
    y.forEach((y, index) => {
      if (!interfaceORcoordinates.y.includes(y)) {
        interfaceORcoordinates.y.push(y);
        interfaceORcoordinates.yMap.push(["div-" + num + "-" + ySpan[index]]);
      } else {
        let yIndex = interfaceORcoordinates.y.indexOf(y);
        interfaceORcoordinates.yMap[yIndex].push(
          "div-" + num + "-" + ySpan[index]
        );
      }
    });
  }
  return {
    top: interfaceORcoordinates.y.indexOf(y1),
    left: interfaceORcoordinates.x.indexOf(x1),
    right: interfaceORcoordinates.x.indexOf(x2),
    bottom: interfaceORcoordinates.y.indexOf(y2),
  };
}
function operation(div, num, views, door, idDoor, viewport) {
  clearORCoordinates();
  let clickDivId = div.id;

  let interfaceORcoordinatesX = interfaceORcoordinates.x
    .concat()
    .sort((a, b) => a - b);
  let interfaceORcoordinatesMinX = interfaceORcoordinates.x.indexOf(
    interfaceORcoordinatesX[0]
  );
  let interfaceORcoordinatesMaxX = interfaceORcoordinates.x.indexOf(
    interfaceORcoordinatesX[interfaceORcoordinatesX.length - 1]
  );
  let interfaceORcoordinatesY = interfaceORcoordinates.y
    .concat()
    .sort((a, b) => a - b);
  let interfaceORcoordinatesMinY = interfaceORcoordinates.y.indexOf(
    interfaceORcoordinatesY[0]
  );
  let interfaceORcoordinatesMaxY = interfaceORcoordinates.y.indexOf(
    interfaceORcoordinatesY[interfaceORcoordinatesY.length - 1]
  );
  let interfaceORcoordinatesXs = [
    interfaceORcoordinatesMinX,
    interfaceORcoordinatesMaxX,
  ];
  let interfaceORcoordinatesYs = [
    interfaceORcoordinatesMinY,
    interfaceORcoordinatesMaxY,
  ];
  let oRcoordinates = interfaceORcoordinates.ORcoordinates[num];

  //主

  for (let item in oRcoordinates) {
    if (
      (item == "left" || item == "right") &&
      interfaceORcoordinatesXs.includes(oRcoordinates[item].maps)
    ) {
      continue;
    } else if (
      (item == "top" || item == "bottom") &&
      interfaceORcoordinatesYs.indexOf(oRcoordinates[item].maps) !== -1
    ) {
      continue;
    }
    let oR = document.createElement("div");
    oR.className = "oRcoordinates";
    oR.id = "oRcoordinates" + item;
    oR.style.backgroundColor = "#f0f0f0";
    oR.style.border = "2px solid #969696";
    oR.style.height = oRRadius * 2 + "px";
    oR.style.width = oRRadius * 2 + "px";
    oR.style.borderRadius = oRRadius + "px";
    oR.style.cursor = oRcoordinates[item].cursor;
    oR.style.position = "absolute";
    oR.style.left = oRcoordinates[item].left + "px";
    oR.style.top = oRcoordinates[item].top + "px";
    oR.onmousedown = function (e) {
      let clickDivTop = [];
      let clickDivLeft = [];
      let clickDivWidth = [];
      let clickDivHeight = [];
      let clickORmaps =
        interfaceORcoordinates[oRcoordinates[item].mapAxis][
          oRcoordinates[item].maps
        ];
      for (let i = 0; i < clickORmaps.length; i++) {
        let iArr = clickORmaps[i].split("-");
        let divID = idDoor + "p" + iArr[1];
        let divSelects = document.getElementById(divID);
        clickDivTop.push(
          Number(divSelects.style.top.slice(0, divSelects.style.top.length - 2))
        );
        clickDivLeft.push(
          Number(
            divSelects.style.left.slice(0, divSelects.style.left.length - 2)
          )
        );
        clickDivWidth.push(
          Number(
            divSelects.style.width.slice(0, divSelects.style.width.length - 2)
          )
        );
        clickDivHeight.push(
          Number(
            divSelects.style.height.slice(0, divSelects.style.height.length - 2)
          )
        );
      }
      e = e || window.event;
      let xDown = e.clientX,
        yDown = e.clientY,
        leftDown = this.offsetLeft,
        topDown = this.offsetTop;

      document.onmousemove = function (e) {
        e = e || window.event;
        let xMove = e.clientX,
          yMove = e.clientY,
          x_ = xMove - xDown,
          y_ = yMove - yDown;

        if (item == "right") {
          oR.style.left = leftDown + x_ + "px";
        } else if (item == "left") {
          oR.style.left = leftDown + x_ + "px";
        } else if (item == "top") {
          oR.style.top = topDown + y_ + "px";
        } else if (item == "bottom") {
          oR.style.top = topDown + y_ + "px";
        }
        for (let i = 0; i < clickORmaps.length; i++) {
          let iArr = clickORmaps[i].split("-");
          let divID = idDoor + "p" + iArr[1];
          let divSelects = document.getElementById(divID);
          changedivStyle(
            divSelects,
            iArr[2],
            clickDivTop[i],
            clickDivLeft[i],
            clickDivWidth[i],
            clickDivHeight[i],
            x_,
            y_,
            Number(iArr[1]),
            views,
            door,
            idDoor,
            viewport
          );
        }
      };
    };
    document.onmouseup = function (e) {
      document.onmousemove = null;
    };
    document.getElementById(idDoor + "-svg").appendChild(oR);
  }
}
function changedivStyle(
  div,
  item,
  clickDivTop,
  clickDivLeft,
  clickDivWidth,
  clickDivHeight,
  x_,
  y_,
  num,
  views,
  door,
  idDoor,
  viewport
) {
  if (item == "right") {
    div.style.width = clickDivWidth + x_ + "px";
  } else if (item == "left") {
    div.style.width = clickDivWidth - x_ + "px";
    div.style.left = clickDivLeft + x_ + "px";
  } else if (item == "top") {
    div.style.height = clickDivHeight - y_ + "px";
    div.style.top = clickDivTop + y_ + "px";
  } else if (item == "bottom") {
    div.style.height = clickDivHeight + y_ + "px";
  }
  calinterfaceORcoordinates(div, num);
  let unit = singleViewdisplay(
    num,
    views,
    div.style.width.slice(0, div.style.width.length - 2),
    div.style.height.slice(0, div.style.height.length - 2),
    door,
    idDoor
  );
  updatedOperation(door, unit, num, views, idDoor, viewport);
}

function clearORCoordinates() {
  d3.selectAll(".oRcoordinates").remove();
}

function updatedOperation(door, unit, orderNum, views, idDoor, viewport) {
  let resTmp;
  if (door === "#left") {
    resTmp = res;
  } else {
    resTmp = rightRes;
  }
  resTmp[orderNum] = unit;
  updateViews(resTmp, views, idDoor, viewport);
  if (door === "#left") {
    res = resTmp;
  } else {
    rightRes = resTmp;
  }
}
