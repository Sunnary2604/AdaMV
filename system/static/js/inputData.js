function handleFiles() {
  var selectedFile = document.getElementById("files").files[0]; //Get the read File object
  var reader = new FileReader(); // read operation is completed here
  reader.readAsText(selectedFile); // Read the contents of the file
  reader.onload = function () {
        // This function will be called back when the reading is complete, and then the contents of the file are stored in the result at that point. It can be manipulated directly.
    data = JSON.parse(this.result);
    if (this.result) {
      box = backgroundView(data["Modality"], "left");
      display(box, data, "#left", "left-middle-content1");
      indexLocal(data);
      input(data["Modality"]);
      bottomDisplay("left-bottom-title", "left-middle-content1", box);
      recordInterfaceViewState("left", data["Interface"]);
    }
  };
}

let leftInterfaceViewState = new Map();
let rightInterfaceViewState = [];
//initialize all exist True axisX, axisY, legend
function recordInterfaceViewState(direction, interface) {
  if (direction == "left") {
    for (let i = 0; i < interface.length; i++) {
      leftInterfaceViewState.set(i + "x", true);
      leftInterfaceViewState.set(i + "y", true);
      leftInterfaceViewState.set(i + "legend", true);
      leftInterfaceViewState.set(i + "xtitle", true);
      leftInterfaceViewState.set(i + "ytitle", true);
      leftInterfaceViewState.set(i + "xlabel", true);
      leftInterfaceViewState.set(i + "ylabel", true);
    }
  } else {
    for (let t = 0; t < interface.length; t++) {
      let temp = new Map();
      for (let i = 0; i < interface[t]["Interface"].length; i++) {
        temp.set(i + "x", true);
        temp.set(i + "y", true);
        temp.set(i + "legend", true);
        temp.set(i + "xtitle", true);
        temp.set(i + "ytitle", true);
        temp.set(i + "xlabel", true);
        temp.set(i + "ylabel", true);
      }
      rightInterfaceViewState.push(temp);
    }
  }
}
