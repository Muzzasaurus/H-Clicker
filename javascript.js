/* Default Variables */
const origprices = [1, 100, 400, 900, 3500, 10000, 36000, 115000, 440000, 1000000, 2800000, 9100000, 22000000, 100000000, 700000000, 3000000000]
const origrewards = [0.1, 1, 3, 12, 40, 120, 700, 1400, 3000, 5000, 12000, 45000, 100000, 250000, 1500000, 4000000]
const origbusinessPrices = [10, 250, 750, 6500, 21000, 254254, 1000000, 4000000, 25000000, 40000000, 111111111, 254254254, 6969696969, 50000000000, 175000000000]
const origbusinessRewards = [0.1, 1, 3, 10, 70, 600, 1500, 3000, 9000, 15000, 51111, 84254, 150000, 750000, 1250000]
const origisPurchased = [0]
/* Declaring Variables */
h=1;
newH=0;
clickPower=0;
autoH=0;
theme=-1;
potentialGlod=0;
glodIncome=1;
glodH=0;
glodHNugget=0;
glodLimit=10;
glodPower=0;
requirement=1000000000;
hRemaining=1000000000;
const themes = ["Default", "Dark", "Reddish", "Blue", "Pastel", "Purple",
"Light Blue", "Orangey", "Green", "Fate", "Cheese Pyramid", "Papyrus Undertale",
"Somebody Scream", "Hatsune Miku Colour Palette", "Hard Mode", "Eye Bleeding Mode", "Trans"];
/* Flavour Arrays (H Per Second) */
const prices = new Array(origprices.length);
const rewards = new Array(origrewards.length)
const trueRewards = new Array(rewards.length);
const flavours = ["Pencil", "Pen", "Printer", "Typewriter", "Keyboard", "Broken Keyboard", "Intern",
"H Secret Cult", "Employee", "Shady Business Partner", "H File Tactics", "Psychological Warfare",
"https://docs.google.com/document/d/1roD6zfNKjTEF-W3KmHWMI22GVrTtueUFx__ikHeNCfs/edit?usp=drivesdk",
"Genetically Modified H Men", "H Colonization", "Dragon Employee"]
upgradeNumber = prices.length;

/* Business Arrays (H Per Click) */
const businessPrices = new Array(origbusinessPrices.length);
const businessRewards = new Array(origbusinessRewards.length);
const trueBusinessRewards = new Array(businessRewards.length);
const businessNames = ["Chocolate H", "Strawberry H", "Crime H", "Lead Poisoning",
"Sand H", "Mango H", "Volcanic asH", "Golf Ball h", "Kamilia's H", "Irwing", "Multidimensional H", 
"Funny H", "Hilarious H", "Time Machine H", "Dragon H"]
businessNumber = businessPrices.length;

/* Glod Shop Arrays */
const glodPrices = [10, 10]
const glodRewards = [100, 0.01]
const glodType = ["glodLimit", "glodPower"]
const isPurchased = new Array(origisPurchased.length);
for (i=0; i<(isPurchased.length); i++) {
		isPurchased[i]=origisPurchased[i];
}
/* Functions */
function onStart() {
	resetValues();
	changeTheme(1);
	idle();
}
function increment() {
	h+=clickPower;
	newH+=clickPower;
}
function checkIfNegative() {
	if (h < 0) {
		h = 0;
	}
}
function idle() {
	document.getElementById("currency").innerHTML=Math.round(h) + " Hs<br>" + Math.round(autoH*10)/10 + "H/s";
	document.getElementById("glodHDisplay").innerHTML=Math.round(glodH) + " Glod H";
	document.getElementById("glodHNuggetDisplay").innerHTML=Math.round(glodHNugget) + " Glod H Nuggets";
	document.getElementById("glodHNuggetDisplay2").innerHTML=Math.round(glodHNugget) + " Glod H Nuggets";
	document.getElementById("clickDisplay").innerHTML=Math.round(clickPower*10)/10 + " H/c";
	document.getElementById("resetButton").innerHTML="Reset for " + potentialGlod + " Glod H (Limit: " + glodLimit +")";
	document.getElementById("glodCountdown").innerHTML=Math.round(hRemaining) + " Hs left.";
	for (i = 0; i < upgradeNumber; i++) {
		document.getElementById(`hUpgrade${i+1}`).innerHTML=flavours[i] + "<br>(+" + Math.round(trueRewards[i]*10)/10 + " H/s)<br><br>" + Math.round(prices[i]*100)/100 + " Hs";
	}
	for (i = 0; i < businessNumber; i++) {
		document.getElementById(`hBusiness${i+1}`).innerHTML=businessNames[i] + "<br>(+" + Math.round(trueBusinessRewards[i]*10)/10 + " H/c)<br><br><br><br>" + Math.round(businessPrices[i]) + " Hs";
	}
	/*
	for (i = 0; i < glodPrices.length; i++) {
		document.getElementById(`glodUpgrade${i+1}`).innerHTML=businessNames[i] + "<br>(+" + Math.round(trueBusinessRewards[i]*10)/10 + " H/c)<br><br><br><br><br>" + Math.round(businessPrices[i]) + " Hs";
	}
	*/
	h+=(autoH/40);
	newH+=(autoH/40);
	glodBoost=(glodH*glodPower)+1;
	rewardBoost();
	canAfford();
	potentialCheck();
	checkIfNegative();
	setTimeout(idle, 25);
}
/* Price checks */
function canAfford() {
	for (i = 0; i < upgradeNumber; i++) {
		if (h < prices[i]) {
			document.getElementById(`hUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`hUpgrade${i+1}`).removeAttribute("disabled");
		}
	}
	for (i = 0; i < businessNumber; i++) {
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
}
/* Purchases */
function purchase(upnum) {
	h-=prices[upnum-1];
	autoH+=trueRewards[upnum-1];
	prices[upnum-1]*=1.15;
}
function purchaseBusiness(upnum) {
	h-=businessPrices[upnum-1];
	clickPower+=trueBusinessRewards[upnum-1];
	businessPrices[upnum-1]*=1.4;
}
function purchaseGlod(upnum, type) {
	glodHNugget-=glodPrices[upnum-1];
	isPurchased[upnum-1]=1;
	if (type == "limit") {
		glodLimit=glodRewards[upnum-1];
	}
	if (type == "power") {
		glodPower+=glodRewards[upnum-1];
	}
}
/* Glod H */
function potentialCheck() {
	if (potentialGlod < glodLimit) {
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
	if (potentialGlod > glodLimit) {
		potentialGlod = glodLimit;
	}
	if (requirement > 1000000000+(glodLimit*10)) {
		requirement = 1000000000+(glodLimit*10);
	}
}
function glodPrestige() {
	resetValues();
	glodH+=potentialGlod;
	glodHNugget+=potentialGlod;
	potentialGlod=0;
}
function rewardBoost() {
	for (i=0; i<(rewards.length); i++) {
		trueRewards[i] = rewards[i]*glodBoost;
	}
	for (i=0; i<(businessRewards.length); i++) {
		trueBusinessRewards[i] = businessRewards[i]*glodBoost;
	}
}
window.onmousemove = function (e) {
    var x = e.clientX;
	var y = e.clientY;
	for (i = 0; i < glodPrices.length; i++) {
		document.getElementById(`mouseOver${i+1}`).style.top = (y - 110) + "px";
		document.getElementById(`mouseOver${i+1}`).style.left = (x - 250) + "px";
	}
};
/* Popups */
function popupWindow(screenName, shade) {
	document.getElementById(`greyOut${shade}`).style.display="block";
	document.getElementById(`${screenName}`).style.display="block";
}
function closeWindow(screenName, shade) {
	document.getElementById(`greyOut${shade}`).style.display="none";
	document.getElementById(`${screenName}`).style.display="none";
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
		closeWindow('hBusiness','1');
		closeWindow('hMachine','1');
		closeWindow('glodShop','2');
		closeWindow('options','1');
	}
}, true);

function changeTheme(scrollrate) {
	theme+=scrollrate;
	if (theme == (themes.length)) theme = 0;
	if (theme <= -1) theme = themes.length-1;
	document.getElementById("theme").href = `Themes/${themes[theme]}.css`;
	document.getElementById("themeDisplay").innerHTML="Theme: " + themes[theme];
}

function resetValues() {
	h=1;
	newH=0;
	clickPower=0;
	autoH=0;
	requirement=1000000000;
	hRemaining=1000000000;
	for (i=0; i<(prices.length); i++) {
		prices[i]=origprices[i];
	}
	for (i=0; i<(rewards.length); i++) {
		rewards[i]=origrewards[i];
	}
	for (i=0; i<(businessPrices.length); i++) {
		businessPrices[i]=origbusinessPrices[i];
	}
	for (i=0; i<(businessRewards.length); i++) {
		businessRewards[i]=origbusinessRewards[i];
	}
}