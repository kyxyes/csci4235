// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(function(window){
var document = window.document,
    onstatus,
    showModel,
    rate;


 
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("enlarger").addEventListener('click',clickLarg); //JS
  $('#smaller').on('click',clickSmal);  //jQuery
  $('#onff').on('click',changeOnOff);
  $('#model').on('click',switchModel);
  loadSettings();
  //this is href in popup.html
   var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

//loadSettings();  //if this is putted outside "DOMContentLoaded" .this will be called first 
                 //and the "DOMContentLoaded" above will take some time to be loaeded


function loadSettings(){
	//sync
	chrome.storage.sync.get(
        ["hoverLinkRate",
        "on",
        "model"],
        function(data){
        rate = data.hoverLinkRate;
        onstatus = data.on;
        showModel = data.model;
         setCheck();
        }
		);
	   //setCheck();  //wrong 没有等chrome执行完就开始setCheck()如果放在这里则先执行，因为是异步函数
      
}

function setCheck(){
	  if(onstatus==1){
        document.getElementById('onff').checked=true;
      }else{
        document.getElementById('onff').checked=false;
      }
      if(showModel==1){
      	document.getElementById('model').checked=true;
      }else{
        document.getElementById('model').checked=false;
      }

}

function saveLarger(){
	   rate = rate+0.1;
       sync(rate);
}

function saveSmallr(){
       rate = rate-0.1;
	   sync(rate);
}

function sync(rate){
	var data = {
		hoverLinkRate:rate
	};
	chrome.storage.sync.set(
		data,empty);
}



function clickLarg(e){
	var largerButton = document.getElementById('enlarger');
	//alert("a");
	saveLarger();
	document.getElementById("show").innerHTML = Math.round(rate*100)/100;
    
}

function clickSmal(e){
    var smallerButton = document.getElementById('smaller');
    saveSmallr();
    document.getElementById("show").innerHTML = Math.round(rate*100)/100;

    
}

function changeOnOff(e){
	var a = document.getElementById("onff");
     if(a.checked){  
     	//alert(onstatus);
     	onstatus = 1;
     	//document.getElementById("onff").checked=true;
     }else{
     	//alert(onstatus);
     	onstatus = 0;
     	//document.getElementById("onff").checked=false;
     }
     var data = {on:onstatus};
	 chrome.storage.sync.set(data,empty);
     //之前没勾上，现在你打勾吧，那么a.checked，如果你再设置 onstatus=0是错误的 a.checked就是打勾，你再让它false刷新后就没法勾上
      //第一是之前有没有打勾 第二是根据第一步我打勾还是不打勾，我只管第二步在这个第二步进入if判断
}


function switchModel(){
	var b = document.getElementById("model");
	if(b.checked){
		showModel = 1;
		chrome.storage.sync.set({model:showModel,hoverLinkRate:0.43},empty);
	}else{
		showModel = 0;
		chrome.storage.sync.set({model:showModel,hoverLinkRate:0.8},empty);
	}
}


function empty(){}




})(window);
