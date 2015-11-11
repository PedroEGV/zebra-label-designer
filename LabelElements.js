/* Conversion vars (inches, mm, dots and pt) */
var mmpi = 25.4;
var dpi = 203;
var ptpmm = 2.834645669;
var dpmm = dpi / mmpi;

function mm2dots(mm) {
	return Math.round(mm * dpmm);
}

function pt2dots(pt) {
	return mm2dots(pt / ptpmm);
}

/* Label elements */
var defaultElement = {
	title : "New element",
	target : "labelElement_",
	text : "New element",
	"font-size" : {
		measure : 11,
		unit : "pt"
	},
	left : {
		measure : 5,
		unit : "mm"
	},
	top : {
		measure : 5,
		unit : "mm"
	}
};
var labelElements = [];
var label = {
	height : {
		measure : 50,
		unit : "mm"
	},
	width : {
		measure : 50,
		unit : "mm"
	},
	left : {
		measure : 0,
		unit : "mm"
	},
	top : {
		measure : 0,
		unit : "mm"
	},
	elements : labelElements
};

function addElement() {
	return addElement(defaultElement["title"]);
}

function addElement(title) {
	var element = JSON.parse(JSON.stringify(defaultElement));
	var length = labelElements.length;
	element["target"] += length;
	element["title"] = title;
	labelElements[length] = element;
	return element;
}

function getElement(target) {
	for (var i = 0; i < labelElements.length; i++) {
		if (labelElements[i].target == target) {
			return labelElements[i];
		}
	}
}

function editElement(target, property, subproperty, value) {
	var element = getElement(target);
	if (subproperty == "") {
		element[property] = value;
	} else {
		element[property][subproperty] = value;
	}
	return element;
}