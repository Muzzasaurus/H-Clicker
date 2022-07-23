/* Default Variables */
const origprices = [1, 100, 400, 900, 3500, 10000, 36000, 115000, 440000, 1000000, 2800000, 9100000, 22000000, 100000000, 700000000, 1000000000, 3000000000, (Math.random() * 1000000) + 10]
const origrewards = [0.1, 1, 3, 12, 40, 120, 700, 1400, 3000, 5000, 12000, 45000, 100000, 250000, 1500000, -5000000, 4000000, origprices[17] / (Math.random() * 1000) + 0.001]
const origbusinessPrices = [10, 250, 750, 6500, 21000, 254254, 1000000, 4000000, 25000000, 40000000, 111111111, 254254254, 933748382, 6969696969, 50000000000, 175000000000]
const origbusinessRewards = [0.1, 1, 3, 10, 70, 600, 1500, 3000, 9000, 15000, 51111, 84254, 187000, 500000, 3750000, 12500000]
const origisPurchased = [0]
/* Declaring Variables */
h=1;
newH=0;
clickPower=0;
trueClickPower=0;
startingHPC=0;
autoH=0;
trueAutoH=0;
theme=-1;
potentialGlod=0;
glodIncome=1;
glodH=0;
glodHNugget=0;
glodLimit=10;
trueGlodLimit=10;
glodPower=0;
glodBoost=1;
prestiges=0;
presToLimit=0;
requirement=1000000000;
hRemaining=1000000000;
tickSpeed=40;
saveTime=60;
autoSaveState=1;
saveTimer=60000;
const themes = ["Default", "Dark", "Reddish", "Blue", "Pastel", "Purple",
"Light Blue", "Orangey", "Green", "Fate", "Cheese Pyramid", "Papyrus Undertale",
"Somebody Scream", "Hatsune Miku Colour Palette", "Hard Mode", "Eye Bleeding Mode",
"Kazakh", "Azeri", "Trans"];
/* Flavour Arrays (H Per Second) */
prices = new Array(origprices.length);
rewards = new Array(origrewards.length);
upgrNum = new Array(rewards.length);
const flavours = ["Pencil", "Pen", "Printer", "Typewriter", "Keyboard", "Broken Keyboard", "Intern",
"H Secret Cult", "Employee", "Shady Business Partner", "H File Tactics", "Psychological Warfare",
"https://docs.google.com/document/d/1roD6zfNKjTEF-W3KmHWMI22GVrTtueUFx__ikHeNCfs/edit?usp=drivesdk",
"Genetically Modified H Men", "H Colonization", "Subservient Fish (blood for the blood god)", "Dragon Employee", "Random"]

/* Business Arrays (H Per Click) */
businessPrices = new Array(origbusinessPrices.length);
businessRewards = new Array(origbusinessRewards.length);
businessUpgrNum = new Array(businessRewards.length);
const businessNames = ["Chocolate H", "Strawberry H", "Crime H", "Lead Poisoning",
"Sand H", "Mango H", "Volcanic asH", "Golf Ball h", "Kamilia's H", "Irwing", "Multidimensional H", 
"Funny H", "Novalis by GrilleX", "Hilarious H", "Time Machine H", "Dragon H"]

/* Glod Shop Arrays */
glodPrices = [10, 25, 50, 150, 300]
glodRewards = [0.1, 1, 10, 30, 1]
isPurchased = new Array(origisPurchased.length);
for (i=0; i<(isPurchased.length); i++) {
		isPurchased[i]=origisPurchased[i];
}
/* Functions */
function onStart() {
	resetValues();
	changeTheme(1);
	idle();
	savedH = Number(localStorage.getItem(`${numericalValues[0]}`));
	if (savedH !== 0 && !isNaN(savedH)) {
		load();
	}
	autoSaver();
}
function increment() {
	h+=trueClickPower;
	newH+=trueClickPower;
}
function checkIfNegative() {
	if (h < 0) {
		h = 0;
	}
}
function idle() {
	document.getElementById("currency").innerHTML=addCommas(Math.round(h)) + " Hs<br>" + addCommas(Math.round(trueAutoH*10)/10) + "H/s";
	document.getElementById("glodHDisplay").innerHTML=addCommas(Math.round(glodH)) + " Glod H";
	document.getElementById("glodHNuggetDisplay").innerHTML=addCommas(Math.round(glodHNugget)) + " Glod H Nuggets";
	document.getElementById("glodHNuggetDisplay2").innerHTML=addCommas(Math.round(glodHNugget)) + " Glod H Nuggets";
	document.getElementById("prestigeCount").innerHTML="Increase glod limit by number of presiges (" + addCommas(Math.round(prestiges)) + " prestiges)";
	document.getElementById("clickDisplay").innerHTML=addCommas(Math.round(trueClickPower*10)/10) + " H/c";
	document.getElementById("resetButton").innerHTML="Reset for " + addCommas(potentialGlod) + " Glod H (Limit: " + addCommas(trueGlodLimit) +")";
	document.getElementById("glodCountdown").innerHTML=addCommas(Math.round(hRemaining)) + " Hs left.";
	for (i = 0; i < prices.length; i++) {
		document.getElementById(`hUpgrade${i+1}`).innerHTML=flavours[i] + " (" + addCommas(upgrNum[i]) + ")<br>(+" + addCommas(Math.round((rewards[i]*glodBoost)*10)/10) + " H/s)<br><br>" + addCommas(Math.round(prices[i]*1)/1) + " Hs";
	}
	for (i = 0; i < businessPrices.length; i++) {
		document.getElementById(`hBusiness${i+1}`).innerHTML=businessNames[i] + " (" + addCommas(businessUpgrNum[i]) + ")<br>(+" + addCommas(Math.round((businessRewards[i]*glodBoost)*10)/10) + " H/c)<br><br><br><br>" + addCommas(Math.round(businessPrices[i])) + " Hs";
	}
	h+=(trueAutoH/tickSpeed);
	newH+=(trueAutoH/tickSpeed);
	glodBoost=(glodH*glodPower)+1;
	trueAutoH=autoH*glodBoost;
	trueClickPower=clickPower*glodBoost;
	calculateLimit();
	canAfford();
	potentialCheck();
	checkIfNegative();
	setTimeout(idle, (1000/tickSpeed));
}
/* Price checks */
function canAfford() {
	for (i = 0; i < prices.length; i++) {
		if (h < prices[i]) {
			document.getElementById(`hUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`hUpgrade${i+1}`).removeAttribute("disabled");
		}
	}
	for (i = 0; i < businessPrices.length; i++) {
		if (h < businessPrices[i]) {
			document.getElementById(`hBusiness${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`hBusiness${i+1}`).removeAttribute("disabled");
		}
	}
	for (i = 0; i < glodPrices.length; i++) {
		if (glodHNugget < glodPrices[i]) {
			document.getElementById(`glodUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else if (isPurchased[i] == 1) {
			document.getElementById(`glodUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`glodUpgrade${i+1}`).removeAttribute("disabled");
		}
	}
	if (potentialGlod <= 0) {
		document.getElementById("resetButton").setAttribute ("disabled", "true");
	} else {
		document.getElementById("resetButton").removeAttribute("disabled");
	}
}
/* Purchases */
function purchase(upnum) {
	if (h < prices[upnum-1]) {
	} else {
		h-=prices[upnum-1];
		autoH+=rewards[upnum-1];
		prices[upnum-1]*=1.15;
		upgrNum[upnum-1]+=1;
		if (upgrNum[upnum-1] % 10 == 0) {
			autoH+=upgrNum[upnum-1]*rewards[upnum-1];
			rewards[upnum-1]*=2;
		}
	}
}
function purchaseBusiness(upnum) {
	if (h < businessPrices[upnum-1]) {
	} else {
		h-=businessPrices[upnum-1];
		clickPower+=businessRewards[upnum-1];
		businessPrices[upnum-1]*=1.4;
		businessUpgrNum[upnum-1]+=1;
		if (businessUpgrNum[upnum-1] % 5 == 0) {
			clickPower+=businessUpgrNum[upnum-1]*businessRewards[upnum-1];
			businessRewards[upnum-1]*=2;
		}
	}
}
function purchaseGlod(upnum, type) {
	if (glodHNugget < glodPrices[upnum-1]) {
	} else {
		glodHNugget-=glodPrices[upnum-1];
		isPurchased[upnum-1]=1;
		if (type == "limit") {
			glodLimit+=glodRewards[upnum-1];
		}
		if (type == "power") {
			glodPower+=glodRewards[upnum-1];
		}
		if (type == "startingHPC") {
			startingHPC+=glodRewards[upnum-1];
			clickPower+=glodRewards[upnum-1]/glodBoost;
		}
		if (type == "conditionalLimit") {
			presToLimit+=glodRewards[upnum-1];
		}
	}
}
function calculateLimit() {
	trueGlodLimit=glodLimit+(prestiges*presToLimit);
}
/* Glod H */
function potentialCheck() {
	if (potentialGlod < trueGlodLimit) {
		if (newH >= requirement) {
			potentialGlod+=(glodIncome*(Math.floor(newH/requirement)));
			requirement+=(Math.floor(newH/requirement))*10;
			newH=(newH % requirement);
		}
		hRemaining=(requirement-newH);
	} else {
		hRemaining=requirement;
		newH=0;
	}
	if (potentialGlod > trueGlodLimit) {
		potentialGlod = trueGlodLimit;
	}
	if (requirement > 1000000000+(trueGlodLimit*10)) {
		requirement = 1000000000+(trueGlodLimit*10);
	}
}
function glodPrestige() {
	resetValues();
	glodH+=potentialGlod;
	glodHNugget+=potentialGlod;
	potentialGlod=0;
	prestiges++;
}

/* Popups */
function popupWindow(screenName, shade) {
	document.getElementById(`greyOut${shade}`).style.display="block";
	document.getElementById(`${screenName}`).style.display="block";
}
function closeWindow(screenName, shade) {
	document.getElementById(`greyOut${shade}`).style.display="none";
	document.getElementById(`${screenName}`).style.display="none";
}
function closeAll() {
	closeWindow('hBusiness','1');
	closeWindow('hMachine','1');
	closeWindow('glodShop','2');
	closeWindow('options','1');
	closeWindow('shortcuts','1');
	closeWindow('confirmation','1');
}
/* Hotkeys */
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 72) { /* H key (makes h) */
		increment();
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 37) { /* Left Key (Changes theme by -1) */
		changeTheme(-1);
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 39) { /* Right Key (Changes theme by 1) */
		changeTheme(1);
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 27) { /* ESC Key (closes popups) */
		closeAll();
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 49) { /* 1 Key (closes all popups) */
		closeAll();
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 50) { /* 2 Key (opens H business) */
		closeAll();
		popupWindow('hBusiness','1');
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 51) { /* 3 Key (opens the machine) */
		closeAll();
		popupWindow('hMachine','1');
	}
}, true);
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 83) { /* S key (saves game) */
		save();
	}
}, true);
/* Options */
function updateSlider() {
	tickSpeed=document.getElementById("tickSlider").value;
	document.getElementById("tickDisplay").innerHTML = `Tickspeed (${tickSpeed})`;
}
function autoSave() {
	saveTime=document.getElementById("autoSlider").value;
	document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${saveTime}s)`;
	clearTimeout(saveTimer);
	autoSaver();
}
function autoSaver() {
	if (autoSaveState == 1) {
		save();
		saveTimer = setTimeout(autoSaver, saveTime*1000);
	}
}
function autoChange() {
	if (autoSaveState == 1) {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: OFF`;
		document.getElementById("autoSlider").style.display = "none";
		clearTimeout(saveTimer);
		autoSaveState = 0;
	} else {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${saveTime}s)`
		document.getElementById("autoSlider").style.display = "inline-block";
		autoSaveState = 1;
		autoSaver();
	}
}
/* Miscellaneous functions */
function changeTheme(scrollrate) {
	theme+=scrollrate;
	if (theme == (themes.length)) theme = 0;
	if (theme <= -1) theme = themes.length-1;
	document.getElementById("theme").href = `Themes/${themes[theme]}.css`;
	document.getElementById("themeDisplay").innerHTML="Theme: " + themes[theme];
}
function addCommas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
window.onmousemove = function (e) {
    var x = e.clientX;
	var y = e.clientY;
	for (i = 0; i < glodPrices.length; i++) {
		document.getElementById(`mouseOver${i+1}`).style.top = (y - 110) + "px";
		document.getElementById(`mouseOver${i+1}`).style.left = (x - 250) + "px";
	}
};
function resetValues() {
	autoH=0;
	trueAutoH=0;
	clickPower=startingHPC/glodBoost;
	trueClickPower=0;
	requirement=1000000000;
	hRemaining=requirement;
	autoSaveState=0;
	document.getElementById("autoSaveDisplay").innerHTML = `Autosave: OFF`;
		document.getElementById("autoSlider").style.display = "none";
	for (i=0; i<(prices.length); i++) {
		prices[i]=origprices[i];
	}
	for (i=0; i<(rewards.length); i++) {
		rewards[i]=origrewards[i];
	}
	for (i=0; i<(upgrNum.length); i++) {
		upgrNum[i]=0;
	}
	for (i=0; i<(businessUpgrNum.length); i++) {
		businessUpgrNum[i]=0;
	}
	for (i=0; i<(businessPrices.length); i++) {
		businessPrices[i]=origbusinessPrices[i];
	}
	for (i=0; i<(businessRewards.length); i++) {
		businessRewards[i]=origbusinessRewards[i];
	}
	h=1;
	newH=0;
}
function resetAll() {
	resetValues();
	closeWindow('confirmation', '2');
	potentialGlod=0;
	glodIncome=1;
	glodH=0;
	glodHNugget=0;
	glodLimit=10;
	trueGlodLimit=10;
	glodPower=0;
	glodBoost=1;
	prestiges=0;
	presToLimit=0;
	requirement=1000000000;
	hRemaining=1000000000;
}
/* Save and Load progress */
const numericalValues = ["h", "clickPower", "startingHPC", "autoH", "theme", "potentialGlod", "glodIncome", "glodH", 
"glodHNugget", "glodLimit", "glodPower", "glodBoost", "prestiges", "presToLimit", "requirement", "hRemaining", "tickSpeed",
"saveTime", "autoSaveState"]
function save() {
	for (i = 0; i < numericalValues.length; i++) {
		tempNum = Function(`return ${numericalValues[i]}`)();
		localStorage.setItem(`${numericalValues[i]}`, tempNum);
	}
	localStorage.prices = JSON.stringify(prices);
	localStorage.rewards = JSON.stringify(rewards);
	localStorage.upgrNum = JSON.stringify(upgrNum);
	localStorage.businessPrices = JSON.stringify(businessPrices);
	localStorage.businessRewards = JSON.stringify(businessRewards);
	localStorage.businessUpgrNum = JSON.stringify(businessUpgrNum);
	localStorage.glodPrices = JSON.stringify(glodPrices);
	localStorage.glodRewards = JSON.stringify(glodRewards);
	localStorage.isPurchased = JSON.stringify(isPurchased);
}
function load() {
	for (i = 0; i < numericalValues.length; i++) {
		varName = Function(`return ${numericalValues[i]}`)();
		if (varName !== "undefined") {
			varType = Function("return " + "numericalValues[i]")();
			window[varType] = Number(localStorage.getItem(`${numericalValues[i]}`));
		}
	}
	changeTheme(0);
	document.getElementById("tickDisplay").innerHTML = `Tickspeed (${tickSpeed})`;
	document.getElementById("tickSlider").value=tickSpeed;
	if (autoSaveState == 0) {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: OFF`;
		document.getElementById("autoSlider").style.display = "none";
	} else {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${saveTime}s)`
		document.getElementById("autoSlider").style.display = "inline-block";
		document.getElementById("autoSlider").value=saveTime;
	}
	if (localStorage.prices)
	prices = JSON.parse(localStorage.prices);
	if (localStorage.rewards)
	rewards = JSON.parse(localStorage.rewards);
	if (localStorage.upgrNum)
	upgrNum = JSON.parse(localStorage.upgrNum);
	if (localStorage.businessPrices)
	businessPrices = JSON.parse(localStorage.businessPrices);
	if (localStorage.businessRewards)
	businessRewards = JSON.parse(localStorage.businessRewards);
	if (localStorage.businessUpgrNum)
	businessUpgrNum = JSON.parse(localStorage.businessUpgrNum);
	if (localStorage.glodPrices)
	glodPrices = JSON.parse(localStorage.glodPrices);
	if (localStorage.glodRewards)
	glodRewards = JSON.parse(localStorage.glodRewards);
	if (localStorage.isPurchased)
	isPurchased = JSON.parse(localStorage.isPurchased);
}