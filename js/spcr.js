document.addEventListener("deviceready", onDeviceReady, false); 
function onDeviceReady() {
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true;
	$.support.cors = true;
	//sincronizar();
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

$(document).on('click', '.capturar_imagem', function()
{
	sessionStorage.img_uri = $(this).data('img-uri');
	sessionStorage.img_vis = $(this).data('img-vis');
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
	destinationType: Camera.DestinationType.FILE_URI }); 
});

function onSuccess(imageURI) {
    //var image = document.getElementById('visualizacao_imagem');
    //image.src = imageURI;
	var img_uri = '#' + sessionStorage.img_uri;
	var img_vis = '#' + sessionStorage.img_vis; 
	$(img_vis, $.mobile.activePage).attr('src', imageURI);
	$(img_uri, $.mobile.activePage).val(imageURI);
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
	transmitir_dados();
});

function transmitir_dados() {
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_all_re(function(re) {
			for (i = 0; i < re.length; i++) {
				console.log(re[i].id);
				get_acesso_coisa_re(re[i].id, function(acesso_coisa) {
					if (acesso_coisa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'acesso_coisa', dados : acesso_coisa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								console.log(resultado.mensagem);
								console.log(resultado.registro);
							},
							error: function (xhr, textStatus, thrownError) {
								console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_acesso_local_re(re[i].id, function(acesso_local) {
					if (acesso_local) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'acesso_local', dados : acesso_local},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								console.log(resultado.mensagem);
								console.log(resultado.registro);
							},
							error: function (xhr, textStatus, thrownError) {
								console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_administrativa(re[i].id, function(administrativa) {
					if (administrativa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'administrativa', dados : administrativa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								console.log(resultado.mensagem);
								console.log(resultado.registro);
							},
							error: function (xhr, textStatus, thrownError) {
								console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_carac_coisa_re(re[i].id, function(carac_coisa) {
					if (carac_coisa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'carac_coisa', dados : carac_coisa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								console.log(resultado.mensagem);
								console.log(resultado.registro);
							},
							error: function (xhr, textStatus, thrownError) {
								console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_carac_vitima_re(re[i].id, function(carac_vitima) {
					if (carac_vitima) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'carac_vitima', dados : carac_vitima},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								console.log(resultado.mensagem);
								console.log(resultado.registro);
							},
							error: function (xhr, textStatus, thrownError) {
								console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
			}
		});
	});
}

function sincronizar() { 
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		$.ajax({
			url: url_servidor,
			data: {nome : 'Harllei Mazetti'},
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