//topology value
$(".topology-value").numInput({
  width: "30%", //width
  positive: true, // Allow positive numbers to be entered
  negative: false, // Allow negative numbers to be entered
  floatCount: 1, // Number of decimal places reserved
  // Namespaces to prevent style conflicts
  wrapperClass: "num-input-wrap", // Outermost container
  inputClass: "num-input", //input input box
  addClass: "add", // Add button
  subtractClass: "subtract", //Decrease button
  interval: 0.1, // increase & decrease the value of each change of the button
  id: "topology",
  input: "index_IF",
  maxNum: 1,
});
$(".topology-value").append(
  '<input id="index_IF" data-slider-id=\'ex1Slider\' type="text" data-slider-min="0"\n' +
    'data-slider-max="1"\n' +
    'data-slider-step="0.5" data-slider-value="1"/>'
);
$("#index_IF").slider({
  formatter: function (value) {
    return "" + value;
  },
});
$("#index_IF").on("change", function () {
  inputValChange("topology", "index_IF");
});

//spaceUtility
$(".geometry-value").numInput({
  width: "30%",
  positive: true,
  negative: false,
  floatCount: 1,
  wrapperClass: "num-input-wrap",
  inputClass: "num-input",
  addClass: "add",
  subtractClass: "subtract",
  interval: 0.1,
  id: "spaceUtility",
  input: "index_SU",
  maxNum: 1,
});
$(".geometry-value").append(
  '<input id="index_SU" data-slider-id=\'ex1Slider\' type="text" data-slider-min="0" \n' +
    'data-slider-max="1"\n' +
    'data-slider-step="0.5" data-slider-value="1"/>'
);

$("#index_SU").slider({
  formatter: function (value) {
    return "" + value;
  },
});
$("#index_SU").on("change", function () {
  inputValChange("spaceUtility", "index_SU");
});

let viewIndexColor = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#ffff33",
  "#a65628",
  "#f781bf",
  "#999999",
];
function indexLocal(sourceData) {
  const indexLocalData = sourceData["Interface"];
  let element1 = document.getElementById("AS");
  let element2 = document.getElementById("RS");
  d3.selectAll("#AS .as-box").remove();
  d3.selectAll("#RS .rs-box").remove();
  for (let i = 0; i < indexLocalData.length; i++) {
    //div
    let displayI = i + 1;
    let divItem1 = document.createElement("div");
    divItem1.className = "as-box";
    divItem1.id = "as-box" + i;
    element1.appendChild(divItem1);
    let itemLabel1 = document.createElement("span");
    itemLabel1.className = "viewName";
    itemLabel1.textContent = "View" + displayI;
    itemLabel1.style.color = viewIndexColor[i];
    divItem1.appendChild(itemLabel1);

    $("#as-box" + i).numInput({
      width: "30%",
      positive: true,
      negative: false,

      floatCount: 1,
      wrapperClass: "num-input-wrap",
      inputClass: "num-input",
      addClass: "add",
      subtractClass: "subtract",
      interval: 0.1,
      id: "as-boxV" + i,
      input: "index_AS" + i,
      maxNum: 1,
    });

    $("#as-box" + i + "").append(
      '<input id="index_AS' +
        i +
        '" data-slider-id=\'ex1Slider\' type="text" data-slider-min="0"\n' +
        'data-slider-max="1"\n' +
        'data-slider-step="0.5" data-slider-value="1"/>'
    );
    $("#" + "index_AS" + i).slider({
      formatter: function (value) {
        return "" + value;
      },
    });
    $("#" + "index_AS" + i).on("change", function () {
      inputValChange("as-boxV" + i, "index_AS" + i);
    });

    let divItem2 = document.createElement("div");
    divItem2.className = "rs-box";
    divItem2.id = "rs-box" + i;
    element2.appendChild(divItem2);
    let itemLabel2 = document.createElement("span");
    itemLabel2.className = "viewName";
    itemLabel2.textContent = "View" + displayI;
    itemLabel2.style.color = viewIndexColor[i];
    divItem2.appendChild(itemLabel2);

    $("#rs-box" + i).numInput({
      width: "30%",
      positive: true,
      negative: false,
      floatCount: 1,
      wrapperClass: "num-input-wrap",
      inputClass: "num-input",
      addClass: "add",
      subtractClass: "subtract",
      interval: 0.1,
      id: "rs-boxV" + i,
      input: "index_RS" + i,
      maxNum: 1,
    });

    $("#rs-box" + i + "").append(
      '<input id="index_RS' +
        i +
        '" data-slider-id=\'ex1Slider\' type="text" data-slider-min="0"\n' +
        'data-slider-max="1"\n' +
        'data-slider-step="0.5" data-slider-value="1"/>'
    );
    $("#" + "index_RS" + i).slider({
      formatter: function (value) {
        return "" + value;
      },
    });
    $("#" + "index_RS" + i).on("change", function () {
      inputValChange("rs-boxV" + i, "index_RS" + i);
    });
  }
}

function inputValChange(id, sliderId) {
  let val = $("#" + sliderId).slider("getValue");
  $("#num-input" + id).val(val);
}
