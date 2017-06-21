
function getNumber(className, mask) {
	var reg = '(\\d|\\.)*';
	var numbMask = /(\d|\.)+/g;
	var regMask = mask + '--' + '(' + reg + ')';
	regMask = new RegExp(regMask, "g");
	var arr = className.match(regMask);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = parseFloat(arr[i].match(numbMask));
	}
	return arr;
}
function Adaptive(listOfFunctions) {
	var breakpoints = listOfFunctions.breakpoints;
	var curMode, initMode;
	var lastBreakpointIndex = breakpoints.length - 1;
	var lastListOfFunctionsIndex = breakpoints.length;

	function autoscale() {
		var items = document.getElementsByClassName('autoscale');
		for (var i = 0; i < items.length; i++) {
			items[i].proportions = getNumber(items[i].className, 'autoscale');
			items[i].Rescale = function() {
				var proportion = this.proportions[initMode];
					if (proportion > 0) {
						var width = this.getBoundingClientRect().width;
						var height = width / proportion;
						this.style.height = height + 'px';
					}
					else {
						this.style.removeProperty('height');
					}
			}
		}
		items.__proto__.rescaleAll = function() {
			for (var i = 0; i < this.length; i++) {
				if (this[i].Rescale) 
					this[i].Rescale();
			}
		}
	}
	autoscale();
	function functionsExecute(functions) {
		if (functions) {

			for (var i = 0; i < functions.length; i++) {
				functions[i]();
			}

		}
	} 

		var width = window.innerWidth;
		if ( width >= breakpoints[0] ) {
			initMode = 0;
			functionsExecute(listOfFunctions['mode' + 0]);
			functionsExecute(listOfFunctions['mode' + 0 + 'once']);
		}
		else if ( width < breakpoints[lastBreakpointIndex]) {
			initMode = lastBreakpointIndex + 1;
			functionsExecute(listOfFunctions['mode' + lastListOfFunctionsIndex]);
			functionsExecute(listOfFunctions['mode' + lastListOfFunctionsIndex + 'once']);
		}
		else {
			for (var i = 0; i < lastBreakpointIndex; i++) {
				if (width < breakpoints[i] && width >= breakpoints[i + 1]) {
					initMode = i + 1;
					functionsExecute(listOfFunctions['mode' + (i + 1)]);
					functionsExecute(listOfFunctions['mode' + (i + 1) + 'once']);
				}
			}
		}
		functionsExecute(listOfFunctions['default']);
	window.onresize = function() {
		width = window.innerWidth;
		if ( width >= breakpoints[0] ) {
			curMode = 0;
			functionsExecute(listOfFunctions['mode' + 0]);
		}
		else if (width < breakpoints[lastBreakpointIndex]) {
			curMode = lastBreakpointIndex + 1;
			functionsExecute(listOfFunctions['mode' + lastListOfFunctionsIndex]);
		}
		else {
			for (var i = 0; i < lastBreakpointIndex; i++) {
				if ( width < breakpoints[i] && width >= breakpoints[i + 1]) {
					curMode = i + 1;
					functionsExecute(listOfFunctions['mode' + (i + 1)]);
				}
			}
		}

		if ( curMode != initMode ) {
			initMode = curMode;
			functionsExecute(listOfFunctions['mode' + initMode + 'once']);
		}

	}
}
