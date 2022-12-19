
indexnumber=0;
jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('a');
    spannode.className = 'highlight';
    spannode.id='highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  var skip = innerHighlight(this, pat.toUpperCase());
  if (skip==0) {
	  highlightAcross(pat.toUpperCase());
  	}
 });
};
/**
 * 高亮显示(跨越标签)
 */
function highlightAcross(searchTerm){
//	console.log(searchTerm);
	//获取所有内容元素
	var chil = $("#Context").children().children();
//	console.log(chil.size());
	//拆分所有查询关键字
	var searchSplit = searchTerm.split("");
	//遍历所有查询关键字
	for (var i=0;i<searchSplit.length;i++) {
//		console.log(searchSplit[i])
	}
	//废弃判断参数
//	var cont = false;
	//创建查找内容的临时缓存
	var currentMapTem={};
	//创建查找内容的缓存
	var currentMap={};
	var currentInclude="";
	var searchSplitnumber = 0;
	var iTem=0
	//遍历所有内容元素
	for (var i=0;i<chil.size();i++) {
		//获取当前对象
		var countobj = $(chil.get(i));
		//获取当前元素内容
		var count = $(chil.get(i)).text();
		//将单个内容元素拆分
		var countText = count.split("");
//		console.log(chil.get(i).nodeName);
//		countobj.text("测试");
		//判断当前元素是否包含查询关键字
		for (var j=0;j<countText.length;j++) {
//			console.log(countText[j]);
			//当前元素如果存在和查询关键字首字符相同的判断后续内容是否相同
			if(countText[j]==searchSplit[searchSplitnumber]&&searchSplitnumber!=searchSplit.length-1){
//				console.log(countText[j]+j);
				for(var k=searchSplitnumber;k<searchSplit.length&&j<countText.length;k++){
					//当前循环中存在相同
					if(countText[j+k-searchSplitnumber]==searchSplit[k]){
						currentInclude+=countText[j+k-searchSplitnumber]
//						cont=true;
//						console.log(searchSplit[k])
					}
					
//					if(j+k==countText.length){
//						searchSplitnumber=k;
//						break;
//					}
					//循环到当前元素结尾则暂时保存
					if((j+k-searchSplitnumber)==countText.length){
//						currentInclude+=countText[j+k]
						currentMapTem[i]=currentInclude;
						searchSplitnumber=k;
//						console(i+":"+currentInclude);
						currentInclude="";
						break;
					}
					//如果相同被打断则跳出循环并初始化临时 保存部分内存
					if(k!=0&&countText[j+k-searchSplitnumber]!=searchSplit[k]&&(j+k-searchSplitnumber)!=countText.length-1&&k!=searchSplit.length-1){
						currentMapTem={};
						currentInclude="";
						break;
					}
					//如果相同被打断则跳出循环并初始化临时 保存部分内存
//					if(cont==false){
//						currentMap={};
//						currentInclude="";
//						break;
//					}
					
					//循环到关键字结尾则完成全部保存,并初始化临时 保存部分内存
					if(countText[j+k-searchSplitnumber]==searchSplit[k]&&k==searchSplit.length-1){
//						currentInclude+=countText[j+k-searchSplitnumber]
						currentMapTem[i]=currentInclude+"☆code☆end☆";
						$.each(currentMapTem,function(key,values){     
						    currentMap[key]=values
						 }); 
						searchSplitnumber=k;
//						console(i+":"+currentInclude);
//						currentMap={};
						currentInclude="";
						break;
					}
				}
				
			}else{
				if(searchSplitnumber!=0&&j==0){
					currentMapTem={};
					currentInclude="";
					searchSplitnumber=0;
				}
			}
			
		}
		if(searchSplitnumber==searchSplit.length-1){
			searchSplitnumber=0;
		}
	}
	var endContent="";
	$.each(currentMap,function(key,values){
	    console.log(key);    
	    console.log(values);
	    if(values.indexOf("☆code☆end☆")>0){
//	    	key = key.replace("☆code☆end☆","");
			values = values.replace("☆code☆end☆","");
	    	var str = $(chil.get(key)).html().replace(values,"");
		    $(chil.get(key)).html(str);
//		    console.log($(chil.get(key))[0].tagName);
//		    console.log($(chil.get(key))[0].className);
//		    console.log($(chil.get(key)).attr("id"));
//		    console.log($(chil.get(key)).attr("style"));
		    endContent+=values;
		    $(chil.get(key)).prepend("<"+$(chil.get(key))[0].tagName+" class='highlight "+$(chil.get(key))[0].className+"' id='"+$(chil.get(key)).attr("id")+"' style="+$(chil.get(key)).attr("style")+">"+endContent+"</span>");
		    endContent="";
	    }else{
	    	var str = $(chil.get(key)).html().replace(values,"");
		    $(chil.get(key)).html(str);
//		    console.log($(chil.get(key))[0].tagName);
//		    console.log($(chil.get(key))[0].className);
//		    console.log($(chil.get(key)).attr("id"));
//		    console.log($(chil.get(key)).attr("style"));
		    endContent+=values;
//		    $(chil.get(key)).after("<"+$(chil.get(key))[0].tagName+" class='highlight "+$(chil.get(key))[0].className+"' id='"+$(chil.get(key)).attr("id")+"' style="+$(chil.get(key)).attr("style")+">"+values+"</span>");

	    }
	   
//	    $(chil.get(key)).addClass("highlight");
//	      var countobj = $(chil.get(i));
	  });
//	chil.each(function(){
//		alert($(this).text());
//	})
}
/**
 * 下一个
 * 
 */
function next() {
	//获取所有的高亮元素
	var highlight=$(".highlight");
	//判断当前高亮元素是否是最后一个
	if(indexnumber==highlight.size()){
		//如果是最后一个则不进行任何修改
		return;
	}
	//获取当前元素的位置信息
	var offsetParent = highlight.eq(indexnumber).offset();
	//将当前元素高亮颜色修改为红色
	highlight.eq(indexnumber).css("background-color","#DC143C");
	//当前元素不是第一个时
	if(indexnumber!=0){
		//将上一个元素改为黄色
		highlight.eq(indexnumber-1).css("background-color","#fff34d");
	}
	//计数器递增
	indexnumber++;
	//窗口滚动到当前位置
	window.scrollTo(offsetParent.left,offsetParent.top);
};
jQuery.fn.removeHighlight = function() {
 function newNormalize(node) {
    for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
        var child = children[i];
        if (child.nodeType == 1) {
            newNormalize(child);
            continue;
        }
        if (child.nodeType != 3) { continue; }
        var next = child.nextSibling;
        if (next == null || next.nodeType != 3) { continue; }
        var combined_text = child.nodeValue + next.nodeValue;
        new_node = node.ownerDocument.createTextNode(combined_text);
        node.insertBefore(new_node, child);
        node.removeChild(child);
        node.removeChild(next);
        i--;
        nodeCount--;
    }
 }

 return this.find("span.highlight").each(function() {
    var thisParent = this.parentNode;
    thisParent.replaceChild(this.firstChild, this);
    newNormalize(thisParent);
 }).end();
};