function get(id) {
	return document.getElementById(id) || document.getElementsByClassName(id);
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle(attr);
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}