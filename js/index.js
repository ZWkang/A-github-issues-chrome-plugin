(function(){
	
	if(!(/issues\/\w+/.test(location.href))){
		return false;
	}
	var defaultvalue = "\t"
	chrome.storage.sync.get(null,function(item){
		defaultvalue = item['value'] || defaultvalue;
		// console.log(defaultvalue)
	})
	chrome.storage.onChanged.addListener(function(changes) {
		defaultvalue = changes['value']['newValue'];
		// console.log(changes)
	});
	window.addEventListener('load',function(){
		'use strict';
		
		var ele = 'issue_body';
		var eleObject ;

		if(document.querySelector){
			eleObject = document.querySelector('#'+ele);
		}else if(typeof $!==void 0){
			eleObject = $('#'+ele);
		}else{
			eleObject = document.getElementById(ele);
		}

		var attach = function(ele,type,callback,bool){
			if(document.addEventListener){
				ele.addEventListener(type,callback,bool);
			}else if(document.attachEvent){
				ele.attachEvent('on'+type,callback);
			}else{
				ele['on'+type] = callback;
			}
		}
		var arrays = [];

		var defaultcallback = function (e){
			var e = e||window.e;
			var keycode = e.keyCode||e.which||e.charCode;
			var value,start,end,len,selectionvalue,text,valueobj;
			

			if (e.ctrlKey && e.keyCode ==90){
				e.preventDefault();
				valueobj = arrays.pop()||{};
				eleObject.value = valueobj['value']||'';
				eleObject.selectionStart = valueobj['start']||0;
				eleObject.selectionEnd = valueobj['end']||valueobj['start']||0;
				return false;
			}
			if(keycode ===9){
				// e.preventDefault ? e.preventDefault() : event.returnValue = false;
				e.preventDefault();
				start = eleObject.selectionStart;
				selectionvalue = document.getSelection().toString()
				if(start ===null||!!selectionvalue){
					arrays.push({value:eleObject.value,start:start,end:eleObject.selectionEnd});
					
					text = selectionvalue.split('\n').map(function(a){
						return defaultvalue+a;
					}).join('\n')
					eleObject.setRangeText(text);
					// eleObject.value = eleObject.value;
					return true;
				}else{
					end = eleObject.selectionEnd;
					value = eleObject.value;
					len  = value.length;
					arrays.push({value:eleObject.value,start:start,end:eleObject.selectionEnd});
					// eleObject.value = value.substring(0,start)+defaultvalue+value.substring(end,len);
					eleObject.setRangeText(defaultvalue);
					eleObject.selectionStart = end+defaultvalue.length;
					eleObject.selectionEnd =end+defaultvalue.length;
					eleObject.focus();
					return true;
				}
				arrays.push({value:eleObject.value,start:start});
			}
		}
		attach(eleObject,'keydown',defaultcallback,false);
	})
})()

