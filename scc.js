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

var urlHome = "http://";
var DISPLAY_ON = 0;
var DISPLAY_OFF = 1;
var remoteLayout = 0;
var textBoxClear = true;
var swtAddr1 = "0" 
var optAddr1 = "0.0.0.0" 
var optAddr2 = "0.0.0.0" 
var optPort1 = "0" 
var optPort2 = "0" 
var optOSD1 = "port_1" 
var optOSD2 = "port_2" 
var optOSD3 = "port_3" 
var optOSD4 = "port_4" 
var optMessage = "Invalid" 
var nextInput = 1;
var messLines = [];
var messElements = 0;
var layoutLoaded = 0;
var layoutCnt = 0;
var layoutPos = 0;
var layoutBuffer = [];
var layoutName = [];
var layoutId = [];
var loadedLayoutName = "NONE";
var loadedLayoutId = 0;
var layoutWindows = [];
var audioPort = 1;

// OSD mode, 0 = None, 1 = Status, 2 = Info/Help, 3 = Menu, 4 - Guide/Layouts
var OSD_Mode = 0;	

function optionSetup()
{
	let ectl;
	let dctl;

	let optHTML = "<div id='optionsId' style='position:absolute; top:180px; left:130px; width:500px; height:200px;'>";
	optHTML += "<table border='1' width='100%' cellspacing='1' style='text-align:center; overflow:hidden; font-family:Times New Roman; font-size:16px; color:#000000; background-color:#00ccFF;'>";

	optHTML += "<tr>"; 
   	optHTML += "<td><input type='text' id='cfgAddr1' style='width:150px;'></td>";
   	optHTML += "<td><input type='checkbox' id='enbAddr1' style='width:20px;height:20px;'></td>";
   	optHTML += "<td>Redirected IP address</td>"; 
	optHTML += "</tr>";
	optHTML += "<tr>"; 
   	optHTML += "<td><input type='text' id='cfgOSD1' style='width:150px;'></td>";
   	optHTML += "<td><input type='checkbox' id='enbOSD1' style='width:20px;height:20px;'></td>";
   	optHTML += "<td>Port 1 OSD Name</td>";
	optHTML += "</tr>";
	optHTML += "<tr>"; 
   	optHTML += "<td><input type='text' id='cfgOSD2' style='width:150px;'></td>";
   	optHTML += "<td><input type='checkbox' id='enbOSD2' style='width:20px;height:20px;'></td>";
   	optHTML += "<td>Port 2 OSD Name</td>";
	optHTML += "</tr>";
	optHTML += "<tr>"; 
   	optHTML += "<td><input type='text' id='cfgOSD3' style='width:150px;'>";
   	optHTML += "<td><input type='checkbox' id='enbOSD3' style='width:20px;height:20px;'></td>";
   	optHTML += "<td>Port 3 OSD Name</td>";
	optHTML += "</tr>";
	optHTML += "<tr>"; 
   	optHTML += "<td><input type='text' id='cfgOSD4' style='width:150px;'></td>";
   	optHTML += "<td><input type='checkbox' id='enbOSD4' style='width:20px;height:20px;'></td>";
   	optHTML += "<td>Port 4 OSD Name</td>";
	optHTML += "</tr>";

	optHTML += "<tr>";
   	optHTML += "<td>";
   	optHTML += "<button onclick='sendOptions(1)' style='text-align:left; overflow:hidden; color:#000000; background-color:#FFFF66;' id='ALMAction' name'ALM'>Submit</button>";
   	optHTML += "<button onclick='sendOptions(0)' style='text-align:left; overflow:hidden; color:#000000; background-color:#FFFF66;' id='ALMAction' name'ALM'>Cancel</button>";
   	optHTML += "</td>";
   	optHTML += "<td></td>";
   	optHTML += "<td></td>";
   	optHTML += "</tr>";

   	optHTML += "</table></div>";
	document.getElementById('aOptions').innerHTML = optHTML;

	let myAddr1 = document.getElementById('cfgAddr1');
	myAddr1.value = optAddr1;

	let enable = document.getElementById('enbAddr1');
	enable.value = swtAddr1;

	let myPort1 = document.getElementById('cfgOSD1');
	myPort1.value = optOSD1;

	let myPort2 = document.getElementById('cfgOSD2');
	myPort2.value = optOSD2;

	let myPort3 = document.getElementById('cfgOSD3');
	myPort3.value = optOSD3;

	let myPort4 = document.getElementById('cfgOSD4');
	myPort4.value = optOSD4;

	let swtLocal = localStorage.getItem('storeSWT1');
	if(swtLocal == "true") {
		document.getElementById('enbAddr1').checked = true;
	}
	else {
		document.getElementById('enbAddr1').checked = false;
	}

	document.getElementById('enbOSD1').disabled = true;
	document.getElementById('enbOSD2').disabled = true;
	document.getElementById('enbOSD3').disabled = true;
	document.getElementById('enbOSD4').disabled = true;
}

function sendOptions(ctrl)
{
	if(ctrl == 1)
	{
		swtAddr1 = document.getElementById('enbAddr1').checked;
		localStorage.setItem('storeSWT1',swtAddr1);

		if(swtAddr1 == true) {
			optAddr1 = document.getElementById('cfgAddr1').value;
			localStorage.setItem('storeIp1',optAddr1);
		}
		else
		{
			myIP(); 
		}
		// Get the current layout inventory.
		getMessage(4);

		optOSD1 = document.getElementById('cfgOSD1').value;
		localStorage.setItem('storeOSD1',optOSD1);
		optOSD2 = document.getElementById('cfgOSD2').value;
		localStorage.setItem('storeOSD2',optOSD2);
		optOSD3 = document.getElementById('cfgOSD3').value;
		localStorage.setItem('storeOSD3',optOSD3);
		optOSD4 = document.getElementById('cfgOSD4').value;
		localStorage.setItem('storeOSD4',optOSD4);
		// Send the OSD port names to the Kai.
		setOSDNames(); 
	}
	// Turn this table off after the submit.
	let divSection1 = document.getElementById('optionsId');
	divSection1.style.display = 'none';

	// Turn on the info window during config.
	let divSection2 = document.getElementById('aInfo');
	divSection2.style.display = 'block';
}

function config_unit(display)
{
	let localPort = 0;

	// Turn off the info window during config.
	let divSection1 = document.getElementById('aInfo');
	divSection1.style.display = 'none';
	
	let swtLocal = localStorage.getItem('storeSWT1');
	let allText = ("SWT1 " + swtLocal);
	configOptions(allText, display); 

	let localIp = localStorage.getItem('storeIp1');
	if(localIp == null) localIp = "192.168.0.0";

	allText = ("IP1 " + localIp + " " + localPort);
	configOptions(allText, display); 

	let localOSD1 = localStorage.getItem('storeOSD1');
	let localOSD2 = localStorage.getItem('storeOSD2');
	let localOSD3 = localStorage.getItem('storeOSD3');
	let localOSD4 = localStorage.getItem('storeOSD4');

	allText = ("OSD1 " + localOSD1);
	configOptions(allText, display); 
	allText = ("OSD2 " + localOSD2);
	configOptions(allText, display); 
	allText = ("OSD3 " + localOSD3);
	configOptions(allText, display); 
	allText = ("OSD4 " + localOSD4);
	configOptions(allText, display); 
}

function configOptions(text, display) 
{
	let index;
	let i;
	let cnt;
	let count = text.split(/\r\n|\r|\n/); 

	// Check for no data.
	if(count.length > 0)
	{
		// Split up the config file parameters and init our option array.
		for(i = 0;i < (count.length); i++)
		{
			cnt = count[i].split(" "); 
			let option = cnt[0].split(" ", cnt.length);

			switch(cnt[0])
			{
				case 'IP1' :
				{
					optAddr1 = cnt[1];
					optPort1 = cnt[2];
					break;
				}
				case 'IP2' :
				{
					optAddr2 = cnt[1];
					optPort2 = cnt[2];
					break;
				}
				case 'OSD1' : optOSD1 = cnt[1];break;
				case 'OSD2' : optOSD2 = cnt[1];break;
				case 'OSD3' : optOSD3 = cnt[1];break;
				case 'OSD4' : optOSD4 = cnt[1];break;
				case 'SWT1' : swtAddr1 = cnt[1];break;
			}
		
		}
		if(display == DISPLAY_ON)
			optionSetup();
	}
}

function currentLayout()
{
	getMessage(3);
	window.setTimeout(currentLayout,4000); // Sample every 4 seconds.
}

function showMyDevices()
{
	myIP(); 
	textBoxClear = true;
	//config_unit(DISPLAY_OFF);
	getMessage(4);
	model_display();
	//window.setTimeout(showMyDevices,4000); // Sample every 4 seconds.
}

function getMessage(key)
{
	let allText = "Empty";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = "";
	switch(key)
	{
		case 1: myPath = myUrl.concat("/1/device/name");break;
		case 2: myPath = myUrl.concat("/1/audio-config");break;
		case 3: myPath = myUrl.concat("/1/window-manager/layout");break;
		case 4: myPath = myUrl.concat("/1/layouts");break;
		case 5: myPath = myUrl.concat("/1/layouts/default");break;
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
				
				if(key == 3) deviceLoaded(allText);
				if(key == 4) deviceInfo(allText);

				let messElements = 0;
				for (let i = 0; i < allText.length; i++) 
				{
					if (allText[i] == ",") messElements++;
				}

				// For the cases where we have a single line response, we will not have a comma.
				if((allText.length != 0) && (messElements == 0))
				{
					messElements = 1;
					messLines = allText.split(",", messElements);
					allText = allText.replace(/"/g,"");
					messLines[0] = allText;
				}
				else
				{
					messLines = allText.split(",", messElements);
				}
				//config_message(messElements, DISPLAY_ON);
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
function deviceInfo(allText)
{
	let newObj = JSON.parse(allText);
	layoutCnt = newObj.length; 

	let sttHTML = "<div style='background-color:#000000; position:absolute; overflow-y:auto; width:540px; height:375px; top:94px; left:110px;'>";
	sttHTML += "<fieldset><legend style='text-align:center; font-size:16px; height:24px; color:#ffffff; background-color:#000000'></legend>";
	sttHTML += "<table>";
	sttHTML += "<tr>";
        
	if(newObj.length != 0)
	{
		for(let i=0; i < newObj.length; i++) 
		{		
			sttHTML += "<tr>";

			sttHTML += "<td><input  type='text' id='ekey";
			sttHTML += i; 
			sttHTML += "' style='text-align:center; width:300px; font-size:16px; height:24px; color:#000000; background-color:#00ccFF'></td>";

			sttHTML += "<td><input type='text' id='evalue";
			sttHTML += i;
			sttHTML += "' style='text-align:center; width:50px; font-size:16px; height:24px; color:#000000; background-color:#00ccFF'></td>";

			sttHTML += "<td><input type='text' id='eid";
			sttHTML += i;
			sttHTML += "' style='text-align:center; width:50px; font-size:16px; height:24px; color:#000000; background-color:#00ccFF'></td>";
	    
			sttHTML += "<td><input style='height:25px; width:25px;' type='checkbox' id='esel";
			sttHTML += i;
			sttHTML += "' onclick='devSelector(";
			sttHTML += i;
			sttHTML += ")'></td>";
			sttHTML += "</tr>";
		}
	}
			
	sttHTML += "</table></fieldset></div>";
	document.getElementById('aInfo').innerHTML = sttHTML;

	if(newObj.length != 0)
	{
		let eOne = 'ekey';
		let eTwo = 'evalue';
		let eTwo2 = 'eid';
		let eThree = 'esel';

		for(let i=0; i < newObj.length; i++) 
		{
			layoutName[i] = newObj[i].name;
			layoutId[i] = newObj[i].id;
			layoutWindows[i] = newObj[i].windows.length;
			document.getElementById(eOne+i).value = newObj[i].name;
			document.getElementById(eTwo+i).value = newObj[i].windows.length;
			document.getElementById(eTwo2+i).value = newObj[i].id;
			document.getElementById(eThree+i).checked = false;
		}
	}
}
function deviceLoaded(allText)
{
	let newObj = JSON.parse(allText);
	loadedLayoutName = newObj.name;
	loadedLayoutId = newObj.id;

	document.getElementById("textArg1").value="";
	let textForm = 0;
	textForm = document.forms[0].textArg1;
	textForm.value = textForm.value + "Layout: " + loadedLayoutName + " ID: " + loadedLayoutId;
}
function devSelector(unit)
{	
	let eOne = 'esel';

	for(let i=0; i < layoutCnt; i++) 
	{		
		document.getElementById(eOne+i).checked = false;
	}

	layoutLoaded = layoutId[unit];

	document.getElementById(eOne+unit).checked = true;
	sendMessageLAYOUT(layoutId[unit],unit);
}

function setOSDNames()
{
	setPortName(1,optOSD1);
	setPortName(2,optOSD2);
	setPortName(3,optOSD3);
	setPortName(4,optOSD4);
}
function setPortName(port,myToken)
{
	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	myUrl = myUrl.concat("/1/hdmi-ports/");
	let myPath = myUrl.concat(port);

	let myObject = new XMLHttpRequest();
	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
	}

	let part1 = '{\"device_name\":\"'; 
	myString = part1.concat(myToken);
	myString = myString.concat('\"}');

	myObject.open("PUT", myPath, true);
	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(myString); 

	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState == 4)
		{
			// Check for request state to be OK.
			if(myObject.status == 200 || myObject.status == 0)
			{
				allText = myObject.responseText;
				//alert("Response from send OSD names PUT client = " + allText);
				//alert("send OSD path = " + myPath);
				//alert("send OSD name = " + myString);
			}
			else if (myObject.status == 404) 
			{
				alert("Error404: File not found = "+myPath);
			}
			else if (myObject.status == 403) 
			{
				alert("Error403: Forbidden access, or file type not supported by the server.");
			}
		}
	}
}
function sendMessageLAYOUT(myToken,pos)
{
	let realLayout = (Number(myToken));

	// Overwrite the text box with appropiate layout+offset value.
	document.getElementById("textArg0").value="";
	let textForm = 0;
	textForm = document.forms[0].textArg0;
	textForm.value = textForm.value + "Layout Loaded = " + layoutName[pos];

	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = myUrl.concat("/1/window-manager/layout");

	let myObject = new XMLHttpRequest();
	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
	}

	let part1 = '{\"id\":'; 
	myString = part1.concat(realLayout);
	myString = myString.concat('}');

	myObject.open("PUT", myPath, true);
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
		//alert("Unknown status Response from client = "+myObject.status); 
	}
}
function setDefaultLayout()
{
	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = myUrl.concat("/1/layouts/default");

	let myObject = new XMLHttpRequest();
	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
	}

	let part1 = '{\"layout_id\":'; 
	myString = part1.concat(layoutLoaded)
	myString = myString.concat('}');

	myObject.open("PUT", myPath, true);
	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(myString); 

	// Check for request state to be OK.
	if(myObject.status == 200)
	{
		let recText = myObject.responseText;
		alert("Response from client = " + recText);
	}
	else if (myObject.status == 400) 
	{
		alert("Error400: Bad Request.");
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
		//alert("Unknown status Response from client = "+myObject.status); 
	}
}

function sendCharControl(myToken)
{
	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = myUrl.concat("/1/keyboard/control-character");

	let myObject = new XMLHttpRequest();
	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
	}
	if(myToken == 1) myString = '{\"control_character\":\"left\"}'; 
	else if(myToken == 2) myString = '{\"control_character\":\"right\"}'; 
	else if(myToken == 3) myString = '{\"control_character\":\"return\"}'; 
	else if(myToken == 4) myString = '{\"control_character\":\"tab\"}';
	else if(myToken == 5) myString = '{\"control_character\":\"up\"}'; 
	else if(myToken == 6) myString = '{\"control_character\":\"down\"}'; 
	else if(myToken == 7) myString = '{\"control_character\":\"end\"}'; 
	else if(myToken == 8) myString = '{\"control_character\":\"home\"}';
	else if(myToken == 9) myString = '{\"control_character\":\"backspace\"}';
	else if(myToken == 10) myString = '{\"control_character\":\"delete\"}';
	else if(myToken == 11) myString = '{\"control_character\":\"pageup\"}';
	else if(myToken == 12) myString = '{\"control_character\":\"pagedown\"}';
	else if(myToken == 13) myString = '{\"control_character\":\"home\"}';

	myObject.open("POST", myPath, true);
	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(myString); 

	// Check for request state to be OK.
	if(myObject.status == 200)
	{
		let recText = myObject.responseText;
		alert("Response from client = "+recText);
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
		//alert("Unknown status Response from client = "+myObject.status); 
	}
	
}
function sendKeyboard(myToken)
{
	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = myUrl.concat("/1/keyboard/text");

	if(myToken == 1) myString = '{\"text\": \"f\"}'; 
	
	let myObject = new XMLHttpRequest();
	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
	}
	myObject.open("POST", myPath, true);
	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(myString); 

	// Check for request state to be OK.
	if(myObject.status == 200)
	{
		let recText = myObject.responseText;
		//alert("Response from client = " + recText);
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
		//alert("Unknown status Response from client = "+myObject.status); 
	}
}
function sendMessageOSD(myToken)
{
	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = myUrl.concat("/1/osd");

	let myObject = new XMLHttpRequest();

	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
		else
		{
			//alert("Unknown Ready State from client = " + myObject.statusText + " State = " + myObject.readyState);
		}
	}
	// OSD mode, 0 = None, 1 = Status, 2 = Info/Help, 3 = Menu, 4 - Guide/Layouts, 5 will CANCEL OSD and 6 = HOME.

	OSD_Mode = myToken;
	if(myToken == 1)		myString = '{\"screen\":\"status\"}'; 
	else if(myToken == 2)	myString = '{\"screen\":\"help\"}'; 
	else if(myToken == 3)	myString = '{\"screen\":\"menu\"}'; 
	else if(myToken == 4)	myString = '{\"screen\":\"layouts\"}'; 
	else if(myToken == 6)	myString = '{\"screen\":\"home\"}'; 
	else myString = '{}'; 

	if(myToken == 5)
	{
		myObject.open("DELETE", myPath, true);	
		OSD_Mode = 0;
	}
	else				myObject.open("POST", myPath, true);

	myObject.setRequestHeader("Accept","application-json");
	myObject.setRequestHeader("Content-Type","application-json");
	myObject.send(myString); 


	// Check for request state to be OK.
	if(myObject.status == 200)
	{
		let recText = myObject.responseText;
		alert("Response from client = "+recText);
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
}
function sendAudioConfig(myToken)
{

	let myString="";
	let myUrl = urlHome.concat(optAddr1);
	let myPath = myUrl.concat("/1/audio-config");

	let myObject = new XMLHttpRequest();
	myObject.onreadystatechange = function() 
	{//Call a function when the state changes.
		if(myObject.readyState == 0)
		{
			alert("Request not initalized");
		}
		else if(myObject.readyState == 4)
		{
			//alert("Ready State from client = "+myObject.statusText);
		}
	}
	let part1 = '{\"hdmi_out_stream\":'; 
	myString = part1.concat(audioPort);
	myString = myString.concat('}');

	if(audioPort == 5) audioPort = 1;
	else audioPort++;

	myObject.open("PUT", myPath, true);
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
		//alert("Unknown status Response from client = "+myObject.status); 
	}
}
function remoteKeyPress(key)
{
	let group = 0;
	let myToken = 0;

	document.getElementById("textArg0").value="";
	let textForm = 0;
	textForm = document.forms[0].textArg0;
	textForm.value = textForm.value + "Key Press = " + key;

	switch(key)
	{
			// OSD keys
			case "STATUS"		:	group = 1; myToken = 1;break;	
			case "HELP"			:	group = 1; myToken = 2;break;	
			case "MENU"			:	group = 1; myToken = 3;break;	
			case "LAYOUTS"		:	group = 1; myToken = 4;break;	
			case "CANCEL"		:	group = 1; myToken = 5;break;	
			case "HOME" 		:	group = 1; myToken = 6;break;	

			case "SAVE"			:	group = 2; myToken = 0;break;	

			case "AUDIO" 		:	group = 3; myToken = 1;break;	

			// Navigation keys
			case "LEFT"			:	group = 5; myToken = 1;break;	
			case "RIGHT"		:	group = 5; myToken = 2;break;	
			case "SWAP"			:	group = 5; myToken = 5;break;	
			case "DOWN"			:	group = 5; myToken = 6;break;	
			// OSD mode, 0 = None, 1 = Status, 2 = Info/Help, 3 = Menu, 4 - Guide/Layouts
			case "SELECT" :
			{	
				if(OSD_Mode == 4)
				{
					group = 5; 
					myToken = 3;
					break;
				}
				else
				{
					group = 7; 
					myToken = 1;
					break;	
				}
			}
	}
	getMessage(3);

	switch(group)
	{
		case 1: sendMessageOSD(myToken);break;
		case 2: setDefaultLayout(myToken);break;
		case 3: sendAudioConfig(myToken);break;
		case 5: sendCharControl(myToken);break;
		case 7: sendKeyboard(myToken);break;
	}

	let sound = document.getElementById("audio");
	sound.play();
}
function myIP() 
{
    let ip = location.hostname;
	optAddr1 = ip;
}
function displayHelp()
{ 
	let helpHTML = "<div id='help_help2' style='position:absolute; top:0px; left:0px'>";
    helpHTML += "<img id='help_help' src='/images/help.png'>";
	helpHTML += "</div>";  
	document.getElementById('aHelp').innerHTML = helpHTML;
	if(aHelp.style.display == 'block')
	{
		aHelp.style.display = 'none'; // none is don't display div.
	}
	else
	{
		aHelp.style.display = 'block';
	}
}
function model_display()
{
	let myUrl;
	let myPath = "";
	let allText = "Empty";
	//myUrl = urlHome.concat(optAddr1);
	myUrl = urlHome.concat("192.168.1.124");
	myUrl = myUrl.concat(":9999/");

	// Some times there is an anchor "#" on the end of this string. We need to remove it.
	myUrl = myUrl.replace('/#','/');
	myPath = myUrl.concat("/kaiModelInfo");
	//myPath = myUrl.concat("/RC/remote/jet.cfg");

	let myObject = new XMLHttpRequest();
	myObject.open("GET", myPath, true);

	myObject.send(null); // Do a GET.
	myObject.onreadystatechange = function ()
	{
		// check for request finished.
		if(myObject.readyState === 4)
		{
			// Check for request state to be OK.
			if(myObject.status === 200 || myObject.status == 0)
			{
				let allText = myObject.responseText;
				console.log("Response : " + allText);
				modelDecode(allText); 

			}
			else if (myObject.status == 404) 
			{
				alert("Error404: File not found = " + myPath);
			}
			else if (myObject.status == 403) 
			{
				alert("Error403: Forbidden access, or file type not supported by the copper server.");
			}
		}
	}
}

function modelDecode(text) 
{
	let index;
	let i;
	let cnt;
	let count = text.split(/\r\n|\r|\n/); 

	// If there is a blank jet.cfg file, the count will typically be 4. Don't use it.
	if(count.length > 4)
	{
		// Split up the model file parameters and init our option array.
		for(i = 0;i < (count.length-1); i++)
		{
			cnt = count[i].split(" "); 
			let option = cnt[0].split(" ", cnt.length);

			switch(cnt[0])
			{
				//case 'guimode' :		cKaiGui = cnt[1];break;
			}
		
		}

		modelSetup();
	}
	else
	{
//		alert("Empty JSON model packet.");
	}
}
