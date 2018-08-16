var util = require('../../../utils/MyUtil');
module.exports = {
	
	process : function(ctx, step, next) {
		var options = [];
		for(var i = 0; i < step.options.length; i++) {
			var option = step.options[i];
			if(typeof option == 'string') {
				var opt = {};
				opt.text = option;
				options.push(opt);
			}
			else {
				options.push(option);
			}
		}
		util.showOptionDialog(options, {doneResult:function(result, selectedOption) {
			ctx.vars[step.result] = result;
			if(step.selectedId) {
				if(selectedOption && selectedOption.id) {
					ctx.vars[step.selectedId] = selectedOption.id;
				}
				else {
					var none = 'none';
					if(step.none) {
						none = step.none;
					}
					ctx.vars[step.selectedId] = none;
				}
			}
			setTimeout(next, global.STEP_TIMEOUT);
		}});
	}
}