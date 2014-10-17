// window.addEventListener("load", function() {
//     chrome.extension.sendMessage({
//         type: "dom-loaded", 
//         data: {
//             myProperty: "this is so cool!!!----One-Time Requests,communication happens only once"
//         }
//     });
// }, true);

//=======================this is for the hover=======================
(function(window){
var document = window.document,
    body = document.body,
    a = document.getElementsByTagName('a'),  //for get a href，returns a live HTMLCollection of elements with the given tag name
    currentLength = a.length,
    currentLinks = [],
    displayTimeout,
    normalURL,
    zIndex=100,
    container,
    // containerLabel,
    button,
    size = 1.0,
    rate,
    on,
    showModel,
    loadingContainer,
    hovernow,  //to judge whether the mouse point is on hovering
    keyboardHold,
    delayTime;

loadSettings();
addEvents();
drawWindow();



//从storage中获得值，进行初始化工作
function loadSettings(){
	chrome.storage.sync.get([
		'hoverLinkPosition',
        'hoverLinkOffsetX',
        'hoverLinkOffsetY',
		'hoverLinkNormal',
		'hoverLinkDelayTime',
		'hoverLinkRate',
		'on',
		'model'],
		 function(data){
		 rate = data.hoverLinkRate;	
		 moveBox(data.hoverLinkPosition, data.hoverLinkOffsetX, data.hoverLinkOffsetY);
         normalURL = data.hoverLinkNormal;
         delayTime = data.hoverLinkDelayTime;
         on = data.on;
         showModel = data.model;
         // console.log("log in content"+on);
	});
}

function moveBox(s,x,y){
	// var str = "Hello world!";
 //      var res = str.substr(1, 4)
	var a = s.substring(0,s.indexOf('-')),
	    b = s.substr(s.indexOf('-')+1);  // ??
        // console.log(a); //top
        // console.log(b);  //right
	   // container.setAttribute('style','z-index:'+zIndex+';');
	    container.style[a]=y+'px';  //style里面存放json ,所以a,b是key
	    container.style[b]=x+'px';
	    container.style['overflow']='scroll';
	    container.style['max-width']='1450px';
	    container.style['max-height']='400px';
        container.style['-webkit-transform'] = 'scale('+rate+')';
        container.style['-webkit-transform-origin'] = '0px 0px';

	    //"-webkit-transform: scale(0.43);-webkit-transform-origin: 200px 100px;overflow:scroll"
}

function addEvents(){
	for(var i=currentLength-1;i>=0;i--){
		addEvent(a[i]);
		//currentLinks.push(a[i]); //放入数组中
	}


}

function addEvent(a){
	a.addEventListener('mouseover',linkMouseOver,false);//当mouseover触发，调用linkMouseOver
	a.addEventListener('mouseleave',linkMouseOut,false);
	//body.addEventListener('keydown',keyboardDown,false);  //have to click the screem
	$(document).bind('keydown',keyboardDown);
	//body.addEventListener('keyup',keyboardUp,false);
	$(document).bind('keyup',keyboardUp);
	$('body').on('click',mouseclick);
}


function linkMouseOver(event){
	if(keyboardHold!=1){
	var url = this.href;  //this应该指a标签
    //console.log("client :top->"+event.clientY+" left->"+event.clientX +" offset:top->"+window.pageYOffset+" left->"+window.pageXOffset);
    // container.style['top'] = event.clientY+'px';
    // container.style['left'] = event.clientX+'px';
    //hovernow = 1;
    displayTimeout = setTimeout(function(){
    	 displayBox();
    	 setTimeout(function(){
           mouseOver(url);
    	 },1500);
         //mouseOver(url);
    },delayTime)
}

}

function linkMouseOut(event){
	if(keyboardHold!=1){
	console.log('now mouseout');
	//hovernow = 0;
	clearTimeout(displayTimeout); //Prevent the function set with the setTimeout() to execute
	if(!container){
	//$("body").removeChild(container);
    body.removeChild(container);
    }else{
    	container.style.display= 'none';
    }
    }
     
}

function mouseOver(url){
	//if(hovernow==1){
		console.log('now mouseover');
	    $.post('http://gozoom4235.appspot.com/highlight.php',{url:url},function(webdata){
		//displayBox();
		if(showModel==1){ 
		    container.style['max-width']='1450px';
	        container.style['max-height']='400px';  
			insertLabel(webdata);
		}else{
		container.style['max-width']='450px';
	    container.style['max-height']='400px';     
		showWord(webdata);
	    }
	    })
	//}

}

function keyboardDown(event){
	// console.log("o-----"+event.keyCode);
	if(event.keyCode==18){
	container.style['max-height'] = '700px';  //when hold alt ,expand height
			//console.log("keydown");
	keyboardHold = 1; 
    }
}

function keyboardUp(event){
	if(event.keyCode==18){
			//console.log("keyup");
	keyboardHold = 0;
		if(!container){
	//$("body").removeChild(container);
    body.removeChild(container);
    }else{
    	container.style.display= 'none';
    }
    }
}

function mouseclick(event){
	clearTimeout(displayTimeout);
	if(!container){
	//$("body").removeChild(container);
    body.removeChild(container);
    }else{
    	container.style.display= 'none';
    }
}

function displayBox() {
    container.innerHTML="<img style='margin-top:5px;height:125px;width:125px;' src='http://gozoom4235.appspot.com/loading.gif'></div>";
	//body.appendChild(loadingContainer);
	if(on==1){
	body.appendChild(container);//appendChild会把之前所有关于container的以html节点方式加入，到这里才会在html中显示
	$(container).show('fast');
    }
}



function requestURL(link){
	sendMessage({
		hoverLink:'findURL',
		url:link
	});   //jason
}


function sendMessage(message){
	//chrome.runtime.sendMessage(message,empty);
}

function empty(){}

//========unknow
function drawWindow() {    //画一个框子显示usrl

		var all = document.getElementsByTagName('*');

		for ( var i=all.length; i >= 0; i-- ) {
			var style = getComputedStyle(all[i]);
			if ( !style )
				continue;
			var z = parseInt(style.getPropertyValue('z-index'));
			if ( z > zIndex )
				zIndex = z+1;
		}

		var _container = document.createElement('div');  
		_container.id = 'hoverLinkContainer';
		_container.style.zIndex = zIndex;
		_container.style['box-shadow']= '4px 4px 4px 0px rgba(77,77,77,1)';
		_container.style['border-color']= '#5974a2';
		container = _container;
		//drawloading();

	}

function drawloading(){
	var _loading = document.createElement('div');
		_loading.id = 'loadingContainer';
		_loading.style.zIndex = zIndex;
		_loading.style.width='40px';
		_loading.style.height='40px'; 
	    _loading.style['top']="50%";
         _loading.style['left']="50%";
	     _loading.style['margin-top']="-50px";
	     _loading.style['margin-left']="-100px";
		_loading.style.background='#333';
		_loading.style['border-radius']="100%";
		_loading.style['-webkit-animation'] ="scaleout 1.0s infinite ease-in-out";
		_loading.style['animation']=" scaleout 1.0s infinite ease-in-out";
		_loading.style['display']='block';
		 _loading.style['position']='fixed';  //随着屏幕滑动滑动
		loadingContainer = _loading;
}	



function insertLabel(txt){
	txt=txt.substring(1,txt.length-1);
	//console.log("<div style='position:fixed;'>"+txt+"</div>");
	container.innerHTML=txt;
	//嵌入到文本中(注意是‘’不是“”)
	//container.innerHTML='<button onclick="zoomout()">enlarger</button><input type="button" id ="button2" value="smaller" onclick="zoomin()"><div>'+txt+'</div>';
}


function showWord(webdata){
	 $.post('http://gozoom4235.appspot.com/body.php',{webdata:webdata},function(data){ //http://localhost/body.php	
     //$.post('http://localhost/body.php',{webdata:webdata},function(data){ //http://localhost/body.php	
     insertLabel(data);});	
}



})(window);



