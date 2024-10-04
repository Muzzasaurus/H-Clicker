/*		Unchanging Arrays and Variables		  */
const origprices = [1, 50, 400, 900, 3500, 10000, 36000, 115000, 440000, 1000000, 2800000, 9100000, 22000000, 100000000, 700000000, 3000000000, (Math.random() * 1000000) + 10]
const origrewards = [0.1, 1, 3, 12, 40, 120, 700, 1400, 3000, 5000, 12000, 45000, 100000, 250000, 1500000, 4000000, origprices[16] / (Math.random() * 1000) + 0.001]
const origautoPrices = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, origrewards[16] / (Math.random()) + 0.001, 25000]
const origbusinessPrices = [10, 250, 750, 4200, 6500, 21000, 254254, 1000000, 4000000, 25000000, 40000000, 111111111, 254254254, 933748382, 6969696969, 50000000000, 175000000000]
const origbusinessRewards = [0.1, 1, 3, 7, 10, 70, 600, 1500, 3000, 9000, 15000, 51111, 84254, 187000, 500000, 3750000, 12500000]
const origisPurchased = [0]
const origflavourHPS = [0]
const themes = ["Default", "Dark", "Reddish", "Blue", "Pastel", "Purple",
"Light Blue", "Orangey", "Green", "Fate", "Cheese Pyramid", "Papyrus Undertale",
"Somebody Scream", "Hatsune Miku Colour Palette", "Hard Mode", "Eye Bleeding Mode",
"Kazakh", "Azeri", "Brazil", "Venezuela", "Boshy", 
"venti Carmel Frappuccino with non fat coconut milk exactly 2 and a half cups of sugar with 4 chocolate drizzles 6 and a half pump of caramel drizzle 3 expresso shots mixed in Extra whip",
"Enby", "Trans"];
const fonts = ["Default", "Mono", "Days One", "Kamilia 3", "Fira Code"];
const flavours = ["Pencil", "Pen", "Printer", "Typewriter", "Keyboard", "Broken Keyboard", "Intern",
"H Secret Cult", "Employee", "Shady Business Partner", "H File Tactics", "Psychological Warfare",
"Google drive link",
"Genetically Modified H Men", "H Colonization", "Dragon Employee", "Random"]
const businessNames = ["Chocolate H", "Strawberry H", "Crime H", "Rilee H", "Lead Poisoning",
"Sand H", "Mango H", "Volcanic asH", "Golf Ball h", "Kamilia's H", "Irwing", "Multidimensional H", 
"Funny H", "Novalis by GrilleX", "Hilarious H", "Time Machine H", "Dragon H"]

const game = {
	/* 		  Declaring Variables 		 */
	versionNumber: 0.8,
	h: 1,
	newH: 0,
	clickPower: 0,
	trueClickPower: 0,
	startingHPC: 0,
	autoH: 0,
	trueAutoH: 0,
	theme: -1,
	font: 0,
	potentialGlod: 0,
	glodIncome: 1,
	glodH: 0,
	glodHNugget: 0,
	glodLimit: 10,
	trueGlodLimit: 10,
	glodPower: 0,
	glodBoost: 1,
	unspentBoost: 1,
	unspentUnlocked: 0,
	prestiges: 0,
	presToLimit: 0,
	requirement: 1000000000,
	hRemaining: 1000000000,
	tickSpeed: 30,
	saveTime: 5,
	autoSaveState: 1,
	offlineProgState: 1,
	automationUnlocked: 0,
	priceMulti: 1.15,
	lastTime: Date.now(),
	autoUpgrIs: "ON",
	autoPresIs: "ON",
	menuSelected: 0,
	clicks: 0,
	gameStarted: Date.now(),
	lastPrestige: Date.now(),
	fastestPrestige: Date.now(),
	glodGain: 0,
	darkUnlocked: 0,
	hBoostUnlocked: 0,
	hGainBoost: 1,
	limitless: false,
	limitlessRoot: 1.7,

	/* Flavour Arrays (H Per Second) */
	flavourHPS: new Array(origrewards.length),
	rewards: new Array(origrewards.length),
	upgrNum: new Array(origrewards.length),

	/* Business Arrays (H Per Click) */
	businessPrices: new Array(origbusinessPrices.length),
	businessRewards: new Array(origbusinessRewards.length),
	businessUpgrNum: new Array(origbusinessRewards.length),


	/* Glod Shop Arrays */
	glodPrices: [5, 15, 50, 100, 250, 300, 1000, 2000, 5000, 10000000, 50000000, 100000000, 200000000],
	glodRewards: [0.1, 1, 10, 30, 1, 0.05, 'nuggetPotential', 9, 'automation', 0.85, 0.01, 'darkMachine', 'hGainBoost'],
	isPurchased: new Array(origisPurchased.length),
	
	/* Auto Arrays */
	autoPrices: new Array(origautoPrices.length),
	autoUpgrNum:  new Array(origautoPrices.length),
	autoInterval: new Array(origautoPrices.length),
	bulkBuy: new Array(origautoPrices.length),
	autoTimer: new Array(origautoPrices.length)
}

/*		 Initial For Loops		 */
for (i=0; i<(game.isPurchased.length); i++) {
	game.isPurchased[i]=origisPurchased[i];
}
for (i=0; i<(game.flavourHPS.length); i++) {
	game.flavourHPS[i]=0;
}
for (i=0; i<(origautoPrices.length); i++) {
	game.autoPrices[i]=origautoPrices[i];
}
for (i=0; i<(game.autoUpgrNum.length); i++) {
	game.autoUpgrNum[i]=0;
}
for (i=0; i<(game.autoInterval.length); i++) {
	game.autoInterval[i]=2000;
}
for (i=0; i<(game.autoTimer.length); i++) {
	game.autoTimer[i]=game.autoInterval[i];
}
for (i=0; i<(game.bulkBuy.length); i++) {
	game.bulkBuy[i]=1;
}
/*		Functions		*/
function onStart() {
	resetValues();
	changeTheme(1);
	if (game.h !== 0 && !isNaN(game.h)) {
		load();
	}
	autoSaver();
	autoBuy();
	animatedBackground();
	if (game.offlineProgState) {
		document.getElementById("offlineOption").innerHTML="Offline progress: ON";
	} else {
		document.getElementById("offlineOption").innerHTML="Offline progress: OFF";
	}
	if (game.automationUnlocked) {
		document.getElementById("menuTabs").style.display = "block";
	} else {
		document.getElementById("menuTabs").style.display = "none";
	}
	if (game.darkUnlocked) {
		document.getElementById("machineButton").style.height = "50%";
		document.getElementById("darkMachineButton").style.display = "block";
	}
	for (let i = 0; i < game.upgrNum.length; i++) {
		if (game.upgrNum[i] % 10 == 0 ) {
			document.getElementsByClassName("gradOne")[i].style.backgroundSize = `0% 100%`;
		} else {
			document.getElementsByClassName("gradOne")[i].style.backgroundSize = `${(game.upgrNum[i]%10+1)*10}% 100%`;
		}
	}
	for (let i = 0; i < game.businessUpgrNum.length; i++) {
		if (game.businessUpgrNum[i] % 5 == 0 ) {
			document.getElementsByClassName("gradTwo")[i].style.backgroundSize = `0% 100%`;
		} else {
			document.getElementsByClassName("gradTwo")[i].style.backgroundSize = `${(game.businessUpgrNum[i]%5+1)*20}% 100%`;
		}
	}
	if (game.offlineProgState == 1) {
		offTime = Math.round((Date.now() - game.lastTime)/1000);
		if (offTime > 10) {
			popupWindow('offlinePopup','1');
			let s = Math.floor(offTime % 60);
			let m = Math.floor((offTime/60) % 60);
			let h = Math.floor((offTime/3600) % 24);
			let d = Math.floor(offTime/86400);
			document.getElementById("offlineTime").innerHTML = `You've been offline for ${d}:${addZero(h)}:${addZero(m)}:${addZero(s)}`;
			document.getElementById("offlineGain").innerHTML = `At ${addCommas(Math.round(game.trueAutoH))} HPS, you earned ${addCommas(Math.round(game.trueAutoH*offTime))} H`;
			document.getElementById("offlineGlodGain").innerHTML = `You earned +${addCommas(Math.round(game.glodGain*game.potentialGlod*game.hGainBoost*offTime))} Glod H`;
		}
		idle(((Date.now() - game.lastTime) / 1000) * game.tickSpeed);
	} else {
		idle(1);
	}
}
function startGame() {
	document.getElementById("menuOverlay").style.animationName = "fadeOut";
	setTimeout(closeMenu, 1000);
}
function closeMenu() {
	document.getElementById("menuOverlay").style.animationName = "";
	document.getElementById("menuOverlay").style.display = "none";
}
animDeg = 0;
function animatedBackground() {
	if (document.getElementById("menuOverlay").style.display != "none") {
		animDeg+=0.5;
		animDeg >= 360 ? animDeg = 0 : dolikecommaliterallynothing();
		document.getElementById("menuOverlay").style.backgroundImage = `conic-gradient(from ${animDeg}deg at top left, #ff0000, #ff00b0, #00ffff, #00ff4b, #ff0000`;
		setTimeout(animatedBackground, 40);
	}
}
function startTutorial() {
	document.getElementById("theHTML").scrollLeft = document.body.scrollWidth;
}
function backButton() {
	document.getElementById("theHTML").scrollLeft = 0;
}
function addZero(input) {
	return input.toString().length == 1 ? "0" + input : input;
}
function addZeros(input) {
	if (input.toString().length == 1) {
		return input + "00";
	} else if (input.toString().length == 2) {
		return input + "0";
	}
	return input;
}
function increment() {
	game.h+=game.trueClickPower;
	game.newH+=game.trueClickPower;
	game.clicks++;
}
function checkIfNegative() {
	if (game.h < 0) {
		game.h = 0;
		console.log("H was negative");
	}
}
function idle(diff) {
	if (game.menuSelected == 0) {
		document.getElementById("currency").innerHTML=addCommas(Math.round(game.h)) + " Hs<br><small>" + addCommas(Math.round(game.trueAutoH*10)/10) + "H/s</small>";
	} else if (game.menuSelected == 1) {
		if (!game.limitless) {
			document.getElementById("currency").innerHTML=addCommas(Math.round(game.glodHNugget)) + " Glod H Nuggets<br><small>" + addCommas(Math.round(game.potentialGlod)) + "/" + addCommas(Math.round(game.trueGlodLimit)) + " Potential Glod H</small>";
		} else {
			document.getElementById("currency").innerHTML=addCommas(Math.round(game.glodHNugget)) + " Glod H Nuggets, " + addCommas(Math.round(game.glodGain*game.potentialGlod*game.hGainBoost)) +"/s <br><small>" + addCommas(Math.round(game.potentialGlod)) + " Potential Glod H, " + addCommas(Math.round(Math.pow(game.glodGain*game.potentialGlod*game.hGainBoost,1/game.limitlessRoot))) + "/s</small>";
		}
	}
	document.getElementById("businessHDisplay").innerHTML="You have " + addCommas(Math.round(game.h)) + " Hs";
	document.getElementById("businessHPCDisplay").innerHTML=addCommas(Math.round(game.trueClickPower*10)/10) + " H/c";
	if (game.isPurchased[0] == 1) {
		document.getElementById("glodHDisplay").innerHTML=addCommas(Math.round(game.glodH)) + " Glod H, Providing you with a " + addCommas(Math.round(game.glodBoost*10)/10) + "x Boost";
	} else {
		document.getElementById("glodHDisplay").innerHTML=addCommas(Math.round(game.glodH)) + " Glod H";
	}
	if (game.isPurchased[6] == 1) {
		document.getElementById("glodHNuggetDisplay").innerHTML=addCommas(Math.round(game.glodHNugget)) + " Glod H Nuggets, Providing your Glod H boost with a " + addCommas(Math.round(game.unspentBoost*100)/100) + "x Boost";
	} else {
		document.getElementById("glodHNuggetDisplay").innerHTML=addCommas(Math.round(game.glodHNugget)) + " Glod H Nuggets";
	}
	document.getElementById("glodHNuggetDisplay2").innerHTML=addCommas(Math.round(game.glodHNugget)) + " Glod H Nuggets";
	document.getElementById("prestigeCount").innerHTML="Increase glod limit by number of presiges (" + addCommas(Math.round(game.prestiges)) + " prestiges)";
	if (game.limitless) {
		document.getElementById("hGainCount").innerHTML="Boost Idle Glod Gain by H<br>Currently: " + addCommas(Math.round(game.hGainBoost*100)/100) + "x (" + addCommas(Math.round(Math.pow(game.glodGain*game.potentialGlod*game.hGainBoost,1/game.limitlessRoot))) + " Glod HPS)";
	} else {
		document.getElementById("hGainCount").innerHTML="Boost Idle Glod Gain by H<br>Currently: " + addCommas(Math.round(game.hGainBoost*100)/100) + "x (" + addCommas(Math.round(game.glodGain*game.potentialGlod*game.hGainBoost)) + " Glod HPS)";
	}
	document.getElementById("clickDisplay").innerHTML=addCommas(Math.round(game.trueClickPower*10)/10) + " H/c";
	if (game.limitless) {
		document.getElementById("resetButton").innerHTML="Reset for " + addCommas(game.potentialGlod) + " Glod H";
	} else {
		document.getElementById("resetButton").innerHTML="Reset for " + addCommas(game.potentialGlod) + " Glod H (Limit: " + addCommas(game.trueGlodLimit) +")";
	}
	document.getElementById("glodCountdown").innerHTML=addCommas(Math.round(game.hRemaining)) + " Hs left.";
	if (game.autoSaveState == 0) {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: OFF`;
		document.getElementById("autoSlider").style.display = "none";
	} else {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${game.saveTime}s)`
		document.getElementById("autoSlider").style.display = "inline-block";
	}
	if (game.limitless) {
		for (i = 0; i < origprices.length; i++) {
			document.getElementById(`hUpgrade${i+1}`).innerHTML=flavours[i] + " (" + addCommas(game.upgrNum[i]) + ")<br>(+" + addCommas(Math.round((Math.pow(Math.pow(game.trueAutoH,game.limitlessRoot)+game.rewards[i]*game.glodBoost,1/game.limitlessRoot)-game.trueAutoH)*10)/10) + " H/s)<br><br>" + addCommas(Math.round(origprices[i]*Math.pow(game.priceMulti, game.upgrNum[i]))) + " Hs";
		}
	} else {
		for (i = 0; i < origprices.length; i++) {
			document.getElementById(`hUpgrade${i+1}`).innerHTML=flavours[i] + " (" + addCommas(game.upgrNum[i]) + ")<br>(+" + addCommas(Math.round((game.rewards[i]*game.glodBoost)*10)/10) + " H/s)<br><br>" + addCommas(Math.round(origprices[i]*Math.pow(game.priceMulti, game.upgrNum[i]))) + " Hs";
		}
	}
	for (i = 0; i < origprices.length; i++) {
		if (game.autoUpgrNum[i] == 9) {
			document.getElementById(`hAutoUpgrade${i+1}`).innerHTML=flavours[i] + " Auto <br>(x" + Math.round(game.bulkBuy[i]) + " Bulk Buying)<br><br>(MAX)";
		} else if (game.autoUpgrNum[i] > 6) {
			document.getElementById(`hAutoUpgrade${i+1}`).innerHTML=flavours[i] + " Auto <br>(x" + Math.round(game.bulkBuy[i]) + " Bulk Buying)<br><br>" + addCommas(Math.round(game.autoPrices[i]*1)/1) + " Nuggets";
		}
		else if (game.autoUpgrNum[i] > 0 ) {
			document.getElementById(`hAutoUpgrade${i+1}`).innerHTML=flavours[i] + " Auto <br>(" + Math.round(game.autoInterval[i]*10)/10 + " ms)<br><br>" + addCommas(Math.round(game.autoPrices[i]*1)/1) + " Nuggets";
		} else {
			document.getElementById(`hAutoUpgrade${i+1}`).innerHTML="Unlock " + flavours[i] + " Auto <br><br><br>" + addCommas(Math.round(game.autoPrices[i]*1)/1) + " Nuggets";
		}
	}
	if (game.autoUpgrNum[17] == 0 ) {
		document.getElementById(`hAutoUpgrade18`).innerHTML="Unlock Prestige Auto <br><br><br>" + addCommas(Math.round(game.autoPrices[17]*1)/1) + " Nuggets";
	} else  if (game.autoUpgrNum[17] <= 5) {
		document.getElementById(`hAutoUpgrade18`).innerHTML="Prestige Auto <br>(" + Math.round(game.autoInterval[17]*10)/10 + " ms)<br><br>" + addCommas(Math.round(game.autoPrices[17]*1)/1) + " Nuggets";
	} else {
		document.getElementById(`hAutoUpgrade18`).innerHTML="Prestige Auto <br>(" + Math.round(game.autoInterval[17]*10)/10 + " ms)<br><br>(MAX)";
	}
	if (game.limitless) {
		for (i = 0; i < game.businessPrices.length; i++) {
			document.getElementById(`hBusiness${i+1}`).innerHTML=businessNames[i] + " (" + addCommas(game.businessUpgrNum[i]) + ")<br>(+" + addCommas(Math.round((Math.pow(Math.pow(game.trueClickPower,game.limitlessRoot)+game.businessRewards[i]*game.glodBoost,1/game.limitlessRoot)-game.trueClickPower)*10)/10) + " H/c)<br><br><br><br>" + addCommas(Math.round(game.businessPrices[i])) + " Hs";
		}
	} else {
		for (i = 0; i < game.businessPrices.length; i++) {
			document.getElementById(`hBusiness${i+1}`).innerHTML=businessNames[i] + " (" + addCommas(game.businessUpgrNum[i]) + ")<br>(+" + addCommas(Math.round((game.businessRewards[i]*game.glodBoost)*10)/10) + " H/c)<br><br><br><br>" + addCommas(Math.round(game.businessPrices[i])) + " Hs";
		}
	}
	game.h+=(game.trueAutoH/game.tickSpeed)*diff;
	game.newH+=(game.trueAutoH/game.tickSpeed)*diff;
	game.glodH+=((game.glodGain*game.potentialGlod*game.hGainBoost)/game.tickSpeed)*diff;
	game.glodHNugget+=((game.glodGain*game.potentialGlod*game.hGainBoost)/game.tickSpeed)*diff;
	game.lastTime=Date.now();
	game.glodBoost=(game.glodH*game.glodPower*game.unspentBoost)+1;
	if (game.limitless) {
		game.trueAutoH=Math.pow(game.autoH*game.glodBoost,1/game.limitlessRoot);
	} else {
		game.trueAutoH=game.autoH*game.glodBoost;
	}
	if (document.getElementById("statistics").style.display == "block") {
		updateStats();
	}
	calculateLimit();
	unspentCalc();
	gainBoostCalc();
	if (game.limitless) {
		game.trueClickPower=Math.pow(game.clickPower*game.glodBoost,1/game.limitlessRoot);
	} else {
		game.trueClickPower=game.clickPower*game.glodBoost;
	}
	canAfford();
	potentialCheck();
	checkIfNegative();
	setTimeout(() => idle(1), (1000/game.tickSpeed));
}
/*		 Price checks		*/
function canAfford() {
	for (i = 0; i < origprices.length; i++) {
		if (game.h < origprices[i]*Math.pow(game.priceMulti, game.upgrNum[i])) {
			document.getElementById(`hUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`hUpgrade${i+1}`).removeAttribute("disabled");
		}
	}
	for (i = 0; i < game.businessPrices.length; i++) {
		if (game.h < game.businessPrices[i]) {
			document.getElementById(`hBusiness${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`hBusiness${i+1}`).removeAttribute("disabled");
		}
	}
	for (i = 0; i < game.glodPrices.length; i++) {
		if (game.glodHNugget < game.glodPrices[i]) {
			document.getElementById(`glodUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else if (game.isPurchased[i] == 1) {
			document.getElementById(`glodUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`glodUpgrade${i+1}`).removeAttribute("disabled");
		}
	}
	if (game.potentialGlod <= 0) {
		document.getElementById("resetButton").setAttribute ("disabled", "true");
	} else {
		document.getElementById("resetButton").removeAttribute("disabled");
	}
	for (i = 0; i < game.autoPrices.length-1; i++) {
		if (game.glodHNugget < game.autoPrices[i] || game.autoUpgrNum[i] > 8) {
			document.getElementById(`hAutoUpgrade${i+1}`).setAttribute ("disabled", "true");
		} else {
			document.getElementById(`hAutoUpgrade${i+1}`).removeAttribute("disabled");
		}
	}
	if (game.glodHNugget < game.autoPrices[17] || game.autoUpgrNum[17] >= 6) {
		document.getElementById(`hAutoUpgrade18`).setAttribute ("disabled", "true");
	} else {
		document.getElementById(`hAutoUpgrade18`).removeAttribute("disabled");
	}
}
/*		 Purchases		 */
function purchase(upnum, quantity) {
	if (game.h < calculatePrice(upnum, quantity)) {
		return 0;
	} else {
		game.h-=calculatePrice(upnum, quantity);
		game.upgrNum[upnum-1]+=(quantity);
		level = Math.floor(game.upgrNum[upnum-1]/10);
		game.rewards[upnum-1] = origrewards[upnum-1]*Math.pow(2, level);
		game.flavourHPS[upnum-1] = game.rewards[upnum-1]*game.upgrNum[upnum-1];
		calculateAutoH();
		if (game.upgrNum[upnum-1] % 10 == 0 ) {
			document.getElementsByClassName("gradOne")[upnum-1].style.backgroundSize = `0% 100%`;
		} else {
			document.getElementsByClassName("gradOne")[upnum-1].style.backgroundSize = `${(game.upgrNum[upnum-1]%10+1)*10}% 100%`;
		}
		return 1;
	}
}
function updateBars() {
	for (let i = 0; i < game.upgrNum.length; i++) {
		if (game.upgrNum[i] % 10 == 0 ) {
			document.getElementsByClassName("gradOne")[i].style.backgroundSize = `0% 100%`;
		} else {
			document.getElementsByClassName("gradOne")[i].style.backgroundSize = `${(game.upgrNum[i]%10+1)*10}% 100%`;
		}
	}
	for (let i = 0; i < game.businessUpgrNum.length; i++) {
		if (game.businessUpgrNum[i] % 5 == 0 ) {
			document.getElementsByClassName("gradTwo")[i].style.backgroundSize = `0% 100%`;
		} else {
			document.getElementsByClassName("gradTwo")[i].style.backgroundSize = `${(game.businessUpgrNum[i]%5+1)*20}% 100%`;
		}
	}
}
function calculatePrice(upnum, quantity) {
	total = 0;
	for (i = 0; i < quantity; i++) {
		total += origprices[upnum-1]*Math.pow(game.priceMulti, game.upgrNum[upnum-1])*(Math.pow(game.priceMulti, (quantity-1)-i));
		if (total > game.h) {
			break;
		}
	}
	return total;
}
function calculateAutoH() {
	total = 0;
	for (i = 0; i < game.flavourHPS.length; i++) {
		total += game.flavourHPS[i];
	}
	game.autoH = total;
}
function buyMaxButton() {
	for (f = origrewards.length-1; f > 0; f--) {
		buyMax(f);
	}
}
function buyMax(upnum) {
	for (i = 0; i < 100; i++) {
		if (game.h <= calculatePrice(upnum, i)) {
			purchase(upnum, i);
			break;
		}
	}
}
function buyMax2(upnum) {
	console.log("Quantity: " + game.h/(origprices[upnum-1]*Math.pow(game.priceMulti, game.upgrNum[upnum-1])));
}
function purchaseBusiness(upnum) {
	if (game.h < game.businessPrices[upnum-1]) {
	} else {
		game.h-=game.businessPrices[upnum-1];
		game.clickPower+=game.businessRewards[upnum-1];
		game.businessPrices[upnum-1]*=1.4;
		game.businessUpgrNum[upnum-1]+=1;
		if (game.businessUpgrNum[upnum-1] % 5 == 0) {
			game.clickPower+=game.businessUpgrNum[upnum-1]*game.businessRewards[upnum-1];
			game.businessRewards[upnum-1]*=2;
		}
	}
	if (game.businessUpgrNum[upnum-1] % 5 == 0 ) {
		document.getElementsByClassName("gradTwo")[upnum-1].style.backgroundSize = `0% 100%`;
	} else {
		document.getElementsByClassName("gradTwo")[upnum-1].style.backgroundSize = `${(game.businessUpgrNum[upnum-1]%5+1)*20}% 100%`;
	}
}
function purchaseGlod(upnum, type) {
	if (game.glodHNugget < game.glodPrices[upnum-1]) {
	} else {
		game.glodHNugget-=game.glodPrices[upnum-1];
		game.isPurchased[upnum-1]=1;
		document.getElementById(`glodUpgrade${upnum}`).style.backgroundColor="#ff5e5e";
		if (type == "limit") {
			game.glodLimit+=game.glodRewards[upnum-1];
		}
		if (type == "power") {
			game.glodPower+=game.glodRewards[upnum-1];
		}
		if (type == "startingHPC") {
			game.startingHPC+=game.glodRewards[upnum-1];
			game.clickPower+=(game.glodRewards[upnum-1]/game.glodBoost)/game.unspentBoost;
		}
		if (type == "conditionalLimit") {
			game.presToLimit+=game.glodRewards[upnum-1];
		}
		if (type == "unlock") {
			switch (game.glodRewards[upnum-1]) {
				case "automation":
					game.automationUnlocked = 1;
					document.getElementById("menuTabs").style.display = "block";
					break;
				case "nuggetPotential":
					game.unspentUnlocked = 1;
					break;
				case "darkMachine":
					game.darkUnlocked = 1;
					document.getElementById("machineButton").style.height = "50%";
					document.getElementById("darkMachineButton").style.display = "block";
					break;
				case "hGainBoost":
					game.hBoostUnlocked = 1;
					break;
			}
		}
		if (type == "glodGain") {
			game.glodGain+=game.glodRewards[upnum-1];
		}
	}
}
function calculateLimit() {
	game.trueGlodLimit=game.glodLimit+(game.prestiges*game.presToLimit);
}
/* Menus */
function switchToAuto() {
	document.getElementById("upgrades").style.display="none";
	document.getElementById("automation").style.display="block";
	game.menuSelected = 1;
}
function switchToUpgrade() {
	document.getElementById("upgrades").style.display="block";
	document.getElementById("automation").style.display="none";
	game.menuSelected = 0;
}
/*		Glod H		*/
function potentialCheck() {
	if ((game.potentialGlod < game.trueGlodLimit) || (game.limitless)) {
		if (game.newH >= game.requirement) {
			game.potentialGlod+=(game.glodIncome*(Math.floor(game.newH/game.requirement)));
			game.requirement+=(Math.floor(game.newH/game.requirement))*10;
			game.newH=(game.newH % game.requirement);
		}
		game.hRemaining=(game.requirement-game.newH);
	} else {
		game.hRemaining=game.requirement;
		game.newH=0;
	}
	if ((game.potentialGlod > game.trueGlodLimit) && (!game.limitless)) {
		game.potentialGlod = game.trueGlodLimit;
	}
	if (game.requirement > 1000000000+(game.trueGlodLimit*10)) {
		game.requirement = 1000000000+(game.trueGlodLimit*10);
	}
}
function glodPrestige() {
	game.glodH+=game.potentialGlod;
	game.glodHNugget+=game.potentialGlod;
	game.potentialGlod=0;
	resetValues();
	game.prestiges++;
	if (Date.now() - game.lastPrestige < game.fastestPrestige && Date.now() - game.lastPrestige > 0) {
		game.fastestPrestige = Date.now() - game.lastPrestige;
	}
	game.lastPrestige = Date.now();
}
function unspentCalc() {
	if (game.unspentUnlocked == 1) {
		if (game.glodHNugget == 0) {
			game.unspentBoost = 0.5;
		} else {
			game.unspentBoost = log(10, game.glodHNugget)+1;
		}
	}
}
function gainBoostCalc() {
	if (game.hBoostUnlocked == 1) {
		if (game.h <= 0) {
			game.hGainBoost = 1;
		} else {
			game.hGainBoost = log(10, game.h)+1;
		}
	}
}
/*		Popups		 */
opening1 = null;
opening2 = null;
closing1 = null;
closing2 = null;
function popupWindow(screenName, shade) {
	if (screenName == "darkMachine") {
		clearTimeout(opening1);
		clearTimeout(closing1);
		clearTimeout(closing2);
		document.getElementById(`${screenName}`).style.display="block";
		document.getElementById("darkMachine").style.animationName="openPopup";
		document.getElementById("darkMachineButton").setAttribute ("disabled", "true");
		opening1 = setTimeout(darkMachineOpen, 1500);
	} else {
		document.getElementById(`greyOut${shade}`).style.display="block";
		document.getElementById(`${screenName}`).style.display="block";
	}
}
function darkMachineOpen() {
	clearTimeout(opening2);
	document.getElementById("easySolution").style.display="block";
	document.getElementById("darkMachine").style.animationIterationCount="infinite";
	document.getElementById("darkMachine").style.animationDuration="1.5s";
	document.getElementById("darkMachine").style.animationName="pulse";
	if (document.getElementById("darkMachine").style.display=="block") {
		document.getElementById("darkContent").style.display="block";
		document.getElementById("darkContent").style.animationName="fadeIn";
	}
	opening2 = setTimeout(darkMachineOpen2, 1500);
}
function darkMachineOpen2() {
	document.getElementById("darkContent").style.animationName="";
}
function darkMachineClose() {
	document.getElementById("darkMachine").style.animationDirection="alternate";
	document.getElementById("darkContent").style.display="none";
	document.getElementById("darkMachine").style.display="none";
	document.getElementById("darkMachine").style.animationName="";
	document.getElementById("darkMachineButton").removeAttribute("disabled");
}
function closeWindow(screenName, shade) {
	if (screenName == "darkMachine") {
		clearTimeout(closing1);
		clearTimeout(closing2);
		document.getElementById("darkMachine").style.animationDirection="reverse";
		document.getElementById("darkMachine").style.animationName="openPopup";
		document.getElementById("easySolution").style.display="none";
		closing1 = setTimeout(darkMachineOpen, 1500);
		closing2 = setTimeout(darkMachineClose, 1490);
	} else {
		document.getElementById(`greyOut${shade}`).style.display="none";
		document.getElementById(`${screenName}`).style.display="none";
	}
}
function closeAll() {
	closeWindow('hBusiness','1');
	closeWindow('hMachine','1');
	closeWindow('glodShop','2');
	closeWindow('options','1');
	closeWindow('shortcuts','1');
	closeWindow('confirmation','2');
	closeWindow('offlinePopup','1');
	closeWindow('statistics','2');
	document.getElementById("darkContent").style.display="none";
	document.getElementById("darkMachine").style.display="none";
	document.getElementById("darkMachineButton").removeAttribute("disabled");
	document.getElementById("darkMachine").style.animationName="";
	document.getElementById("darkMachine").style.animationDirection="alternate";
}
/*		Hotkeys		 */
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
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 77) { /* M key (buys max) */
		for (f = origrewards.length-1; f > 0; f--) {
			buyMax(f);
		}
	}
}, true);
/*		Options		*/
function updateSlider() {
	game.tickSpeed=document.getElementById("tickSlider").value;
	document.getElementById("tickDisplay").innerHTML = `Tickspeed (${game.tickSpeed})`;
}
function autoSave() {
	game.saveTime=document.getElementById("autoSlider").value;
	document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${game.saveTime}s)`;
	clearTimeout(saveTimer);
	autoSaver();
}
function autoSaver() {
	if (game.autoSaveState == 1) {
		save();
		saveTimer = setTimeout(autoSaver, game.saveTime*1000);
	}
}
function autoChange() {
	if (game.autoSaveState == 1) {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: OFF`;
		document.getElementById("autoSlider").style.display = "none";
		clearTimeout(saveTimer);
		game.autoSaveState = 0;
	} else {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${game.saveTime}s)`
		document.getElementById("autoSlider").style.display = "inline-block";
		game.autoSaveState = 1;
		autoSaver();
	}
}
/*		Statistics		*/
function updateStats() {
	document.getElementById("clickTracker").innerHTML = `Total H clicks: ${addCommas(Math.round(game.clicks))}`;
	let totTime = (Date.now() - game.gameStarted)/1000;
	let s = Math.floor(totTime % 60);
	let m = Math.floor((totTime/60) % 60);
	let h = Math.floor((totTime/3600) % 24);
	let d = Math.floor(totTime/86400);
	document.getElementById("timeTracker").innerHTML = `You've played for: ${d}:${addZero(h)}:${addZero(m)}:${addZero(s)}`;
	totTime = (Date.now() - game.lastPrestige)/1000;
	let ms = (Date.now() - game.lastPrestige) % 1000;
	s = Math.floor(totTime % 60);
	m = Math.floor((totTime/60) % 60);
	h = Math.floor((totTime/3600) % 24);
	d = Math.floor(totTime/86400);
	document.getElementById("prestigeTimeTracker").innerHTML = `Time since last prestige: ${d}:${addZero(h)}:${addZero(m)}:${addZero(s)}.${addZeros(ms)}`;
	totTime = game.fastestPrestige/1000;
	ms = game.fastestPrestige % 1000;
	s = Math.floor(totTime % 60);
	m = Math.floor((totTime/60) % 60);
	h = Math.floor((totTime/3600) % 24);
	d = Math.floor(totTime/86400);
	if (game.prestiges > 0) {
		document.getElementById("fastestPrestigeTracker").innerHTML = `Fastest Prestige: ${d}:${addZero(h)}:${addZero(m)}:${addZero(s)}.${addZeros(ms)}`;
	} else {
		document.getElementById("fastestPrestigeTracker").innerHTML = `Fastest Prestige: you haven't prestiged yet`;
	}
	document.getElementById("prestigeTracker").innerHTML = `Glod H Prestiges: ${addCommas(Math.round(game.prestiges))}`;
}
/*		Automation		*/
function purchaseAutoPrestige() {
	if (game.glodHNugget < game.autoPrices[17] || game.autoUpgrNum[17] > 5) {
	} else {
		game.glodHNugget-=game.autoPrices[17];
		game.autoUpgrNum[17]+=1;
		game.autoPrices[17]*=1.73205;
		game.autoTimer[17] = game.autoInterval[17];
		game.autoInterval[17]/=2;
	}
}
function autoGlodPrestige() {
	if (game.potentialGlod == game.trueGlodLimit && game.autoPresIs == "ON" && game.autoUpgrNum[17] > 0 && !game.limitless) {
		glodPrestige();
	}
}
function purchaseAuto(upnum) {
	if (game.glodHNugget < game.autoPrices[upnum-1] || game.autoUpgrNum[upnum-1] > 8) {
	} else {
		// Spend nuggets
		game.glodHNugget-=game.autoPrices[upnum-1];
		// Increment upgrnum
		game.autoUpgrNum[upnum-1]+=1;
		// Change price of upgrade
		game.autoPrices[upnum-1]*=1.73205;
		// Reset interval
		game.autoTimer[upnum-1] = game.autoInterval[upnum-1];
		// Switch upgrade modes after 9 purchases
		if (game.autoUpgrNum[upnum-1] > 6) {
			game.bulkBuy[upnum-1]*=2;
		} else {
			// Half interval of auto upgrade
			game.autoInterval[upnum-1]/=2;
		}
	}
}
function autoBuy() {
	if (game.autoUpgrIs == "ON") {
		// Loop for each upgrade
		for (j = 0; j < origautoPrices.length; j++) {
			// Check if bought
			if (Number(game.autoUpgrNum[j]) >= 1) {
				game.autoTimer[j] -= 40;
				// Check if timer has reached 0
				if (game.autoTimer[j] <= 0) {
					game.autoTimer[j] = game.autoInterval[j];
					// Check if auto prestige, else continue as normal
					if (j == 17) {
						autoGlodPrestige();
					} else {
						// Check if you can buy bulk, else buy 1
						if (!purchase(j+1, game.bulkBuy[j])) {
							purchase(j+1, 1);
						}
					}
				}
			}
		}
	} else if (game.autoPresIs == "ON") {
		if (Number(game.autoUpgrNum[17] >= 1)) {
			game.autoTimer[17] -= 40;
			if (game.autoTimer[17] <= 0) {
				game.autoTimer[17] = game.autoInterval[17];
				autoGlodPrestige();
			}
		}
	}
	setTimeout(autoBuy, 25);
}
function toggleAuto() {
	game.autoUpgrIs == "ON" ? game.autoUpgrIs = "OFF" : game.autoUpgrIs = "ON";
	document.getElementById("autoUpgrTog").innerHTML = `Auto upgrades (${game.autoUpgrIs})`;
}
function toggleAutoPres() {
	game.autoPresIs == "ON" ? game.autoPresIs = "OFF" : game.autoPresIs = "ON";
	document.getElementById("autoPresTog").innerHTML = `Auto prestige (${game.autoPresIs})`;
}
/*			Limitless mode 			*/
function activateDarkMachine() {
	game.limitless = !game.limitless;
	glodPrestige();
	if (game.limitless) {
		document.getElementById("machinePowerButton").innerHTML = "Turn off the machine";
	} else {
		document.getElementById("machinePowerButton").innerHTML = "Turn on the machine";
	}
}
/*		Miscellaneous functions		*/
function changeTheme(scrollrate) {
	game.theme+=scrollrate;
	if (game.theme == (themes.length)) game.theme = 0;
	if (game.theme <= -1) game.theme = themes.length-1;
	document.getElementById("theme").href = `Themes/${themes[game.theme]}.css`;
	document.getElementById("themeDisplay").innerHTML="Theme: " + themes[game.theme];
	setFavicons(`Resources/Favicons/${themes[game.theme]}.ico`);
}
function setFavicons(favImg){
    let headTitle = document.querySelector("head");
    let setFavicon = document.createElement("link");
    setFavicon.setAttribute("rel","icon");
    setFavicon.setAttribute("href",favImg);
    headTitle.appendChild(setFavicon);
}
function changeFont() {
	game.font+=1;
	if (game.font == (fonts.length)) game.font = 0;
	if (game.font <= -1) game.font = fonts.length-1;
	document.getElementById("font").href = `Fonts/${fonts[game.font]}.css`;
	document.getElementById("fontDisplay").innerHTML="Font: " + fonts[game.font];
}
function updateFont() {
	document.getElementById("font").href = `Fonts/${fonts[game.font]}.css`;
	document.getElementById("fontDisplay").innerHTML="Font: " + fonts[game.font];
}
window.addEventListener('load', function () {
  updateFont();
})
function toggleOffline() {
	if (game.offlineProgState) {
		game.offlineProgState = 0;
		document.getElementById("offlineOption").innerHTML="Offline progress: OFF";
	} else {
		game.offlineProgState = 1;
		document.getElementById("offlineOption").innerHTML="Offline progress: ON";
	}
}
function log(base, num) {
	return Math.log(num)/Math.log(base);
}
function addCommas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function dolikecommaliterallynothing() {
}
window.onmousemove = function (e) {
    var x = e.clientX;
	var y = e.clientY;
	for (i = 0; i < game.glodPrices.length; i++) {
		document.getElementsByClassName(`mouseOver`)[i].style.top = (y - 110) + "px";
		document.getElementsByClassName(`mouseOver`)[i].style.left = (x - 250) + "px";
	}
};
document.getElementById("upgrades").addEventListener("wheel", horScroll);
document.getElementById("automation").addEventListener("wheel", horScroll);
document.getElementById("hBusiness").addEventListener("wheel", horScroll);
function horScroll() {
	this.scrollLeft += event.deltaY;
}
function resetValues() {
	game.autoH=0;
	game.trueAutoH=0;
	game.glodBoost=(game.glodH*game.glodPower)+1;
	game.clickPower=(game.startingHPC/game.glodBoost)/game.unspentBoost;
	game.trueClickPower=0;
	game.requirement=1000000000;
	game.hRemaining=game.requirement;
	for (i=0; i<(game.rewards.length); i++) {
		game.rewards[i]=origrewards[i];
	}
	for (i=0; i<(game.upgrNum.length); i++) {
		game.upgrNum[i]=0;
	}
	for (i=0; i<(game.businessUpgrNum.length); i++) {
		game.businessUpgrNum[i]=0;
	}
	for (i=0; i<(game.businessPrices.length); i++) {
		game.businessPrices[i]=origbusinessPrices[i];
	}
	for (i=0; i<(game.businessRewards.length); i++) {
		game.businessRewards[i]=origbusinessRewards[i];
	}
	for (i=0; i<(game.flavourHPS.length); i++) {
		game.flavourHPS[i]=0;
	}
	game.h=1;
	game.newH=0;
	updateBars();
}
function resetAll() {
	closeWindow('confirmation', '2');
	localStorage.removeItem("game");
	location.reload();
}
/*		Save and Load progress		*/
function save() {
	localStorage.setItem("game", JSON.stringify(game));
}
function load() {
	if (localStorage.game)
	Object.assign(game, JSON.parse(localStorage.getItem("game")));
	changeTheme(0);
	document.getElementById("tickDisplay").innerHTML = `Tickspeed (${game.tickSpeed})`;
	document.getElementById("tickSlider").value=game.tickSpeed;
	document.getElementById("autoUpgrTog").innerHTML = `Auto upgrades (${game.autoUpgrIs})`;
	document.getElementById("autoPresTog").innerHTML = `Auto prestige (${game.autoPresIs})`;
	if (game.limitless) {
		document.getElementById("machinePowerButton").innerHTML = "Turn off the machine";
	} else {
		document.getElementById("machinePowerButton").innerHTML = "Turn on the machine";
	}
	updateFont();
	updateBars();
	if (game.autoSaveState == 0) {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: OFF`;
		document.getElementById("autoSlider").style.display = "none";
	} else {
		document.getElementById("autoSaveDisplay").innerHTML = `Autosave: ON (${game.saveTime}s)`
		document.getElementById("autoSlider").style.display = "inline-block";
		document.getElementById("autoSlider").value=game.saveTime;
	}
	game.menuSelected == 0 ? switchToUpgrade() : switchToAuto();
	for (i = 0; i < game.glodPrices.length; i++) {
		if (game.isPurchased[i] == 1) {
			document.getElementById(`glodUpgrade${i+1}`).style.backgroundColor="#ff5e5e";
		}
	}
}
function exportSave() {
	let temp = btoa(JSON.stringify(localStorage.game));
	navigator.clipboard.writeText(temp);
	alert("Save copied to clipboard!");
}
function importSave() {
	let temp = prompt("Paste save data");
	if (temp === undefined || temp === null || temp == "") {
	} else {
		try {
			localStorage.setItem("game", JSON.parse(atob(temp)));
			load();
			location.reload();
		}
		catch(err) {
			alert("Invalid Save");
		}
	}
}
/*		Cheaty Cheaty 		*/
/*
function maxPres() {
	game.potentialGlod = game.trueGlodLimit;
	glodPrestige();
}
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 80) {
		maxPres()
	}
}, true);
*/
