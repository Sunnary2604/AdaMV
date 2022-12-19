function form_linking(data)
{
    if(data.hasOwnProperty("linking"))
    {
        let id, flag_1 = true;
        let info = {};
        info.color = {};
        info.hl = -1;
        setTimeout(function(){
            info=storeinfo(data,info);
        },1900);
        $('div',document).mouseover(function (e)
        {
            id=this.id;
            if (e.target.ariaLabel !== null && id[0] === "p" &&
                (e.target.ariaRoleDescription === "circle" || e.target.ariaRoleDescription === "bar"))
            {
                console.log(id);
                if (isinArray(id, data.linking.views))
                {
                    let num = Number(id.replace("p", ""));
                    info.hl = get_index(num, data, e.target.ariaLabel, dataToView.get(num));
                    info = form_hl(num, data, info);
                    for (let i = 0; i < data.linking.views.length; i++)
                    {
                        if (num !== data.linking.views[i])
                        {
                            info = form_hl(data.linking.views[i], data, info);
                            flag_1 = false;
                        }
                    }
                }
            }
            else if(e.target.ariaLabel === null&&!flag_1)
            {
                for (let i = 0; i < data.linking.views.length; i++)
                {
                    recover(data.linking.views[i], data, info);
                }
                flag_1 = true;
            }
        });
    }
}
function isinArray(id,arr)
{
    let flag=true;
    for(let i=0;i<arr.length;i++)
    {
        if(id===arr[i])
        {
            flag=false;
            break;
        }
    }
    return flag;
}
function get_index(num,data,str,csvData)
{
    let index_local,temp;
    let obj=get_obj(str);
    for(let i=0;i<csvData.length;i++)
    {
        let flag=true,t=0;
        for(let key in obj)
        {
            temp=csvData[i][key].replace(/(^\s*)|(\s*$)/g, "");
            if(temp!==obj[key])
            {
                flag=false;
                break;
            }
            t++;
            if(t>1)
            {
                break;
            }
        }
        if(flag)
        {
            index_local=csvData[i][data.linking.index];
            index_local=index_local.replace(/(^\s*)|(\s*$)/g, "");
            break;
        }
    }
    return index_local;
}
function get_obj(str)
{
    let obj={};
    str=str.replace(/\;\s/g,";");
    str=str.replace(/\:\s/g,":");
    let arr=str.split(";")
    for(let i=0;i<arr.length;i++)
    {
        let arr_2=arr[i].split(":");
        arr_2[0]=arr_2[0].replace(/(^\s*)|(\s*$)/g, "");
        arr_2[1]=arr_2[1].replace(/(^\s*)|(\s*$)/g, "");
        if((arr_2[1][0]<"0"||arr_2[1][0]>"9")&&(arr_2[1][0]!=="−"))
        {
            obj[arr_2[0]]=arr_2[1];
        }
        else
        {
            if(arr_2[1][0]==="−")
            {
                obj[arr_2[0]]=parseFloat(arr_2[1].substring(1,arr_2[1].length));
                obj[arr_2[0]]=(0-obj[arr_2[0]]).toString();
            }
            else
            {
                obj[arr_2[0]]=parseFloat(arr_2[1]).toString();
            }
        }
    }
    return obj;
}
function form_hl(num,data,info)
{
    let selectElement,name,index;
    if(Object.prototype.toString.call(data.Interface[num].Encoding)=== "[object Array]")
    {
        name="#p"+num.toString()+" .layer_1_marks";
        selectElement=$(name);
    }
    else if(data.Interface[num].ViewType.type==="bar"||data.Interface[num].ViewType.type==="circle")
    {
        name="#p"+num.toString()+" .role-mark";
        selectElement=$(name);
    }
    for(let i=0;i<selectElement[0].childNodes.length;i++)
    {

        index=get_index(num,data,selectElement[0].childNodes[i].ariaLabel,dataToView.get(num));
        if(index!==info.hl)
        {
            if(data.Interface[num].ViewType.type==="bar")
            {
                selectElement[0].childNodes[i].attributes[4].nodeValue="#808080";
            }
            else
            {
                selectElement[0].childNodes[i].attributes[5].nodeValue="grey";
            }
        }
    }
    return info;
}
function recover(num,data,info)
{
    console.log(info);
    let selectElement,name;
    if(Object.prototype.toString.call(data.Interface[num].Encoding)=== "[object Array]")
    {
        name="#p"+num.toString()+" .layer_1_marks";
        selectElement=$(name);
    }
    else if(data.Interface[num].ViewType.type==="bar"||data.Interface[num].ViewType.type==="circle")
    {
        name="#p"+num.toString()+" .role-mark";
        selectElement=$(name);
    }
    for(let i=0;i<selectElement[0].childNodes.length;i++)
    {
        if(data.Interface[num].ViewType.type==="bar")
        {
            selectElement[0].childNodes[i].attributes[4].nodeValue=info.color[num.toString()][i];
        }
        else
        {
            selectElement[0].childNodes[i].attributes[5].nodeValue=info.color[num.toString()][i];
        }
    }
}
function storeinfo(data,info)
{
    for(let i=0;i<data.linking.views.length;i++)
    {
        let selectElement,name;
        if(Object.prototype.toString.call(data.Interface[data.linking.views[i]].Encoding)=== "[object Array]")
        {
            name="#p"+data.linking.views[i].toString()+" .layer_1_marks";
            selectElement=$(name);
        }
        else if(data.Interface[data.linking.views[i]].ViewType.type==="bar"||data.Interface[data.linking.views[i]].ViewType.type==="circle")
        {
            name="#p"+data.linking.views[i].toString()+" .role-mark";
            selectElement=$(name);
        }
        info.color[data.linking.views[i].toString()]=[];
        for(let j=0;j<selectElement[0].childNodes.length;j++)
        {
            if(data.Interface[data.linking.views[i]].ViewType.type==="bar")
            {
                info.color[data.linking.views[i].toString()][j]=selectElement[0].childNodes[j].attributes[4].value;
            }
            else
            {
                info.color[data.linking.views[i].toString()][j]=selectElement[0].childNodes[j].attributes[5].value;
            }
        }
    }
    return info;
}