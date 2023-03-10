jQuery.fn.extend({
  numInput: function(opt){
    var defaultOptions = {
      width: 100,
      wrapperClass: 'num-input-wrap',
      inputClass: 'num-input',
      addClass: 'add',
      subtractClass: 'subtract',
      positive: true,
      negative: true,
      floatCount: 2,
      interval: 1,
      indexAs: false
    }
    var options = jQuery.extend(defaultOptions, opt);
    this._initNumDom(options);
  },
  _initNumDom: function(opt){
    for (var i = 0,len = this.length; i < len; i++) {
      var wrapper = $('<div class="'+opt.wrapperClass+'"></div>');
      wrapper.css({"position": "relative", "display": "inline-block", "vertical-align": "top", "height": 28, "width": opt.width,"border-bottom": '1px dotted',"box-sizing": "border-box", "overflow": "hidden", 'margin-top':'5px'})
      $(this[i]).append(wrapper);
      var inputN = $('<input type="text" class="'+opt.inputClass+'" id="'+opt.inputClass+opt.id+'" value="1"/>');
      inputN.css({"height": 30, "width": "100%", "padding": "0 25px 0 12px", "font-size": "14px", "line-height": "30px", "background": "#fff","outline":'none',"box-sizing": "border-box", "border": "none"})
      var addBtn = $('<span class="'+opt.addClass+'" id="'+opt.addClass+opt.id+'"></span>')
      addBtn.css({"position": "absolute", 'right': 0, 'top': 0, 'width': 25, "height": 15, "background-color":'#edeef2',"box-sizing": "border-box", "cursor": "pointer"})
      var subtractBtn = $('<span class="'+opt.subtractClass+'" id="'+opt.subtractClass+opt.id+'"></span>')
      subtractBtn.css({"position": "absolute", 'right': 0, 'bottom': 0, 'width': 25, "height": 15, "background-color":'#edeef2', "box-sizing": "border-box", "cursor": "pointer"})
      wrapper.append(inputN).append(addBtn).append(subtractBtn);
      this._initNumEvent(inputN, addBtn, subtractBtn, opt)  
    } 
    $('<style type="text/css">.add:hover,.subtract:hover{background: #d8d8d8;}.add.deep,.subtract.deep{background: #b3b3b3;}.add::after{position: absolute;left: 8px;top: 5px;content: "";border-left: 4px solid transparent;border-right: 4px solid transparent;border-bottom: 6px solid #333;}.subtract::after{position: absolute;left: 8px;bottom: 5px;content: "";border-left: 4px solid transparent;border-right: 4px solid transparent;border-top: 6px solid #333;}</style>').appendTo('head');

    },
  _initNumEvent: function(it, ab, sb, opt){
  	var ni = this;
    var countDown,quickChange;
    ab.on('mousedown', function(){
      $(this).addClass('deep');
    	var interval = opt.interval
      var val = parseFloat($(this).prevAll('input').val())
      val = isNaN(val) ? 0 : val;
      val += interval;
      if(val > 0 && !opt.positive){
        val = 0;
      }else if(val < 0 && ! opt.negative){
        val = 0;
      }
      if(val<=opt.maxNum){
        val = ni._calcVal(val, opt.floatCount);
        it.val(val);
        $('#'+opt.input).slider('refresh');
        $('#'+opt.input).slider('setValue', val);
        countDown = setTimeout(function(){
          quickChange = setInterval(function(){
            var val = parseFloat(it.val())
            val += interval;
            if(val > 0 && !opt.positive){
              clearTimeout(countDown);
              clearInterval(quickChange);
              val = 0;
            }
            val = ni._calcVal(val, opt.floatCount)
            it.val(val);

          },30)
        },500)
      }
    });
    ab.on('mouseup', function(){
      $(this).removeClass('deep');
      if(countDown){
        clearTimeout(countDown);
      }
      if(quickChange){
        clearInterval(quickChange);
      }
    })
    ab.on('mouseleave', function(){
      $(this).removeClass('deep');
      if(countDown){
        clearTimeout(countDown);
      }
      if(quickChange){
        clearInterval(quickChange);
      }
    })
    sb.on('mousedown', function(){
      $(this).addClass('deep');
      var interval = opt.interval
      var val = parseFloat($(this).prevAll('input').val())
      val = isNaN(val) ? 0 : val;
      val -= interval;
      if(val < 0 && !opt.negative){
        val = 0;
      }else if(val > 0 && !opt.positive){
        val = 0;
      }
      val = ni._calcVal(val, opt.floatCount)
      it.val(val);
      $('#'+opt.input).slider('refresh');
      $('#'+opt.input).slider('setValue', val);
      countDown = setTimeout(function(){//??????????????????????????????
        quickChange = setInterval(function(){
          var val = parseFloat(it.val());
          val -= interval;
          if(val < 0 && !opt.negative){
            clearTimeout(countDown);
            clearInterval(quickChange);
            val = 0;
          }
          val = ni._calcVal(val, opt.floatCount)
          it.val(val);
        },30)
      },500)
    })
    sb.on('mouseup', function(){
      $(this).removeClass('deep');
      if(countDown){
        clearTimeout(countDown);
      }
      if(quickChange){
        clearInterval(quickChange);
      }
    })
    sb.on('mouseleave', function(){
      $(this).removeClass('deep');
      if(countDown){
        clearTimeout(countDown);
      }
      if(quickChange){
        clearInterval(quickChange);
      }
    })
    it.on('keyup',function(){
      var val = $(this).val();
      if((opt.positive&&opt.negative)||(!opt.positive&&!opt.negative)){
        var reg = new RegExp('^\D*(-?(([1-9]\\d*)?|([0]))?(\\.\\d{0,'+opt.floatCount+'})?)?.*$', 'g');
      }else if(!opt.positive&&opt.negative){
        var reg = new RegExp('^(-(([1-9]\\d*)?|([0]))?(\\.\\d{0,'+opt.floatCount+'})?)?.*$', 'g');
      }else if(opt.positive&&!opt.negative){
        var reg = new RegExp('^\D*((([1-9]\\d*)?|([0]))?(\\.\\d{0,'+opt.floatCount+'})?)?.*$', 'g');
      }
      val = val.replace(reg,'$1');
      if((val.indexOf('.')==-1||(val.indexOf('.')+1) < val.length)&&val.indexOf('-')==-1){
      	if(opt.floatCount < 2){
	      	val = parseFloat(val);
	        val = isNaN(val) ? '' : val;	
      	}
      }
      if(opt.floatCount==0){
      	if(val==''||val=='.'){
      		val = ""
      	}else{
      		val=parseInt(val);
      	}
      }
      if(val >= 100000000000){
      	val = 99999999999
      }
      $(this).val(val);
    })
    it.on('focusout', function(){
    	var val = parseFloat($(this).val());
    	val = ni._calcVal(val, opt.floatCount)
    	$(this).val(val)
    })
  },
  _calcVal(num, floating){
  	return num.toFixed(floating)
  }
})