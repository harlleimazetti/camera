document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true;
	$.support.cors = true;
	sincronizar();
}
$(document).on('focus', '#evidencia_form input', function() 
{
	sessionStorage.campo_foco = $(this).attr('id');
});

$(document).on('click', '#scan', function()
{
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	scanner.scan( function (result)
	{
		try
		{
			var ev = jQuery.parseJSON(result.text);
			$('#numero_lacre').val(ev.numero_lacre);
			$('#nome_perito').val(ev.nome_perito);
			$('#unidade').val(ev.unidade);
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

$(document).on('click', '#capturar_imagem', function()
{
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
	destinationType: Camera.DestinationType.FILE_URI }); 
});

function onSuccess(imageURI) {
    var image = document.getElementById('visualizacao_imagem');
    image.src = imageURI;
	$('#imagem_uri').val(imageURI);
}

function onFail(message) {
    toast('Falha: ' + message);
}

$(document).on('click', '#capturar_coordenadas', function(event)
{
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);
});

var onGPSSuccess = function(position) {
	var coordenadas = position.coords.latitude + ', ' + position.coords.longitude;
	$('#coordenadas').val(coordenadas);
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

$(document).on('pageshow', '#re_lista', function()
{
	var output = '';
	$('#lista_re').empty();
	get_all_re(function(re) {
		for (var i = 0; i < re.length; i++)
		{
			if (re[i].novo == '1') {
				data_theme = 'b';
			} else {
				data_theme = 'a';
			}
			output += '<li data-theme="' + data_theme + '" data-id="' + re[i].id + '"><a href="#formulario"><h2>' + re[i].crime + '</h2><p><strong>' + re[i].data + ', ' + re[i].hora + '</strong></p><p>' + re[i].obs + '</p><p class="ui-li-aside"><strong>' + re[i].codigo + '</strong></p></a></li>';
		}
		$('#lista_re').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_re li', function()
{
	re_id = $(this).data('id');
	$(this).attr('data-theme', 'a');
	$(this).removeClass('ui-btn-up-b ui-btn-hover-b').addClass('ui-btn-up-a ui-btn-hover-a');
	$('#lista_re').listview('refresh');
	get_re(re_id, function(re) {
		sessionStorage.re_id = re.id;
		sessionStorage.re_codigo = re.codigo;
		re.novo = '0';
		salvar_re(re, 'editar', function(resultado) {});
		var msg = 'Registro de entrada selecionado <p style="margin-bottom:0"><strong>' + re.codigo + '</strong></p><br>' + re.crime;
		toast(msg);
	});
});

$(document).on('pageshow', '#evidencia_lista', function()
{
	var output = '';
	$('#lista_evidencia').empty();
	get_all_evidencia(function(evidencia) {
		for (var i = 0; i < evidencia.length; i++)
		{
			output += '<li id="' + evidencia[i].id + '" data-id="' + evidencia[i].id + '"><a href="#"><h2>' + evidencia[i].nome_perito + '</h2><p><strong>' + evidencia[i].data + ', ' + evidencia[i].hora + '</strong></p><p>' + evidencia[i].obs + '</p><p class="ui-li-aside"><strong>' + evidencia[i].numero_lacre + '</strong></p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_evidencia').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_evidencia li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'slide'} );
});

$(document).on('click', '#lista_evidencia li .excluir', function()
{
	$el = $(this).closest('li');
	evidencia_id = $el.data('id');
	sessionStorage.evidencia_id = evidencia_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_evidencia(evidencia_id, function(resultado) {
			reordena_evidencia();
			$($el).remove();
		});
	}
	$('#lista_evidencia').listview('refresh');
	event.preventDefault();
	return false;	
});

$(document).on('pagebeforeshow', '#evidencia_formulario', function()
{
	var operacao_bd = sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var evidencia_id = sessionStorage.evidencia_id;
		get_evidencia(evidencia_id, function(evidencia) {
			$('#operacao_bd').val(operacao_bd);
			$('#id').val(evidencia.id);
			$('#evidencia_tipo_id').val(evidencia.evidencia_tipo_id).selectmenu('refresh');
			$('#re_id').val(sessionStorage.re_id);
			$('#re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto').html(evidencia.numero_ordem);
			$('#numero_ordem').val(evidencia.numero_ordem);
			$('#data').val(evidencia.data);
			$('#hora').val(evidencia.hora);
			$('#numero_lacre').val(evidencia.numero_lacre);
			$('#nome_perito').val(evidencia.nome_perito);
			$('#coordenadas').val(evidencia.coordenadas);
			$('#unidade').val(evidencia.unidade);
			$('#obs').val(evidencia.obs);
			$('#imagem_uri').val(evidencia.imagem_uri);
			$('#visualizacao_imagem').attr('src', evidencia.imagem_uri);
		});
	} else {
		var evidencia_id = sessionStorage.evidencia_id;
		get_no_evidencia(sessionStorage.re_id, function(numero_ordem) {
			$('#operacao_bd').val(operacao_bd);
			$('#id').val(evidencia_id);
			$('#evidencia_tipo_id').val('').selectmenu('refresh');
			$('#re_id').val(sessionStorage.re_id);
			$('#re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto').html(numero_ordem);
			$('#numero_ordem').val(numero_ordem);
			$('#data').val('');
			$('#hora').val('');
			$('#numero_lacre').val('');
			$('#nome_perito').val('');
			$('#coordenadas').val('');
			$('#unidade').val('');
			$('#obs').val('');
			$('#imagem_uri').val('');
			$('#visualizacao_imagem').attr('src', '');
			
			var data = data_atual();
			var hora = hora_atual();
			$('#data').val(data);
			$('#hora').val(hora);
			$('#capturar_coordenadas').trigger('click');
		});
	}
});

$(document).on('click', '#btn_evidencia_novo', function(event)
{
	event.preventDefault();
	sessionStorage.evidencia_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'slide'} );
});

$(document).on('click', '#btn_evidencia_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#evidencia_form").serializeJSON();
	salvar_evidencia(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		history.back();
		/*setTimeout(function() {
			var resp = confirm('Inserir novo registro?');
			if (resp == true) {
				sessionStorage.evidencia_id = 0;
				sessionStorage.operacao_bd = 'novo';
				$.mobile.changePage( "#evidencia_formulario", {reloadPage : true} );
			} else {
				$.mobile.changePage( "#evidencia_lista", {transition : 'slide', reverse : true} );
			}
		}, 3000);*/
	});
});

$(document).on('click', '#btn_evidencia_limpar', function(event)
{
	event.preventDefault();
	$('#data').val('');
	$('#hora').val('');
	$('#numero_lacre').val('');
	$('#nome_perito').val('');
	$('#coordenadas').val('');
	$('#unidade').val('');
	$('#obs').val('');
	$('#imagem_uri').val('');
	$('#visualizacao_imagem').attr('src', '');
});

$(document).on('click', '#menu_sincronizar', function(event)
{
	sincronizar();
});

function sincronizar() {
	$.ajax({
		url: 'http://www.hlcontabil.com.br/spcr/sincronizar.php',
		data: {nome : 'Harllei Mazetti'},
		dataType: 'jsonp',
		jsonp: 'callback',
		jsonpCallback: 'resultado_sincronizar',
		success: function(){},
		error: function(){}
	});
	window.setTimeout(sincronizar, 5000);
}

function resultado_sincronizar(resultado) {
	if (resultado.status == 'ok') {
		//toast(resultado.mensagem);
		var n = resultado.registro.length;
		if (n > 0) {
			navigator.notification.vibrate(2000);
			navigator.notification.beep(3);
			toast('Novo Registro de entrada!');
			for (i = 0; i < n; i++) {
				salvar_re(resultado.registro[i], 'novo', function(resultado) {});
			}
		}
	} else {
		//toast(resultado.mensagem);
	}
}