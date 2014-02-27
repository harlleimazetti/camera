function formata_data (data)
{
	d = data.substring(8,10);
	m = data.substring(5,7);
	a = data.substring(0,4);
	nova_data = d + '/' + m + '/' + a;
	return nova_data;
}

function formata_data_db (data)
{
	d = data.substring(0,2);
	m = data.substring(3,5);
	a = data.substring(6,10);
	nova_data = a + '/' + m + '/' + d;
	return nova_data;
}

function data_por_extenso (data)
{
	
}

var toast=function(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h4>"+msg+"</h4></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 3000 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}
 
$.fn.serializeJSON = function(){
	var json = {}
	var form = $(this);
	form.find('input, select').each(function(){
		var val
		if (!this.name) return;
			if ('radio' === this.type) {
				if (json[this.name]) { return; }
				json[this.name] = this.checked ? this.value : '';
			} else if ('checkbox' === this.type) {
				val = json[this.name];
			if (!this.checked) {
				if (!val) { json[this.name] = ''; }
			} else {
				json[this.name] = 
				typeof val === 'string' ? [val, this.value] :
				$.isArray(val) ? $.merge(val, [this.value]) :
				this.value;
        	}
		} else {
        	json[this.name] = this.value;
		}
	})
	return json;
}