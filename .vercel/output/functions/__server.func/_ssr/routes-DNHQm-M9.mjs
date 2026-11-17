import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Play, c as FlaskConical, i as RotateCcw, l as CloudRain, n as Sprout, o as Pause, r as Scissors, s as Leaf, u as Bug } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as ResponsiveContainer, i as Line, n as YAxis, o as Tooltip, r as XAxis, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DNHQm-M9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function clamp(n, a, b) {
	return Math.min(b, Math.max(a, n));
}
/** Saturating sufficiency. Equals 1 at `crit`, falls toward 0 below it. */
function sufficiency(pool, crit) {
	if (crit <= 0) return 1;
	const x = Math.max(0, pool);
	return clamp(1.5 * x / (x + .5 * crit), 0, 1);
}
var DEFAULT_POOLS = {
	no3: 25,
	nh4: 12,
	orgN: 140,
	inertN: 2800,
	labileP: 28,
	orgP: 55,
	inertP: 640,
	exchK: 240,
	orgK: 40,
	fixedK: 3200,
	ca: 1800,
	mg: 220,
	s: 28,
	fe: 12e3,
	mn: 4e3,
	zn: 1800,
	cu: 800,
	b: 400,
	mo: 28,
	cl: 3500
};
function clonePools(p) {
	return { ...p };
}
function zeroFlux() {
	return {
		mineralizationN: 0,
		nitrification: 0,
		denitrification: 0,
		volatilization: 0,
		leachingN: 0,
		fixation: 0,
		uptakeN: 0,
		uptakeP: 0,
		uptakeK: 0,
		mineralizationP: 0
	};
}
function calmStress() {
	return {
		temperature: 1,
		water: 1,
		nitrogen: 1,
		phosphorus: 1,
		potassium: 1,
		ph: 1,
		salinity: 1,
		micronutrient: 1,
		calcium: 1,
		magnesium: 1,
		sulfur: 1,
		pests: 1,
		microName: "—"
	};
}
function pools(patch) {
	return {
		...clonePools(DEFAULT_POOLS),
		...patch
	};
}
var SITES = [
	{
		id: "ottawa",
		name: "Ottawa Valley",
		region: "Ontario",
		note: "Continental. Cold winter, mild summer, reliable rain.",
		tMean: 6.4,
		tAmp: 16.2,
		peakDoy: 200,
		rainMean: 2.45,
		rainAmp: .55,
		rainPeak: 180,
		parMean: 12.2,
		parAmp: 6,
		soil: "loam",
		ph: 6.6,
		om: 3.2,
		ec: .4,
		pools: pools({})
	},
	{
		id: "peterborough",
		name: "Peterborough",
		region: "Ontario",
		note: "Mixed-farm country. Similar season to the valley, slightly drier.",
		tMean: 6.8,
		tAmp: 15.4,
		peakDoy: 201,
		rainMean: 2.2,
		rainAmp: .45,
		rainPeak: 175,
		parMean: 12.4,
		parAmp: 6,
		soil: "loam",
		ph: 6.5,
		om: 3,
		ec: .35,
		pools: pools({
			orgN: 120,
			labileP: 24
		})
	},
	{
		id: "okanagan",
		name: "Okanagan bench",
		region: "British Columbia",
		note: "Semi-arid. Irrigation decides the crop.",
		tMean: 9.2,
		tAmp: 13.5,
		peakDoy: 198,
		rainMean: .75,
		rainAmp: -.35,
		rainPeak: 200,
		parMean: 15.5,
		parAmp: 7,
		soil: "silt",
		ph: 7.3,
		om: 1.6,
		ec: .9,
		pools: pools({
			orgN: 45,
			inertN: 1400,
			labileP: 18,
			exchK: 180
		})
	},
	{
		id: "prairie",
		name: "Black prairie",
		region: "Saskatchewan",
		note: "High organic matter, a short warm window, a dry summer.",
		tMean: 2.4,
		tAmp: 18.5,
		peakDoy: 198,
		rainMean: 1.15,
		rainAmp: .7,
		rainPeak: 170,
		parMean: 13,
		parAmp: 7,
		soil: "loam",
		ph: 6.8,
		om: 5.6,
		ec: .5,
		pools: pools({
			orgN: 190,
			inertN: 4600,
			exchK: 320,
			labileP: 22
		})
	},
	{
		id: "maritime",
		name: "Cool maritime",
		region: "Northwest Europe",
		note: "Mild, wet, dimmer light. Cereals and forage do the work.",
		tMean: 10.2,
		tAmp: 6.5,
		peakDoy: 202,
		rainMean: 2.9,
		rainAmp: .3,
		rainPeak: 20,
		parMean: 9.4,
		parAmp: 5,
		soil: "loam",
		ph: 6.2,
		om: 4.1,
		ec: .3,
		pools: pools({
			orgN: 150,
			labileP: 20
		})
	},
	{
		id: "mediterranean",
		name: "Mediterranean",
		region: "Winter-rain coast",
		note: "Rain in winter, drought by early summer. Sow with the wet season.",
		tMean: 16.2,
		tAmp: 8,
		peakDoy: 200,
		rainMean: 1.35,
		rainAmp: 1.15,
		rainPeak: 20,
		parMean: 16.5,
		parAmp: 6,
		soil: "clay",
		ph: 7.6,
		om: 1.5,
		ec: 1.1,
		pools: pools({
			orgN: 55,
			labileP: 16,
			ca: 2800,
			exchK: 200
		})
	},
	{
		id: "subtropic",
		name: "Humid subtropics",
		region: "Southeast",
		note: "Hot, wet, weathered soils. Phosphorus ties up if the pH is low.",
		tMean: 18.4,
		tAmp: 8.5,
		peakDoy: 200,
		rainMean: 3.5,
		rainAmp: 1.2,
		rainPeak: 200,
		parMean: 15.2,
		parAmp: 4,
		soil: "silt",
		ph: 5.5,
		om: 2.1,
		ec: .3,
		pools: pools({
			labileP: 14,
			inertP: 900,
			fe: 18e3,
			exchK: 140
		})
	},
	{
		id: "monsoon",
		name: "Tropical monsoon",
		region: "Low latitudes",
		note: "Heat all year. A wet pulse, then leaching of nitrate and potassium.",
		tMean: 26.5,
		tAmp: 2.4,
		peakDoy: 180,
		rainMean: 4.8,
		rainAmp: 3.2,
		rainPeak: 210,
		parMean: 17,
		parAmp: 2,
		soil: "clay",
		ph: 5.3,
		om: 1.3,
		ec: .35,
		pools: pools({
			no3: 10,
			orgN: 70,
			labileP: 10,
			exchK: 90,
			fe: 2e4,
			ca: 800
		})
	},
	{
		id: "pampas",
		name: "Humid pampas",
		region: "Argentina",
		note: "Southern hemisphere. January is midsummer.",
		tMean: 16.4,
		tAmp: 7,
		peakDoy: 15,
		rainMean: 2.6,
		rainAmp: .5,
		rainPeak: 40,
		parMean: 15,
		parAmp: 5,
		soil: "loam",
		ph: 6.3,
		om: 3.8,
		ec: .4,
		pools: pools({
			orgN: 150,
			labileP: 26,
			exchK: 260
		})
	},
	{
		id: "nile",
		name: "Irrigated floodplain",
		region: "Arid delta",
		note: "Almost no rain. Alkaline, slightly saline, bright.",
		tMean: 22,
		tAmp: 8,
		peakDoy: 200,
		rainMean: .12,
		rainAmp: .05,
		rainPeak: 20,
		parMean: 19.5,
		parAmp: 4,
		soil: "clay",
		ph: 7.9,
		om: 1.1,
		ec: 1.9,
		pools: pools({
			orgN: 40,
			labileP: 18,
			ca: 3200,
			exchK: 280,
			fe: 6e3,
			zn: 700
		})
	}
];
var siteById = Object.fromEntries(SITES.map((s) => [s.id, s]));
function getSite(id) {
	return siteById[id] ?? SITES[0];
}
function temperature(site, doy, anomaly) {
	const rad = 2 * Math.PI * (doy - site.peakDoy) / 365;
	return site.tMean + site.tAmp * Math.cos(rad) + anomaly;
}
function rainfall(site, doy, mul) {
	const rad = 2 * Math.PI * (doy - site.rainPeak) / 365;
	return Math.max(0, (site.rainMean + site.rainAmp * Math.cos(rad)) * mul);
}
function daylightPar(site, doy, mul, rainMm) {
	const rad = 2 * Math.PI * (doy - site.peakDoy) / 365;
	const clear = site.parMean + site.parAmp * Math.cos(rad);
	const cloud = 1 - .38 * clamp(rainMm / 8, 0, 1);
	return Math.max(1.5, clear * cloud * mul);
}
function calendarDoy(plantDoy, day) {
	const d = Math.floor(plantDoy - 1 + day) % 365;
	return d < 0 ? d + 365 + 1 : d + 1;
}
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
var DOM = [
	31,
	28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
];
function formatDoy(doy) {
	let d = Math.round(doy);
	if (d < 1) d = 1;
	for (let i = 0; i < 12; i++) {
		const dim = DOM[i] ?? 30;
		if (d <= dim) return `${d} ${MONTHS[i]}`;
		d -= dim;
	}
	return "31 Dec";
}
var WHC = {
	sand: 90,
	loam: 165,
	silt: 190,
	clay: 205,
	peat: 250
};
function waterHolding(texture, compaction, om) {
	return WHC[texture] * (1 - .28 * clamp(compaction, 0, .9)) * (1 + .04 * (om - 3));
}
function driversForSite(site, prev, density) {
	return {
		...prev,
		density,
		texture: site.soil,
		ph: site.ph,
		om: site.om,
		ec: site.ec
	};
}
var spike = (extra) => ({
	form: "cereal",
	head: "spike",
	rootShape: "none",
	maxRootCm: 120,
	rue: 2.9,
	maxLai: 5.5,
	sla: 18,
	reproAt: .48,
	pConc: .0021,
	kConc: .011,
	phOpt: [5.8, 7.4],
	saltTol: 4,
	seedBiomass: .012,
	maxFix: .3,
	fixHalfSat: 18,
	shatter: .035,
	perennial: false,
	maxShoot: 0,
	waterlogOk: false,
	products: [
		{
			id: "grain",
			label: "Grain",
			basis: "econ",
			fraction: 1,
			dryMatter: .86,
			constituent: false
		},
		{
			id: "straw",
			label: "Straw",
			basis: "shoot",
			fraction: .85,
			dryMatter: .88,
			constituent: false
		},
		{
			id: "protein",
			label: "Protein",
			basis: "econ",
			fraction: .12,
			dryMatter: 1,
			constituent: true
		}
	],
	stages: [
		{
			until: .07,
			name: "Germination"
		},
		{
			until: .16,
			name: "Emergence"
		},
		{
			until: .42,
			name: "Tillering"
		},
		{
			until: .56,
			name: "Anthesis"
		},
		{
			until: .92,
			name: "Grain fill"
		},
		{
			until: 1.06,
			name: "Maturity"
		},
		{
			until: 9,
			name: "Senescence"
		}
	],
	...extra
});
var CROPS = [
	spike({
		id: "wheat",
		name: "Spring wheat",
		latin: "Triticum aestivum",
		blurb: "Grain and straw. A cool-season cereal that fills best before the heat.",
		daysToMaturity: 118,
		tBase: 0,
		tOpt: 17,
		tMax: 32,
		maxHeightCm: 95,
		hi: .47,
		nConc: .0125,
		optDensity: 250
	}),
	spike({
		id: "barley",
		name: "Barley",
		latin: "Hordeum vulgare",
		blurb: "Earlier than wheat, slightly more salt-tolerant, good straw.",
		daysToMaturity: 98,
		tBase: 0,
		tOpt: 16,
		tMax: 30,
		maxHeightCm: 80,
		hi: .5,
		nConc: .012,
		optDensity: 280,
		saltTol: 6
	}),
	spike({
		id: "oat",
		name: "Oat",
		latin: "Avena sativa",
		blurb: "Panicle cereal. Likes moisture and a mild summer.",
		daysToMaturity: 108,
		tBase: 0,
		tOpt: 16,
		tMax: 30,
		maxHeightCm: 110,
		hi: .42,
		nConc: .012,
		optDensity: 260,
		head: "panicle"
	}),
	{
		id: "maize",
		name: "Maize",
		latin: "Zea mays",
		blurb: "A C4 cereal. Needs heat. Grain, stover, and a modest protein fraction.",
		form: "maize",
		head: "ear",
		rootShape: "none",
		daysToMaturity: 145,
		tBase: 8,
		tOpt: 28,
		tMax: 38,
		maxHeightCm: 240,
		maxRootCm: 160,
		rue: 3.55,
		maxLai: 6,
		sla: 16,
		hi: .52,
		reproAt: .52,
		nConc: .011,
		pConc: .002,
		kConc: .01,
		phOpt: [5.6, 7.2],
		saltTol: 3,
		optDensity: 8,
		seedBiomass: .02,
		maxFix: .25,
		fixHalfSat: 20,
		shatter: .02,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "grain",
				label: "Grain",
				basis: "econ",
				fraction: 1,
				dryMatter: .85,
				constituent: false
			},
			{
				id: "stover",
				label: "Stover",
				basis: "shoot",
				fraction: .8,
				dryMatter: .85,
				constituent: false
			},
			{
				id: "protein",
				label: "Protein",
				basis: "econ",
				fraction: .09,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .2,
				name: "Seedling"
			},
			{
				until: .48,
				name: "Vegetative"
			},
			{
				until: .62,
				name: "Silking"
			},
			{
				until: .92,
				name: "Grain fill"
			},
			{
				until: 1.06,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "rice",
		name: "Paddy rice",
		latin: "Oryza sativa",
		blurb: "Flooded soils suit it. Other crops lose nitrate here; rice keeps growing.",
		form: "cereal",
		head: "panicle",
		rootShape: "none",
		daysToMaturity: 135,
		tBase: 10,
		tOpt: 28,
		tMax: 38,
		maxHeightCm: 105,
		maxRootCm: 40,
		rue: 2.5,
		maxLai: 6,
		sla: 18,
		hi: .5,
		reproAt: .5,
		nConc: .011,
		pConc: .002,
		kConc: .012,
		phOpt: [5.2, 7],
		saltTol: 3,
		optDensity: 200,
		seedBiomass: .01,
		maxFix: 1.4,
		fixHalfSat: 22,
		shatter: .04,
		perennial: false,
		maxShoot: 0,
		waterlogOk: true,
		products: [
			{
				id: "grain",
				label: "Paddy",
				basis: "econ",
				fraction: 1,
				dryMatter: .86,
				constituent: false
			},
			{
				id: "straw",
				label: "Straw",
				basis: "shoot",
				fraction: .8,
				dryMatter: .88,
				constituent: false
			},
			{
				id: "protein",
				label: "Protein",
				basis: "econ",
				fraction: .075,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .22,
				name: "Tillering"
			},
			{
				until: .48,
				name: "Stem elongation"
			},
			{
				until: .6,
				name: "Heading"
			},
			{
				until: .92,
				name: "Grain fill"
			},
			{
				until: 1.06,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "canola",
		name: "Canola",
		latin: "Brassica napus",
		blurb: "Oilseed. Seed is the sale; oil and protein meal sit inside it.",
		form: "brassica",
		head: "raceme",
		rootShape: "tap",
		daysToMaturity: 128,
		tBase: 2,
		tOpt: 20,
		tMax: 32,
		maxHeightCm: 130,
		maxRootCm: 140,
		rue: 2.3,
		maxLai: 5,
		sla: 20,
		hi: .32,
		reproAt: .46,
		nConc: .02,
		pConc: .0032,
		kConc: .012,
		phOpt: [6, 7.4],
		saltTol: 3.5,
		optDensity: 70,
		seedBiomass: .006,
		maxFix: .2,
		fixHalfSat: 16,
		shatter: .055,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "seed",
				label: "Seed",
				basis: "econ",
				fraction: 1,
				dryMatter: .92,
				constituent: false
			},
			{
				id: "straw",
				label: "Straw",
				basis: "shoot",
				fraction: .75,
				dryMatter: .88,
				constituent: false
			},
			{
				id: "oil",
				label: "Oil",
				basis: "econ",
				fraction: .43,
				dryMatter: 1,
				constituent: true
			},
			{
				id: "meal",
				label: "Protein meal",
				basis: "econ",
				fraction: .22,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .28,
				name: "Rosette"
			},
			{
				until: .46,
				name: "Bolting"
			},
			{
				until: .62,
				name: "Flowering"
			},
			{
				until: .92,
				name: "Pod fill"
			},
			{
				until: 1.05,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Shatter"
			}
		]
	},
	{
		id: "sunflower",
		name: "Sunflower",
		latin: "Helianthus annuus",
		blurb: "Deep taproot, high oil. Heat-tolerant if the soil holds water.",
		form: "sunflower",
		head: "disc",
		rootShape: "tap",
		daysToMaturity: 118,
		tBase: 6,
		tOpt: 25,
		tMax: 36,
		maxHeightCm: 180,
		maxRootCm: 180,
		rue: 2.35,
		maxLai: 4.5,
		sla: 16,
		hi: .34,
		reproAt: .48,
		nConc: .016,
		pConc: .0026,
		kConc: .014,
		phOpt: [6, 7.6],
		saltTol: 3.5,
		optDensity: 6,
		seedBiomass: .008,
		maxFix: .15,
		fixHalfSat: 16,
		shatter: .03,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "seed",
				label: "Seed",
				basis: "econ",
				fraction: 1,
				dryMatter: .92,
				constituent: false
			},
			{
				id: "stalk",
				label: "Stalk",
				basis: "shoot",
				fraction: .7,
				dryMatter: .85,
				constituent: false
			},
			{
				id: "oil",
				label: "Oil",
				basis: "econ",
				fraction: .46,
				dryMatter: 1,
				constituent: true
			},
			{
				id: "protein",
				label: "Protein",
				basis: "econ",
				fraction: .18,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .4,
				name: "Vegetative"
			},
			{
				until: .58,
				name: "Flowering"
			},
			{
				until: .92,
				name: "Seed fill"
			},
			{
				until: 1.06,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "soy",
		name: "Soybean",
		latin: "Glycine max",
		blurb: "Nodules fix N₂ when mineral N is scarce and molybdenum is there.",
		form: "legume",
		head: "pod",
		rootShape: "none",
		daysToMaturity: 115,
		tBase: 8,
		tOpt: 26,
		tMax: 36,
		maxHeightCm: 90,
		maxRootCm: 120,
		rue: 1.85,
		maxLai: 6,
		sla: 22,
		hi: .42,
		reproAt: .48,
		nConc: .026,
		pConc: .0028,
		kConc: .013,
		phOpt: [6, 7.2],
		saltTol: 3,
		optDensity: 35,
		seedBiomass: .014,
		maxFix: 6,
		fixHalfSat: 28,
		shatter: .03,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "seed",
				label: "Seed",
				basis: "econ",
				fraction: 1,
				dryMatter: .88,
				constituent: false
			},
			{
				id: "haulm",
				label: "Haulm",
				basis: "shoot",
				fraction: .75,
				dryMatter: .88,
				constituent: false
			},
			{
				id: "oil",
				label: "Oil",
				basis: "econ",
				fraction: .2,
				dryMatter: 1,
				constituent: true
			},
			{
				id: "protein",
				label: "Protein",
				basis: "econ",
				fraction: .38,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .22,
				name: "Emergence"
			},
			{
				until: .46,
				name: "Vegetative"
			},
			{
				until: .6,
				name: "Flowering"
			},
			{
				until: .92,
				name: "Pod fill"
			},
			{
				until: 1.06,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "pea",
		name: "Field pea",
		latin: "Pisum sativum",
		blurb: "A short cool-season pulse. Strong fixer, shatter-prone if you wait.",
		form: "legume",
		head: "pod",
		rootShape: "none",
		daysToMaturity: 92,
		tBase: 2,
		tOpt: 18,
		tMax: 30,
		maxHeightCm: 70,
		maxRootCm: 90,
		rue: 1.9,
		maxLai: 5,
		sla: 22,
		hi: .48,
		reproAt: .46,
		nConc: .024,
		pConc: .0026,
		kConc: .012,
		phOpt: [6, 7.3],
		saltTol: 3,
		optDensity: 80,
		seedBiomass: .016,
		maxFix: 4.8,
		fixHalfSat: 24,
		shatter: .06,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "seed",
				label: "Seed",
				basis: "econ",
				fraction: 1,
				dryMatter: .88,
				constituent: false
			},
			{
				id: "haulm",
				label: "Haulm",
				basis: "shoot",
				fraction: .7,
				dryMatter: .88,
				constituent: false
			},
			{
				id: "protein",
				label: "Protein",
				basis: "econ",
				fraction: .24,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .4,
				name: "Vegetative"
			},
			{
				until: .55,
				name: "Flowering"
			},
			{
				until: .9,
				name: "Pod fill"
			},
			{
				until: 1.05,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Shatter"
			}
		]
	},
	{
		id: "alfalfa",
		name: "Alfalfa",
		latin: "Medicago sativa",
		blurb: "Perennial hay. Cut near early bloom, then it regrows. Nodules carry the nitrogen.",
		form: "forage",
		head: "raceme",
		rootShape: "tap",
		daysToMaturity: 36,
		tBase: 2,
		tOpt: 22,
		tMax: 34,
		maxHeightCm: 75,
		maxRootCm: 200,
		rue: 1.75,
		maxLai: 5.5,
		sla: 22,
		hi: .92,
		reproAt: .62,
		nConc: .028,
		pConc: .0026,
		kConc: .018,
		phOpt: [6.4, 7.6],
		saltTol: 3.5,
		optDensity: 350,
		seedBiomass: .02,
		maxFix: 6.5,
		fixHalfSat: 22,
		shatter: .01,
		perennial: true,
		maxShoot: .46,
		waterlogOk: false,
		products: [{
			id: "hay",
			label: "Hay",
			basis: "shoot",
			fraction: .92,
			dryMatter: .85,
			constituent: false
		}, {
			id: "protein",
			label: "Protein",
			basis: "shoot",
			fraction: .18,
			dryMatter: 1,
			constituent: true
		}],
		stages: [
			{
				until: .12,
				name: "Regrowth"
			},
			{
				until: .4,
				name: "Vegetative"
			},
			{
				until: .7,
				name: "Bud"
			},
			{
				until: .95,
				name: "Early bloom"
			},
			{
				until: 1.2,
				name: "Full bloom"
			},
			{
				until: 9,
				name: "Overmature"
			}
		]
	},
	{
		id: "potato",
		name: "Potato",
		latin: "Solanum tuberosum",
		blurb: "Tubers bulk underground after initiation. Heat and waterlogging both hurt.",
		form: "tuber",
		head: "none",
		rootShape: "tuber",
		daysToMaturity: 118,
		tBase: 4,
		tOpt: 17,
		tMax: 28,
		maxHeightCm: 60,
		maxRootCm: 70,
		rue: 2.5,
		maxLai: 4.5,
		sla: 20,
		hi: .74,
		reproAt: .34,
		nConc: .011,
		pConc: .0024,
		kConc: .016,
		phOpt: [5.4, 6.8],
		saltTol: 2.4,
		optDensity: 4.5,
		seedBiomass: .04,
		maxFix: .1,
		fixHalfSat: 16,
		shatter: .012,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "tuber",
				label: "Tubers, fresh",
				basis: "econ",
				fraction: 1,
				dryMatter: .2,
				constituent: false
			},
			{
				id: "haulm",
				label: "Haulm",
				basis: "shoot",
				fraction: .6,
				dryMatter: .85,
				constituent: false
			},
			{
				id: "starch",
				label: "Starch",
				basis: "econ",
				fraction: .68,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Sprouting"
			},
			{
				until: .3,
				name: "Vegetative"
			},
			{
				until: .5,
				name: "Tuber initiation"
			},
			{
				until: .9,
				name: "Bulking"
			},
			{
				until: 1.08,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "carrot",
		name: "Carrot",
		latin: "Daucus carota",
		blurb: "A taproot crop. Fresh market weight is mostly water.",
		form: "root",
		head: "none",
		rootShape: "tap",
		daysToMaturity: 105,
		tBase: 3,
		tOpt: 17,
		tMax: 28,
		maxHeightCm: 35,
		maxRootCm: 50,
		rue: 2.3,
		maxLai: 3.5,
		sla: 18,
		hi: .7,
		reproAt: .32,
		nConc: .011,
		pConc: .0022,
		kConc: .016,
		phOpt: [6, 7],
		saltTol: 2.2,
		optDensity: 55,
		seedBiomass: .004,
		maxFix: .05,
		fixHalfSat: 14,
		shatter: .008,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [{
			id: "root",
			label: "Roots, fresh",
			basis: "econ",
			fraction: 1,
			dryMatter: .12,
			constituent: false
		}, {
			id: "tops",
			label: "Tops",
			basis: "shoot",
			fraction: .7,
			dryMatter: .16,
			constituent: false
		}],
		stages: [
			{
				until: .1,
				name: "Germination"
			},
			{
				until: .3,
				name: "Seedling"
			},
			{
				until: .9,
				name: "Root fill"
			},
			{
				until: 1.08,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "beet",
		name: "Sugar beet",
		latin: "Beta vulgaris",
		blurb: "A long season. Sugar is most of the root dry matter.",
		form: "root",
		head: "none",
		rootShape: "globe",
		daysToMaturity: 155,
		tBase: 3,
		tOpt: 20,
		tMax: 30,
		maxHeightCm: 50,
		maxRootCm: 80,
		rue: 2.7,
		maxLai: 4.5,
		sla: 16,
		hi: .68,
		reproAt: .28,
		nConc: .01,
		pConc: .0018,
		kConc: .013,
		phOpt: [6.4, 7.6],
		saltTol: 5,
		optDensity: 8,
		seedBiomass: .006,
		maxFix: .05,
		fixHalfSat: 14,
		shatter: .006,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "root",
				label: "Roots, fresh",
				basis: "econ",
				fraction: 1,
				dryMatter: .23,
				constituent: false
			},
			{
				id: "tops",
				label: "Tops",
				basis: "shoot",
				fraction: .65,
				dryMatter: .16,
				constituent: false
			},
			{
				id: "sugar",
				label: "Sugar",
				basis: "econ",
				fraction: .72,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .25,
				name: "Seedling"
			},
			{
				until: .9,
				name: "Root fill"
			},
			{
				until: 1.06,
				name: "Maturity"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	},
	{
		id: "cotton",
		name: "Cotton",
		latin: "Gossypium hirsutum",
		blurb: "Lint and seed. It wants a long hot season and will stall in a northern spring.",
		form: "fiber",
		head: "boll",
		rootShape: "none",
		daysToMaturity: 150,
		tBase: 12,
		tOpt: 28,
		tMax: 38,
		maxHeightCm: 120,
		maxRootCm: 140,
		rue: 1.95,
		maxLai: 4.5,
		sla: 16,
		hi: .38,
		reproAt: .5,
		nConc: .015,
		pConc: .0022,
		kConc: .011,
		phOpt: [5.8, 7.5],
		saltTol: 5,
		optDensity: 10,
		seedBiomass: .008,
		maxFix: .15,
		fixHalfSat: 16,
		shatter: .01,
		perennial: false,
		maxShoot: 0,
		waterlogOk: false,
		products: [
			{
				id: "lint",
				label: "Lint",
				basis: "econ",
				fraction: .38,
				dryMatter: .92,
				constituent: false
			},
			{
				id: "seed",
				label: "Seed",
				basis: "econ",
				fraction: .62,
				dryMatter: .92,
				constituent: false
			},
			{
				id: "oil",
				label: "Oil",
				basis: "econ",
				fraction: .1,
				dryMatter: 1,
				constituent: true
			}
		],
		stages: [
			{
				until: .08,
				name: "Germination"
			},
			{
				until: .4,
				name: "Squaring"
			},
			{
				until: .58,
				name: "Flowering"
			},
			{
				until: .92,
				name: "Boll fill"
			},
			{
				until: 1.08,
				name: "Open boll"
			},
			{
				until: 9,
				name: "Senescence"
			}
		]
	}
];
var byId = Object.fromEntries(CROPS.map((c) => [c.id, c]));
function getCrop(id) {
	return byId[id] ?? CROPS[0];
}
var DRESSINGS = [
	{
		id: "urea",
		name: "Urea",
		rate: "40 kg N",
		detail: "Amide, hydrolyzes into NH₄⁺"
	},
	{
		id: "an",
		name: "Ammonium nitrate",
		rate: "30 kg N",
		detail: "Half NH₄⁺, half NO₃⁻"
	},
	{
		id: "cn",
		name: "Calcium nitrate",
		rate: "25 kg N",
		detail: "NO₃⁻ plus calcium"
	},
	{
		id: "compost",
		name: "Compost",
		rate: "3 t",
		detail: "Organic N, P and K"
	},
	{
		id: "map",
		name: "MAP",
		rate: "15 kg P",
		detail: "Labile phosphate plus NH₄⁺"
	},
	{
		id: "rock",
		name: "Rock phosphate",
		rate: "30 kg P",
		detail: "Inert P, very slow release"
	},
	{
		id: "mop",
		name: "Muriate of potash",
		rate: "40 kg K",
		detail: "Exchangeable K plus chloride"
	},
	{
		id: "gypsum",
		name: "Gypsum",
		rate: "200 kg",
		detail: "Calcium and sulfate"
	},
	{
		id: "micros",
		name: "Micro mix",
		rate: "one pass",
		detail: "Zn, Cu, B, Mo, Fe, Mn"
	},
	{
		id: "lime",
		name: "Lime",
		rate: "+0.3 pH",
		detail: "Calcium carbonate"
	},
	{
		id: "sulfur",
		name: "Sulfur",
		rate: "20 kg S",
		detail: "Sulfate, nudges pH down"
	},
	{
		id: "rhizobia",
		name: "Rhizobia",
		rate: "inoculate",
		detail: "Sets diazotroph inoculation to full"
	},
	{
		id: "myco",
		name: "Mycorrhizae",
		rate: "inoculate",
		detail: "Better labile-P uptake"
	}
];
function applyDressing(id, pools, drivers) {
	const p = clonePools(pools);
	const d = { ...drivers };
	switch (id) {
		case "urea":
			p.nh4 += d.ph > 7.4 ? 36 : 39.2;
			break;
		case "an":
			p.nh4 += 15;
			p.no3 += 15;
			break;
		case "cn":
			p.no3 += 25;
			p.ca += 18;
			break;
		case "compost":
			p.orgN += 18;
			p.orgP += 6;
			p.orgK += 16;
			d.om = clamp(d.om + .15, .4, 12);
			break;
		case "map":
			p.labileP += 15;
			p.nh4 += 8;
			break;
		case "rock":
			p.inertP += 30;
			break;
		case "mop":
			p.exchK += 40;
			p.cl += 8e3;
			break;
		case "gypsum":
			p.ca += 46;
			p.s += 36;
			break;
		case "micros":
			p.zn += 400;
			p.cu += 150;
			p.b += 80;
			p.mo += 12;
			p.fe += 500;
			p.mn += 400;
			break;
		case "lime":
			d.ph = clamp(d.ph + .3, 4, 8.4);
			p.ca += 400;
			break;
		case "sulfur":
			p.s += 20;
			d.ph = clamp(d.ph - .15, 4, 8.4);
			break;
		case "rhizobia":
			d.inoculation = 1;
			break;
		case "myco": d.mycorrhizae = clamp(d.mycorrhizae + .45, 0, 1);
	}
	return {
		pools: p,
		drivers: d
	};
}
function ledgerTime(day) {
	const safe = Number.isFinite(day) ? Math.max(0, day) : 0;
	const whole = Math.floor(safe);
	return {
		day: whole,
		frac: safe - whole,
		week: Math.floor(whole / 7) + 1,
		month: Math.floor(whole / 30.436875) + 1,
		year: Math.floor(whole / 365.2425) + 1
	};
}
function formatMass(kg) {
	if (!Number.isFinite(kg)) return "—";
	const abs = Math.abs(kg);
	const n = abs >= 1e4 ? `${(abs / 1e3).toFixed(1)} t` : abs >= 1e3 ? `${(abs / 1e3).toFixed(2)} t` : abs >= 10 ? `${abs.toFixed(0)} kg` : `${abs.toFixed(1)} kg`;
	return kg < 0 ? `−${n}` : n;
}
function formatArea(m2) {
	if (m2 < 100) return `${Math.round(m2)} m²`;
	const ha = m2 / 1e4;
	const ac = m2 / 4046.8564224;
	return `${ha >= 10 ? ha.toFixed(1) : ha.toFixed(2)} ha · ${ac >= 10 ? ac.toFixed(0) : ac.toFixed(1)} ac`;
}
function paceLabel(speed) {
	if (speed <= 0) return "Paused";
	const sec = 10 / speed;
	if (sec >= 9.5) return "10 s / day";
	if (sec >= 1) return `${sec.toFixed(1)} s / day`;
	return `${sec.toFixed(2)} s / day`;
}
function formatFlux(n) {
	if (!Number.isFinite(n) || Math.abs(n) < .005) return "0.00";
	return n.toFixed(2);
}
function tHa(kgPerM2) {
	const t = kgPerM2 * 10;
	if (!Number.isFinite(t)) return "—";
	return t >= 10 ? t.toFixed(1) : t.toFixed(2);
}
function tempResponse(t, crop) {
	if (t <= crop.tBase || t >= crop.tMax) return 0;
	const lo = crop.tOpt - Math.max(3, (crop.tOpt - crop.tBase) * .28);
	const hi = crop.tOpt + Math.max(4, (crop.tMax - crop.tOpt) * .38);
	if (t >= lo && t <= hi) return 1;
	if (t < lo) return clamp((t - crop.tBase) / Math.max(.5, lo - crop.tBase), 0, 1);
	return clamp((crop.tMax - t) / Math.max(.5, crop.tMax - hi), 0, 1);
}
function phAvailP(ph) {
	const d = Math.abs(ph - 6.5);
	return Math.exp(-.5 * (d / 1.05) ** 2);
}
function acidMicro(ph) {
	if (ph <= 6.8) return 1;
	return Math.exp(-.85 * (ph - 6.8));
}
function moMicro(ph) {
	return clamp((ph - 4.4) / 2.6, .15, 1);
}
function phStressOf(ph, crop) {
	const [lo, hi] = crop.phOpt;
	if (ph >= lo && ph <= hi) return 1;
	return clamp(1 - (ph < lo ? lo - ph : ph - hi) / 1.7, 0, 1);
}
function take(pool, amount) {
	const taken = Math.min(Math.max(0, pool), Math.max(0, amount));
	return [pool - taken, taken];
}
function qualityOf(crop, development, shoot, econ) {
	if (crop.perennial) {
		const early = clamp((development - .38) / .28, 0, 1);
		const late = development < 1 ? 1 : Math.exp(-(((development - 1) / .34) ** 2));
		const bulk = clamp(shoot / .16, 0, 1);
		return clamp(early * late * (.45 + .55 * bulk), 0, 1);
	}
	const early = clamp((development - .7) / .28, 0, 1);
	const late = development <= 1.02 ? 1 : Math.exp(-(((development - 1.02) / .22) ** 2));
	const total = shoot + econ;
	const fill = crop.hi <= 0 ? 1 : clamp(econ / (crop.hi * Math.max(total, .02)), 0, 1);
	return clamp(early * late * (.3 + .7 * fill), 0, 1);
}
function stageName(crop, development, stubble) {
	if (stubble) return "Stubble";
	for (const stage of crop.stages) if (development < stage.until) return stage.name;
	return crop.stages[crop.stages.length - 1]?.name ?? "Standing";
}
function freshSim(drivers, pools, site) {
	return {
		day: 0,
		development: 0,
		shoot: 0,
		econ: 0,
		lai: 0,
		rootFrac: .02,
		water: waterHolding(drivers.texture, drivers.compaction, drivers.om) * .72,
		pools: clonePools(pools),
		fluxes: zeroFlux(),
		stresses: calmStress(),
		limiter: "—",
		temperature: temperature(site, drivers.plantDoy, drivers.tempAnomaly),
		rainToday: 0,
		parToday: 0,
		doy: drivers.plantDoy,
		emerged: false,
		fixedN: 0,
		leachedN: 0,
		denitrifiedN: 0,
		mineralizedN: 0
	};
}
function leafFraction(crop, development) {
	if (crop.perennial) return .55;
	if (development < crop.reproAt) return .55;
	return .55 * (1 - .72 * clamp((development - crop.reproAt) / .45, 0, 1));
}
var LIMIT_LABEL = {
	temperature: "temperature",
	water: "water",
	nitrogen: "nitrogen",
	phosphorus: "phosphorus",
	potassium: "potassium",
	ph: "pH",
	salinity: "salinity",
	micronutrient: "a micronutrient",
	calcium: "calcium",
	magnesium: "magnesium",
	sulfur: "sulfur",
	pests: "pests"
};
function limiterFrom(stresses) {
	const entries = [
		["temperature", stresses.temperature],
		["water", stresses.water],
		["nitrogen", stresses.nitrogen],
		["phosphorus", stresses.phosphorus],
		["potassium", stresses.potassium],
		["ph", stresses.ph],
		["salinity", stresses.salinity],
		["micronutrient", stresses.micronutrient],
		["calcium", stresses.calcium],
		["magnesium", stresses.magnesium],
		["sulfur", stresses.sulfur],
		["pests", stresses.pests]
	];
	let key = "temperature";
	let min = 2;
	for (const [k, v] of entries) if (v < min) {
		min = v;
		key = k;
	}
	if (min > .97) return "none — near potential";
	if (key === "micronutrient") return stresses.microName;
	return LIMIT_LABEL[key] ?? "resources";
}
/** Advance by `h` days (keep h ≤ 0.5). Pure. */
function step(sim, h, drivers, crop, site) {
	const pools = clonePools(sim.pools);
	const doy = calendarDoy(drivers.plantDoy, sim.day);
	const temp = temperature(site, doy, drivers.tempAnomaly);
	const rain = rainfall(site, doy, drivers.rainMul);
	const par = daylightPar(site, doy, drivers.radMul, rain);
	const whc = Math.max(40, waterHolding(drivers.texture, drivers.compaction, drivers.om));
	const tResp = tempResponse(temp, crop);
	const tQ = clamp(2 ** ((temp - 20) / 10), 0, 2.3);
	let water = sim.water;
	const sat0 = clamp(sim.water / whc, 0, 1.2);
	const moistF = sat0 < .15 ? sat0 / .15 * .25 : sat0 > .9 ? .65 : 1;
	let development = sim.development;
	let shoot = sim.shoot;
	let econ = sim.econ;
	let emerged = sim.emerged;
	let rootFrac = sim.rootFrac;
	const dPh = phStressOf(drivers.ph, crop);
	let waterStress = sat0 >= .42 ? 1 : clamp(sat0 / .42, 0, 1);
	if (!crop.waterlogOk && sat0 > .9) waterStress *= clamp(1 - (sat0 - .9) * 2.2, .45, 1);
	if (crop.waterlogOk && sat0 > .7) waterStress = Math.max(waterStress, .95);
	let dD = 1 / crop.daysToMaturity * tResp * (.6 + .4 * waterStress);
	if (development < .06 && sat0 < .12) dD *= .15;
	development += dD * h;
	if (!crop.perennial && development >= 1 && tResp < .25) development += .008 * h;
	if (!emerged && development >= .06 && tResp > 0) {
		shoot = Math.max(shoot, crop.seedBiomass);
		emerged = true;
	}
	const rootTarget = clamp((development - .04) / .48, 0, 1) * (1 - .45 * drivers.compaction);
	rootFrac += (rootTarget - rootFrac) * (1 - Math.exp(-1.6 * h));
	const root = .18 + .82 * clamp(rootFrac, 0, 1);
	const leafFrac = leafFraction(crop, development);
	const lai = emerged ? Math.min(crop.maxLai, shoot * crop.sla * leafFrac) : 0;
	const kc = !emerged ? .2 : Math.min(1.15, .28 + .85 * clamp(lai / 3.6, 0, 1));
	const etc = Math.max(.2, .095 * Math.max(0, temp) * (par / 13) + .3) * kc * (sat0 > .08 ? 1 : .35);
	water = water + (rain + drivers.irrigation - etc) * h;
	if (water < 0) water = 0;
	const sat = clamp(water / whc, 0, 1.4);
	const fpar = 1 - Math.exp(-.5 * lai);
	const weedLight = 1 - .55 * clamp(drivers.weeds, 0, 1);
	const ipar = par * fpar * weedLight;
	const densRel = crop.optDensity > 0 ? drivers.density / crop.optDensity : 1;
	const densF = densRel <= .02 ? .02 : Math.min(1.08, densRel * Math.exp(1 - densRel));
	let pot = crop.rue * drivers.vigor * (.86 + .14 * (1 - drivers.compaction)) * ipar / 1e3 * densF * tResp;
	if (emerged && lai < 1.4 && shoot > 0) {
		const juvenile = shoot * .085 * tResp * (.5 + .5 * waterStress) * densF;
		pot = Math.max(pot, juvenile);
	}
	if (!crop.perennial && development > 1) pot *= clamp(1 - (development - 1) / .18, 0, 1);
	if (crop.maxShoot > 0 && shoot > crop.maxShoot * .82) pot *= clamp((crop.maxShoot - shoot) / (crop.maxShoot * .18), 0, 1);
	const demandN = pot * crop.nConc * 1e4;
	const demandP = pot * crop.pConc * 1e4;
	const demandK = pot * crop.kConc * 1e4;
	const pH_P = phAvailP(drivers.ph);
	const myc = .4 + 1.05 * clamp(drivers.mycorrhizae, 0, 1);
	const weedN = 1 - .5 * clamp(drivers.weeds, 0, 1);
	const moistU = clamp(.25 + .75 * Math.min(1, sat), .2, 1);
	const capN = (pools.no3 + pools.nh4) * .22 * root * moistU * weedN;
	const capP = pools.labileP * .07 * root * moistU * pH_P * myc;
	const capK = pools.exchK * .075 * root * moistU;
	const cover = clamp(lai / 2.4, 0, 1);
	const inorg = pools.no3 + pools.nh4;
	const suppression = inorg / (inorg + crop.fixHalfSat);
	const moF = sufficiency(pools.mo, 8) * moMicro(drivers.ph);
	const inoc = clamp(drivers.inoculation, 0, 1);
	const fixCap = crop.maxFix * inoc * cover * (1 - suppression) * moF * tResp * moistU * clamp(1 - Math.abs(drivers.ph - 6.6) / 3.2, 0, 1);
	const nFromSoil = Math.min(demandN, capN);
	const fixation = Math.min(Math.max(0, fixCap), Math.max(0, demandN - nFromSoil));
	const nStress = demandN < .02 ? 1 : clamp((nFromSoil + fixation) / demandN, 0, 1);
	const pStress = demandP < .005 ? 1 : clamp(Math.min(demandP, capP) / demandP, 0, 1);
	const kStress = demandK < .005 ? 1 : clamp(Math.min(demandK, capK) / demandK, 0, 1);
	const micros = [
		{
			name: "iron",
			value: sufficiency(pools.fe, 2500) * acidMicro(drivers.ph)
		},
		{
			name: "manganese",
			value: sufficiency(pools.mn, 800) * acidMicro(drivers.ph)
		},
		{
			name: "zinc",
			value: sufficiency(pools.zn, 400) * acidMicro(drivers.ph)
		},
		{
			name: "copper",
			value: sufficiency(pools.cu, 150) * acidMicro(drivers.ph)
		},
		{
			name: "boron",
			value: sufficiency(pools.b, 80) * acidMicro(drivers.ph)
		},
		{
			name: "molybdenum",
			value: sufficiency(pools.mo, 8) * moMicro(drivers.ph)
		}
	];
	let microName = "micronutrients";
	let micro = 1;
	for (const m of micros) {
		const v = clamp(m.value, 0, 1);
		if (v < micro) {
			micro = v;
			microName = m.name;
		}
	}
	const caS = sufficiency(pools.ca, 600);
	const mgS = sufficiency(pools.mg, 80);
	const sS = sufficiency(pools.s, 12);
	const salt = drivers.ec <= crop.saltTol ? 1 : Math.exp(-.45 * (drivers.ec - crop.saltTol));
	const pests = 1 - .72 * clamp(drivers.pests, 0, 1);
	const stresses = {
		temperature: tResp,
		water: waterStress,
		nitrogen: nStress,
		phosphorus: pStress,
		potassium: kStress,
		ph: dPh,
		salinity: salt,
		micronutrient: micro,
		calcium: caS,
		magnesium: mgS,
		sulfur: sS,
		pests,
		microName
	};
	const parts = [
		tResp,
		waterStress,
		nStress,
		pStress,
		kStress,
		dPh,
		salt,
		micro,
		caS,
		mgS,
		sS,
		pests
	];
	const gf = Math.min(...parts) * (.9 + .1 * (parts.reduce((a, b) => a + b, 0) / parts.length));
	let growth = pot * gf * h;
	if (demandN > .02 && fixation > 0) {
		const share = fixation / (nFromSoil + fixation + 1e-9);
		growth *= 1 - .12 * share;
	}
	if (emerged && drivers.pests > 0) shoot -= shoot * drivers.pests * .012 * h;
	if (crop.perennial) shoot += growth;
	else if (development < crop.reproAt) shoot += growth;
	else {
		const intensity = clamp((development - crop.reproAt) / Math.max(.2, 1 - crop.reproAt), 0, 1);
		const frac = .28 + .6 * intensity;
		let toEcon = growth * frac;
		const remob = Math.min(shoot * .45, shoot * (.006 + .018 * intensity) * h);
		shoot = shoot + (growth - toEcon) - remob;
		econ = econ + toEcon + remob;
		if (shoot < .02 && emerged) shoot = .02;
		const total = shoot + econ;
		const cap = crop.hi * total;
		if (econ > cap) {
			shoot += econ - cap;
			econ = cap;
		}
	}
	if (!crop.perennial && development > 1.02) {
		const excess = development - 1.02;
		shoot *= Math.exp(-.012 * excess * h * 8);
		econ *= Math.exp(-crop.shatter * excess * h * 6);
	}
	shoot = Math.max(0, shoot);
	econ = Math.max(0, econ);
	const actual = h > 0 ? growth / h : 0;
	const builtN = actual * crop.nConc * 1e4 * h;
	const needP = actual * crop.pConc * 1e4 * h;
	const needK = actual * crop.kConc * 1e4 * h;
	const soilShare = nFromSoil + fixation > 0 ? nFromSoil / (nFromSoil + fixation) : 1;
	const nPool = pools.no3 + pools.nh4;
	let soilTaken = 0;
	const soilWant = builtN * soilShare;
	if (nPool > 0 && soilWant > 0) {
		const nTake = Math.min(soilWant, nPool);
		const no3Share = pools.no3 / nPool;
		const [no3, tookNo3] = take(pools.no3, nTake * no3Share);
		const [nh4, tookNh4] = take(pools.nh4, nTake - tookNo3);
		pools.no3 = no3;
		pools.nh4 = nh4;
		soilTaken = tookNo3 + tookNh4;
	}
	const fixedAmt = Math.min(fixation * h, Math.max(0, builtN - soilTaken));
	let tookP = 0;
	[pools.labileP, tookP] = take(pools.labileP, needP);
	let tookK = 0;
	[pools.exchK, tookK] = take(pools.exchK, needK);
	const dmHa = actual * h * 1e4;
	const dropKg = (pool, gPerKg) => Math.max(0, pool - dmHa * (gPerKg / 1e3));
	const dropG = (pool, gPerKg) => Math.max(0, pool - dmHa * gPerKg);
	pools.ca = dropKg(pools.ca, 4);
	pools.mg = dropKg(pools.mg, 2);
	pools.s = dropKg(pools.s, 2.5);
	pools.fe = dropG(pools.fe, .12);
	pools.mn = dropG(pools.mn, .04);
	pools.zn = dropG(pools.zn, .025);
	pools.cu = dropG(pools.cu, .006);
	pools.b = dropG(pools.b, .015);
	pools.mo = dropG(pools.mo, 4e-4);
	const omBoost = 1 + .12 * (drivers.om - 3);
	const minN = pools.orgN * .0075 * tQ * moistF * omBoost * h;
	pools.orgN -= minN;
	pools.nh4 += minN;
	const minInert = pools.inertN * 18e-6 * tQ * h;
	pools.inertN -= minInert;
	pools.nh4 += minInert;
	const minP = pools.orgP * .0032 * tQ * moistF * h;
	pools.orgP -= minP;
	pools.labileP += minP;
	const minK = pools.orgK * .004 * tQ * moistF * h;
	pools.orgK -= minK;
	pools.exchK += minK;
	const relK = pools.fixedK * 35e-6 * tQ * h;
	pools.fixedK -= relK;
	pools.exchK += relK;
	const nitFactor = temp > 2 && sat < .9 ? tQ * (drivers.ph > 5.2 ? 1 : .45) : temp > 2 ? tQ * .2 : 0;
	const nit = pools.nh4 * .2 * nitFactor * h;
	pools.nh4 -= nit;
	pools.no3 += nit;
	const vol = pools.nh4 * .018 * Math.max(0, drivers.ph - 7.25) * tQ * h;
	pools.nh4 -= vol;
	let den = 0;
	if (sat > .84) {
		const wet = clamp((sat - .84) / .16, 0, 1);
		const kDen = crop.waterlogOk ? .035 : .14;
		den = pools.no3 * kDen * wet * tQ * h;
		pools.no3 -= den;
	}
	const acidFix = drivers.ph < 5.8 ? (5.8 - drivers.ph) * .004 : 0;
	const alkFix = drivers.ph > 7.7 ? (drivers.ph - 7.7) * .003 : 0;
	const fixP = pools.labileP * (acidFix + alkFix) * h;
	pools.labileP -= fixP;
	pools.inertP += fixP;
	const rock = pools.inertP * 25e-6 * tQ * (drivers.ph < 6.2 ? 1.5 : .55) * h;
	pools.inertP -= rock;
	pools.labileP += rock;
	let drainage = 0;
	if (water > whc) {
		drainage = water - whc;
		water = whc;
	}
	if (water < 0) water = 0;
	let leachN = 0;
	let leachK = 0;
	if (drainage > 0) {
		const frac = drainage / (whc + drainage);
		leachN = pools.no3 * .62 * frac;
		pools.no3 -= leachN;
		leachK = pools.exchK * .08 * frac;
		pools.exchK -= leachK;
		pools.s = Math.max(0, pools.s - pools.s * .05 * frac);
	}
	for (const key of Object.keys(pools)) if (!Number.isFinite(pools[key]) || pools[key] < 0) pools[key] = 0;
	const fluxes = {
		mineralizationN: (minN + minInert) / h,
		nitrification: nit / h,
		denitrification: den / h,
		volatilization: vol / h,
		leachingN: leachN / h,
		fixation: fixedAmt / h,
		uptakeN: soilTaken / h,
		uptakeP: tookP / h,
		uptakeK: tookK / h,
		mineralizationP: minP / h
	};
	return {
		day: sim.day + h,
		development,
		shoot,
		econ,
		lai,
		rootFrac,
		water,
		pools,
		fluxes,
		stresses,
		limiter: limiterFrom(stresses),
		temperature: temp,
		rainToday: rain,
		parToday: par,
		doy,
		emerged,
		fixedN: sim.fixedN + fixedAmt,
		leachedN: sim.leachedN + leachN,
		denitrifiedN: sim.denitrifiedN + den,
		mineralizedN: sim.mineralizedN + minN + minInert
	};
}
function histPoint(sim) {
	return {
		day: Math.floor(sim.day),
		biomass: (sim.shoot + sim.econ) * 10,
		economic: sim.econ * 10
	};
}
function grow(sim, days, drivers, crop, site, history) {
	let s = sim;
	let left = Math.max(0, days);
	let last = Math.floor(s.day);
	const next = history.slice();
	while (left > 1e-8) {
		const h = Math.min(.5, left);
		s = step(s, h, drivers, crop, site);
		const f = Math.floor(s.day);
		if (f !== last && f > 0) {
			next.push(histPoint(s));
			if (next.length > 480) next.splice(0, next.length - 480);
			last = f;
		}
		left -= h;
	}
	return {
		sim: s,
		history: next
	};
}
var SPEEDS = [
	1,
	5,
	15,
	40,
	120
];
var STRAWISH = /* @__PURE__ */ new Set([
	"straw",
	"stover",
	"haulm",
	"stalk",
	"tops"
]);
var DEFAULT_DRIVERS = {
	plantDoy: 128,
	density: 250,
	vigor: 1,
	pests: .04,
	weeds: .08,
	mycorrhizae: .55,
	inoculation: .8,
	tempAnomaly: 0,
	rainMul: 1,
	irrigation: 0,
	radMul: 1,
	texture: "loam",
	compaction: .08,
	ph: 6.6,
	ec: .4,
	om: 3.2,
	residue: .35
};
var OPEN_DAYS = 58;
function toSim(s) {
	return {
		day: s.day,
		development: s.development,
		shoot: s.shoot,
		econ: s.econ,
		lai: s.lai,
		rootFrac: s.rootFrac,
		water: s.water,
		pools: s.pools,
		fluxes: s.fluxes,
		stresses: s.stresses,
		limiter: s.limiter,
		temperature: s.temperature,
		rainToday: s.rainToday,
		parToday: s.parToday,
		doy: s.doy,
		emerged: s.emerged,
		fixedN: s.fixedN,
		leachedN: s.leachedN,
		denitrifiedN: s.denitrifiedN,
		mineralizedN: s.mineralizedN
	};
}
function returnResidue(pools, shoot, nConc, pConc, kConc, frac) {
	const next = clonePools(pools);
	next.orgN += shoot * nConc * .55 * frac * 1e4;
	next.orgP += shoot * pConc * .6 * frac * 1e4;
	next.orgK += shoot * kConc * .75 * frac * 1e4;
	return next;
}
function mergeBank(bank, add) {
	const map = new Map(bank.map((item) => [item.key, { ...item }]));
	for (const item of add) {
		const prev = map.get(item.key);
		if (prev) prev.kg += item.kg;
		else map.set(item.key, { ...item });
	}
	return [...map.values()];
}
function resown(cropId, drivers, pools, siteId, areaM2, bank, note) {
	getCrop(cropId);
	return {
		...freshSim(drivers, pools, getSite(siteId)),
		cropId,
		siteId,
		areaM2,
		drivers,
		history: [],
		quality: 0,
		peakQuality: 0,
		stubble: false,
		running: true,
		bank,
		cuts: 0,
		note
	};
}
function opening() {
	const crop = getCrop("wheat");
	const site = getSite("ottawa");
	const drivers = {
		...DEFAULT_DRIVERS,
		density: crop.optDensity
	};
	const ran = grow(freshSim(drivers, clonePools(site.pools), site), OPEN_DAYS, drivers, crop, site, []);
	const quality = qualityOf(crop, ran.sim.development, ran.sim.shoot, ran.sim.econ);
	return {
		cropId: crop.id,
		siteId: site.id,
		areaM2: 1e4,
		drivers,
		...ran.sim,
		history: ran.history,
		quality,
		peakQuality: quality,
		stubble: false,
		running: true,
		speed: 15,
		bank: [],
		cuts: 0,
		lastHarvest: null,
		note: "A stand is already in the ground. Time runs until you pause it."
	};
}
function snapshot(s) {
	return {
		v: 1,
		cropId: s.cropId,
		siteId: s.siteId,
		areaM2: s.areaM2,
		drivers: s.drivers,
		sim: toSim(s),
		history: s.history,
		quality: s.quality,
		peakQuality: s.peakQuality,
		stubble: s.stubble,
		running: s.running,
		speed: s.speed,
		bank: s.bank,
		cuts: s.cuts,
		lastHarvest: s.lastHarvest
	};
}
var useAcre = create((set) => ({
	...opening(),
	advance: (days) => {
		if (days <= 0) return;
		set((s) => {
			if (s.stubble) return s;
			const crop = getCrop(s.cropId);
			const site = getSite(s.siteId);
			const ran = grow(toSim(s), days, s.drivers, crop, site, s.history);
			const quality = qualityOf(crop, ran.sim.development, ran.sim.shoot, ran.sim.econ);
			return {
				...ran.sim,
				history: ran.history,
				quality,
				peakQuality: Math.max(s.peakQuality, quality)
			};
		});
	},
	toggleRun: () => set((s) => ({ running: s.stubble ? false : !s.running })),
	setSpeed: (speed) => set((s) => ({
		speed,
		running: s.stubble ? false : speed > 0
	})),
	setCrop: (id) => set((s) => {
		if (s.cropId === id) return s;
		const crop = getCrop(id);
		return resown(id, {
			...s.drivers,
			density: crop.optDensity
		}, s.pools, s.siteId, s.areaM2, s.bank, `${crop.name} sown into the soil you left.`);
	}),
	setSite: (id) => set((s) => {
		if (s.siteId === id) return s;
		const site = getSite(id);
		const crop = getCrop(s.cropId);
		return {
			siteId: id,
			drivers: driversForSite(site, s.drivers, s.drivers.density || crop.optDensity),
			note: `${site.name}. Weather, pH and texture changed. The nutrient bank stayed.`
		};
	}),
	loadTypicalSoil: () => set((s) => {
		const site = getSite(s.siteId);
		return {
			pools: clonePools(site.pools),
			drivers: driversForSite(site, s.drivers, s.drivers.density),
			note: `Soil bank replaced with a typical ${site.name} profile.`
		};
	}),
	setArea: (areaM2) => set({ areaM2 }),
	setDriver: (key, value) => set((s) => ({ drivers: {
		...s.drivers,
		[key]: value
	} })),
	setPool: (key, value) => set((s) => ({ pools: {
		...s.pools,
		[key]: Math.max(0, value)
	} })),
	dress: (id) => set((s) => {
		const next = applyDressing(id, s.pools, s.drivers);
		return {
			pools: next.pools,
			drivers: next.drivers,
			note: "Dressing mixed into the live soil."
		};
	}),
	harvest: () => set((s) => {
		const crop = getCrop(s.cropId);
		const quality = qualityOf(crop, s.development, s.shoot, s.econ);
		if (quality < .08) return s;
		if (crop.perennial && s.shoot < .08) return s;
		if (!crop.perennial && s.econ < .012 && s.development < .8) return s;
		const additions = [];
		let headline = "";
		for (const product of crop.products) {
			let basis = product.basis === "econ" ? s.econ : s.shoot;
			if (STRAWISH.has(product.id)) basis *= 1 - s.drivers.residue;
			const kg = basis * product.fraction * quality * s.areaM2 / product.dryMatter;
			if (kg < .05) continue;
			additions.push({
				key: `${crop.id}:${product.id}`,
				crop: crop.name,
				label: product.label,
				constituent: product.constituent,
				kg
			});
			if (!headline && !product.constituent) headline = `${formatMass(kg)} ${product.label.toLowerCase()}`;
		}
		const frac = crop.perennial ? .08 : .12 + .75 * s.drivers.residue;
		const pools = returnResidue(s.pools, s.shoot, crop.nConc, crop.pConc, crop.kConc, frac);
		const bank = mergeBank(s.bank, additions);
		const lastHarvest = {
			day: Math.floor(s.day),
			quality,
			headline: headline || "a harvest"
		};
		if (crop.perennial) return {
			bank,
			pools,
			shoot: crop.seedBiomass,
			econ: 0,
			development: .12,
			emerged: true,
			lai: .2,
			quality: 0,
			peakQuality: 0,
			cuts: s.cuts + 1,
			lastHarvest,
			note: "Cut taken. The crown and nodules stayed in the ground."
		};
		return {
			bank,
			pools,
			stubble: true,
			running: false,
			shoot: Math.min(.045, s.shoot),
			econ: 0,
			quality,
			lastHarvest,
			note: "In the barn. What you returned as residue is back in the organic pools."
		};
	}),
	replant: (fresh) => set((s) => {
		const site = getSite(s.siteId);
		const crop = getCrop(s.cropId);
		const drivers = fresh ? driversForSite(site, {
			...DEFAULT_DRIVERS,
			plantDoy: s.drivers.plantDoy,
			density: crop.optDensity
		}, crop.optDensity) : s.drivers;
		const pools = fresh ? clonePools(site.pools) : s.pools;
		return {
			...resown(s.cropId, drivers, pools, s.siteId, s.areaM2, s.bank, fresh ? "Fresh soil for this ground." : "Resown into the soil you left."),
			speed: s.speed || 15,
			running: true,
			lastHarvest: s.lastHarvest
		};
	}),
	reset: () => set((s) => {
		const next = {
			...opening(),
			note: "Reset. Ottawa wheat on one hectare, typical soil, empty barn."
		};
		try {
			if (typeof localStorage !== "undefined") localStorage.setItem("acre-ledger-v1", JSON.stringify(snapshot({
				...s,
				...next
			})));
		} catch {}
		return next;
	}),
	clearBank: () => set({
		bank: [],
		note: "Barn ledger cleared."
	}),
	hydrate: (data) => set((s) => {
		if (!data || data.v !== 1 || !data.sim?.pools || !data.drivers) return s;
		const crop = getCrop(data.cropId);
		const site = getSite(data.siteId);
		if (!Number.isFinite(data.sim.day)) return s;
		return {
			...data.sim,
			cropId: crop.id,
			siteId: site.id,
			areaM2: Number.isFinite(data.areaM2) ? data.areaM2 : s.areaM2,
			drivers: {
				...DEFAULT_DRIVERS,
				...data.drivers
			},
			history: Array.isArray(data.history) ? data.history.slice(-480) : [],
			quality: data.quality ?? 0,
			peakQuality: data.peakQuality ?? 0,
			stubble: Boolean(data.stubble),
			running: Boolean(data.running) && !data.stubble,
			speed: data.speed || 15,
			bank: Array.isArray(data.bank) ? data.bank : [],
			cuts: data.cuts ?? 0,
			lastHarvest: data.lastHarvest ?? null,
			note: ""
		};
	})
}));
function SliderField({ label, value, min, max, step, display, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-baseline justify-between gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-fg",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-gold tabular-nums",
				children: display
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "acre-range",
			type: "range",
			min,
			max,
			step,
			value: Math.min(max, Math.max(min, value)),
			"aria-label": label,
			suppressHydrationWarning: true,
			onChange: (event) => onChange(Number(event.target.value))
		})]
	});
}
function Block({ title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm text-fg",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: hint
		}) : null] }), children]
	});
}
var TABS = [
	{
		id: "crop",
		label: "Crop",
		icon: Sprout
	},
	{
		id: "life",
		label: "Life",
		icon: Leaf
	},
	{
		id: "climate",
		label: "Climate",
		icon: CloudRain
	},
	{
		id: "soil",
		label: "Soil",
		icon: FlaskConical
	},
	{
		id: "pests",
		label: "Stress",
		icon: Bug
	}
];
var N_FIELDS = [
	{
		key: "no3",
		label: "Nitrate NO₃⁻",
		max: 180,
		step: 1
	},
	{
		key: "nh4",
		label: "Ammonium NH₄⁺",
		max: 120,
		step: 1
	},
	{
		key: "orgN",
		label: "Organic, mineralizable",
		max: 400,
		step: 1
	},
	{
		key: "inertN",
		label: "Inert humic N",
		max: 6e3,
		step: 10
	}
];
var P_FIELDS = [
	{
		key: "labileP",
		label: "Labile phosphate",
		max: 100,
		step: 1
	},
	{
		key: "orgP",
		label: "Organic P",
		max: 250,
		step: 1
	},
	{
		key: "inertP",
		label: "Occluded / rock P",
		max: 2e3,
		step: 5
	}
];
var K_FIELDS = [
	{
		key: "exchK",
		label: "Exchangeable K",
		max: 600,
		step: 1
	},
	{
		key: "orgK",
		label: "Organic K",
		max: 200,
		step: 1
	},
	{
		key: "fixedK",
		label: "Fixed clay K",
		max: 8e3,
		step: 10
	}
];
var MACRO_FIELDS = [
	{
		key: "ca",
		label: "Calcium",
		max: 4e3,
		step: 10
	},
	{
		key: "mg",
		label: "Magnesium",
		max: 800,
		step: 1
	},
	{
		key: "s",
		label: "Sulfur",
		max: 120,
		step: 1
	}
];
var MICRO_FIELDS = [
	{
		key: "fe",
		label: "Iron",
		max: 3e4,
		step: 50
	},
	{
		key: "mn",
		label: "Manganese",
		max: 8e3,
		step: 10
	},
	{
		key: "zn",
		label: "Zinc",
		max: 4e3,
		step: 10
	},
	{
		key: "cu",
		label: "Copper",
		max: 2e3,
		step: 5
	},
	{
		key: "b",
		label: "Boron",
		max: 1e3,
		step: 5
	},
	{
		key: "mo",
		label: "Molybdenum",
		max: 80,
		step: 1
	},
	{
		key: "cl",
		label: "Chloride",
		max: 6e4,
		step: 100
	}
];
var TEXTURES = [
	"sand",
	"loam",
	"silt",
	"clay",
	"peat"
];
function areaToSlider(m2) {
	const t = (Math.log(Math.max(10, m2)) - Math.log(10)) / (Math.log(65e4) - Math.log(10));
	return Math.round(Math.min(1, Math.max(0, t)) * 1e3) / 1e3;
}
function sliderToArea(t) {
	const m2 = Math.exp(Math.log(10) + t * (Math.log(65e4) - Math.log(10)));
	return Math.round(m2);
}
function Controls({ tab, setTab }) {
	const cropId = useAcre((s) => s.cropId);
	const siteId = useAcre((s) => s.siteId);
	const areaM2 = useAcre((s) => s.areaM2);
	const drivers = useAcre((s) => s.drivers);
	const pools = useAcre((s) => s.pools);
	const setCrop = useAcre((s) => s.setCrop);
	const setSite = useAcre((s) => s.setSite);
	const loadTypicalSoil = useAcre((s) => s.loadTypicalSoil);
	const setArea = useAcre((s) => s.setArea);
	const setDriver = useAcre((s) => s.setDriver);
	const setPool = useAcre((s) => s.setPool);
	const dress = useAcre((s) => s.dress);
	const crop = CROPS.find((item) => item.id === cropId) ?? CROPS[0];
	const driverNum = (key, value) => setDriver(key, value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 overflow-x-auto border-b border-line p-2",
			role: "tablist",
			children: TABS.map((item) => {
				const Icon = item.icon;
				const on = tab === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": on,
					onClick: () => setTab(item.id),
					className: "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm transition-transform duration-150 ease-out active:scale-[0.96] " + (on ? "bg-leaf text-bg" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
				}, item.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 p-4",
			children: [
				tab === "crop" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
						title: "Species",
						hint: "Choosing another crop resows into the same soil.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex w-max gap-2 pb-1",
								children: CROPS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setCrop(item.id),
									"aria-pressed": item.id === cropId,
									className: "h-14 min-w-28 shrink-0 rounded-md border px-3 text-left transition-transform duration-150 ease-out active:scale-[0.96] " + (item.id === cropId ? "border-leaf bg-raised text-fg" : "border-line text-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm text-fg",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs",
										children: [
											item.daysToMaturity,
											" d",
											item.maxFix > 1 ? " · N₂" : ""
										]
									})]
								}, item.id))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-fg italic",
									children: [crop.latin, "."]
								}),
								" ",
								crop.blurb
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
						title: "Ground",
						hint: "The site sets the weather. Typical soil is optional.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: SITES.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSite(site.id),
								"aria-pressed": site.id === siteId,
								className: "rounded-md border px-3 py-2 text-left transition-transform duration-150 ease-out active:scale-[0.96] " + (site.id === siteId ? "border-leaf bg-raised" : "border-line"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-fg",
									children: site.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-muted",
									children: [
										site.region,
										". ",
										site.note
									]
								})]
							}, site.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: loadTypicalSoil,
							className: "h-11 text-left text-sm text-gold",
							children: "Load this ground’s typical nutrient bank"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
						label: "Sowing date",
						min: 1,
						max: 365,
						step: 1,
						value: drivers.plantDoy,
						display: formatDoy(drivers.plantDoy),
						onChange: (value) => driverNum("plantDoy", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
						label: "Area",
						min: 0,
						max: 1,
						step: .001,
						value: areaToSlider(areaM2),
						display: formatArea(areaM2),
						onChange: (value) => setArea(sliderToArea(value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["Bed", 20],
							["Plot", 1e3],
							["Hectare", 1e4],
							["Field", 1e5],
							["65 ha", 65e4]
						].map(([label, m2]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setArea(Number(m2)),
							className: "h-10 rounded-md border border-line px-3 text-sm text-muted",
							children: label
						}, label))
					})
				] }),
				tab === "life" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
						title: "Stand",
						hint: "Density peaks at the crop’s optimum and falls off if you crowd it or sow thin.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Density",
							min: 0,
							max: Math.max(2, crop.optDensity * 2.5),
							step: crop.optDensity > 40 ? 1 : .1,
							value: drivers.density,
							display: `${drivers.density.toFixed(crop.optDensity > 40 ? 0 : 1)} /m²`,
							onChange: (value) => driverNum("density", value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Cultivar vigor",
							min: .5,
							max: 1.35,
							step: .01,
							value: drivers.vigor,
							display: `${Math.round(drivers.vigor * 100)}%`,
							onChange: (value) => driverNum("vigor", value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
						title: "Diazotrophy",
						hint: "Soy, pea and alfalfa fix meaningful N₂. Cereals only leak a little through free-living bacteria. High mineral N suppresses nodules. Molybdenum and a near-neutral pH let them work.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Inoculation",
							min: 0,
							max: 1,
							step: .01,
							value: drivers.inoculation,
							display: `${Math.round(drivers.inoculation * 100)}%`,
							onChange: (value) => driverNum("inoculation", value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Mycorrhizae",
							min: 0,
							max: 1,
							step: .01,
							value: drivers.mycorrhizae,
							display: `${Math.round(drivers.mycorrhizae * 100)}%`,
							onChange: (value) => driverNum("mycorrhizae", value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "Residue",
						hint: "Returned straw feeds organic N, P and K. Taken straw goes to the barn.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Residue returned",
							min: 0,
							max: 1,
							step: .01,
							value: drivers.residue,
							display: `${Math.round(drivers.residue * 100)}%`,
							onChange: (value) => driverNum("residue", value)
						})
					})
				] }),
				tab === "climate" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
					title: "Weather on this ground",
					hint: "Anomaly and multipliers sit on top of the site’s seasonal curve.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Temperature anomaly",
							min: -10,
							max: 10,
							step: .1,
							value: drivers.tempAnomaly,
							display: `${drivers.tempAnomaly.toFixed(1)} °C`,
							onChange: (value) => driverNum("tempAnomaly", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Rainfall",
							min: 0,
							max: 2.5,
							step: .05,
							value: drivers.rainMul,
							display: `${drivers.rainMul.toFixed(2)}×`,
							onChange: (value) => driverNum("rainMul", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Irrigation",
							min: 0,
							max: 15,
							step: .1,
							value: drivers.irrigation,
							display: `${drivers.irrigation.toFixed(1)} mm/d`,
							onChange: (value) => driverNum("irrigation", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Radiation",
							min: .35,
							max: 1.35,
							step: .01,
							value: drivers.radMul,
							display: `${Math.round(drivers.radMul * 100)}%`,
							onChange: (value) => driverNum("radMul", value)
						})
					]
				}) }),
				tab === "pests" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
					title: "Biotic and physical drag",
					hint: "Pests eat leaf. Weeds steal light and nitrogen. Compaction shortens roots.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Pest pressure",
							min: 0,
							max: 1,
							step: .01,
							value: drivers.pests,
							display: `${Math.round(drivers.pests * 100)}%`,
							onChange: (value) => driverNum("pests", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Weed pressure",
							min: 0,
							max: 1,
							step: .01,
							value: drivers.weeds,
							display: `${Math.round(drivers.weeds * 100)}%`,
							onChange: (value) => driverNum("weeds", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Compaction",
							min: 0,
							max: .75,
							step: .01,
							value: drivers.compaction,
							display: `${Math.round(drivers.compaction * 100)}%`,
							onChange: (value) => driverNum("compaction", value)
						})
					]
				}),
				tab === "soil" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "Dress the stand",
						hint: "These hit the live pools now. Urea lands as ammonium. Rock phosphate lands as inert P.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: DRESSINGS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => dress(item.id),
								className: "h-12 rounded-md border border-line px-3 text-left transition-transform duration-150 ease-out active:scale-[0.96]",
								title: item.detail,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-fg",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted",
									children: item.rate
								})]
							}, item.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
						title: "Reaction and holding",
						hint: `Water holding about ${Math.round(waterHolding(drivers.texture, drivers.compaction, drivers.om))} mm.`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: TEXTURES.map((texture) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDriver("texture", texture),
									"aria-pressed": drivers.texture === texture,
									className: "h-10 rounded-md border px-3 text-sm capitalize " + (drivers.texture === texture ? "border-leaf text-fg" : "border-line text-muted"),
									children: texture
								}, texture))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "pH",
								min: 4.2,
								max: 8.6,
								step: .05,
								value: drivers.ph,
								display: drivers.ph.toFixed(2),
								onChange: (value) => driverNum("ph", value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Salinity",
								min: 0,
								max: 8,
								step: .05,
								value: drivers.ec,
								display: `${drivers.ec.toFixed(2)} dS/m`,
								onChange: (value) => driverNum("ec", value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Organic matter",
								min: .4,
								max: 8,
								step: .1,
								value: drivers.om,
								display: `${drivers.om.toFixed(1)}%`,
								onChange: (value) => driverNum("om", value)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolGroup, {
						title: "Nitrogen speciation",
						hint: "Nitrate leaches. Ammonium volatilizes when alkaline. Organic mineralizes. Humic N barely moves this season.",
						fields: N_FIELDS,
						pools,
						setPool,
						unit: "kg/ha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolGroup, {
						title: "Phosphorus speciation",
						hint: "Plants take labile Pi. Low or high pH locks it into the occluded pool. Mycorrhizae help the labile fraction.",
						fields: P_FIELDS,
						pools,
						setPool,
						unit: "kg/ha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolGroup, {
						title: "Potassium speciation",
						hint: "Exchangeable K is what roots see. Fixed K in clay trickles out.",
						fields: K_FIELDS,
						pools,
						setPool,
						unit: "kg/ha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolGroup, {
						title: "Secondary macros",
						hint: "Kilograms per hectare of available nutrient.",
						fields: MACRO_FIELDS,
						pools,
						setPool,
						unit: "kg/ha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolGroup, {
						title: "Micronutrients",
						hint: "Grams per hectare. Molybdenum gates nitrogenase. Iron, zinc and manganese fade as pH rises.",
						fields: MICRO_FIELDS,
						pools,
						setPool,
						unit: "g/ha"
					})
				] })
			]
		})]
	});
}
function PoolGroup({ title, hint, fields, pools, setPool, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
		title,
		hint,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: field.label,
				min: 0,
				max: field.max,
				step: field.step,
				value: pools[field.key],
				display: `${Math.round(pools[field.key])} ${unit}`,
				onChange: (value) => setPool(field.key, value)
			}, field.key))
		})
	});
}
function pigment(sen) {
	const t = clamp(sen, 0, 1);
	return `rgb(${Math.round(143 + 81 * t)} ${Math.round(173 + -13 * t)} ${Math.round(85 + -16 * t)})`;
}
var PAPER = "rgb(239 232 214)";
var GOLD = "rgb(224 160 69)";
var SOIL = "rgb(42 34 24)";
var SOIL_TOP = "rgb(72 58 36)";
var SKY = "rgb(36 48 32)";
function Leaves({ h, lean, wilt, color, count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Array.from({ length: count }, (_, i) => {
		const t = (i + 1) / (count + 1);
		const y = -h * t;
		const x = lean * t;
		const side = i % 2 === 0 ? -1 : 1;
		const droop = 4 + wilt * 18;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M ${x} ${y} q ${side * 14} -8 ${side * (22 + i % 3 * 4)} ${droop}`,
			fill: "none",
			stroke: color,
			strokeWidth: 3.2,
			strokeLinecap: "round",
			strokeOpacity: .95
		}, i);
	}) });
}
function HeadShape({ head, h, lean, color, development, econFrac }) {
	if (development < .4 || head === "none") return null;
	const open = clamp((development - .4) / .35, 0, 1);
	const x = lean;
	const y = -h;
	if (head === "spike") {
		const len = 10 + open * 16;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${x} ${y})`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: -1.6,
				y: -len,
				width: 3.2,
				height: len,
				rx: 1,
				fill: color
			}), Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				y1: -2 - i * (len / 5),
				x2: i % 2 === 0 ? 7 : -7,
				y2: -8 - i * (len / 5),
				stroke: color,
				strokeWidth: 1
			}, i))]
		});
	}
	if (head === "panicle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: Array.from({ length: 7 }, (_, i) => {
			const side = i % 2 === 0 ? -1 : 1;
			const yy = -4 - i % 4 * 5 * open;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				y1: yy + 4,
				x2: side * (8 + i % 3 * 3),
				y2: yy,
				stroke: color,
				strokeWidth: 1.2
			}, i);
		})
	});
	if (head === "ear") {
		const ey = -h * .48;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: lean * .48 + 8,
				cy: ey,
				rx: 4,
				ry: 10 + open * 6,
				fill: color
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${lean} ${y} l 0 -10`,
				stroke: color,
				strokeWidth: 1.4
			}),
			development > .5 && Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: lean,
				y1: y - 2,
				x2: lean + (i - 1.5) * 4,
				y2: y - 12,
				stroke: PAPER,
				strokeOpacity: .7,
				strokeWidth: .8
			}, i))
		] });
	}
	if (head === "pod") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y + 16})`,
		children: Array.from({ length: 3 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: (i - 1) * 7,
			cy: 8 + i * 6,
			rx: 2.2,
			ry: 5 + open * 3,
			fill: color,
			transform: `rotate(${(i - 1) * 18} ${(i - 1) * 7} ${8 + i * 6})`
		}, i))
	});
	if (head === "disc") {
		const r = 7 + open * 6;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${x} ${y - r})`,
			children: [Array.from({ length: 10 }, (_, i) => {
				const a = i / 10 * Math.PI * 2;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: Math.cos(a) * (r - 2),
					y1: Math.sin(a) * (r - 2),
					x2: Math.cos(a) * (r + 6),
					y2: Math.sin(a) * (r + 6),
					stroke: GOLD,
					strokeWidth: 1.6,
					strokeOpacity: open
				}, i);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: r * .55,
				fill: color
			})]
		});
	}
	if (head === "raceme") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: i % 2 === 0 ? -3 : 3,
			cy: -i * 4 * open,
			r: 1.7,
			fill: i < 3 ? PAPER : color
		}, i))
	});
	if (head === "boll") {
		const openBoll = development > .9;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${lean * .6} ${-h * .55})`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: 5 + econFrac * 3,
				fill: openBoll ? PAPER : color
			}), openBoll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: 2,
				fill: GOLD
			})]
		});
	}
	return null;
}
function Roots({ rootFrac, shape, econFrac, nodules }) {
	const depth = 12 + rootFrac * 78;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M 0 0 C -10 ${depth * .4}, -16 ${depth * .75}, -6 ${depth}`,
			fill: "none",
			stroke: PAPER,
			strokeOpacity: .35,
			strokeWidth: 1.3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M 0 0 C 12 ${depth * .35}, 8 ${depth * .7}, 14 ${depth * .9}`,
			fill: "none",
			stroke: PAPER,
			strokeOpacity: .28,
			strokeWidth: 1.2
		}),
		shape === "tap" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M -4 6 L 0 ${18 + rootFrac * 36} L 4 6 Z`,
			fill: GOLD,
			fillOpacity: .35 + econFrac * .5
		}),
		shape === "globe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 0,
			cy: 16 + econFrac * 10,
			rx: 6 + econFrac * 10,
			ry: 8 + econFrac * 8,
			fill: GOLD,
			fillOpacity: .45 + econFrac * .4
		}),
		shape === "tuber" && [
			-10,
			4,
			14
		].map((cx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx,
			cy: 18 + i % 2 * 8,
			rx: 4 + econFrac * 8,
			ry: 3 + econFrac * 5,
			fill: GOLD,
			fillOpacity: .4 + econFrac * .45
		}, cx)),
		nodules && [
			8,
			16,
			26
		].map((cy) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: cy % 16 === 0 ? -6 : 7,
			cy: cy * rootFrac,
			r: 2.1,
			fill: pigment(0)
		}, cy))
	] });
}
function Plant({ x, scale, delay, props }) {
	const color = pigment(props.stubble ? 1 : props.senescence);
	const tall = props.form === "maize" || props.form === "sunflower";
	const short = props.form === "root";
	const base = props.stubble ? 26 : props.emerged ? 18 + props.heightFrac * scale * (tall ? 200 : short ? 72 : 156) : 0;
	const lean = props.wilt * 12 * (x % 2 === 0 ? 1 : -.4);
	const h = base;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		className: "sway",
		style: { animationDelay: delay },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${x} 268)`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roots, {
					rootFrac: props.rootFrac,
					shape: props.stubble ? "none" : props.rootShape,
					econFrac: props.econFrac,
					nodules: props.nodules && props.emerged && !props.stubble
				}),
				h > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: 0,
						y1: 0,
						x2: lean,
						y2: -h,
						stroke: color,
						strokeWidth: props.form === "maize" ? 3.4 : 2,
						strokeLinecap: "round"
					}),
					!props.stubble && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaves, {
						h,
						lean,
						wilt: props.wilt,
						color,
						count: props.form === "forage" ? 3 : short ? 4 : 4
					}),
					props.form === "forage" && !props.stubble && [-6, 6].map((dx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: dx,
						y1: 0,
						x2: dx + lean * .5,
						y2: -h * .85,
						stroke: color,
						strokeWidth: 1.3
					}, dx)),
					props.form === "brassica" && props.development < .32 && !props.stubble && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: `M 0 0 q -18 -6 -22 8 M 0 0 q 16 -10 24 6`,
						fill: "none",
						stroke: color,
						strokeWidth: 2.4
					}),
					!props.stubble && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadShape, {
						head: props.head,
						h,
						lean,
						color,
						development: props.development,
						econFrac: props.econFrac
					})
				] }),
				!props.emerged && !props.stubble && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: 0,
					cy: -2,
					rx: 2.2,
					ry: 1.3,
					fill: GOLD
				})
			]
		})
	});
}
function FieldView(props) {
	const sunY = 118 - clamp((props.temperature + 6) / 32, 0, 1) * 62;
	const sunX = 70 + props.doy % 365 / 365 * 520;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 720 420",
		className: "h-full w-full",
		role: "img",
		"aria-label": "Living crop stand",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "720",
				height: "268",
				fill: SKY
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: sunX,
				cy: sunY,
				r: 22,
				fill: GOLD,
				opacity: .85
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: 250,
				width: "720",
				height: "18",
				fill: "rgb(143 173 85)",
				opacity: .14
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: 268,
				width: "720",
				height: "152",
				fill: SOIL
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: 268,
				width: "720",
				height: "18",
				fill: SOIL_TOP
			}),
			props.saturation > .82 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: 274,
				width: "720",
				height: 10 + props.saturation * 8,
				fill: PAPER,
				opacity: .12
			}),
			Array.from({ length: 9 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 40 + i * 78,
				y1: 286,
				x2: 40 + i * 78,
				y2: 300,
				stroke: PAPER,
				strokeOpacity: .12
			}, i)),
			[
				70,
				150,
				230,
				310,
				400,
				490,
				570,
				650
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, {
				x,
				scale: .9 + i * 37 % 10 / 50,
				delay: `${i * .17}s`,
				props
			}, x)),
			props.temperature < 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "720",
				height: "420",
				fill: PAPER,
				opacity: .06
			})
		]
	});
}
var FLUXES = [
	{
		key: "fixation",
		label: "N₂ fixation"
	},
	{
		key: "mineralizationN",
		label: "N mineralized"
	},
	{
		key: "uptakeN",
		label: "N uptake"
	},
	{
		key: "nitrification",
		label: "Nitrification"
	},
	{
		key: "denitrification",
		label: "Denitrification"
	},
	{
		key: "leachingN",
		label: "NO₃⁻ leach"
	},
	{
		key: "volatilization",
		label: "NH₃ loss"
	},
	{
		key: "mineralizationP",
		label: "P mineralized"
	},
	{
		key: "uptakeP",
		label: "P uptake"
	},
	{
		key: "uptakeK",
		label: "K uptake"
	}
];
function harvestState(crop, development, shoot, econ, stubble, peak) {
	const quality = qualityOf(crop, development, shoot, econ);
	const declining = !stubble && peak > .72 && quality < peak - .06;
	const ready = !stubble && quality >= .08 && (crop.perennial ? shoot >= .08 : econ >= .012 || development >= .8);
	let label = crop.perennial ? "Cut hay" : "Harvest";
	if (stubble) label = "Replant";
	else if (ready) label = declining ? `${crop.perennial ? "Cut" : "Harvest"} · declining` : `${label} · ${Math.round(quality * 100)}%`;
	else if (development > 1.25) label = "Window missed";
	else label = "Not ready";
	return {
		quality,
		declining,
		ready,
		label
	};
}
function Ledger({ crop }) {
	const day = useAcre((s) => s.day);
	const shoot = useAcre((s) => s.shoot);
	const econ = useAcre((s) => s.econ);
	const stubble = useAcre((s) => s.stubble);
	const running = useAcre((s) => s.running);
	const speed = useAcre((s) => s.speed);
	const quality = useAcre((s) => s.quality);
	const peakQuality = useAcre((s) => s.peakQuality);
	const limiter = useAcre((s) => s.limiter);
	const doy = useAcre((s) => s.doy);
	const temperature = useAcre((s) => s.temperature);
	const water = useAcre((s) => s.water);
	const drivers = useAcre((s) => s.drivers);
	const fixedN = useAcre((s) => s.fixedN);
	const leachedN = useAcre((s) => s.leachedN);
	const denitrifiedN = useAcre((s) => s.denitrifiedN);
	const mineralizedN = useAcre((s) => s.mineralizedN);
	const fluxes = useAcre((s) => s.fluxes);
	const bank = useAcre((s) => s.bank);
	const cuts = useAcre((s) => s.cuts);
	const lastHarvest = useAcre((s) => s.lastHarvest);
	const note = useAcre((s) => s.note);
	const development = useAcre((s) => s.development);
	const toggleRun = useAcre((s) => s.toggleRun);
	const setSpeed = useAcre((s) => s.setSpeed);
	const harvest = useAcre((s) => s.harvest);
	const replant = useAcre((s) => s.replant);
	const clearBank = useAcre((s) => s.clearBank);
	const advance = useAcre((s) => s.advance);
	const time = ledgerTime(day);
	const action = harvestState(crop, development, shoot, econ, stubble, peakQuality);
	const whc = waterHolding(drivers.texture, drivers.compaction, drivers.om);
	const sat = whc > 0 ? water / whc : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted uppercase",
								children: "Stand age"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-5xl leading-none text-fg tabular-nums sm:text-6xl",
								children: time.day
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Day"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "grid grid-cols-3 gap-3 text-right",
							children: [
								["Week", time.week],
								["Month", time.month],
								["Year", time.year]
							].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs tracking-wide text-muted uppercase",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-display text-2xl text-gold tabular-nums",
								children: value
							})] }, String(label)))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-px bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px bg-gold transition-[width] duration-150",
							style: { width: `${time.frac * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							formatDoy(doy),
							" · ",
							temperature.toFixed(1),
							"°C · ",
							paceLabel(running ? speed : 0),
							crop.perennial ? ` · ${cuts} cut${cuts === 1 ? "" : "s"}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleRun,
								disabled: stubble,
								className: "inline-flex h-11 items-center gap-2 rounded-md border border-line bg-raised px-3 text-sm text-fg transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40",
								children: [running && !stubble ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), running && !stubble ? "Pause" : "Run"]
							}),
							SPEEDS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSpeed(value),
								"aria-pressed": speed === value && running,
								className: "h-11 rounded-md px-3 text-sm tabular-nums transition-transform duration-150 ease-out active:scale-[0.96] " + (speed === value && running ? "bg-gold text-bg" : "border border-line bg-raised text-fg"),
								children: [value, "×"]
							}, value)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => advance(7),
								disabled: stubble,
								className: "h-11 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40",
								children: "+7 d"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => advance(30),
								disabled: stubble,
								className: "h-11 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40",
								children: "+30 d"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "1× is one day every 10 seconds. Higher speeds only compress the clock."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					["Biomass", `${tHa(shoot + econ)} t/ha`],
					[crop.perennial ? "Canopy" : "Economic", `${tHa(crop.perennial ? shoot : econ)} t/ha`],
					["Quality", `${Math.round(quality * 100)}%`],
					["Water", `${Math.round(sat * 100)}%`]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-line bg-bg px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-fg tabular-nums",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Limited by ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold",
						children: limiter
					}),
					action.declining ? " · past the peak, mass is leaving the stand" : ""
				]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden gap-2 lg:flex",
				children: stubble ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => replant(false),
					className: "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-gold text-bg transition-transform duration-150 ease-out active:scale-[0.96]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-4" }), "Replant"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => replant(true),
					className: "h-12 rounded-md border border-line px-4 text-sm text-fg",
					children: "Fresh soil"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !action.ready,
					onClick: harvest,
					className: "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gold text-bg transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "size-4" }), action.label]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max gap-2 pb-1",
					children: FLUXES.map((flux) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-28 shrink-0 rounded-md border border-line bg-bg px-2.5 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: flux.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-lg text-fg tabular-nums",
							children: [formatFlux(fluxes[flux.key]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs text-muted",
								children: "kg"
							})]
						})]
					}, flux.key))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Fluxes are kg/ha/day. N from air ",
					fixedN.toFixed(0),
					" · mineralized ",
					mineralizedN.toFixed(0),
					" · leached ",
					leachedN.toFixed(0),
					" · denitrified ",
					denitrifiedN.toFixed(0)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg",
							children: "Barn ledger"
						}), bank.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clearBank,
							className: "text-sm text-muted",
							children: "Clear"
						})]
					}),
					lastHarvest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Last, day ",
							lastHarvest.day,
							": ",
							lastHarvest.headline,
							" at ",
							Math.round(lastHarvest.quality * 100),
							"% quality"
						]
					}),
					bank.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Nothing in the barn yet. Take it on the peak, or wait and lose it to shatter and respiration."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-1",
						children: bank.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: item.constituent ? "pl-4 text-muted" : "text-fg",
								children: [
									item.constituent ? "of which " : "",
									item.crop,
									" · ",
									item.label
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-gold tabular-nums",
								children: formatMass(item.kg)
							})]
						}, item.key))
					})
				]
			})
		]
	});
}
function Tip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-display tabular-nums",
			children: ["Day ", label]
		}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tabular-nums text-muted",
			children: [
				p.name,
				" ",
				Number(p.value ?? 0).toFixed(2)
			]
		}, String(p.name)))]
	});
}
function TrendChart({ history, perennial }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg text-fg",
				children: "Stand curve"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: perennial ? "Canopy dry matter" : "Dry matter, tonnes per hectare"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-36",
			children: !ready || history.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "flex h-full items-center text-sm text-muted",
				children: "The curve starts as the first days close."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
					data: history,
					margin: {
						top: 8,
						right: 8,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "day",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							},
							axisLine: { stroke: "var(--color-line)" },
							tickLine: false,
							minTickGap: 24
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false,
							width: 32
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "biomass",
							name: "Biomass",
							stroke: "var(--color-leaf)",
							strokeWidth: 2,
							dot: false,
							isAnimationActive: false
						}),
						!perennial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "economic",
							name: "Economic",
							stroke: "var(--color-gold)",
							strokeWidth: 2,
							dot: false,
							isAnimationActive: false
						})
					]
				})
			})
		})]
	});
}
var STORAGE = "acre-ledger-v1";
function AcreApp() {
	const [tab, setTab] = (0, import_react.useState)("crop");
	(0, import_react.useEffect)(() => {
		let frame = 0;
		let last = performance.now();
		let acc = 0;
		let pending = 0;
		const loop = (now) => {
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			const live = useAcre.getState();
			if (live.running && live.speed > 0 && !live.stubble) pending += dt * (live.speed / 10);
			acc += dt;
			if (acc >= .1) {
				acc = 0;
				if (pending > 0) {
					const stepDays = pending;
					pending = 0;
					useAcre.getState().advance(stepDays);
				}
			}
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE);
			if (!raw) return;
			const data = JSON.parse(raw);
			if (data && data.v === 1) useAcre.getState().hydrate(data);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		let timer = 0;
		const unsub = useAcre.subscribe((state) => {
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				try {
					localStorage.setItem(STORAGE, JSON.stringify(snapshot(state)));
				} catch {}
			}, 500);
		});
		return () => {
			unsub();
			window.clearTimeout(timer);
		};
	}, []);
	const cropId = useAcre((s) => s.cropId);
	const siteId = useAcre((s) => s.siteId);
	const development = useAcre((s) => s.development);
	const shoot = useAcre((s) => s.shoot);
	const econ = useAcre((s) => s.econ);
	const rootFrac = useAcre((s) => s.rootFrac);
	const emerged = useAcre((s) => s.emerged);
	const stubble = useAcre((s) => s.stubble);
	const doy = useAcre((s) => s.doy);
	const temperature = useAcre((s) => s.temperature);
	const water = useAcre((s) => s.water);
	const stresses = useAcre((s) => s.stresses);
	const drivers = useAcre((s) => s.drivers);
	const history = useAcre((s) => s.history);
	const peakQuality = useAcre((s) => s.peakQuality);
	const harvest = useAcre((s) => s.harvest);
	const replant = useAcre((s) => s.replant);
	const reset = useAcre((s) => s.reset);
	const crop = getCrop(cropId);
	const site = getSite(siteId);
	const action = harvestState(crop, development, shoot, econ, stubble, peakQuality);
	const whc = waterHolding(drivers.texture, drivers.compaction, drivers.om);
	const veg = crop.perennial ? clamp(shoot / Math.max(.08, crop.maxShoot), 0, 1) : clamp(1 - Math.exp(-3.3 * Math.max(0, development - .05) / .6), 0, 1);
	const heightFrac = emerged ? veg * (.72 + .28 * clamp(stresses.water, 0, 1)) : 0;
	const sen = crop.perennial ? clamp((development - 1) / .45, 0, 1) : clamp((development - .9) / .38, 0, 1);
	const heightCm = (stubble ? .08 : heightFrac) * crop.maxHeightCm;
	const rootCm = rootFrac * crop.maxRootCm;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh overflow-x-clip bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-end justify-between gap-3 px-4 py-4 lg:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Biogeochemical stand"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-balance text-fg sm:text-4xl",
					children: "Acre Ledger"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-col items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-40 text-right text-sm text-pretty text-muted sm:max-w-56",
						children: site.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: reset,
						className: "inline-flex h-10 items-center gap-1.5 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out active:scale-[0.96]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-4 px-3 pb-28 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)] lg:px-6 lg:pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-w-0 content-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-lg border border-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-3 z-10 flex flex-col justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-fg",
										children: crop.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted italic",
										children: crop.latin
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-right text-muted",
										children: [stageName(crop, development, stubble), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-0.5 block text-xs tabular-nums",
											children: [
												Math.round(heightCm),
												" cm · roots ",
												Math.round(rootCm),
												" cm"
											]
										})]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-72 sm:h-96",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldView, {
									form: crop.form,
									head: crop.head,
									rootShape: crop.rootShape,
									heightFrac,
									senescence: sen,
									development,
									econFrac: clamp(econ / .85, 0, 1),
									rootFrac,
									nodules: crop.maxFix > 1 && drivers.inoculation > .35,
									wilt: clamp(1 - stresses.water, 0, 1),
									stubble,
									emerged,
									saturation: whc > 0 ? water / whc : 0,
									temperature,
									doy
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ledger, { crop }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
							history,
							perennial: crop.perennial
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 lg:sticky lg:top-3 lg:max-h-[calc(100dvh-1.5rem)] lg:overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, {
						tab,
						setTab
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface p-3 lg:hidden",
				children: stubble ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => replant(false),
						className: "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-gold text-bg active:scale-[0.96]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-4" }), "Replant"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => replant(true),
						className: "h-12 rounded-md border border-line px-3 text-sm text-fg",
						children: "Fresh soil"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !action.ready,
					onClick: harvest,
					className: "mx-auto flex h-12 w-full max-w-6xl items-center justify-center gap-2 rounded-md bg-gold text-bg active:scale-[0.96] disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "size-4" }), action.label]
				})
			})
		]
	});
}
var SplitComponent = AcreApp;
//#endregion
export { SplitComponent as component };
