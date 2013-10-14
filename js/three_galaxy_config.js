/**
 * Global Settings for this JS Client
 */
//SERVER_URL = "localhost:8080";
//SERVER_CTX = "openlayers/jaxrs/startribes/";
SERVER_URL = "http://danny.klarblick.org";
SERVER_CTX = "galciv_3d/";
SERVER = SERVER_URL + "/" + SERVER_CTX + "/";

var GALAXY_STARS = {
	"starSystem" : [{
		"id" : "1",
		"posX" : "48",
		"posY" : "73",
		"planets" : [{
			"angle" : "99",
			"id" : "1",
			"size" : "2",
			"type" : "M"
		}, {
			"angle" : "328",
			"id" : "2",
			"size" : "5",
			"type" : "O"
		}]
	}, {
		"id" : "2",
		"posX" : "-70",
		"posY" : "26",
		"planets" : {
			"angle" : "223",
			"id" : "1",
			"size" : "3",
			"type" : "K"
		}
	}, {
		"id" : "3",
		"posX" : "23",
		"posY" : "95",
		"planets" : [{
			"angle" : "204",
			"id" : "1",
			"size" : "1",
			"type" : "L"
		}, {
			"angle" : "104",
			"id" : "2",
			"size" : "1",
			"type" : "N"
		}, {
			"angle" : "307",
			"id" : "3",
			"size" : "4",
			"type" : "N"
		}]
	}, {
		"id" : "4",
		"posX" : "29",
		"posY" : "-45",
		"planets" : [{
			"angle" : "204",
			"id" : "1",
			"size" : "4",
			"type" : "H"
		}, {
			"angle" : "266",
			"id" : "2",
			"size" : "3",
			"type" : "K"
		}, {
			"angle" : "309",
			"id" : "3",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "359",
			"id" : "4",
			"size" : "5",
			"type" : "P"
		}]
	}, {
		"id" : "5",
		"posX" : "54",
		"posY" : "20",
		"planets" : [{
			"angle" : "171",
			"id" : "1",
			"size" : "3",
			"type" : "O"
		}, {
			"angle" : "199",
			"id" : "2",
			"size" : "1",
			"type" : "M"
		}]
	}, {
		"id" : "6",
		"posX" : "-8",
		"posY" : "-54",
		"planets" : {
			"angle" : "109",
			"id" : "1",
			"size" : "5",
			"type" : "O"
		}
	}, {
		"id" : "7",
		"posX" : "62",
		"posY" : "0",
		"planets" : [{
			"angle" : "235",
			"id" : "1",
			"size" : "3",
			"type" : "P"
		}, {
			"angle" : "52",
			"id" : "2",
			"size" : "5",
			"type" : "K"
		}, {
			"angle" : "301",
			"id" : "3",
			"size" : "3",
			"type" : "P"
		}, {
			"angle" : "340",
			"id" : "4",
			"size" : "5",
			"type" : "H"
		}]
	}, {
		"id" : "8",
		"posX" : "-85",
		"posY" : "-55",
		"planets" : [{
			"angle" : "226",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "145",
			"id" : "2",
			"size" : "1",
			"type" : "O"
		}, {
			"angle" : "335",
			"id" : "3",
			"size" : "4",
			"type" : "M"
		}, {
			"angle" : "166",
			"id" : "4",
			"size" : "4",
			"type" : "L"
		}]
	}, {
		"id" : "9",
		"posX" : "-35",
		"posY" : "-63",
		"planets" : [{
			"angle" : "217",
			"id" : "1",
			"size" : "5",
			"type" : "M"
		}, {
			"angle" : "211",
			"id" : "2",
			"size" : "1",
			"type" : "L"
		}, {
			"angle" : "286",
			"id" : "3",
			"size" : "1",
			"type" : "P"
		}]
	}, {
		"id" : "10",
		"posX" : "48",
		"posY" : "74",
		"planets" : [{
			"angle" : "48",
			"id" : "1",
			"size" : "1",
			"type" : "N"
		}, {
			"angle" : "137",
			"id" : "2",
			"size" : "1",
			"type" : "K"
		}]
	}, {
		"id" : "11",
		"posX" : "77",
		"posY" : "34"
	}, {
		"id" : "12",
		"posX" : "99",
		"posY" : "75"
	}, {
		"id" : "13",
		"posX" : "91",
		"posY" : "18"
	}, {
		"id" : "14",
		"posX" : "24",
		"posY" : "-10",
		"planets" : {
			"angle" : "57",
			"id" : "1",
			"size" : "4",
			"type" : "H"
		}
	}, {
		"id" : "15",
		"posX" : "58",
		"posY" : "61",
		"planets" : [{
			"angle" : "260",
			"id" : "1",
			"size" : "1",
			"type" : "H"
		}, {
			"angle" : "216",
			"id" : "2",
			"size" : "2",
			"type" : "M"
		}, {
			"angle" : "171",
			"id" : "3",
			"size" : "5",
			"type" : "J"
		}]
	}, {
		"id" : "16",
		"posX" : "-63",
		"posY" : "43",
		"planets" : [{
			"angle" : "299",
			"id" : "1",
			"size" : "4",
			"type" : "K"
		}, {
			"angle" : "240",
			"id" : "2",
			"size" : "4",
			"type" : "L"
		}, {
			"angle" : "149",
			"id" : "3",
			"size" : "3",
			"type" : "P"
		}, {
			"angle" : "326",
			"id" : "4",
			"size" : "2",
			"type" : "L"
		}]
	}, {
		"id" : "17",
		"posX" : "-37",
		"posY" : "30",
		"planets" : [{
			"angle" : "351",
			"id" : "1",
			"size" : "1",
			"type" : "M"
		}, {
			"angle" : "354",
			"id" : "2",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "72",
			"id" : "3",
			"size" : "5",
			"type" : "K"
		}]
	}, {
		"id" : "18",
		"posX" : "4",
		"posY" : "19"
	}, {
		"id" : "19",
		"posX" : "46",
		"posY" : "-32",
		"planets" : {
			"angle" : "286",
			"id" : "1",
			"size" : "5",
			"type" : "H"
		}
	}, {
		"id" : "20",
		"posX" : "-70",
		"posY" : "88",
		"planets" : [{
			"angle" : "67",
			"id" : "1",
			"size" : "4",
			"type" : "N"
		}, {
			"angle" : "135",
			"id" : "2",
			"size" : "1",
			"type" : "M"
		}, {
			"angle" : "60",
			"id" : "3",
			"size" : "3",
			"type" : "L"
		}, {
			"angle" : "342",
			"id" : "4",
			"size" : "4",
			"type" : "N"
		}]
	}, {
		"id" : "21",
		"posX" : "5",
		"posY" : "-72",
		"planets" : [{
			"angle" : "242",
			"id" : "1",
			"size" : "1",
			"type" : "K"
		}, {
			"angle" : "184",
			"id" : "2",
			"size" : "4",
			"type" : "L"
		}]
	}, {
		"id" : "22",
		"posX" : "7",
		"posY" : "50",
		"planets" : [{
			"angle" : "253",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "23",
			"id" : "2",
			"size" : "1",
			"type" : "O"
		}, {
			"angle" : "44",
			"id" : "3",
			"size" : "2",
			"type" : "L"
		}, {
			"angle" : "245",
			"id" : "4",
			"size" : "5",
			"type" : "J"
		}]
	}, {
		"id" : "23",
		"posX" : "-86",
		"posY" : "-76",
		"planets" : {
			"angle" : "166",
			"id" : "1",
			"size" : "4",
			"type" : "L"
		}
	}, {
		"id" : "24",
		"posX" : "-30",
		"posY" : "7",
		"planets" : [{
			"angle" : "241",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "2",
			"id" : "2",
			"size" : "2",
			"type" : "M"
		}, {
			"angle" : "209",
			"id" : "3",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "70",
			"id" : "4",
			"size" : "5",
			"type" : "J"
		}]
	}, {
		"id" : "25",
		"posX" : "7",
		"posY" : "88",
		"planets" : [{
			"angle" : "39",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "303",
			"id" : "2",
			"size" : "1",
			"type" : "K"
		}]
	}, {
		"id" : "26",
		"posX" : "84",
		"posY" : "-90",
		"planets" : {
			"angle" : "300",
			"id" : "1",
			"size" : "4",
			"type" : "M"
		}
	}, {
		"id" : "27",
		"posX" : "-28",
		"posY" : "-4",
		"planets" : [{
			"angle" : "64",
			"id" : "1",
			"size" : "5",
			"type" : "K"
		}, {
			"angle" : "250",
			"id" : "2",
			"size" : "4",
			"type" : "P"
		}, {
			"angle" : "218",
			"id" : "3",
			"size" : "5",
			"type" : "J"
		}]
	}, {
		"id" : "28",
		"posX" : "89",
		"posY" : "93",
		"planets" : {
			"angle" : "106",
			"id" : "1",
			"size" : "4",
			"type" : "M"
		}
	}, {
		"id" : "29",
		"posX" : "-20",
		"posY" : "-51",
		"planets" : [{
			"angle" : "218",
			"id" : "1",
			"size" : "5",
			"type" : "M"
		}, {
			"angle" : "25",
			"id" : "2",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "351",
			"id" : "3",
			"size" : "4",
			"type" : "K"
		}, {
			"angle" : "311",
			"id" : "4",
			"size" : "5",
			"type" : "P"
		}]
	}, {
		"id" : "30",
		"posX" : "-90",
		"posY" : "49",
		"planets" : [{
			"angle" : "225",
			"id" : "1",
			"size" : "3",
			"type" : "H"
		}, {
			"angle" : "191",
			"id" : "2",
			"size" : "5",
			"type" : "M"
		}, {
			"angle" : "6",
			"id" : "3",
			"size" : "4",
			"type" : "O"
		}]
	}, {
		"id" : "31",
		"posX" : "-16",
		"posY" : "54",
		"planets" : [{
			"angle" : "129",
			"id" : "1",
			"size" : "2",
			"type" : "L"
		}, {
			"angle" : "189",
			"id" : "2",
			"size" : "2",
			"type" : "L"
		}, {
			"angle" : "251",
			"id" : "3",
			"size" : "4",
			"type" : "K"
		}]
	}, {
		"id" : "32",
		"posX" : "-15",
		"posY" : "43",
		"planets" : {
			"angle" : "257",
			"id" : "1",
			"size" : "3",
			"type" : "O"
		}
	}, {
		"id" : "33",
		"posX" : "-58",
		"posY" : "-54",
		"planets" : {
			"angle" : "157",
			"id" : "1",
			"size" : "2",
			"type" : "H"
		}
	}, {
		"id" : "34",
		"posX" : "25",
		"posY" : "60",
		"planets" : {
			"angle" : "198",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}
	}, {
		"id" : "35",
		"posX" : "-69",
		"posY" : "56",
		"planets" : [{
			"angle" : "161",
			"id" : "1",
			"size" : "3",
			"type" : "H"
		}, {
			"angle" : "9",
			"id" : "2",
			"size" : "5",
			"type" : "H"
		}, {
			"angle" : "208",
			"id" : "3",
			"size" : "1",
			"type" : "P"
		}, {
			"angle" : "323",
			"id" : "4",
			"size" : "2",
			"type" : "N"
		}]
	}, {
		"id" : "36",
		"posX" : "-27",
		"posY" : "60",
		"planets" : [{
			"angle" : "168",
			"id" : "1",
			"size" : "5",
			"type" : "H"
		}, {
			"angle" : "93",
			"id" : "2",
			"size" : "3",
			"type" : "O"
		}, {
			"angle" : "251",
			"id" : "3",
			"size" : "1",
			"type" : "M"
		}]
	}, {
		"id" : "37",
		"posX" : "15",
		"posY" : "-51"
	}, {
		"id" : "38",
		"posX" : "3",
		"posY" : "-82",
		"planets" : [{
			"angle" : "215",
			"id" : "1",
			"size" : "4",
			"type" : "H"
		}, {
			"angle" : "105",
			"id" : "2",
			"size" : "4",
			"type" : "P"
		}, {
			"angle" : "284",
			"id" : "3",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "15",
			"id" : "4",
			"size" : "5",
			"type" : "O"
		}]
	}, {
		"id" : "39",
		"posX" : "84",
		"posY" : "-57",
		"planets" : [{
			"angle" : "33",
			"id" : "1",
			"size" : "2",
			"type" : "M"
		}, {
			"angle" : "147",
			"id" : "2",
			"size" : "2",
			"type" : "O"
		}]
	}, {
		"id" : "40",
		"posX" : "91",
		"posY" : "-4"
	}, {
		"id" : "41",
		"posX" : "19",
		"posY" : "-43",
		"planets" : [{
			"angle" : "222",
			"id" : "1",
			"size" : "1",
			"type" : "H"
		}, {
			"angle" : "170",
			"id" : "2",
			"size" : "3",
			"type" : "M"
		}, {
			"angle" : "153",
			"id" : "3",
			"size" : "4",
			"type" : "N"
		}, {
			"angle" : "1",
			"id" : "4",
			"size" : "4",
			"type" : "L"
		}]
	}, {
		"id" : "42",
		"posX" : "-43",
		"posY" : "96",
		"planets" : [{
			"angle" : "113",
			"id" : "1",
			"size" : "4",
			"type" : "L"
		}, {
			"angle" : "210",
			"id" : "2",
			"size" : "2",
			"type" : "P"
		}, {
			"angle" : "302",
			"id" : "3",
			"size" : "3",
			"type" : "K"
		}, {
			"angle" : "63",
			"id" : "4",
			"size" : "5",
			"type" : "N"
		}]
	}, {
		"id" : "43",
		"posX" : "35",
		"posY" : "-59",
		"planets" : [{
			"angle" : "89",
			"id" : "1",
			"size" : "2",
			"type" : "M"
		}, {
			"angle" : "19",
			"id" : "2",
			"size" : "4",
			"type" : "O"
		}, {
			"angle" : "294",
			"id" : "3",
			"size" : "3",
			"type" : "O"
		}]
	}, {
		"id" : "44",
		"posX" : "-61",
		"posY" : "79",
		"planets" : [{
			"angle" : "234",
			"id" : "1",
			"size" : "2",
			"type" : "P"
		}, {
			"angle" : "349",
			"id" : "2",
			"size" : "2",
			"type" : "H"
		}, {
			"angle" : "332",
			"id" : "3",
			"size" : "3",
			"type" : "N"
		}]
	}, {
		"id" : "45",
		"posX" : "65",
		"posY" : "56",
		"planets" : [{
			"angle" : "178",
			"id" : "1",
			"size" : "1",
			"type" : "M"
		}, {
			"angle" : "188",
			"id" : "2",
			"size" : "2",
			"type" : "L"
		}, {
			"angle" : "351",
			"id" : "3",
			"size" : "3",
			"type" : "L"
		}]
	}, {
		"id" : "46",
		"posX" : "-45",
		"posY" : "51",
		"planets" : [{
			"angle" : "48",
			"id" : "1",
			"size" : "1",
			"type" : "P"
		}, {
			"angle" : "148",
			"id" : "2",
			"size" : "5",
			"type" : "M"
		}, {
			"angle" : "133",
			"id" : "3",
			"size" : "5",
			"type" : "H"
		}, {
			"angle" : "117",
			"id" : "4",
			"size" : "1",
			"type" : "N"
		}]
	}, {
		"id" : "47",
		"posX" : "34",
		"posY" : "7",
		"planets" : {
			"angle" : "20",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}
	}, {
		"id" : "48",
		"posX" : "48",
		"posY" : "27"
	}, {
		"id" : "49",
		"posX" : "97",
		"posY" : "-85",
		"planets" : [{
			"angle" : "331",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "274",
			"id" : "2",
			"size" : "1",
			"type" : "H"
		}]
	}, {
		"id" : "50",
		"posX" : "-79",
		"posY" : "22",
		"planets" : [{
			"angle" : "197",
			"id" : "1",
			"size" : "5",
			"type" : "J"
		}, {
			"angle" : "124",
			"id" : "2",
			"size" : "5",
			"type" : "H"
		}, {
			"angle" : "355",
			"id" : "3",
			"size" : "2",
			"type" : "N"
		}]
	}]
};