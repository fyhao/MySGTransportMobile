module.exports = {
	
	process : function(ctx, step, next) {
		if(typeof step.end != 'undefined') {
			processLoop(ctx, step, next);
		}
		else if(typeof step.array != 'undefined') {
			processArray(ctx, step, next);
		}
		else {
			setTimeout(next, 1);
		}
	}
}

var processLoop = function(ctx, step, next) {
	var start = 0;
	if(typeof step.start != 'undefined') start = parseInt(step.start);
	var end = parseInt(step.end);
	var _step = 1;
	if(typeof step.step != 'undefined') _step = parseInt(step.step);
	var i = start; // for start
	var checkNext = function() {
		if(i < end) { // for end condition
			ctx.createFlowEngine(step.flow).execute(function() {
				i += _step; // for step
				setTimeout(checkNext, 1);
			});
		}
		else {
			setTimeout(next, 1);
		}
	}
	setTimeout(checkNext, 1);
}

var processArray = function(ctx, step, next) {
	var array = ctx.vars[step.array];
	if(array && array.length) {
		var itemName = typeof step.item !== 'undefined' ? step.item : 'item';
		var i = 0;
		var checkNext = function() {
			if(i < array.length) {
				ctx.vars[itemName] = array[i];
				ctx.createFlowEngine(step.flow).execute(function(outputVars) {
					i++;
					setTimeout(checkNext, 1);
				});
			}
			else {
				setTimeout(next, 1);
			}
		}
		setTimeout(checkNext, 1);
	}
	else {
		setTimeout(next, 1);
	}
}