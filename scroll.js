/*! scroll-normalise 0.0.1 (2016-02-04) | Blake Kus - https://github.com/kus/scroll-normalise | Free to use under terms of MIT license */

(function (root, factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.ScrollHandler = factory();
	}
}(this, function () {
	"use strict";

	return function (options) {
		"use strict";

		options = typeof options === 'undefined' ? {} : options;

		var prevTime = new Date().getTime();
		var scrollHistory = [];
		var lastDirection = 0;
		var tailLength = 7;
		var historyToKeep = 28;
		var scrollThreshold = 250;

		function getAverage (arr) {
			var sum = 0, j = 0; 
			for (var i = 0; i < arr.length, isFinite(arr[i]); i++) { 
				sum += parseFloat(arr[i]); ++j;
			} 
			return j ? sum / j : 0; 
		};

		return function (e) {
			"use strict";
			
			if (options.onOriginalEvent) {
				options.onOriginalEvent.call(this, e);
			}
			var curTime = new Date().getTime();
			var delta = e.wheelDelta || -e.deltaY || -e.detail;
			var dir = Math.max(-1, Math.min(1, delta));
			var timeDiff = curTime - prevTime;
			prevTime = curTime;

			if (timeDiff > scrollThreshold) {
				// Reset
				scrollHistory = [];
				lastDirection = 0;
			}

			if(scrollHistory.length > historyToKeep){
				scrollHistory.shift();
			}

			scrollHistory.push(Math.abs(delta));

			var averageTail = getAverage(scrollHistory.slice(tailLength * -1));
			var average = getAverage(scrollHistory);
			var isAccelerating = averageTail >= average;

			if(isAccelerating){
				if (dir < 0) {
					// Down
					if (lastDirection !== 1) {
						lastDirection = 1;
						if (options.onScroll) {
							options.onScroll.call(this, e, 1);
						}
					}
				}else {
					// Up
					if (lastDirection !== -1) {
						lastDirection = -1;
						if (options.onScroll) {
							options.onScroll.call(this, e, -1);
						}
					}
				}
			} else {
				lastDirection = 0;
			}
		};
	};
}));