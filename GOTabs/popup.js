// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
(function(window){
var tabsValue ="";
var title;
var url;

function click(e) {
  var nameButton = document.getElementById("name");
  nameButton.value = "Goodbye!"
}


function generateTabs(title){
	console.log(title);
    var tabView = $('<div class="tab"><div class ="title">'+title+'<div></div>').data('title',title);
    $('#showTabs').append(tabView);
}

function doTabs(){
	chrome.widget.getWindows(function(windows){
        //console.log("window object id is "+windows[i].id);  
        var s = windows[0].num;
        console.log("window's Number2 is "+s);
        for (var i = 0; i<s; i++){      
        chrome.widget.getTabsForWindow(windows[i],function(tabs2){
        for(var t in tabs2){
        	console.log("tab t2 now is "+t+". title"+tabs2[t].title);
          console.log("tab url is "+tabs2[t].url);
        	generateTabs(tabs2[t].title);
        	// tabsValue = tabsValue +"<hr/>" +tabs2[t].title;  
        }
        //document.getElementById("showTabs").innerHTML = tabsValue;
      });
      } 
});
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById("button")
  button.addEventListener('click', click);
  doTabs();

});
})(window);