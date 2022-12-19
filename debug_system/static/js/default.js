document.addEventListener("click", function (e) {
  let eventClientX = e.clientX;
  let eventClientY = e.clientY;

  //Mouse click on blank to eliminate
  let leftRect = d3.select("#left .rect");
  let rightRect = d3.select("#right .rect");
  let removeFlag = false;
  if (leftRect[0][0]) {
    let leftSvgTop = document
      .getElementById("left")
      .getBoundingClientRect().top;
    let leftSvgLeft = document
      .getElementById("left")
      .getBoundingClientRect().left;
    let leftRectX = leftRect[0][0].x.animVal.value;
    let leftRectY = leftRect[0][0].y.animVal.value;
    let leftRectW = leftRect[0][0].width.animVal.value;
    let leftRectH = leftRect[0][0].height.animVal.value;

    let maxX1 = leftSvgLeft + leftRectX + leftRectW,
      minX1 = leftSvgLeft + leftRectX;
    let maxY1 = leftSvgTop + leftRectY + leftRectH,
      minY1 = leftSvgTop + leftRectY;

    if (
      eventClientX >= minX1 &&
      eventClientX <= maxX1 &&
      eventClientY >= minY1 &&
      eventClientY <= maxY1
    ) {
      removeFlag = true;
    }
  }
  if (rightRect[0][0]) {
    let rightSvgTop = document
      .getElementById("right")
      .getBoundingClientRect().top;
    let rightSvgLeft = document
      .getElementById("right")
      .getBoundingClientRect().left;
    let rightRectX = rightRect[0][0].x.animVal.value;
    let rightRectY = rightRect[0][0].y.animVal.value;
    let rightRectW = rightRect[0][0].width.animVal.value;
    let rightRectH = rightRect[0][0].height.animVal.value;
    let maxX2 = rightSvgLeft + rightRectX + rightRectW,
      minX2 = rightSvgLeft + rightRectX;
    let maxY2 = rightSvgTop + rightRectY + rightRectH,
      minY2 = rightSvgTop + rightRectY;
    if (
      eventClientX >= minX2 &&
      eventClientX <= maxX2 &&
      eventClientY >= minY2 &&
      eventClientY <= maxY2
    ) {
      removeFlag = true;
    }
  }

  if (!removeFlag) {
    d3.selectAll(".oRcoordinates").remove();
    removeFlag = false;
  }
});
