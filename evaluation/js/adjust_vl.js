function adjust_vl(data,views)
{
    let adjustment,unit,name;
    for(let i=0;i<data.Interface.length;i++)
    {
        if(views[i].hasOwnProperty("projection")||Object.keys(views[i]).length===0||views[i].hasOwnProperty("layer"))
        {
            continue;
        }
        adjustment=judge(i,data);
        unit=operation_vl(adjustment,views[i]);
        name = "#p" + i.toString();
        if(adjustment.x.iflinebreak)
        {
            if(adjustment.x.ifrotate)
            {
                views[i].config.padding.bottom=-10;
            }
            else
            {
                views[i].config.padding.bottom+=font.size;
            }
        }
        vegaEmbed(name, unit, {renderer: 'svg'});
        views[i]=unit;
        views[i].iflinebreak=adjustment.x.iflinebreak
    }
    return views;
}
function judge(num,data)
{
    let adjustment={},selectElement,name,width,height;
    name="#p"+num.toString()+" .role-axis-label";
    selectElement=$(name);
    adjustment.x={}
    adjustment.disableaxis=false;
    adjustment.transposition=false;
    adjustment.x.rotation=0;
    adjustment.x.iflinebreak=false;
    adjustment.x.ifrotate=false;
    adjustment.x.sub=0;
    adjustment.y={};
    adjustment.y.ifrotate=false;
    adjustment.y.rotation=0;
    adjustment.y.sub=0;
    adjustment=check_x(data.Interface[num],selectElement[0],adjustment);
    adjustment=check_y(selectElement[1],adjustment,data);
    width = Math.round(data.Interface[num].BoundingBox.Size.width * data.Modality.Size.width);
    height = Math.round(data.Interface[num].BoundingBox.Size.height * data.Modality.Size.height);
    adjustment=setValue(adjustment,width,height,data.Interface[num]);
    return adjustment;
}
function setValue(adjustment,width,height,unit)
{
    if(adjustment.x.ifrotate)
    {
        if(0.707*adjustment.x.maxlen>0.25*height)
        {
            if(unit.ViewType.type==="bar")
            {
                adjustment.transposition=true;
            }
            else if(unit.ViewType.type==="line")
            {
                adjustment.disableaxis=true;
            }
            adjustment.x.ifrotate=false;
        }
        else
        {
            adjustment.x.rotation=-45;
            adjustment.x.sub=Math.round(0.707*adjustment.x.maxlen-35);
        }
    }
    if(adjustment.y.ifrotate)
    {
        adjustment.y.rotation=-45;
        adjustment.y.sub=Math.round(0.707*adjustment.y.maxlen-45);
    }
    return adjustment;
}
function check_x(unit,Element,adjustment)
{
    let max_len=0,str,mid_1,mid_2,index,textlength_1,textlength_2,gap;
    str=Element.childNodes[0].attributes[1].value;
    index=str.indexOf(",");
    mid_1=Number(str.substring(10,index));
    for(let i=1;i<Element.childNodes.length;i++)
    {
        if(Element.childNodes[i].attributes[5].value==="1")
        {
            str=Element.childNodes[i].attributes[1].value;
            index=str.indexOf(",");
            mid_2=Number(str.substring(10,index));
            gap=i;
            break;
        }
    }
    for(let i=0;i<Element.childNodes.length;i=i+gap)
    {
        textlength_1=Element.childNodes[i].textLength.baseVal.value;
        str=Element.childNodes[i].attributes[1].value;
        index=str.indexOf(",");
        mid_1=Number(str.substring(10,index));
        if(i+gap<Element.childNodes.length)
        {
            textlength_2=Element.childNodes[i+gap].textLength.baseVal.value;
            str=Element.childNodes[i+gap].attributes[1].value;
            index=str.indexOf(",");
            mid_2=Number(str.substring(10,index));
            if((textlength_1+textlength_2)/2>Math.abs(mid_2-mid_1)-font.gap)
            {
                str=Element.childNodes[i].innerHTML;
                index=str.indexOf(" ");
                if(index===-1)
                {
                    if(mid_2-mid_1>font.size)
                    {
                        if(Math.max(textlength_1,textlength_2)===textlength_1)
                        {
                            adjustment.x.ifrotate=true;
                        }
                    }
                    else
                    {
                        if(unit.ViewType.type==="bar")
                        {
                            adjustment.transposition=true;
                            adjustment.x.ifrotate=false;
                        }
                        else if(unit.ViewType.type==="line")
                        {
                            adjustment.disableaxis=true;
                            adjustment.x.ifrotate=false;
                        }
                    }
                    if(Math.max(textlength_1,textlength_2)>max_len)
                    {
                        max_len=Math.max(textlength_1,textlength_2);
                    }
                }
                else if(!adjustment.x.ifrotate)
                {
                    adjustment.x.iflinebreak=true;
                }
                if(i+gap===Element.childNodes.length-1)
                {
                    str=Element.childNodes[i].innerHTML;
                    index=str.indexOf(" ");
                    if(index===-1)
                    {
                        if(mid_2-mid_1>font.size)
                        {
                            if (Math.max(textlength_1, textlength_2) === textlength_2)
                            {
                                adjustment.x.ifrotate = true;
                            }
                        }
                        else
                        {
                            adjustment.transposition=true;
                            adjustment.x.ifrotate=false;
                        }
                        if(Math.max(textlength_1,textlength_2)>max_len)
                        {
                            max_len=Math.max(textlength_1,textlength_2);
                        }
                    }
                    else if(!adjustment.x.ifrotate)
                    {
                        adjustment.x.iflinebreak=true;
                    }
                }
            }
        }
    }
    if(adjustment.x.ifrotate)
    {
        adjustment.x.maxlen=max_len;
    }
    if(adjustment.transposition)
    {
        adjustment.x.maxlen=max_len;
    }
    return adjustment;
}
function check_y(Element,adjustment,data)
{
    let max_len=0;
    for(let i=0;i<Element.childNodes.length;i++)
    {
        if(Element.childNodes[i].textLength.baseVal.value>max_len)
        {
            max_len=Element.childNodes[i].textLength.baseVal.value;
        }
    }
    adjustment.y.maxlen=max_len;
    if(max_len>0.15*data.Modality.Size.width)
    {
        adjustment.y.ifrotate=true;
    }
    return adjustment;
}
function operation_vl(adjustment,view)
{
    if(adjustment.x.ifrotate)
    {
        view.config.axisX.labelAngle=adjustment.x.rotation;
        //view.height-=adjustment.x.sub;
        view.config.axisX.titlePadding=0;
    }
    if(adjustment.y.ifrotate)
    {
        view.config.axisY.labelAngle=adjustment.y.rotation;
        //view.width-=adjustment.y.sub;
    }
    if(adjustment.disableaxis)
    {
        view.config.axisX={};
        view.config.axisY={};
        view.config.axis={};
        view.config.axis.disable=true;
    }
    if(adjustment.transposition)
    {
        let temp;
        temp=view.encoding.x;
        view.encoding.x=view.encoding.y;
        view.encoding.y=temp;
        temp=view.config.axisX;
        view.config.axisX=view.config.axisY;
        view.config.axisY=temp;
        switch(view.encoding.y.sort)
        {
            case("y"):
                view.encoding.y.sort="x";
                break;
            case("-y"):
                view.encoding.y.sort="-x";
                break;
            case("-x"):
                view.encoding.y.sort="-y";
                break;
            case("x"):
                view.encoding.y.sort="y";
                break;
        }
        if(adjustment.x.maxlen>0.1*view.width)
        {
            view.config.axisY.labelAngle=-45;
        }
        delete view.config.axisY.labelAlign;
        view.config.axisX.titleFontSize=1.1*font.size;
        view.config.axisY.titleFontSize=1.1*font.size;
        view.config.axisY.title=null;
        view.config.axis={};
        view.config.axis.labelFontSize=font.size;
        //view.config.axisX.titlePadding=35;
        delete view.config.axisY.titlePadding;
        //view.config.legend.orient="top-right";
    }
    return view;
}