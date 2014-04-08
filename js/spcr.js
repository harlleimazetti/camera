document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
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

$(document).on('click', '#capturar_imagem', function()
{
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
	destinationType: Camera.DestinationType.FILE_URI }); 
});

function onSuccess(imageURI) {
    //var image = document.getElementById('visualizacao_imagem');
    //image.src = imageURI;
	$('#visualizacao_imagem', $.mobile.activePage).attr('src', imageURI);
	$('#imagem_uri', $.mobile.activePage).val(imageURI);
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

/////////// REGISTRO DE ENTRADA INÍCIO

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
			output += '<li data-theme="' + data_theme + '" data-id="' + re[i].id + '"><a href="#formulario"><h2>' + re[i].crime + '</h2><p><strong>' + re[i].data + ', ' + re[i].hora + '</strong></p><p>' + re[i].obs + '</p><p class="ui-li-aside"><strong>' + re[i].codigo + '</strong></p></a></a><a href="#" class="excluir">Excluir</a></li>';
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

$(document).on('click', '#lista_re li .excluir', function()
{
	$el = $(this).closest('li');
	re_id = $el.data('id');
	sessionStorage.re_id = re_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_re(re_id, function(resultado) {
			$($el).remove();
		});
	}
	$('#lista_re').listview('refresh');
	event.preventDefault();
	return false;	
});

$(document).on('pagebeforeshow', '#re_formulario', function()
{
	var operacao_bd = sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var re_id = sessionStorage.re_id;
		get_re(re_id, function(re) {
			$('#re_form #operacao_bd').val(operacao_bd);
			$('#re_form #id').val(re.id);
			$('#re_form #codigo').val(re.codigo);
			$('#re_form #data').val(re.data);
			$('#re_form #hora').val(re.hora);
			$('#re_form #endereco').val(re.endereco);
			$('#re_form #coordenadas').val(re.coordenadas);
			$('#re_form #crime').val(re.crime);
			$('#re_form #obs').val(re.obs);
		});
	} else {
		var re_id = sessionStorage.re_id;
		$('#re_form #operacao_bd').val(operacao_bd);
		$('#re_form #id').val(re_id);
		$('#re_form #codigo').val('');
		$('#re_form #data').val('');
		$('#re_form #hora').val('');
		$('#re_form #endereco').val('');
		$('#re_form #coordenadas').val('');
		$('#re_form #crime').val('');
		$('#re_form #obs').val('');
			
		var data = data_atual();
		var hora = hora_atual();
		$('#re_form #data').val(data);
		$('#re_form #hora').val(hora);
		$('#re_form #capturar_coordenadas').trigger('click');
	}
});

$(document).on('click', '#btn_re_novo', function(event)
{
	event.preventDefault();
	sessionStorage.re_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#re_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_re_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#re_form").serializeJSON();
	salvar_re(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		history.back();
	});
});

$(document).on('click', '#btn_re_limpar', function(event)
{
	event.preventDefault();
	$('#re_form #codigo').val('');
	$('#re_form #data').val('');
	$('#re_form #hora').val('');
	$('#re_form #endereco').val('');
	$('#re_form #coordenadas').val('');
	$('#re_form #crime').val('');
	$('#re_form #obs').val('');
});

//////// REGISTRO DE ENTRADA FIM

/////// EVIDÊNCIAS INÍCIO

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
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
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

$(document).on('click', '#btn_evidencia_novo', function(event)
{
	event.preventDefault();
	sessionStorage.evidencia_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
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
	$('#evidencia_form #data').val('');
	$('#evidencia_form #hora').val('');
	$('#evidencia_form #numero_lacre').val('');
	$('#evidencia_form #nome_perito').val('');
	$('#evidencia_form #coordenadas').val('');
	$('#evidencia_form #unidade').val('');
	$('#evidencia_form #obs').val('');
	$('#evidencia_form #imagem_uri').val('');
	$('#evidencia_form #visualizacao_imagem').attr('src', '');
});

///////// EVIDÊNCIAS FIM

///////// VESTÍGIOS INÍCIO

$(document).on('pageshow', '#vestigio_lista', function()
{
	var output = '';
	$('#lista_vestigio').empty();
	get_all_vestigio(function(vestigio) {
		for (var i = 0; i < vestigio.length; i++)
		{
			output += '<li id="' + vestigio[i].id + '" data-id="' + vestigio[i].id + '"><a href="#"><h2>' + vestigio[i].localizacao + '</h2><p><strong>' + vestigio[i].data + ', ' + vestigio[i].hora + '</strong></p><p>' + vestigio[i].descricao + '</p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_vestigio').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_vestigio li', function()
{
	vestigio_id = $(this).data('id');
	sessionStorage.vestigio_id = vestigio_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#vestigio_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_vestigio li .excluir', function()
{
	$el = $(this).closest('li');
	vestigio_id = $el.data('id');
	sessionStorage.vestigio_id = vestigio_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_vestigio(vestigio_id, function(resultado) {
			reordena_vestigio();
			$($el).remove();
		});
	}
	$('#lista_vestigio').listview('refresh');
	event.preventDefault();
	return false;
});

$(document).on('pagebeforeshow', '#vestigio_formulario', function()
{
	var operacao_bd = sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var vestigio_id = sessionStorage.vestigio_id;
		get_vestigio(vestigio_id, function(vestigio) {
			$('#vestigio_form #operacao_bd').val(operacao_bd);
			$('#vestigio_form #id').val(vestigio.id);
			$('#vestigio_form #vestigio_tipo_id').val(vestigio.vestigio_tipo_id).selectmenu('refresh');
			$('#vestigio_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo', $.mobile.activePage).html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto', $.mobile.activePage).html(vestigio.numero_ordem);
			$('#vestigio_form #numero_ordem').val(vestigio.numero_ordem);
			$('#vestigio_form #data').val(vestigio.data);
			$('#vestigio_form #hora').val(vestigio.hora);
			$('#vestigio_form #coordenadas').val(vestigio.coordenadas);
			$('#vestigio_form #descricao').val(vestigio.descricao);
			$('#vestigio_form #localizacao').val(vestigio.localizacao);
			$('#vestigio_form #imagem_uri').val(vestigio.imagem_uri);
			$('#vestigio_form #visualizacao_imagem').attr('src', vestigio.imagem_uri);
		});
	} else {
		var vestigio_id = sessionStorage.vestigio_id;
		get_no_vestigio(sessionStorage.re_id, function(numero_ordem) {
			$('#vestigio_form #operacao_bd').val(operacao_bd);
			$('#vestigio_form #id').val(vestigio_id);
			$('#vestigio_form #vestigio_tipo_id').val('').selectmenu('refresh');
			$('#vestigio_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo', $.mobile.activePage).html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto', $.mobile.activePage).html(numero_ordem);
			$('#vestigio_form #numero_ordem').val(numero_ordem);
			$('#vestigio_form #data').val('');
			$('#vestigio_form #hora').val('');
			$('#vestigio_form #coordenadas').val('');
			$('#vestigio_form #descricao').val('');
			$('#vestigio_form #localizacao').val('');
			$('#vestigio_form #imagem_uri').val('');
			$('#vestigio_form #visualizacao_imagem').attr('src', '');
			
			var data = data_atual();
			var hora = hora_atual();
			$('#vestigio_form #data').val(data);
			$('#vestigio_form #hora').val(hora);
			$('#vestigio_form #capturar_coordenadas').trigger('click');
		});
	}
});

$(document).on('click', '#btn_vestigio_novo', function(event)
{
	event.preventDefault();
	sessionStorage.vestigio_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#vestigio_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_vestigio_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#vestigio_form").serializeJSON();
	salvar_vestigio(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		history.back();
	});
});

$(document).on('click', '#btn_vestigio_limpar', function(event)
{
	event.preventDefault();
	$('#vestigio_form #data').val('');
	$('#vestigio_form #hora').val('');
	$('#vestigio_form #coordenadas').val('');
	$('#vestigio_form #descricao').val('');
	$('#vestigio_form #localizacao').val('');
	$('#vestigio_form #imagem_uri').val('');
	$('#vestigio_form #visualizacao_imagem').attr('src', '');
});

///////// VESTÍGIOS FIM

///////// INFORMES INÍCIO

$(document).on('pageshow', '#informe_lista', function()
{
	var output = '';
	$('#lista_informe').empty();
	get_all_informe(function(informe) {
		for (var i = 0; i < informe.length; i++)
		{
			output += '<li id="' + informe[i].id + '" data-id="' + informe[i].id + '"><a href="#"><h2>' + informe[i].localizacao + '</h2><p><strong>' + informe[i].data + ', ' + informe[i].hora + '</strong></p><p>' + informe[i].declaracao + '</p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_informe').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_informe li', function()
{
	informe_id = $(this).data('id');
	sessionStorage.informe_id = informe_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#informe_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_informe li .excluir', function()
{
	$el = $(this).closest('li');
	informe_id = $el.data('id');
	sessionStorage.informe_id = informe_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_informe(informe_id, function(resultado) {
			reordena_informe();
			$($el).remove();
		});
	}
	$('#lista_informe').listview('refresh');
	event.preventDefault();
	return false;
});

$(document).on('pagebeforeshow', '#informe_formulario', function()
{
	var operacao_bd = sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var informe_id = sessionStorage.informe_id;
		get_informe(informe_id, function(informe) {
			$('#informe_form #operacao_bd').val(operacao_bd);
			$('#informe_form #id').val(informe.id);
			$('#informe_form #testemunha_tipo_id').val(informe.testemunha_tipo_id).selectmenu('refresh');
			$('#informe_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo', $.mobile.activePage).html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto', $.mobile.activePage).html(informe.numero_ordem);
			$('#informe_form #numero_ordem').val(informe.numero_ordem);
			$('#informe_form #data').val(informe.data);
			$('#informe_form #hora').val(informe.hora);
			$('#informe_form #coordenadas').val(informe.coordenadas);
			$('#informe_form #declaracao').val(informe.declaracao);
			$('#informe_form #localizacao').val(informe.localizacao);
			$('#informe_form #imagem_uri').val(informe.imagem_uri);
			$('#informe_form #visualizacao_imagem').attr('src', informe.imagem_uri);
		});
	} else {
		var informe_id = sessionStorage.informe_id;
		get_no_informe(sessionStorage.re_id, function(numero_ordem) {
			$('#informe_form #operacao_bd').val(operacao_bd);
			$('#informe_form #id').val(informe_id);
			$('#informe_form #testemunha_tipo_id').val('').selectmenu('refresh');
			$('#informe_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo', $.mobile.activePage).html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto', $.mobile.activePage).html(numero_ordem);
			$('#informe_form #numero_ordem').val(numero_ordem);
			$('#informe_form #data').val('');
			$('#informe_form #hora').val('');
			$('#informe_form #coordenadas').val('');
			$('#informe_form #declaracao').val('');
			$('#informe_form #localizacao').val('');
			$('#informe_form #imagem_uri').val('');
			$('#informe_form #visualizacao_imagem').attr('src', '');
			
			var data = data_atual();
			var hora = hora_atual();
			$('#informe_form #data').val(data);
			$('#informe_form #hora').val(hora);
			$('#informe_form #capturar_coordenadas').trigger('click');
		});
	}
});

$(document).on('click', '#btn_informe_novo', function(event)
{
	event.preventDefault();
	sessionStorage.informe_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#informe_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_informe_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#informe_form").serializeJSON();
	salvar_informe(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		history.back();
	});
});

$(document).on('click', '#btn_informe_limpar', function(event)
{
	event.preventDefault();
	$('#informe_form #data').val('');
	$('#informe_form #hora').val('');
	$('#informe_form #coordenadas').val('');
	$('#informe_form #declaracao').val('');
	$('#informe_form #localizacao').val('');
	$('#informe_form #imagem_uri').val('');
	$('#informe_form #visualizacao_imagem').attr('src', '');
});

///////// INFORMES FIM

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