function btnAdd(a){
			//1、获取#num的value
	console.log(a);
	console.log($('#'+a).val());
			var value = parseInt($('#'+a).val());
			console.log(typeof(value));
			//2、将取出来的值做+1操作，再赋值给#num的value
			value = value+1;
			console.log(value);
			// $('#'+a).val() = value;
			d3.select('#'+a).attr('value',value);
		}

		function btnReduce(b){
			//1、获取#num的值
			console.log(b);
			console.log($('#'+b).val());
			var value = parseInt($('#'+b).val());
			//2、判断#num的值是否小于等于1，如果小于等于1的话，则将值改为1
			//3、否则，可以实现 - 1 操作
			if(value <= 1){
				value = 1;
			}
			else if(value >=22){
				value=22}
			else{
				value -= 1;
				}
			//4、将 value 的值赋值给 #num
			d3.select('#'+b).attr('value',value);
		}