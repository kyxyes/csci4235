var numTab;
function updateNumTab(){
	chrome.widget.getWindows(function(windows){

		chrome.widget.getTabsForWindow(windows[0],function(tabs){
			numTab = tabs.length;
            chrome.browserAction.setBadgeText({text: numTab+""});
		});

	});
}

function init(){
	console.log("a");
	chrome.widget.getWindows(function(windows){
		updateNumTab();
	});
	   chrome.tabs.onCreated.addListener(function(tab){
    	updateNumTab();
    });
	   chrome.tabs.onRemoved.addListener(function(tab){
	   	updateNumTab();
	   });
}

function switchtoTab(tabid){
	 //chrome.tabs.get(tabid,function(tab){
      chrome.tabs.update(tabid,{selected:true});
  //});
}
   

init();

