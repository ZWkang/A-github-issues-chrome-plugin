(function(){
	
	if(!(/issues\/\w+/.test(location.href))){
		return false;
	}
	window.addEventListener('load',function(){
		'use strict';
		var defaultvalue = "\t"
		var ele = 'issue_body';
		var eleObject ;
		// console.log(location.hostname)
		chrome.storage.sync.get(null,function(item){
			item['value'] = defaultvalue;
		})
		chrome.storage.onChanged.addListener(function(changes) {
			defaultvalue = changes['value']['newValue'];
		});
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
		var arrays = []

		var defaultcallback = function (e){
			var e = e||window.e;
			var keycode = e.keyCode||e.which||e.charCode;
			var value,start,end,len,selectionvalue,text;
			

			if (e.ctrlKey && e.keyCode==90){
				e.preventDefault ? e.preventDefault() : event.returnValue = false;
				eleObject.value = arrays.pop()||'';
				// console.log(e.ctrlKey)
				return false;
			}
			if(keycode ===9){
				e.preventDefault ? e.preventDefault() : event.returnValue = false;
				start = eleObject.selectionStart;
				arrays.push(eleObject.value);
				if(start ===null||!!document.getSelection().toString()){
					selectionvalue = document.getSelection().toString()
					text = selectionvalue.split('\n').map((a,b)=>{return defaultvalue+a}).join('\n')
					eleObject.setRangeText(text);
					eleObject.value = eleObject.value;
					arrays.push(eleObject.value);
				}else{
					end = eleObject.selectionEnd;
					value = eleObject.value;
					len  = value.length;
					eleObject.value = value.substring(0,start)+defaultvalue+value.substring(end,len);
					eleObject.selectionStart = end+defaultvalue.length;
					eleObject.selectionEnd =end+defaultvalue.length;
					eleObject.focus();
					arrays.push(eleObject.value);
				}
				
			}
		}
		attach(eleObject,'keydown',defaultcallback,false);
	})
})()

