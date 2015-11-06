/* Conversion vars (inches, mm, dots and pt) */
var mmpi = 25.4;
var dpi = 203;
var ptpmm = 2.83464567;
var dpmm = dpi / dpmm;

/* Label elements */
var labelElements = [];
var defaultElement = {title: "New element", target: "labelElement_", text: "New element", fontSize: "12", x: "5", y: "5"};

function addElement() {
	var element = defaultElement;
	var length = labelElements.length;
	element.target += length;
	labelElements[length] = element;
}

function getElement(target) {
	for (var i = 0; i < labelElements.length; i++) {
		if (labelElement[i].target == target) {
			return labelElements[i];
		}
	}
}

function editElement(target, property, value) {
	var element = getElement(target);
	element[property] = value;
}