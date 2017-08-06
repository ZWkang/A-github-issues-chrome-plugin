
window.onload=function(){
console.log('aa')
	document.querySelector('#saves').addEventListener('click',function(e){
		e.preventDefault()

	var theValue = document.querySelector('#splitvalue').value
	chrome.storage.sync.set({'value': theValue}, function() {
          // 通知保存完成。
          // message('设置已保存');/
          console.log('success')
        });
	
	},false)
	document.querySelector('#splitvalue').addEventListener('keydown',function(e){
		e.preventDefault()
		if(e.keyCode ===9){
			console.log('123123')
			document.querySelector('#splitvalue').value+="\t"
		}
	},false)
}
