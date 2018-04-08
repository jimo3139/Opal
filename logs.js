// * ****************************************************************************
// *  Copyright (c) 2012-2017 Skreens Entertainment Technologies Incorporated - http://skreens.com
// *
// *  Redistribution and use in source and binary forms, with or without  modification, are
// *  permitted provided that the following conditions are met:
// *
// *  Redistributions of source code must retain the above copyright notice, this list of
// *  conditions and the following disclaimer.
// *
// *  Redistributions in binary form must reproduce the above copyright  notice, this list of
// *  conditions and the following disclaimer in the documentation and/or other materials
// *  provided with the distribution.
// *
// *  Neither the name of Skreens Entertainment Technologies Incorporated  nor the names of its
// *  contributors may be used to endorse or promote products derived from this software without
// *  specific prior written permission.
// *
// *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
// *  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
// *  AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// *  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// *  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
// *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
// *  OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// * ******************************************************************************
'use strict';

var DISPLAY_ON = 0;
var DISPLAY_OFF = 1;

function clrWindows()
{
	let kai = document.getElementById('kaiId');
	let exc = document.getElementById('exchangeId');
	let trc = document.getElementById('traceId');
	let mod = document.getElementById('modelId');
	let cfg = document.getElementById('configId');
	let mon = document.getElementById('monitId');
	let wif = document.getElementById('wifiId');

	kai.style.display = 'none';
	exc.style.display = 'none';
	trc.style.display = 'none';
	mod.style.display = 'none';
	mon.style.display = 'none';
	cfg.style.display = 'none';
	wif.style.display = 'none';
}
function setButtons(value)
{
	let kai = document.getElementById('kaiId');
	let exc = document.getElementById('exchangeId');
	let trc = document.getElementById('traceId');
	let mod = document.getElementById('modelId');
	let cfg = document.getElementById('configId');
	let mon = document.getElementById('monitId');
	let wif = document.getElementById('wifiId');

	kai.style.display = 'none';
	exc.style.display = 'none';
	trc.style.display = 'none';
	mod.style.display = 'none';
	mon.style.display = 'none';
	cfg.style.display = 'none';
	wif.style.display = 'none';

	switch(value)
	{
		case "TRC":		trace_unit();break;
		case "XLOG":	exchange_unit();break;
		case "KLOG":	kai_unit();break;
		case "MODEL":	model_unit();break;
		case "KCONFIG":	config_unit();break;
		case "MONKAI":  monit_unit();break;
		case "WIFI":	getMessage(5);break;
		case "KLOG_X":	clrLogFile(1);break;
		case "XLOG_X":	clrLogFile(2);break;
		case "TRC_X":	clrLogFile(3);break;
		default : break;
	}
}
function trace_unit()
{
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/RC/remote/.trc.log");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4) {
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)	{
				let allText = myObject.responseText;
				document.getElementById("traceWindow").innerHTML = allText;
			}
			else if (myObject.status == 404) 
				alert("Error404: File not found = "+myPath);
			else if (myObject.status == 403) 
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
		}
	}
	let trcHTML = "<div id='traceId'>"; 
	trcHTML += "<textarea id = 'traceWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    trcHTML += "</div>";
	document.getElementById('tOptions').innerHTML = trcHTML;

	let sound = document.getElementById("audio");
	sound.play();
}

function exchange_unit()
{
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/RC/opal/exchange.log");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4) {
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)	{
				let allText = myObject.responseText;
				document.getElementById("exchangeWindow").innerHTML = allText;
			}
			else if (myObject.status == 404) 
				alert("Error404: File not found = "+myPath);
			else if (myObject.status == 403) 
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
		}
	}
	let trcHTML = "<div id='exchangeId'>"; 
	trcHTML += "<textarea id = 'exchangeWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    trcHTML += "</div>";
	document.getElementById('xOptions').innerHTML = trcHTML;

	let sound = document.getElementById("audio");
	sound.play();
}

function kai_unit()
{
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/run/media/mmcblk0p4/kai.log");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4) {
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)	{
				let allText = myObject.responseText;
				document.getElementById("kaiWindow").innerHTML = allText;
			}
			else if (myObject.status == 404) 
				alert("Error404: File not found = "+myPath);
			else if (myObject.status == 403) 
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
		}
	}
	let trcHTML = "<div id='kaiId'>"; 
	trcHTML += "<textarea id = 'kaiWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    trcHTML += "</div>";
	document.getElementById('kOptions').innerHTML = trcHTML;

	let sound = document.getElementById("audio");
	sound.play();
}

function model_unit()
{
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/model");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4) {
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)	{
				let allText = myObject.responseText;
				document.getElementById("modelWindow").innerHTML = allText;
			}
			else if (myObject.status == 404) 
				alert("Error404: File not found = "+myPath);
			else if (myObject.status == 403) 
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
		}
	}
	let trcHTML = "<div id='modelId'>"; 
	trcHTML += "<textarea id = 'modelWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    trcHTML += "</div>";
	document.getElementById('mOptions').innerHTML = trcHTML;

	let sound = document.getElementById("audio");
	sound.play();
}

function config_unit()
{
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/Go/kai.conf");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4) {
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)	{
				let allText = myObject.responseText;
				document.getElementById("configWindow").innerHTML = allText;
			}
			else if (myObject.status == 404) 
				alert("Error404: File not found = "+myPath);
			else if (myObject.status == 403) 
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
		}
	}
	let trcHTML = "<div id='configId'>"; 
	trcHTML += "<textarea id = 'configWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    trcHTML += "</div>";
	document.getElementById('cOptions').innerHTML = trcHTML;

	let sound = document.getElementById("audio");
	sound.play();
}

function monit_unit()
{
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/scripts/monitorKai.sh");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4) {
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)	{
				let allText = myObject.responseText;
				document.getElementById("monitWindow").innerHTML = allText;
			}
			else if (myObject.status == 404) 
				alert("Error404: File not found = "+myPath);
			else if (myObject.status == 403) 
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
		}
	}
	let trcHTML = "<div id='monitId'>"; 
	trcHTML += "<textarea id = 'monitWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    trcHTML += "</div>";
	document.getElementById('sOptions').innerHTML = trcHTML;

	let sound = document.getElementById("audio");
	sound.play();
}

function wifi_unit(allText)
{
	let wifiHTML = "<div id='wifiId'>"; 
	wifiHTML += "<textarea id = 'wifiWindow'  style='text-align:left; position:absolute; top:10px; left:175px; width:800px; height:500px; overflow-x:scroll;overflow-y:scroll;font-family:Times New Roman;font-size:10px;color:#000000; font-weight:bold; background-color:#ffffff'></textarea>";
    wifiHTML += "</div>";
	document.getElementById('wOptions').innerHTML = wifiHTML;

	if(allText != "empty") {
		document.getElementById("wifiWindow").innerHTML = allText;
	}


	let sound = document.getElementById("audio");
	sound.play();
}

function showMyOptions()
{
	trace_unit();
	exchange_unit();
	kai_unit();
	model_unit();
	wifi_unit("empty");
	config_unit();
	monit_unit();
	clrWindows();
}

function clrLogFile(myToken)
{
	let myString = "";
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace("/logs", "");

	let myPath = myUrl.concat("/opal");

	let myObject = new XMLHttpRequest();

	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = " + myObject.statusText);
		}
		else
		{
			//alert("Unknown Ready State from client = " + myObject.statusText + " State = " + myObject.readyState);
		}
	}

	if(myToken == 1)		myString = '{\"remove\":\"kailog\"}'; 
	else if(myToken == 2)	myString = '{\"remove\":\"exchange\"}'; 
	else if(myToken == 3)	myString = '{\"remove\":\"trace\"}'; 


	myObject.open("POST", myPath, true);
	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(myString); 


	// Check for request state to be OK.
	if(myObject.status == 200)
	{
		let recText = myObject.responseText;
		alert("Response from client = " + recText);
	}
	else if (myObject.status == 404) 
	{
		alert("Error404: File not found.");
	}
	else if (myObject.status == 403) 
	{
		alert("Error403: Forbidden access.");
	}
	else
	{
		//alert("Unknown Response from client. Status = " + myObject.status + " State = " + myObject.readyState + " URL = " + myPath); 
	}
	let sound = document.getElementById("audio");
	sound.play();
}
function getMessage(key)
{
	let allText = "Empty";
	let myString = "";
	let myPath = "";
	let myUrl = window.location.href;
	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');

	// Remove logs from this URL.
	myUrl = myUrl.replace(":9999/logs", "");

	switch(key)
	{
		case 1: myPath = myUrl.concat("/1/device/name");break;
		case 2: myPath = myUrl.concat("/1/audio-config");break;
		case 3: myPath = myUrl.concat("/1/window-manager/layout");break;
		case 4: myPath = myUrl.concat("/1/window-manager/background");break;
		case 5: myPath = myUrl.concat("/1/device/wifi-networks");break;
		case 6: myPath = myUrl.concat("/1/backgrounds");break;
	}
	let myObject = new XMLHttpRequest();

	myObject.open("GET", myPath, true);
	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState == 4)
		{
			// Check for request state to be OK.
			if(myObject.status == 200 || myObject.status == 0)
			{
				allText = myObject.responseText;

				if(key == 5) wifi_unit(allText);
			}
			else if (myObject.status == 404) 
			{
				alert("Error404: File not found = " + myPath);
			}
			else if (myObject.status == 403) 
			{
				alert("Error403: Forbidden access, or file type not supported by the server.");
			}
		}
	}
}
