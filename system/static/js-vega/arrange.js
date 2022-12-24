function sort(data)
{
    let i,j,k,y_k,y_j,height;
    let temp={};
    for(i=0;i<data.Interface.length;i++)
    {
        k=i;
        height=Math.round(data.Interface[k].BoundingBox.Size.height*data.Modality.Size.height);
        y_k=Math.round(data.Interface[k].BoundingBox.CenterPosition.y*data.Modality.Size.height-height/2);
        for(j=i+1;j<data.Interface.length;j++)
        {
            height=Math.round(data.Interface[j].BoundingBox.Size.height*data.Modality.Size.height);
            y_j=Math.round(data.Interface[j].BoundingBox.CenterPosition.y*data.Modality.Size.height-height/2);
            if(y_k>y_j)
            {
                k=j;
            }
        }
        if(k!==i)
        {
            temp=data.Interface[i];
            data.Interface[i]=data.Interface[k];
            data.Interface[k]=temp;
        }
    }
    return data;
}
function add_div(num,x,y,width,height,idDoor,viewport,interface,door,views)
{
    console.log(idDoor)
    let div=document.createElement("div");
    div.id=idDoor+"p"+num.toString();
    div.className = idDoor+"p";
    div.style.position="absolute";
    div.style.padding="0px";
    div.style.top=y.toString()+"px";
    div.style.left=x.toString()+"px";
    div.style.width=width.toString()+"px";
    div.style.height=height.toString()+"px";
    if(idDoor == 'left-middle-content1'){
        div.style.border=border.toString()+"px solid "+viewIndexColor[num];
        // div.style.border="2px solid black";
    }else{
        div.style.border=border.toString()+"px solid "+viewIndexColor[interface['InputJsonStoreOrder']];
    }
    calinterfaceORcoordinates(div,num, door);
    


    let mouseDownFun = function(){
        let name = idDoor.split("-");
        let group = document.querySelector('#'+name[0]+'-bottom-title');
        let circleNodes = group.getElementsByTagName('li');
        d3.select('#'+name[0]+'-bottom-title').selectAll('li').style("background-color", "#bebdbe")
            .style('font-weight','normal');
        d3.select(circleNodes[num]).style("background-color", "#f1f0f2").style('font-weight','bold');
        svDisplay(div,viewport);
        operation(div, num, views, door, idDoor,viewport);
    };
    div.addEventListener('mousedown', mouseDownFun, false);
    let father=document.getElementById(idDoor+"-svg");
    father.appendChild(div);
}
function transform(num,unit,width,height)
{
    let vlSpec={};
    vlSpec.$schema="https://vega.github.io/schema/vega-lite/v5.json";
    vlSpec.height=height-2*border;
    vlSpec.width=width-2*border;
    if(Object.prototype.toString.call(unit.Encoding)=== "[object Array]")
    {
        vlSpec=drawmap(unit,vlSpec);
    }
    else
    {
        if(unit.hasOwnProperty("transform"))
        {
            vlSpec=form_transform(unit,vlSpec);
            vlSpec.projection=unit.projection;
        }
        vlSpec=form_mark(unit,vlSpec);
        vlSpec.data={};
        vlSpec.data.url=unit.Encoding.url;
        vlSpec=form_encoding(unit,vlSpec);
        vlSpec=form_interaction(unit,vlSpec);
        vlSpec=form_config(unit,vlSpec);
        if(unit.hasOwnProperty("title"))
        {
            vlSpec.title={};
            vlSpec.title.text=unit.title;
            vlSpec.title.fontSize=1.1*font.size;
        }
    }
    return vlSpec;
}
function form_transform(unit,vlSpec)
{
    vlSpec.transform=[];
    vlSpec.transform[0]={};
    vlSpec.transform[0].lookup="id";
    vlSpec.transform[0].from={};
    vlSpec.transform[0].from.data=unit.transform.data;
    vlSpec.transform[0].from.key="id";
    vlSpec.transform[0].as="geo";
    return vlSpec;
}
function form_mark(unit,vlSpec)
{
    if(unit.hasOwnProperty("layer"))
    {
        vlSpec.layer=[];
        vlSpec.layer[0]={};
        vlSpec.layer[0].mark=unit.layer[0].ViewType;
        vlSpec.layer[1]={};
        vlSpec.layer[1].mark=unit.layer[1].ViewType;
        vlSpec.layer[1].mark.radius=Math.min(vlSpec.height,vlSpec.width)/3;
        vlSpec.layer[1].mark.fontSize=font.size;
        vlSpec.layer[1].encoding={};
        vlSpec.layer[1].encoding.text={};
        vlSpec.layer[1].encoding.text.field=unit.layer[1].encoding.text.field;
        vlSpec.layer[1].encoding.text.type=unit.layer[1].encoding.text.datum;
    }
    else
    {
        vlSpec.mark=unit.ViewType;
        // if(vlSpec.mark.type==="bar")
        // {
        //     vlSpec.mark.type=unit.ViewType.size*scalePercentage;
        // }
        if(vlSpec.mark.type==="side by side bar")
        {
            vlSpec.mark.type="bar";
            vlSpec.ifside=true;
        }
    }
    return vlSpec;
}
function drawmap(unit,vlSpec)
{
    vlSpec.projection=unit.Encoding[0].projection;
    vlSpec.layer=[];
    if(unit.hasOwnProperty("transform"))
    {
        vlSpec=form_transform(unit,vlSpec);
    }
    for(let i=0;i<unit.Encoding.length;i++)
    {
        vlSpec.layer[i]={};
        vlSpec.layer[i].mark=unit.ViewType[i];
        vlSpec.layer[i].data={};
        vlSpec.layer[i].data.url=unit.Encoding[i].url;
        if(unit.Encoding[i].hasOwnProperty("feature"))
        {
            vlSpec.layer[i].data.format={};
            vlSpec.layer[i].data.format.type="topojson";
            vlSpec.layer[i].data.format.feature=unit.Encoding[i].feature;
        }
        else
        {
            vlSpec.layer[i].encoding={};
            vlSpec.layer[i].encoding.longitude={};
            vlSpec.layer[i].encoding.latitude={};
            vlSpec.layer[i].encoding.size={};
            vlSpec.layer[i].encoding.longitude.field=unit.Encoding[i].x.field;
            vlSpec.layer[i].encoding.longitude.type=unit.Encoding[i].x.datum;
            vlSpec.layer[i].encoding.latitude.field=unit.Encoding[i].y.field;
            vlSpec.layer[i].encoding.latitude.type=unit.Encoding[i].y.datum;
            vlSpec.layer[i].encoding.size={};
            if(unit.Encoding[i].hasOwnProperty("size"))
            {
                vlSpec.layer[i].encoding.size.field=unit.Encoding[i].size.field;
                vlSpec.layer[i].encoding.size.type=unit.Encoding[i].size.datum;
                vlSpec.layer[i].encoding.size.scale={};
                vlSpec.layer[i].encoding.size.scale.rangeMax=Math.min(vlSpec.width,vlSpec.height);
                vlSpec.layer[i].encoding.size.scale.type="sqrt";
                if(unit.Encoding[i].size.hasOwnProperty("legend"))
                {
                    vlSpec.layer[i].encoding.size.legend=unit.Encoding[i].size.legend;
                }
            }
            else {
                if(unit.ViewType[i].type==="circle")
                {
                    vlSpec.layer[i].encoding.size.value = Math.min(vlSpec.width,vlSpec.height)/3;
                }
            }
            if(unit.Encoding[i].hasOwnProperty("color"))
            {
                vlSpec.layer[i].encoding.color={};
                vlSpec.layer[i].encoding.color.field=unit.Encoding[i].color.field;
                vlSpec.layer[i].encoding.color.type=unit.Encoding[i].color.datum;
                if(unit.Encoding[i].color.hasOwnProperty("scale"))
                {
                    vlSpec.layer[i].encoding.color.scale=unit.Encoding[i].color.scale;
                }
            }
            vlSpec.config={};
            vlSpec.config.legend={};

            if(unit.Encoding[i].hasOwnProperty("color"))
            {
                vlSpec.config.legend.reason="Color";
            }
            if(unit.Encoding[i].hasOwnProperty("size"))
            {
                vlSpec.config.legend.reason="Size";
            }
            vlSpec.config.legend.symbolSize=100*Math.min(vlSpec.width,vlSpec.height)/3240;
            vlSpec.config.legend.labelFontSize=font.size;
            vlSpec.config.legend.titleFontSize=font.size;
            vlSpec.config.legend.titlePadding=6*Math.min(vlSpec.width,vlSpec.height)/3240;
            vlSpec.config.legend.gradientThickness=16*Math.min(vlSpec.width,vlSpec.height)/540;
            let flag=false;
            if(unit.Encoding[i].hasOwnProperty("color")) {
                if (unit.Encoding[i].color.hasOwnProperty("legend")) {
                    if (unit.Encoding[i].color.legend !== null && unit.Encoding[i].color.legend.hasOwnProperty("orient")) {
                        flag = true;
                    }
                }
            }
            if(flag)
            {
                vlSpec.config.legend.orient=unit.Encoding[i].color.legend.orient;
                if(unit.Encoding[i].color.legend.orient==="left"||unit.Encoding[i].color.legend.orient==="right")
                {
                    vlSpec.config.legend.gradientLength=vlSpec.height*0.8;
                }
                if(unit.Encoding[i].color.legend.orient==="top"||unit.Encoding[i].color.legend.orient==="bottom")
                {
                    vlSpec.config.legend.gradientLength=0.3*vlSpec.width;
                }
            }
            else
            {
                vlSpec.config.legend.orient = "top-left";
            }
            vlSpec.config.legend.offset=10*Math.min(vlSpec.width,vlSpec.height)/3240;
            vlSpec.config.legend.symbolStrokeWidth=10*Math.min(vlSpec.width,vlSpec.height)/3240;
            //vlSpec.config.legend.tickCount = 2;
        }
    }
    return vlSpec;
}
function form_interaction(unit,vlSpec)
{
    if(unit.hasOwnProperty("Interaction"))
    {
        switch(unit.Interaction.type)
        {
            case "hover": {
                vlSpec.selection = {};
                vlSpec.selection.brush = {};
                vlSpec.selection.brush.type = "multi";
                vlSpec.selection.brush.on = "mouseover";
                vlSpec.mark.tooltip=true;
                break;
            }
            case "highlight": {
                vlSpec.selection = {};
                vlSpec.selection.brush = {};
                vlSpec.selection.brush.type = "multi";
                break;
            }
            case "zoom": {
                vlSpec.selection = {};
                vlSpec.selection.grid = {};
                vlSpec.selection.grid.type = "interval";
                vlSpec.selection.grid.bind = "scales";
                break;
            }
            default:
        }
        if(unit.Interaction.type==="highlight"||unit.Interaction.type==="hover")
        {
            vlSpec.encoding.color = {};
            vlSpec.encoding.color.value = unit.Interaction.value;
            vlSpec.encoding.color.condition = {};
            vlSpec.encoding.color.condition.selection = "brush";
            if(unit.DataValues.hasOwnProperty("color"))
            {
                vlSpec.encoding.color.condition.field=unit.DataValues.color.name;
                vlSpec.encoding.color.condition.type=unit.DataValues.color.type;
                vlSpec.encoding.color.labelAngle=unit.DataValues.color.labelRotation;
            }
        }
    }
    return vlSpec;
}
function form_encoding(unit,vlSpec)
{
    if(unit.ViewType.type==="arc")
    {
        vlSpec.encoding={};
        vlSpec.encoding.theta={};
        vlSpec.encoding.theta.field=unit.Encoding.theta.field;
        vlSpec.encoding.theta.type=unit.Encoding.theta.datum;
        vlSpec.encoding.theta.stack=true;
    }
    else if(unit.ViewType.type==="geoshape")
    {
        vlSpec.encoding={};
        vlSpec.encoding.shape={};
        vlSpec.encoding.shape.field="geo";
        vlSpec.encoding.shape.type="geojson";
    }
    else
    {
        vlSpec.encoding={};
        vlSpec.encoding.x={};
        vlSpec.encoding.y={};
        if(unit.Encoding.x.hasOwnProperty("sort"))
        {
            vlSpec.encoding.x.sort=unit.Encoding.x.sort;
        }
        if(unit.Encoding.y.hasOwnProperty("sort"))
        {
            vlSpec.encoding.y.sort=unit.Encoding.y.sort;
        }
        vlSpec.encoding.x.field=unit.Encoding.x.field;
        vlSpec.encoding.y.field=unit.Encoding.y.field;
        vlSpec.encoding.x.type=unit.Encoding.x.datum;
        vlSpec.encoding.y.type=unit.Encoding.y.datum;
        if(unit.Encoding.x.hasOwnProperty("scale"))
        {
            vlSpec.encoding.x.scale=unit.Encoding.x.scale;
        }
        if(unit.Encoding.y.hasOwnProperty("scale"))
        {
            vlSpec.encoding.y.scale=unit.Encoding.y.scale;
        }
        if(unit.Encoding.x.datum==="temporal")
        {
            if(unit.Encoding.x.hasOwnProperty("timeUnit"))
            {
                vlSpec.encoding.x.timeUnit=unit.Encoding.x.timeUnit;
            }
        }
        if(unit.ViewType.type==="rect")
        {
            vlSpec.encoding.x.bin={};
            vlSpec.encoding.x.bin.maxbins=Math.round((vlSpec.width-100)/10);
            vlSpec.encoding.y.bin={};
            vlSpec.encoding.y.bin.maxbins=Math.round(vlSpec.height/10);
            vlSpec.encoding.color={};
            vlSpec.encoding.color.aggregate="count";
            vlSpec.encoding.color.type="quantitative";
        }
        if(unit.ViewType.type==="rect" || unit.ViewType.type==="line"){
            if(unit.Encoding.x.hasOwnProperty('axis')){
                vlSpec.encoding.x.axis= unit.Encoding.x.axis;
            }
            if(unit.Encoding.y.hasOwnProperty('sort')){
                vlSpec.encoding.y.sort = unit.Encoding.y.sort;
            }
        }

    }
    if(unit.Encoding.hasOwnProperty("color"))
    {
        if(!unit.hasOwnProperty("Interaction"))
        {
            vlSpec.encoding.color={};
            vlSpec.encoding.color.field=unit.Encoding.color.field;
            vlSpec.encoding.color.type=unit.Encoding.color.datum;
            if(unit.Encoding.color.hasOwnProperty("scale"))
            {
                vlSpec.encoding.color.scale=unit.Encoding.color.scale;
            }
            if(unit.Encoding.color.hasOwnProperty("legend"))
            {
                vlSpec.encoding.color.legend=unit.Encoding.color.legend;
            }
        }
    }
    vlSpec.encoding.size={};
    if(unit.Encoding.hasOwnProperty("size"))
    {
        vlSpec.encoding.size.field=unit.Encoding.size.field;
        vlSpec.encoding.size.type=unit.Encoding.size.datum;
        vlSpec.encoding.size.scale={};
        vlSpec.encoding.size.scale.rangeMax=Math.min(vlSpec.width,vlSpec.height)/2;
        vlSpec.encoding.size.scale.type="sqrt";
        if(unit.Encoding.size.hasOwnProperty("legend"))
        {
            vlSpec.encoding.size.legend=unit.Encoding.size.legend;
        }
    }
    else
    {
        if(unit.ViewType.type==="circle")
        {
            vlSpec.encoding.size.value=70*Math.min(vlSpec.width,vlSpec.height)/1080;
        }
        else if(unit.ViewType.type==="line")
        {
            vlSpec.encoding.size.value=4*Math.min(vlSpec.width,vlSpec.height)/270;
        }
    }
    return vlSpec;
}
function form_config(unit,vlSpec)
{
    vlSpec.config={};
    if(unit.ViewType.type==="area"||unit.ViewType.type==="line"||unit.ViewType.type==="bar"||unit.ViewType.type==="circle"||unit.ViewType.type==="rect")
    {
        vlSpec.config.axisX={};
        vlSpec.config.axisX.titleFontSize=1.1*font.size;
        vlSpec.config.axisY={};
        vlSpec.config.axisY.titleFontSize=1.1*font.size;
        vlSpec.config.axisY.labelAngle=0;
        vlSpec.config.axis={};
        vlSpec.config.axis.labelFontSize=font.size;
        //vlSpec.config.axisX.titlePadding=35;
        vlSpec.config.axisX.labelAngle=0;
        //vlSpec.config.axisY.titlePadding=10;

        if(unit.Encoding.x.datum==="nominal"||unit.Encoding.x.datum==="ordinary")
        {
            vlSpec.config.axisX.title=null;
        }
        if(unit.Encoding.y.datum==="nominal"||unit.Encoding.y.datum==="ordinary")
        {
            vlSpec.config.axisY.title=null;
        }
        if(unit.Encoding.x.hasOwnProperty("title"))
        {
            vlSpec.config.axisX.title=unit.Encoding.x.title;
        }
        if(unit.Encoding.y.hasOwnProperty("title"))
        {
            vlSpec.config.axisY.title=unit.Encoding.y.title;
        }
        if(unit.Encoding.x.hasOwnProperty("format"))
        {
            vlSpec.config.axisX.format=unit.Encoding.x.format;
        }
        if(unit.Encoding.y.hasOwnProperty("format"))
        {
            vlSpec.config.axisY.format=unit.Encoding.y.format;
        }
        if(unit.Encoding.x.datum==="temporal")
        {
            if(unit.Encoding.x.hasOwnProperty("format"))
            {
                vlSpec.config.axisX.format=unit.Encoding.x.format;
            }
            if(unit.Encoding.x.hasOwnProperty("timeUnit"))
            {
                vlSpec.config.axisX.timeUnit=unit.Encoding.x.timeUnit;
            }
            vlSpec.config.axisX.title=null;
        }
        if(unit.Encoding.y.datum==="temporal")
        {
            if(unit.Encoding.y.hasOwnProperty("format"))
            {
                vlSpec.config.axisY.format=unit.Encoding.y.format;
            }
            vlSpec.config.axisY.title=null;
        }
    }
    vlSpec.config.padding={};
    vlSpec.config.padding.top=4;
    vlSpec.config.padding.bottom=4;
    vlSpec.config.padding.left=4;
    vlSpec.config.padding.right=4;
    if(unit.Encoding.hasOwnProperty("color")||unit.Encoding.hasOwnProperty("size"))
    {
        vlSpec.config.legend={};
        if(unit.Encoding.hasOwnProperty("color"))
        {
            vlSpec.config.legend.reason="Color";
        }
        if(unit.Encoding.hasOwnProperty("size"))
        {
            vlSpec.config.legend.reason="Size";
        }
        vlSpec.config.legend.symbolSize=100*Math.min(vlSpec.width,vlSpec.height)/540;
        vlSpec.config.legend.labelFontSize=font.size;
        vlSpec.config.legend.titleFontSize=font.size;
        vlSpec.config.legend.titlePadding=6*Math.min(vlSpec.width,vlSpec.height)/3240;
        vlSpec.config.legend.gradientThickness=16*Math.min(vlSpec.width,vlSpec.height)/350;
        let flag=false;
        if(unit.Encoding.color.hasOwnProperty("legend"))
        {
            if(unit.Encoding.color.legend!==null&&unit.Encoding.color.legend.hasOwnProperty("orient"))
            {
                flag=true;
            }
        }
        if(flag)
        {
            vlSpec.config.legend.orient=unit.Encoding.color.legend.orient;
            if(unit.Encoding.color.legend.orient==="left"||unit.Encoding.color.legend.orient==="right")
            {
                vlSpec.config.legend.gradientLength=vlSpec.height*0.8;
            }
            if(unit.Encoding.color.legend.orient==="top"||unit.Encoding.color.legend.orient==="bottom")
            {
                vlSpec.config.legend.gradientLength=0.3*vlSpec.width;
            }
        }
        else
        {
            if(unit.hasOwnProperty("transform"))
            {
                vlSpec.config.legend.orient="left";
                vlSpec.config.legend.gradientLength=vlSpec.height*0.8;
                vlSpec.config.legend.titlePadding=16*Math.min(vlSpec.width,vlSpec.height)/1080;
                // vlSpec.config.legend.padding=vlSpec.height*0.08;
            }
            else {
                vlSpec.config.legend.orient = "top-left";
            }
        }
        vlSpec.config.legend.offset=10*Math.min(vlSpec.width,vlSpec.height)/1080;
        //vlSpec.config.legend.tickCount = 2;
        if(unit.ViewType.type==="line")
        {
            vlSpec.config.legend.symbolStrokeWidth=0.01*vlSpec.height;
            vlSpec.config.legend.symbolSize=vlSpec.width/3.5;
        }
        if(unit.ViewType.type==="rect")
        {
            vlSpec.config.legend={};
            vlSpec.config.legend.symbolSize=vlSpec.width/10;
            vlSpec.config.legend.title=null;
            vlSpec.config.legend.labelFontSize=font.size;
        }
    }
    return vlSpec;
}