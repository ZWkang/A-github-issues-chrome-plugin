(function(){
	console.log(location.hostname)
	if(location.hostname !=='github.com'){
		return false;
	}
	window.addEventListener('load',function(){
		'use strict';
	      chrome.storage.onChanged.addListener(function(changes, namespace) {
	        	console.log(changes,namespace)
	      });
		var ele = 'issue_body';
		var eleObject ;

		if(document.querySelector){
			eleObject = document.querySelector('#'+ele)
		}else if(typeof $!==void 0){
			eleObject = $('#'+ele)
		}else{
			eleObject = document.getElementById(ele)
		}

		var attach = function(ele,type,callback,bool){
			if(document.addEventListener){
				ele.addEventListener(type,callback,bool)
			}else if(document.attachEvent){
				ele.attachEvent('on'+type,callback)
			}else{
				ele['on'+type] = callback
			}
		}
		var defaultcallback = function (e){
			var e = e||window.e;
			var keycode = e.keyCode||e.which||e.charCode;
			var value 
			var start,end
			var len
			if(keycode ===9){
				e.preventDefault ? e.preventDefault() : event.returnValue = false;
				start = eleObject.selectionStart
				if(!start){
					return
				}
				end = eleObject.selectionEnd
				value = eleObject.value
				len  = value.length
				eleObject.value = value.substring(0,start)+'	'+value.substring(end,len)
				eleObject.selectionStart = end+1
				eleObject.selectionEnd =end+1
				eleObject.focus()
			}
		}
		attach(eleObject,'keydown',defaultcallback,false)
	}
})()

