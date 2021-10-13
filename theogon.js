var month, day, absDay, info, zod;
var vLight, kLight, totLight;

var V_PER = 30;
var K_PER = 18;

var cal = [
	{
		"name": "Irus",
		"domain": "Birth",
		"season": "Early Spring",
		"analog": "March"
	},
	{
		"name": "Sulikh",
		"domain": "Ambition",
		"season": "Mid Spring",
		"analog": "April"
	},
	{
		"name": "Kryptos",
		"domain": "Knowledge",
		"season": "Late Spring",
		"analog": "May"
	},
	{
		"name": "Djouma",
		"domain": "Horizon",
		"season": "Early Summer",
		"analog": "June"
	},
	{
		"name": "Hester",
		"domain": "Luck",
		"season": "Mid Summer",
		"analog": "July"
	},
	{
		"name": "Arkadi",
		"domain": "Folly",
		"season": "Late Summer",
		"analog": "August"
	},
	{
		"name": "Conclave",
		"domain": "Endings",
		"season": "Early Autumn",
		"analog": "September"
	},
	{
		"name": "Bonmot",
		"domain": "Abundance",
		"season": "Mid Autumn",
		"analog": "October"
	},
	{
		"name": "Agnos",
		"domain": "Ignorance",
		"season": "Late Autumn",
		"analog": "November"
	},
	{
		"name": "Ankit",
		"domain": "Asceticism",
		"season": "Early Winter",
		"analog": "December"
	},
	{
		"name": "Tur",
		"domain": "The Tower",
		"season": "Mid Winter",
		"analog": "January"
	},
	{
		"name": "Okul",
		"domain": "Vigilance",
		"season": "Late Winter",
		"analog": "February"
	}
];

var moons = [
	{
		"phase": "Full Moon",
		"moonrise": "18:00",
		"peak": "Midnight",
		"moonset": "6:00"
	},
	{
		"phase": "Waning Gibbous",
		"moonrise": "21:00",
		"peak": "3:00",
		"moonset": "9:00"
	},
	{
		"phase": "Last Quarter",
		"moonrise": "Midnight",
		"peak": "6:00",
		"moonset": "Noon"
	},
	{
		"phase": "Waning Crescent",
		"moonrise": "3:00",
		"peak": "9:00",
		"moonset": "15:00"
	},
	{
		"phase": "New Moon",
		"moonrise": "6:00",
		"peak": "Noon",
		"moonset": "18:00"
	},
	{
		"phase": "Waxing Crescent",
		"moonrise": "9:00",
		"peak": "15:00",
		"moonset": "21:00"
	},
	{
		"phase": "First Quarter",
		"moonrise": "Noon",
		"peak": "18:00",
		"moonset": "Midnight"
	},
	{
		"phase": "Waxing Gibbous",
		"moonrise": "15:00",
		"peak": "21:00",
		"moonset": "3:00"
	}
];

var zodiac = [
	{
		"sign": "Healer",
		"element": "Fire",
		"house": "Root"
	},
	{
		"sign": "Treant",
		"element": "Air",
		"house": "Trunk"
	},
	{
		"sign": "Bullywug",
		"element": "Water",
		"house": "Branch"
	},
	{
		"sign": "Mouse",
		"element": "Earth",
		"house": "Leaf"
	},
	{
		"sign": "Phoenix",
		"element": "Fire",
		"house": "Seed"
	},
	{
		"sign": "Spider",
		"element": "Air",
		"house": "Root"
	},
	{
		"sign": "Whale",
		"element": "Water",
		"house": "Trunk"
	},
	{
		"sign": "Dragon",
		"element": "Water",
		"house": "Trunk"
	},
	{
		"sign": "Dolphin",
		"element": "Fire",
		"house": "Leaf"
	},
	{
		"sign": "Samara",
		"element": "Air",
		"house": "Seed"
	},
	{
		"sign": "Sage",
		"element": "Water",
		"house": "Trunk"
	},
	{
		"sign": "Bear",
		"element": "Earth",
		"house": "Trunk"
	},
	{
		"sign": "Wolf",
		"element": "Fire",
		"house": "Branch"
	},
	{
		"sign": "Fairy",
		"element": "Air",
		"house": "Leaf"
	},
	{
		"sign": "Paladin",
		"element": "Water",
		"house": "Seed"
	},
	{
		"sign": "Warden",
		"element": "Earth",
		"house": "Root"
	},
	{
		"sign": "Poet",
		"element": "Fire",
		"house": "Trunk"
	},
	{
		"sign": "Wizard",
		"element": "Air",
		"house": "Branch"
	},
	{
		"sign": "Rooster",
		"element": "Water",
		"house": "Leaf"
	},
	{
		"sign": "Dryad",
		"element": "Earth",
		"house": "Seed"
	}
];

$(document).ready(function() {
	update();
	$('#mon').change(function(){update()});
	$('#day').change(function(){update()});
});

function update() {
	month = parseInt($('#mon').val());
	day = parseInt($('#day').val());
	absDay = month*30 + day - 1;
	console.log(`(${month}, ${day}, ${absDay})`);

	info = cal[month];
	zod = zodiac[Math.floor(absDay/18)];
	$('#name').text(info["name"]);
	$('#domain').text(info["domain"]);
	$('#season').text(info["season"]);
	$('#analog').text(info["analog"])
	$('#zodiac').text(zod["sign"]);
	vantosUpdate();
	kodosUpdate();
	moonluck();
}

function vantosUpdate() {
	var inc = (absDay%V_PER)/V_PER;
	var p = lunarPhase(inc);
	vLight = Math.abs(inc - 0.5)*2;

	$('#v-phase').text(p["phase"]);
	$('#v-light').text(Math.floor(vLight*100));
	$('#v-rise').text(p["moonrise"]);
	$('#v-pos').text(p["peak"]);
	$('#v-set').text(p["moonset"]);
}

function kodosUpdate() {
	var inc = (absDay%K_PER)/K_PER;
	var p = lunarPhase(inc);
	kLight = Math.abs(inc - 0.5)*2;

	$('#k-phase').text(p["phase"]);
	$('#k-light').text(Math.floor(kLight*100));
	$('#k-rise').text(p["moonrise"]);
	$('#k-pos').text(p["peak"]);
	$('#k-set').text(p["moonset"]);
}

function moonluck() {
	// lawful good Kodos + (1 - Vantos)
	tabUpdate("lg", kLight + (1 - vLight));
	
	// neutral good Kodos + eNeu
	tabUpdate("ng", kLight + eNeutral(vLight));
	
	// chaotic good Kodos + Vantos
	tabUpdate("cg", kLight + vLight);

	// lawful neutral mNeu + (1 - Vantos)
	tabUpdate("ln", mNeutral(kLight) + (1 - vLight));

	// true neutral mNeu + eNeu
	tabUpdate("tn", mNeutral(kLight) + eNeutral(vLight));

	// chaotic neutral mNeu + Vantos
	tabUpdate("cn", mNeutral(kLight) + vLight);

	// lawful evil (1 - Kodos) + (1 - Vantos)
	tabUpdate("le", (1 - kLight) + (1 - vLight));

	// neutral evil (1 - Kodos) + eNeu
	tabUpdate("ne", (1 - kLight) + eNeutral(vLight));

	// chaotic evil (1 - Kodos) + Vantos
	tabUpdate("ce", (1 - kLight) + vLight);
}

function eNeutral(light) {
	return (1 - Math.abs(0.5 - light)*2)*1.0045;
}

function mNeutral(light) {
	return (1 - Math.abs(0.5 - light)*2)*1.0125;
}

function tabUpdate(alignment, light) {
	// prep selectors
	var selectorF = 'tr#' + alignment + ' td:nth-child(';
	var selectorB = ')';

	// light min->0 max->200
	// Normalize moonluck
	light = light/2;
	console.log("Normalized moonluck: " + light);
	// Convert to percentage
	light = Math.floor(light*100);
	console.log("Light as percentage: " + light);
	nothingChance = 100 - light; 
	mlSplit = nothingChance + Math.floor(light * 0.6);

	// propagate nothing chance
	console.log(selectorF + "2" + selectorB);
	$(selectorF + "2" + selectorB).text("< " + nothingChance);
	// propagate Luck chance
	$(selectorF + "3" + selectorB).text("<= " + mlSplit);
	// propagate Portent chance
	$(selectorF + "4" + selectorB).text("> " + mlSplit);

}

function lunarPhase(inc) {
	var phase = 0;
	if (inc <= 0.025) {
		phase = 0;
	} else if (inc <= 0.2) {
		phase = 1;
	} else if (inc <= 0.3) {
		phase = 2;
	} else if (inc <= 0.475) {
		phase = 3;
	} else if (inc <= 0.525) {
		phase = 4;
	} else if (inc <= 0.7) {
		phase = 5;
	} else if (inc <= 0.8) {
		phase = 6;
	} else if (inc <= 0.975) {
		phase = 7;
	} else {
		phase = 0;
	}
	return moons[phase];
}