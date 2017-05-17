
var vkInited = 0
var current_id = 0
var APIVersion = '5.64'

var settings = {
	dialogs : [],
	count : 200,
	offset : 0,
	max_count : 0
}

if (!window.console) { //old IE fix
	var console = {
		log : function(){},
		warn : function(){},
		error : function(){},
		time : function(){},
		timeEnd : function(){}
	}
}

function getDialogs() {
	if (vkInited) {
		VK.api('messages.getDialogs', 
			{count: settings.count, offset: settings.offset, version: APIVersion}, 
			function(data) {
				console.log(data, data.response)
				
			})
	}
}
