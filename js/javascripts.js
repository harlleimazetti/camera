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