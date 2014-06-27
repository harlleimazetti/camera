/////// DESENHO INÍCIO

$(document).on('click', '#novo_item_desenho', function()
{
	var n = $('.item_desenho').length;
	var id = 'item_desenho' + n;
	$('#desenho_container').append('<div class="item_desenho" id="' + id + '"></div>');
	inicializa_desenho();
});

$(document).on('tap', '.item_desenho', function()
{
	$('#desenho_categorias').hide('fast');
	$('#desenho_parametros').show('fast');
	var id = $(this).attr('id');
	sessionStorage.el_desenho = '#' + id;
	inicializa_desenho();
});

function inicializa_desenho() {
	$(function() {
    	$(".knob.rotate").knob({
			change : function (value) {
				DoRotate(sessionStorage.el_desenho, value);
			}
		});
	});
	$(function() {
    	$(".knob.scale").knob({
			change : function (value) {
				DoScale(sessionStorage.el_desenho, value);
			}
		});
	});
	//var elem = document.querySelector('#drag_element');
	Draggabilly.prototype.positionDrag = Draggabilly.prototype.setLeftTop;
	var items = document.querySelectorAll('.item_desenho');
	for ( var i = 0, len = items.length; i < len; i++ ) {
		var item = items[i];
		var draggie = new Draggabilly(item, { containment: '#desenho_container', grid: [20,20] } );
	}
	//var draggie = new Draggabilly( document.querySelector('.item_desenho') );
	//var draggie = new Draggabilly( elem, {
		//options...
		//containment: '#desenho_container'
	//});	
}

$(document).on('pagebeforeshow', '#desenho', function()
{
	inicializa_desenho();
});

function DoRotate(el, d) {
	$(el).css({ rotate: d + 'deg' });
}

function DoScale(el, v) {
	v = v / 100;
	$(el).css({ scale: v });
}

///////// DESENHO FIM