
window.onload=function(){
	var save_btn = document.querySelector('#saves');

	var input_content = document.querySelector('#splitvalue')
	chrome.storage.sync.get(null,function(item){
		input_content.value = item['value']||"\t"
		// console.log(item)
	})
	input_content.addEventListener('keydown',function(e){
		if(e.keyCode ===9){
			e.preventDefault()
			input_content.value += "\t"
		}
	},false)
	save_btn.addEventListener('click',function(e){
		var theValue = input_content.value
		chrome.storage.sync.set({'value': theValue}, function() {
			// 通知保存完成。
			// message('设置已保存');/
			
			// alert('success')
			setTimeout(function(){
				alert('setting set is success')
			},1)
		});
	
	},false)
}
