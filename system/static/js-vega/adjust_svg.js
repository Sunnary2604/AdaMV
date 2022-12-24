function adjust_svg(views, idDoor)
{
    for(let i=0;i<views.length;i++)
    {
        if(views[i].hasOwnProperty("projection")||Object.keys(views[i]).length===0||views[i].hasOwnProperty("layer"))
        {
            continue;
        }
        if(views[i].iflinebreak)
        {
            correct_label(i,idDoor);
        }
    }
}
function correct_label(num,idDoor)
{
    let selectElement,name,gap,flag=[];
    name="#"+idDoor+"p"+num.toString()+" .role-axis-label";
    selectElement=$(name);
    let str,str_ori,mid_1,mid_2,index,textlength_1,textlength_2;
    for(let i=0;i<selectElement[0].childNodes.length;i++)
    {
        flag[i]=false;
    }
    for(let i=1;i<selectElement[0].childNodes.length;i++)
    {
        if(selectElement[0].childNodes[i].attributes[5].value==="1")
        {
            str=selectElement[0].childNodes[i].attributes[1].value;
            index=str.indexOf(",");
            mid_2=Number(str.substring(10,index));
            gap=i;
            break;
        }
    }
    for(let i=0;i<selectElement[0].childNodes.length;i=i+gap)
    {
        if(i+gap<selectElement[0].childNodes.length)
        {
            str=selectElement[0].childNodes[i].attributes[1].value;
            index=str.indexOf(",");
            mid_1=Number(str.substring(10,index));
            str=selectElement[0].childNodes[i+gap].attributes[1].value;
            index=str.indexOf(",");
            mid_2=Number(str.substring(10,index));
            textlength_1=selectElement[0].childNodes[i].textLength.baseVal.value;
            textlength_2=selectElement[0].childNodes[i+gap].textLength.baseVal.value;
            if((textlength_1+textlength_2)/2>Math.abs(mid_2-mid_1)-font.gap)
            {
                if(flag[i]===false)
                {
                    str_ori=selectElement[0].childNodes[i].innerHTML;
                    str=html_transform(str_ori,mid_2-mid_1);
                    selectElement[0].childNodes[i].innerHTML=str;
                    if(str_ori!==str)
                    {
                        flag[i]=true;
                    }
                }
                if(flag[i+1]===false)
                {
                    str_ori=selectElement[0].childNodes[i+gap].innerHTML;
                    str=html_transform(str_ori,mid_2-mid_1);
                    selectElement[0].childNodes[i+gap].innerHTML=str;
                    if(str_ori!==str)
                    {
                        flag[i+gap]=true;
                    }
                }
            }
        }
    }
}
function html_transform(str,gap)
{
    let resultstr="",arr,temp,num;
    arr=str.split(" ");
    if(arr.length>1)
    {
        arr=formarray(arr,gap);
        for(let i=0;i<arr.length;i++)
        {
            temp="";
            if(i===0)
            {
                temp=arr[i];
            }
            else
            {
                temp+="<tspan x=0 ";
                temp+="y=";
                num=font.size*1.1*i;
                temp+=num.toString();
                temp+=">";
                temp+=arr[i];
                temp+="</tspan>";
            }
            resultstr+=temp;
        }
    }
    else
    {
        resultstr=arr[0];
    }
    return resultstr;
}
function formarray(arr_ori,gap)
{
    let arr=[],i=0,t=0;
    while(i<arr_ori.length)
    {
        if(i<arr_ori.length-1&&arr_ori[i].length+arr_ori[i+1].length<=Math.round(gap/12)-4)
        {
            arr[t]=arr_ori[i]+arr_ori[i+1];
            t++;
            i=i+2;
        }
        else
        {
            arr[t]=arr_ori[i];
            t++;
            i++;
        }
    }
    return arr;
}
function correct_AxistitleandPielabel(views, idDoor)
{
    let name,selectLabel;
    for(let i=0;i<views.length;i++)
    {
        if(views[i].hasOwnProperty("projection")||Object.keys(views[i]).length===0)
        {
            continue;
        }
        else if(views[i].hasOwnProperty("layer"))
        {
            correct_pielabel(i,idDoor);
            continue;
        }
        else if(views[i].hasOwnProperty("ifside"))
        {
            deleteminus(i,idDoor);
        }
        name = "#"+idDoor+"p" + i.toString() + " .role-axis-title";
        let selectElement = $(name);
        if(views[i].mark.type==="rect")
        {
            selectElement[0].childNodes[0].textContent=selectElement[0].childNodes[0].textContent.replace(/\(binned\)/,"");
            selectElement[0].childNodes[1].textContent=selectElement[1].childNodes[0].textContent.replace(/\(binned\)/,"");
        }
        if(!views[i].config.axisX.hasOwnProperty("title"))
        {
            if(selectElement[0].childNodes[0].textLength.baseVal.value>views[i].width)
            {
                name = "#"+idDoor+"p" + i.toString() + " .role-axis-label";
                selectLabel=$(name);
                addunit(selectLabel[0].childNodes,views[i].encoding.x.field);
                selectElement[0].childNodes[0].attributes[6].value = "0";
            }
        }
        let j=0;
        if(!views[i].config.axisX.hasOwnProperty("title"))
        {
            j++;
        }
        if(!views[i].config.axisY.hasOwnProperty("title"))
        {
            if(selectElement[j].childNodes[0].textLength.baseVal.value>views[i].height)
            {
                name = "#"+idDoor+"p" + i.toString() + " .role-axis-label";
                selectLabel=$(name);
                addunit(selectLabel[1].childNodes,views[i].encoding.y.field);
                selectElement[j].childNodes[0].attributes[6].value = "0";
            }
        }
    }
}
function addunit(labels,str)
{
    let unit,index_1,index_2;
    index_1=str.indexOf("(");
    index_2=str.indexOf(")");
    unit=str.substring(index_1+1,index_2);
    if(index_1!==-1&&index_2!==-1) {
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].textContent === "0") {
                continue;
            }
            labels[i].textContent += unit;
        }
    }
}
function correct_pielabel(num,idDoor)
{
    let name="#"+idDoor+"p" + num.toString()+" .layer_1_marks";
    let selectElement = $(name);
    for(let i=0;i<selectElement[0].childNodes.length;i++)
    {
        selectElement[0].childNodes[i].attributes[7].value="#000";
    }
}
function deleteminus(num,idDoor)
{
    let name,selectLabel;
    name = "#"+idDoor+"p" + num.toString() + " .role-axis-label";
    selectLabel=$(name);
    for(let i=0;i<selectLabel[0].childNodes.length;i++)
    {
        if(selectLabel[0].childNodes[i].attributes[5].value==="1")
        {
            selectLabel[0].childNodes[i].innerHTML=selectLabel[0].childNodes[i].innerHTML.replace("−","");
        }
    }
}