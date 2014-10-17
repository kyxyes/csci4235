// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
(function(window){
var tabsValue ="",
    title,
    url,
    numWin,
    numTab;



function genrateNumWin(numWin){
   var numWinView = $('<div class = "numwin">You have open <span class="spancolor">'+numWin+'</span> windows<div>');
   $('#showTabs').append(numWinView);
}

function generateTabs(id,title,url,selected){
  console.log(title);
    if(selected == true){
    var tabView = $('<div class="tab withfocus" id='+id+'>'+
                     '<div class ="title"><span class ="spancolor">'+title+'</span><div>'+
                     '<div class ="url">'+url+'</div>'+
                     '</div>').data('title',title);   //js里可以写成$('#foo')货得这个id的所有东西，那么现在这么写已经货得所有了
    }else{
      var tabView = $('<div class="tab" id='+id+'>'+
                     '<div class ="title">'+title+'<div>'+
                     '<div class ="url">'+url+'</div>'+
                     '</div>').data('title',title);
    }
    $('#showTabs').append(tabView);
}

function doTabs(){
  chrome.widget.getWindows(function(windows){
        numWin = windows.length;
        //console.log("window's Number is "+numWin);
        genrateNumWin(numWin);
        for (var i = 0; i<numWin; i++){ 
        console.log("window object id is "+windows[i].id); 
        }       
        chrome.widget.getTabsForWindow(windows[0],function(tabs){
        for(var t in tabs){
          //console.log("tab t now is "+t+". title"+tabs[t].id);
         // console.log("tab url is "+tabs[t].url);
         // console.log("tab is selected "+tabs[t].isSelected);
          generateTabs(tabs[t].id,tabs[t].title,tabs[t].url,tabs[t].isSelected);
        }
         numTab = tabs.length;
         chrome.browserAction.setBadgeText({text: numTab+""});
        //document.getElementById("tab").addEventListener('mouseover',mouseover); //only for the first tab
        $('.tab').on('mouseover',mouseover);
        $('.tab').on('click',mouseclick);
        //document.getElementById("showTabs").innerHTML = tabsValue;
      });
     
});
}

function mouseclick(event){
  console.log("id is"+(this.id));
  chrome.extension.getBackgroundPage().switchtoTab(parseInt(this.id));
   
}

function focus(elem){
  $(".tab.withfocus").removeClass('withfocus');  //. 是空格的意思
  elem.addClass('withfocus');
}

function mouseover(event){
    focus($(this));
}


document.addEventListener('DOMContentLoaded', function () {
  //var button = document.getElementById("button")
  //button.addEventListener('click', click);
  doTabs();
  //document.getElementById("tab").addEventListener('mouseover',mouseover);//放在这里是错误的，因为doTabs里有chrome这种异步函数，所以可能chrome函数还没完成就开始这里，这样得不到tab这个div

});
})(window);