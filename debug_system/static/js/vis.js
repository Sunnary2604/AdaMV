
let percentage = 0.8;
let font;
let scalePercentage = ($('#left').width()*percentage)/1920;
let rightNowBackgroundViewBox;
function backgroundView(viewport,door) {
    d3.select('#'+door).selectAll('rect').remove();
    d3.select('#'+door).selectAll('g').remove();
    let device = viewport['Interaction_modality'];
    let deviceW = viewport['Size']['width'];
    let deviceH = viewport['Size']['height'];
    let leftSvgW = $('#'+door).width();
    let leftSvgH = $('#'+door).height();
    let leftSvgCenterX = leftSvgW/2;
    let leftSvgCenterY = leftSvgH/2;
    let strokeW = 20;
    let g = d3.select('#'+door).append('g');

    if(device == 'desktop'){
        let deviceDisplayW = leftSvgW*percentage;
        let deviceDisplayH = deviceDisplayW*deviceH/deviceW;
        let item1W = 10;
        let item1H = 50;
        let item2W = deviceDisplayW/2;
        let item2H = 10;
        let deviceDisplayX = leftSvgCenterX - deviceDisplayW/2;
        let deviceDisplayY = leftSvgCenterY - (deviceDisplayH+item1H+item2H)/2;
        let item1X = leftSvgCenterX-item1W/2;
        let item1Y = leftSvgCenterY+deviceDisplayH - (deviceDisplayH+item1H+item2H)/2;
        let item2X = leftSvgCenterX-item2W/2;
        let item2Y = item1Y+50;
        g.append('rect')
            .attr('class', 'rect')
            .attr('x',deviceDisplayX)
            .attr('y',deviceDisplayY)
            .attr('rx', 20)
            .attr('ry', 20)
            .attr('width', deviceDisplayW)
            .attr('height', deviceDisplayH)
            .style('fill', 'white')
            .style('stroke', 'black')
            .style('stroke-width', strokeW);
        g.append('rect')
            .attr('x', item1X)
            .attr('y', item1Y)
            .attr('width', item1W)
            .attr('height', item1H)
            .style('fill', 'black');
        d3.select('#left').append('rect')
            .attr('x', item2X)
            .attr('y', item2Y)
            .attr('width', deviceDisplayW/2)
            .attr('height', item2H)
            .style('fill', 'black');
        return [deviceDisplayX+strokeW/2,deviceDisplayY+strokeW/2,deviceDisplayW-strokeW,deviceDisplayH-strokeW];
    }

    if(viewport['Rotate']){
        let deviceDisplayW = leftSvgW*percentage;
        let deviceDisplayH = deviceDisplayW*deviceH/deviceW;
        let deviceDisplayX = leftSvgCenterX - deviceDisplayW/2;
        let deviceDisplayY = leftSvgCenterY - deviceDisplayH/2;
        let itemR = 18;
        let itemX = deviceDisplayX+deviceDisplayW;
        let itemY = leftSvgCenterY;

        g.append('rect')
            .attr('class', 'rect')
            .attr('x',deviceDisplayX)
            .attr('y',deviceDisplayY)
            .attr('rx', 20)
            .attr('ry', 20)
            .attr('id', '123')
            .attr('width', deviceDisplayW)
            .attr('height', deviceDisplayH)
            .style('fill', 'white')
            .style('stroke', 'black')
            .style('stroke-width', strokeW)
        g.append('circle')
            .attr('cx', itemX)
            .attr('cy', itemY)
            .attr('r', itemR/2)
            .style('fill', 'white');
        if(door == 'right'){
            rightNowBackgroundViewBox = [deviceDisplayX+strokeW/2,deviceDisplayY+strokeW/2,deviceDisplayW-strokeW,deviceDisplayH-strokeW];
        }
        return [deviceDisplayX+strokeW/2,deviceDisplayY+strokeW/2,deviceDisplayW-strokeW,deviceDisplayH-strokeW];

        
    }else{
        let deviceDisplayH = leftSvgH*percentage;
        let deviceDisplayW = deviceDisplayH*deviceW/deviceH;
        console.log(deviceDisplayH, deviceDisplayW, deviceW, deviceH)
        let deviceDisplayX = leftSvgCenterX - deviceDisplayW/2;
        let deviceDisplayY = leftSvgCenterY - deviceDisplayH/2;
        let itemR = 18;
        let itemX = leftSvgCenterX;
        let itemY = leftSvgCenterY+deviceDisplayH/2;

        g.append('rect')
            .attr('class', 'rect')
            .attr('x',deviceDisplayX)
            .attr('y',deviceDisplayY)
            .attr('rx', 20)
            .attr('ry', 20)
            .attr('id', '123')
            .attr('width', deviceDisplayW)
            .attr('height', deviceDisplayH)
            .style('fill', 'white')
            .style('stroke', 'black')
            .style('stroke-width', strokeW)
        g.append('circle')
            .attr('cx', itemX)
            .attr('cy', itemY)
            .attr('r', itemR/2)
            .style('fill', 'white');
        if(door == 'right'){
            rightNowBackgroundViewBox = [deviceDisplayX+strokeW/2,deviceDisplayY+strokeW/2,deviceDisplayW-strokeW,deviceDisplayH-strokeW];
        }
        return [deviceDisplayX+strokeW/2,deviceDisplayY+strokeW/2,deviceDisplayW-strokeW,deviceDisplayH-strokeW];

    }
}
let res, rightRes,border;
let dataToView = new Map();
// Convert the data to the size of the corresponding viewport and store the new data
function  display(viewport, views, door, idDoor){
    d3.select(door).selectAll('.view').remove();
    d3.selectAll('.'+idDoor+'p').remove();
    let top = $(door).position().top;
    let left = $(door).position().left;
    let unit;
    border=Math.round(10*Math.min(viewport[3],viewport[2])/1080);
    let father=document.getElementById(idDoor+'-svg');
    father.style.position="absolute";
    
    father.style.top = (top+viewport[1]) + 'px';
    father.style.left = (left+viewport[0]) + 'px';
    father.style.width=viewport[2].toString()+"px";
    father.style.height=viewport[3].toString()+"px";
    let resTmp=[];
    for (let i = 0; i < views.Interface.length; i++)
    {
        font={};
        font.size=Math.round(22-10*(1-(Math.min(views.Modality.Size.width,views.Modality.Size.height)-320)/760))*scalePercentage;
        font.gap=Math.round(0.1*font.size*scalePercentage);
        let bbox = views['Interface'][i]['BoundingBox'];
        let w = bbox['Size']['width']*viewport[2];
        let h = bbox['Size']['height']*viewport[3];
        let x = (bbox['CenterPosition']['x'])*viewport[2] - w/2;
        let y = (bbox['CenterPosition']['y'])*viewport[3] - h/2;
        add_div(i, x, y, w, h, idDoor,viewport, views.Interface[i],door,views);
        resTmp[i] = singleViewdisplay(i,views, w, h, door, idDoor);
    }

    updateViews(resTmp,views,idDoor,viewport);
    if(door === '#left')
    {
        res = resTmp;
    }else {
        rightRes = resTmp;
    }
}

function singleViewdisplay(i,views, w, h, door, idDoor){
    let unit = transform(i,views.Interface[i], w, h);
    if (views.Interface[i].ViewType.type === "arc")
    {
        unit.view = {};
        unit.view.stroke = null;
    }
    let name = "#"+idDoor+"p" + i.toString();
    unit.autosize={};
    unit.autosize.type="fit";
    unit.autosize.contains="padding";
    if (door == '#right'){
        unit.InputJsonStoreOrder = views['Interface'][i]['InputJsonStoreOrder'];
    }
    vegaEmbed(name, unit, {renderer: 'svg'});
    return unit;
}

function updateViews(resTmp,views,idDoor,viewport){
    
    setTimeout(function () {
        readData(resTmp,views);
        views=adjust_vl(views,resTmp,idDoor,viewport);
    },
    600);
    setTimeout(function(){
        adjust_svg(resTmp,idDoor);
    },900);
    setTimeout(function(){
        correct_AxistitleandPielabel(resTmp,idDoor);
    },1200);
    form_linking(views,idDoor);
}
// The display on the right after conversion

function rightDisplay(viewport,right, fatherHeight) {
    display(viewport,right,'#right','right-middle-content1');
}
function readData(views,data) {
    for(let i=0;i<views.length;i++)
    {
        if(get_url(i,data)!==null)
        {
            d3.csv(get_url(i,data),function(error,csvdata){
                dataToView.set(i,csvdata);
            })
        }
    }
}
function get_url(num,data)
{
    if(data.Interface[num].ViewType.type === "bar"||data.Interface[num].ViewType.type === "circle")
    {
        return data.Interface[num].Encoding.url;
    }
    else if(Object.prototype.toString.call(data.Interface[num].Encoding)=== "[object Array]")
    {
        return data.Interface[num].Encoding[1].url;
    }
    return null;
}
function bottomDisplay(name,direction,viewport) {
    let viewRes;
    if(name == 'right-bottom-title'){
        viewRes = rightRes;
        // viewRes.sort(sortViewRes);
    }else{
        viewRes = res
    }
    d3.select('#'+name).select('ul').remove();
    let ul = d3.select('#'+name).append('ul').attr('class','nav nav-pills nav-fill');
    ul.style('padding',0).style('overflow','hidden');
    for(let i=0;i<viewRes.length;i++){
        let li = ul.append('li')
            .attr('class','nav-item').text(function () {
                return textIndex(name, viewRes, i);
            })
            .style('color',function () {
                return colorIndex(name, viewRes, i);
            })
            .style('cursor','pointer');
        li.on('click', function () {
            svDisplay(document.getElementById(direction+'p'+i.toString()),viewport);
            let group = document.querySelector('#'+name);
            let circleNodes = group.getElementsByTagName('li');
            d3.select('#'+name).selectAll('li').style("background-color", "#bebdbe")
                .style('font-weight', 'normal')
            d3.select(circleNodes[i]).style("background-color", "#f1f0f2").style('font-weight', 'bold');
        });
    }

//    default view 0
    svDisplay(document.getElementById(direction+'p0'),viewport);
    let group = document.querySelector('#'+name);
    let circleNodes = group.getElementsByTagName('li');
    d3.select(circleNodes[0]).style("background-color", "#f1f0f2").style('font-weight','bold');
}

function colorIndex(name, viewRes, i) {
    if(name == 'right-bottom-title'){
        return viewIndexColor[viewRes[i]['InputJsonStoreOrder']]
    }else{
        return viewIndexColor[i];
    }

}

function textIndex(name, viewRes, i) {
    if(name == 'right-bottom-title'){
        return 'View'+(viewRes[i]['InputJsonStoreOrder']+1).toString();
    }else{
        return 'View'+(i+1).toString();
    }

}


