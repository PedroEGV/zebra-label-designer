function updateFields(target) {
	var element = getElement(target);
	$(".elementMeasure").each(function() {
		var property = $(this).attr("id");
		$(this).val(element[property]["measure"]);
	});
	$("#elementText").val(element["text"]);
}
function addToSelect(element) {
	var $option = $("<option>");
	var target = element["target"]
	$option.val(target);
	$option.text(element["title"]);
	$("#target").append($option);
	$("#target").val(target);
}
function addToLabel(element) {
	var $div = $("<div>");
	var fontSize = element["font-size"]["measure"]
			+ element["font-size"]["unit"];
	var x = element["left"]["measure"] + element["left"]["unit"];
	var y = element["top"]["measure"] + element["top"]["unit"];
	$div.attr("class", "labelElement");
	$div.text(element["text"]);
	$div.attr("id", element["target"]);
	$div.css({
		"font-size" : fontSize,
		"left" : x,
		"top" : y
	});
	$("#labelHome").append($div);
}
function updateZPL() {
	var newLine = "\n";
	var coma = ",";
	var zpl = "^XA" + newLine;
	zpl += "^LH" + mm2dots(label["left"]["measure"]) + coma
			+ mm2dots(label["top"]["measure"]) + newLine;
	zpl += "^LL" + mm2dots(label["height"]["measure"]) + newLine;
	zpl += "^PW" + mm2dots(label["width"]["measure"]) + newLine;
	zpl += "^MUd" + newLine;
	for (var i = 0; i < label["elements"].length; i++) {
		var element = label["elements"][i];
		zpl += "^FO" + mm2dots(element["left"]["measure"]) + coma
				+ mm2dots(element["left"]["measure"]);
		zpl += "^A0N" + coma + pt2dots(element["font-size"]["measure"]) + coma;
		zpl += "^CI28";
		zpl += "^FD" + element["text"] + "^FS" + newLine;
	}
	zpl += "^XZ" + newLine;
	$("#zplArea").val(zpl);
}
function init() {
	$("input[type=number]").attr("step", "1");
	$(".labelMeasure").each(function() {
		var property = $(this).attr("property");
		var value = label[property];
		$(this).val(value["measure"]);
		$("#label").css(property, value["measure"] + value["unit"]);
	});
	$(".labelHomeMeasure").each(function() {
		var property = $(this).attr("property");
		var value = label[property];
		$(this).val(value["measure"]);
		$("#labelHome").css(property, value["measure"] + value["unit"]);
	});
	for (var i = 0; i < label["elements"].length; i++) {
		var element = label["elements"][i];
		addToSelect(element);
		addToLabel(element);
	}
	if (label["elements"].length > 0) {
		updateFields($("#target").val());
	}
	updateZPL();
}
$(document).ready(
		function() {
			init();
			$(".labelMeasure").change(function() {
				var property = $(this).attr("property");
				var value = $(this).val();
				var unit = label[property]["unit"];
				$("#label").css(property, value + unit);
				label[property]["measure"] = value;
				updateZPL();
			});
			$(".labelHomeMeasure").change(function() {
				var property = $(this).attr("property");
				var value = $(this).val();
				var unit = label[property]["unit"];
				$("#labelHome").css(property, value + unit);
				label[property]["measure"] = value;
				updateZPL();
			});
			$("#target").change(function() {
				var target = $(this).val();
				updateFields(target);
			});
			$("#elementText").change(function() {
				var target = $("#target").val();
				var value = $(this).val();
				$("#" + target).text(value);
				editElement(target, "text", value);
				updateZPL();
			});
			$(".elementMeasure").change(
					function() {
						var target = $("#target").val();
						var property = $(this).attr("id");
						var value = $(this).val();
						editElement(target, property, value);
						$("#" + target).css(property,
								value + getElement(target)[property]["unit"]);
						updateZPL();
					});
			$("#saveElement").click(function() {
				var title = $("#elementTitle").val();
				var element = addElement(title);
				var target = element["target"];
				addToSelect(element);
				addToLabel(element);
				updateFields(target);
				updateZPL();
				$("#elementTitle").val("");
				$("#elementText").focus();
			});
		});
