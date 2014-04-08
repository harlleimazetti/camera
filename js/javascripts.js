document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true;
	$.support.cors = true;
	//sincronizar();
}

$(document).on('click', '#scan', function()
{
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	scanner.scan( function (result)
	{
		try
		{
			var ev = jQuery.parseJSON(result.text);
			$('#evidencia_form #numero_lacre').val(ev.numero_lacre);
			$('#evidencia_form #nome_perito').val(ev.nome_perito);
			$('#evidencia_form #unidade').val(ev.unidade);
		}
		catch(e)
		{
			var campo = '#' + sessionStorage.campo_foco;
			$(campo).val(result.text);
		}
		/*alert("We got a barcode\n" +
		"Result: " + result.text + "\n" +
		"Format: " + result.format + "\n" +
		"Cancelled: " + result.cancelled);*/
	}, function (error) { 
		console.log("Scanning failed: ", error); 
	});
});

$(document).on('click', '#capturar_coordenadas', function(event)
{
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);
});

var onGPSSuccess = function(position) {
	var coordenadas = position.coords.latitude + ', ' + position.coords.longitude;
	$('#coordenadas', $.mobile.activePage).val(coordenadas);
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
};

// onError Callback receives a PositionError object
//
function onGPSError(error) {
    toast('Erro: ' + error.code + ', Descrição: ' + error.message);
}

/////// EVIDÊNCIAS INÍCIO

$(document).on('pageshow', '#enquete_lista', function()
{
	var output = '';
	$('#lista_enquete').empty();
	get_all_enquete(function(enquete) {
		for (var i = 0; i < enquete.length; i++)
		{
			output += '<li id="' + enquete[i].id + '" data-id="' + enquete[i].id + '"><a href="#"><h2>' + enquete[i].nome_perito + '</h2><p><strong>' + evidencia[i].data + ', ' + evidencia[i].hora + '</strong></p><p>' + evidencia[i].obs + '</p><p class="ui-li-aside"><strong>' + evidencia[i].numero_lacre + '</strong></p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_enquete').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_enquete li', function()
{
	enquete_id = $(this).data('id');
	sessionStorage.enquete_id = enquete_id;
	$.mobile.changePage( "#enquete_resposta", {transition : 'none'} );
});

$(document).on('click', '#lista_enquete li .excluir', function()
{
	$el = $(this).closest('li');
	enquete_id = $el.data('id');
	sessionStorage.enquete_id = enquete_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_enquete(enquete_id, function(resultado) {
			$($el).remove();
		});
	}
	$('#lista_enquete').listview('refresh');
	event.preventDefault();
	return false;	
});

$(document).on('pagebeforeshow', '#enquete_resposta', function()
{
	if (operacao_bd == 'editar')
	{
		var enquete_id = sessionStorage.enquete_id;
		get_enquete(enquete_id, function(enquete) {
			$('#evidencia_form #operacao_bd').val(operacao_bd);
			$('#evidencia_form #id').val(evidencia.id);
			$('#evidencia_form #evidencia_tipo_id').val(evidencia.evidencia_tipo_id).selectmenu('refresh');
			$('#evidencia_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto').html(evidencia.numero_ordem);
			$('#evidencia_form #numero_ordem').val(evidencia.numero_ordem);
			$('#evidencia_form #data').val(evidencia.data);
			$('#evidencia_form #hora').val(evidencia.hora);
			$('#evidencia_form #numero_lacre').val(evidencia.numero_lacre);
			$('#evidencia_form #nome_perito').val(evidencia.nome_perito);
			$('#evidencia_form #coordenadas').val(evidencia.coordenadas);
			$('#evidencia_form #unidade').val(evidencia.unidade);
			$('#evidencia_form #obs').val(evidencia.obs);
			$('#evidencia_form #imagem_uri').val(evidencia.imagem_uri);
			$('#evidencia_form #visualizacao_imagem').attr('src', evidencia.imagem_uri);
		});
	} else {
		var evidencia_id = sessionStorage.evidencia_id;
		get_no_evidencia(sessionStorage.re_id, function(numero_ordem) {
			$('#evidencia_form #operacao_bd').val(operacao_bd);
			$('#evidencia_form #id').val(evidencia_id);
			$('#evidencia_form #evidencia_tipo_id').val('').selectmenu('refresh');
			$('#evidencia_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto').html(numero_ordem);
			$('#evidencia_form #numero_ordem').val(numero_ordem);
			$('#evidencia_form #data').val('');
			$('#evidencia_form #hora').val('');
			$('#evidencia_form #numero_lacre').val('');
			$('#evidencia_form #nome_perito').val('');
			$('#evidencia_form #coordenadas').val('');
			$('#evidencia_form #unidade').val('');
			$('#evidencia_form #obs').val('');
			$('#evidencia_form #imagem_uri').val('');
			$('#evidencia_form #visualizacao_imagem').attr('src', '');
			
			var data = data_atual();
			var hora = hora_atual();
			$('#evidencia_form #data').val(data);
			$('#evidencia_form #hora').val(hora);
			$('#evidencia_form #capturar_coordenadas').trigger('click');
		});
	}
});

$(document).on('click', '#btn_enquete_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#enquete_form").serializeJSON();
	salvar_enquete(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		history.back();
	});
});

///////// EVIDÊNCIAS FIM

///////// CONFIG INÍCIO

$(document).on('pagebeforeshow', '#config_formulario', function()
{
	var operacao_bd = 'editar'; //sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var config_id = 1; //sessionStorage.config_id;
		get_config(config_id, function(config) {
			$('#config_form #operacao_bd').val(operacao_bd);
			$('#config_form #id').val(config.id);
			$('#config_form #url_servidor').val(config.url_servidor);
		});
	} else {
		var config_id = sessionStorage.config_id;
		get_no_informe(sessionStorage.re_id, function(numero_ordem) {
			$('#config_form #operacao_bd').val(operacao_bd);
			$('#config_form #id').val(config_id);
			$('#config_form #url_servidor').val('');
		});
	}
});

$(document).on('click', '#btn_config_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#config_form").serializeJSON();
	salvar_config(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		history.back();
	});
});

$(document).on('click', '#btn_config_limpar', function(event)
{
	event.preventDefault();
	$('#config_form #url_servidor').val('');
});

///////// CONFIG FIM

$(document).on('click', '#menu_sincronizar', function(event)
{
	sincronizar();
});

function atualizar() {
	var url = 'http://localhost/spcr/enquete.php';
	$.ajax({
		url: url,
		data: {acao : 'get_all_enquetes', dados : ''},
		dataType: 'jsonp',
		jsonp: 'callback',
		jsonpCallback: 'resultado_atualizar',
		success: function(){},
		error: function(){}
	});
}

function resultado_atualizar(resultado) {
	if (resultado.status == 'ok') {
		toast(resultado.mensagem);
	} else {
		toast(resultado.mensagem);
	}
}

function sincronizar() {
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		$.ajax({
			url: url_servidor,
			data: {acao : 'get_all_enquetes'},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'resultado_sincronizar',
			success: function(){},
			error: function(){}
		});
		window.setTimeout(sincronizar, 30000);
	});
}

function resultado_sincronizar(resultado) {
	if (resultado.status == 'ok') {
		//toast(resultado.mensagem);
		var n = resultado.registro.length;
		if (n > 0) {
			toast('Novo Registro de entrada!');
			for (i = 0; i < n; i++) {
				salvar_re(resultado.registro[i], 'novo', function(resultado) {});
			}
		}
	} else {
		//toast(resultado.mensagem);
	}
}