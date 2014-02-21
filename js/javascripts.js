var APPFOLDER = 'controlhouse/';
function getBaseURL(){
	var baseURL = location.protocol + "//" + location.hostname + "/" + APPFOLDER;
	return baseURL;
}
$(document).on('pagehide', function (e) {
    var page = $(e.target);
    if (!$.mobile.page.prototype.options.domCache
        && (!page.attr('data-dom-cache')
            || page.attr('data-dom-cache') == "false")
        ) {
        page.remove();
    }
});

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

var cr_status = 1;
function altera_controle() {
	if (cr_status == 1) {
		cr_status = 2;
		$(".cr-botao .cr-botao-texto-1").addClass("cr-botao-texto-inativo");
		$(".cr-botao .cr-botao-texto-1").removeClass("cr-botao-texto-ativo");
		$(".cr-botao .cr-botao-texto-2").addClass("cr-botao-texto-ativo");
		$(".cr-botao .cr-botao-texto-2").removeClass("cr-botao-texto-inativo");
	} else {
		cr_status = 1;
		$(".cr-botao .cr-botao-texto-1").addClass("cr-botao-texto-ativo");
		$(".cr-botao .cr-botao-texto-1").removeClass("cr-botao-texto-inativo");
		$(".cr-botao .cr-botao-texto-2").addClass("cr-botao-texto-inativo");
		$(".cr-botao .cr-botao-texto-2").removeClass("cr-botao-texto-ativo");		
	}
}

$(document).on('tap click', '.registros .opRegistro', function(event) {
	var id_registro = $(this).data('ch-id');
	$('#id_registro').val(id_registro);
	$('.opRegistroEditar').attr('data-ch-id', id_registro);
	$('.opRegistroExcluir').attr('data-ch-id', id_registro);
	$(".popupOpRegistro").popup("open", {positionTo : event.target});
	event.preventDefault();
	return false;
});

$(document).on('tap click', '.registros .opRegistroComando', function(event) {
	var n = $(this).data('ch-n');
	$('.opRegistroEditarComando').attr('data-ch-n', n);
	$('.opRegistroExcluirComando').attr('data-ch-n', n);
	$(".popupOpRegistro").popup("open", {positionTo : event.target});
	event.preventDefault();
	return false;
});

$(document).on('tap click', '.opRegistroEditar', function(event) {
	var id_registro = $(this).attr('data-ch-id');
	var v = $('#formulario_registro').val();
	if (v == 'ambiente')
	{
		var url = getBaseURL() + 'ambiente/editar/' + id_registro;
	} else if (v == 'dispositivo')
	{
		var url = getBaseURL() + 'dispositivo/editar/' + id_registro;
	} else if (v == 'comando')
	{
		var url = getBaseURL() + 'comando/editar/' + id_registro;
	} else if (v == 'cenario')
	{
		var url = getBaseURL() + 'cenario/editar/' + id_registro;
	} else if (v == 'usuario')
	{
		var url = getBaseURL() + 'usuario/editar/' + id_registro;
	}
	$.mobile.changePage(url, {transition: "slide"});
	event.preventDefault();
	return false;
});

$(document).on('tap click', '.opRegistroExcluir', function(event) {
	var id_registro = $(this).attr('data-ch-id');
	event.preventDefault();
	return false;
});

$(document).on('tap click', '.opRegistroEditarComando', function(event) {
	var n = $(this).attr('data-ch-n');
	var data = $('li[data-ch-n=' + n + '] :input').serializeArray();
	alert(data);
	jQuery.each( data, function( i, field ) {
		alert(i + ' --- ' + field.value);
      $( "#results" ).append( field.value + " " );
    });
	$('#form_comando #comando').val(data.comando);
	event.preventDefault();
	return false;
});

$(document).on('tap click', '.opRegistroExcluirComando', function(event) {
	var n = $(this).attr('data-ch-n');
	event.preventDefault();
	return false;
});

var taphold = false;

$(document).on('taphold', '.registros li', function(event) {
	taphold = true;
	$(".popupOpRegistro").popup("open", {positionTo : event.target});
	setTimeout(function(){
		taphold = false;
	},3000);
	event.preventDefault();
	return false;
});

$(document).on('click', '.ch-botao', function() {
	if (!taphold) {
		var id_comando		= $(this).data('ch-id');
		var id_dispositivo	= $(this).data('ch-id-dispositivo');
		var valor			= $(this).data('ch-valor');
		executar_comando(id_comando, id_dispositivo, valor);
		event.preventDefault();
		return false;
	}
});

$(document).on('slidestop', '.ch-chave-selecao', function() {
	var id_comando		= $("option:selected", this).data('ch-id');
	var id_dispositivo	= $("option:selected", this).data('ch-id-dispositivo');
	var valor			= $("option:selected", this).val();
	executar_comando(id_comando, id_dispositivo, valor);
	event.preventDefault();
	return false;
});

$(document).on('slidestop', '.ch-slider', function() {
	var id_dispositivo	= $(this).data('ch-id-dispositivo');
	var valor			= $(this).val();
	var el = '#sel2slider-' + $(this).attr('id');
	$(el).val(valor);
	var op = el + ' option:selected';
	var id_comando = $(op).text();
	executar_comando(id_comando, id_dispositivo, valor);
	event.preventDefault();
	return false;
});

$(document).on('click', '.ch-lista', function() {
	var id_comando		= $(this).data('ch-id');
	var id_dispositivo	= $(this).data('ch-id-dispositivo');
	var valor			= $(this).data('ch-valor');
	executar_comando(id_comando, id_dispositivo, valor);
	event.preventDefault();
	return false;
});

function executar_comando(id_comando, id_dispositivo, valor) {
	var url = getBaseURL() + "comando/executar";
	$.post(url, {
		id_comando		: id_comando,
		id_dispositivo	: id_dispositivo,
		valor			: valor
	}, function(resultado) {
		resultado = jQuery.parseJSON(resultado);
		toast(resultado.mensagem);
	});
}

$(document).on('click', '#btn_barra_novo', function() {
	var id_pagina = $.mobile.activePage.attr('id');
	var el = '#' + id_pagina + ' #formulario_registro';
	var v = $(el).val();
	if (v == 'ambiente')
	{
		var url = getBaseURL() + "ambiente/novo";
		$.mobile.changePage(url, {transition: "slide"});
	} else if (v == 'dispositivo')
	{
		var el = '#' + id_pagina + ' #id_ambiente';
		var id = $(el).val();
		var url = getBaseURL() + "dispositivo/novo/" + id;
		$.mobile.changePage(url, {transition: "slide"});
	}
	else if (v == 'comando')
	{
		var el = '#' + id_pagina + ' #id_dispositivo';
		var id = $(el).val();
		var url = getBaseURL() + "comando/novo/" + id;
		$.mobile.changePage(url, {transition: "slide"});
	}
	else if (v == 'cenario')
	{
		var url = getBaseURL() + "cenario/novo/";
		$.mobile.changePage(url, {transition: "slide"});
	}
	else if (v == 'usuario')
	{
		var url = getBaseURL() + "usuario/novo/";
		$.mobile.changePage(url, {transition: "slide"});
	}
});

$(document).on('change', '#form_comando #id_tipo', function() {
	event.preventDefault();
	var valor = $(this).val();
	$('#formulario_comando #id_tipo').val(valor);
});

$(document).on('change', '#form_comando #id_formato', function() {
	event.preventDefault();
	var valor = $(this).val();
	$('#formulario_comando #id_formato').val(valor);
});

$(document).on('change', '#form_comando #codificacao', function() {
	event.preventDefault();
	var valor = $(this).val();
	$('#formulario_comando #codificacao').val(valor);
});

$(document).on('click', '#btn_ad_comando', function() {
	event.preventDefault();
	var data = $("#form_comando").serializeJSON();
	var str = "";
	$.each(data, function(key, val) {
		str = str + '<input type="hidden" name="' + key + '[]" id="' + key + '[]" value="' + val + '" />';
	});
	$("#lista_comandos").append('<li><a href="#">' + data.descricao + '</a><a href="#" class="opRegistro" data-ch-id=""></a>'+ str +'</li>');
	$("#lista_comandos").listview("refresh");
});

$(document).on('click', '.cancelar_registro', function() {
	var id_pagina = $.mobile.activePage.attr('id');
	var el = '#' + id_pagina + ' .formulario_registro';
	var v = $(el).data('ch-status');
	if (v == 0) {
		$(el).trigger('expand');
		$(el).data('ch-status', '1');
	} else {
		$(el).trigger('collapse');
		$(el).data('ch-status', '0');
	}
	event.preventDefault();
});

$(document).on('click', '.salvar_registro', function() {
	event.preventDefault();
	var id_pagina = $.mobile.activePage.attr('id');
	var el = '#' + id_pagina + ' form.form_registro';
	var dados = $(el).serialize();
	var formulario = $(el).attr('id');
	dados = dados + '&formulario=' + formulario;
	if (formulario == 'form_ambiente') {
		acao = getBaseURL() + 'ambiente/salvar';
		url_volta = getBaseURL() + 'ambiente/lista';
	} else if (formulario == 'form_dispositivo') {
		acao = getBaseURL() + 'dispositivo/salvar';
		url_volta = getBaseURL() + 'dispositivo/lista';
	} else if (formulario == 'formulario_comando') {
		acao = getBaseURL() + 'comando/salvar';
		url_volta = getBaseURL() + 'comando/lista';
	} else if (formulario == 'form_cenario') {
		acao = getBaseURL() + 'cenario/salvar';
		url_volta = getBaseURL() + 'cenario/lista';
	} else if (formulario == 'form_usuario') {
		acao = getBaseURL() + 'usuario/salvar';
		url_volta = getBaseURL() + 'usuario/lista';
	}
	$.post(acao, dados, function(resultado) {
		alert(resultado);
		resultado = jQuery.parseJSON(resultado);
		toast(resultado.mensagem);
		$.mobile.back();
		//$.mobile.changePage('../ambiente/lista', {
		//	reloadPage : true
		//});
	});
});

$( document ).on( "pageinit", "#usuario_login", function() {
	$("#form_login").submit(function(event) {
		var login	= $("#login").val();
		var senha	= $("#senha").val();
		var dados = {
			"login" : login,
			"senha" : senha
		};
		$.post("usuario/login", dados, function(resultado) {
			resultado = jQuery.parseJSON(resultado);
			if (resultado.status == "ok") {
				$(location).attr('href','inicio');
				//$.mobile.changePage("http://localhost/controlhouse/inicio", {transition: "flip"});
			} else {
				alert(resultado.mensagem);
			}
		});
		event.preventDefault();
	});
});