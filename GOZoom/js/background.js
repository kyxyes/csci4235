// chrome.browserAction.setBadgeText({text: "yeah"});

// chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
//     suggest([
//       {content: text + " one", description: "the first one"},
//       {content: text + " number two", description: "the second entry"}
//     ]);
// });
// chrome.omnibox.onInputEntered.addListener(function(text) {
//     alert('You just typed "' + text + '"');
// });

//One-Time Request
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     switch(request.type) {
//         case "dom-loaded":
//             alert(request.data.myProperty);
//         break;
//     }
//     return true;
// });


//==========================this is for the hover =====================
(function(window){
var document = window.document,
    xhr=null,
    currentUR,
    currentTab;

chrome.runtime.onInstalled.addListener(firstRun); //刚安装后的监听  这个listener返回一个detail obj
chrome.runtime.onMessage.addListener(messageReceived);//content_script接受background的sendMessage



function firstRun(details){
    if(details.reason !=='install')
        return;
    chrome.storage.sync.set({
        hoverLinkPosition:'top-left',
        hoverLinkOffsetX:10,
        hoverLinkOffsetY:10,
        hoverLinkNormal:false,
        hoverLinkDelayTime:1000,
        hoverLinkRate:0.43,
        on:1,
        model:1   //model=1 is for integrated website
    },empty)
}



function empty(){}
})(window)







