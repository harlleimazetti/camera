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

$(document).on('click', '#menu_transmitir_dados', function(event)
{
	transmitir_dados();
});

$(document).on('click', '#menu_receber_dados', function(event)
{
	receber_dados();
});

function transmitir_imagem(imagem_uri, tb, cp, id) {
	//alert(imagem_uri + ', ' + tb + ', ' + cp + ', ' + id);
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		var options	= new FileUploadOptions();
		options.fileKey	= "arquivo";
		options.mimeType = "image/jpeg";
		//options.fileName = imagem_uri.substr(imageURI.lastIndexOf('/')+1);
		options.fileName = "nome_arquivo";
	
		var params = new Object();
		params.id = id;
		params.tb = tb;
		params.cp = cp;
		params.acao = 'upload_imagem';
	
		options.params = params;
		options.chunkedMode = false;
		
		options.headers = {
			Connection: "close"
		};
	
		var ft = new FileTransfer();
		ft.upload(imagem_uri, encodeURI(url_servidor), win, fail, options);
	});
}
 
function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	//toast(r.response);
}
 
function fail(error) {
	toast("Ocorreu um erro: Código = " + error.code);
}

function transmitir_acesso_coisa(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_acesso_coisa(id, function(acesso_coisa) {
			if (acesso_coisa) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'acesso_coisa', dados : acesso_coisa},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(acesso_coisa.res_imagem1_uri, 'acesso_coisa', 'res_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.res_imagem2_uri, 'acesso_coisa', 'res_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.com_imagem1_uri, 'acesso_coisa', 'com_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.com_imagem2_uri, 'acesso_coisa', 'com_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.ind_imagem1_uri, 'acesso_coisa', 'ind_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.ind_imagem2_uri, 'acesso_coisa', 'ind_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.esco_imagem1_uri, 'acesso_coisa', 'esco_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.esco_imagem2_uri, 'acesso_coisa', 'esco_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.escr_imagem1_uri, 'acesso_coisa', 'escr_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.escr_imagem2_uri, 'acesso_coisa', 'escr_imagem2', acesso_coisa.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_acesso_local(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_acesso_local(id, function(acesso_local) {
			if (acesso_local) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'acesso_local', dados : acesso_local},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(acesso_local.imagem1_uri, 'acesso_local', 'imagem1', acesso_local.id);
						transmitir_imagem(acesso_local.imagem2_uri, 'acesso_local', 'imagem2', acesso_local.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_administrativa(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_administrativa(id, function(administrativa) {
			if (administrativa) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'administrativa', dados : administrativa},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_carac_coisa(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_carac_coisa(id, function(carac_coisa) {
			if (carac_coisa) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'carac_coisa', dados : carac_coisa},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_carac_vitima(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_carac_vitima(id, function(carac_vitima) {
			if (carac_vitima) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'carac_vitima', dados : carac_vitima},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						transmitir_imagem(carac_vitima.imagem1_uri, 'carac_vitima', 'imagem1', carac_vitima.id);
						transmitir_imagem(carac_vitima.imagem2_uri, 'carac_vitima', 'imagem2', carac_vitima.id);
						toast(resultado.mensagem);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_evidencia(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_evidencia(id, function(evidencia) {
			if (evidencia) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'evidencia', dados : evidencia},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(evidencia.imagem_uri, 'evidencia', 'imagem', evidencia.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_informe(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_informe(id, function(informe) {
			if (informe) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'informe', dados : informe},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(informe.imagem_uri, 'informe', 'imagem', informe.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_vestigio(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_vestigio(id, function(vestigio) {
			if (vestigio) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'vestigio', dados : vestigio},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(vestigio.imagem_uri, 'vestigio', 'imagem', vestigio.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_dados() {
	alert('Trasmitir dados');
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
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
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
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_administrativa_re(re[i].id, function(administrativa) {
					if (administrativa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'administrativa', dados : administrativa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
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
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
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
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
			}
		});
						get_all_evidencia_t(function(evidencia) {
							if (evidencia) {
								$.ajax({
									url: url_servidor,
									data: {acao: 'evidencia_t', dados : evidencia},
									dataType: 'jsonp',
									jsonp: 'callback',
									success: function(resultado) {
										//console.log(resultado.mensagem);
										//console.log(resultado.registro);
										toast(resultado.mensagem);
									},
									error: function (xhr, textStatus, thrownError) {
										//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
										toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
									}
								});
							}
						});
						
						get_all_informe_t(function(informe) {
							if (informe) {
								$.ajax({
									url: url_servidor,
									data: {acao: 'informe_t', dados : informe},
									dataType: 'jsonp',
									jsonp: 'callback',
									success: function(resultado) {
										//console.log(resultado.mensagem);
										//console.log(resultado.registro);
										toast(resultado.mensagem);
									},
									error: function (xhr, textStatus, thrownError) {
										//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
										toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
									}
								});
							}
						});
						
						get_all_vestigio_t(function(vestigio) {
							if (vestigio) {
								$.ajax({
									url: url_servidor,
									data: {acao: 'vestigio_t', dados : vestigio},
									dataType: 'jsonp',
									jsonp: 'callback',
									success: function(resultado) {
										//console.log(resultado.mensagem);
										//console.log(resultado.registro);
										toast(resultado.mensagem);
									},
									error: function (xhr, textStatus, thrownError) {
										//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
										toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
									}
								});
							}
						});
	});
}

function receber_dados() { 
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		$.ajax({
			url: url_servidor,
			data: {acao : 'receber_dados', dados : ''},
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(resultado) {
				if (resultado.status == 'ok') {
					var n = resultado.registro.length;
						if (n > 0) {
							toast('Novo Registro de entrada!');
							for (i = 0; i < n; i++) {
								salvar_re(resultado.registro[i], 'novo', function(resultado) {});
								salvar_administrativa(resultado.administrativa[i], 'novo', function(resultado) {});
							}
						} else {
							toast('Não há novos registros.');
						}
				} else {
					toast(resultado.mensagem);
				}
			},
			error: function (xhr, textStatus, thrownError) {
				//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
				toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
			}
		});
	});
}

function sincronizar() { 
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		$.ajax({
			url: url_servidor,
			data: {acao : 'sincronizar'},
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