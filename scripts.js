var ptPerMM = 2.83464567;
var dotsPerMM = 8;
function dots2mm(dots) {
	return dots * dotsPerMM;
}
function updateFields(target) {
	var text = $(target).text();
	var fontSize = parseFloat($(target).css("font-size"));
	var top = parseFloat($(target).css("top"));
	var left = parseFloat($(target).css("left"));
	$("#text").val(text);
	$("#font-size").val(fontSize);
	$("#top").val(top);
	$("#left").val(left);
}
function updateZPL() {
	var newLine = "\n";
	var zpl = "^XA" + newLine;
	zpl += "^LL" + $(".labelMeasureInput[property='height']").val()
			+ newLine;
	zpl += "^PW" + $(".labelMeasureInput[property='width']").val()
			+ newLine;
	zpl += "^LH" + $(".generalMeasureInput[property='left']").val() + ","
			+ $(".generalMeasureInput[property='top']").val() + newLine;
	zpl += "^MUd" + newLine;
	$(".labelElement").each(
			function() {
				zpl += "^FO" + parseFloat($(this).css("left")) + ","
						+ parseFloat($(this).css("top")) + ",^A0N,"
						+ parseFloat($(this).css("font-size"))
						+ ",^CI28^FD" + $(this).text() + "^FS" + newLine;
			});
	zpl += "^XZ" + newLine;
	$("#zplArea").val(zpl);
}
function init() {
	alert(dots2mm(25.4));
	$("input[type=number]").attr("step", "1");
	$(".labelMeasureInput").each(function() {
		var property = $(this).attr("property");
		var newValue = parseFloat($("#label").css(property));
		$(this).val(newValue);
		$("#labelHome").css(property, newValue + "px");
	});
	$(".generalMeasureInput").each(function() {
		var property = $(this).attr("property");
		var newValue = parseFloat($("#labelHome").css(property));
		$(this).val(newValue);
	});
	$("#target option").each(function() {
		var target = $(this).val();
		updateFields(target);
	});
	updateZPL();
}
$(document).ready(function() {
	init();
	$(".labelMeasureInput").change(function() {
		var property = $(this).attr("property");
		var newValue = parseFloat($(this).val()) + "px";
		$("#labelHome").css(property, newValue);
		$("#label").css(property, newValue);
		updateZPL();
	});
	$(".generalMeasureInput").change(function() {
		var property = $(this).attr("property");
		var newValue = $(this).val() + "px";
		$("#labelHome").css(property, newValue);
		updateZPL();
	});
	$(".textInput").change(function() {
		var target = $("#target").val();
		var newText = $(this).val();
		$(target).text(newText);
		updateZPL();
	});
	$(".measureInput").change(function() {
		var target = $("#target").val();
		var property = $(this).attr("id");
		var newValue = $(this).val() + "px";
		$(target).css(property, newValue);
		updateZPL();
	});
	$("#target").change(function() {
		var target = $(this).val();
		updateFields(target);
	});
});

