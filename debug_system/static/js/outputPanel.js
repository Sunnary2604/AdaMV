let outputDeviceInfo;
function devicesSelectDisplay() {
  var select = document.getElementById("devicesSelect");
  var oadTitle = select.options[select.selectedIndex].innerText;
  var oadTitleLower = oadTitle.replace(/\s/g, "").toLowerCase();
  outputDeviceInfo = backgroundTo.get(oadTitleLower);
  document.getElementById("outputrotateSelect").value = "0";
  shareOut(outputDeviceInfo);
}

function rotateOutput() {
  var select = document.getElementById("outputrotateSelect");
  var oadTitle = select.options[select.selectedIndex].innerText;
  var flag = false;
  if (outputDeviceInfo["Size"].width > outputDeviceInfo["Size"].height) {
    flag = true;
  }
  if (oadTitle == "Landscape") {
    outputDeviceInfo["Rotate"] = true;
  } else {
    outputDeviceInfo["Rotate"] = false;
  }
  if ((flag && oadTitle == "Portrait") || (!flag && oadTitle == "Landscape")) {
    let temp = outputDeviceInfo["Size"].width;
    outputDeviceInfo["Size"].width = outputDeviceInfo["Size"].height;
    outputDeviceInfo["Size"].height = temp;
    shareOut(outputDeviceInfo);
  }
}

function shareOut(t) {
  output(t);
  backgroundView(t, "right");
  $("#outputwidth").val(t["Size"].width);
  $("#outputheight").val(t["Size"].height);
}

let backgroundBoxes = [
  { device: "desktop", width: 1920, height: 1080 },
  { device: "iphone7/8", width: 375, height: 667 },
  { device: "iphonex/xs/11/11pro", width: 375, height: 812 },
  { device: "iphonexr/11promax", width: 414, height: 896 },
  { device: "ipadmini/air", width: 768, height: 1024 },
  { device: "samsunggalaxytab", width: 800, height: 1280 },
];

let backgroundTo = new Map();
setBackgroundEntry();

function setBackgroundEntry() {
  for (let i = 0; i < backgroundBoxes.length; i++) {
    setBackground(
      backgroundBoxes[i].device,
      backgroundBoxes[i].width,
      backgroundBoxes[i].height
    );
  }
}
function setBackground(device, width, height) {
  let background = {
    Interaction_modality: device,
    Size: {
      height: height,
      width: width,
    },
    Rotate: false,
  };
  backgroundTo.set(device, background);
}

let textMap = new Map();
textMap.set("iphone7/8", "iPhone 7/8");
textMap.set("desktop", "Desktop");
textMap.set("iphonex/xs/11/11pro", "iPhone X/XS/11/11 Pro");
textMap.set("iphonexr/11promax", "iPhone XR/11 Pro Max");
textMap.set("ipadmini/air", "iPad Mini/Air");
textMap.set("samsunggalaxytab", "Samsung Galaxy Tab");

function output(t) {
  console.log(t);
  $("#iphone").empty();
  $("#iphone").append(
    '<div class="d1">' +
      textMap.get(t["Interaction_modality"]) +
      "&nbsp(" +
      t["Size"].width +
      "x" +
      t["Size"].height +
      ")</div>"
  );
}
