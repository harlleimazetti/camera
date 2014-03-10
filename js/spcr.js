$(document).on('focus', '#evidencia_form input', function()
{
	sessionStorage.campo_foco = $(this).attr('id');
});

$(document).on('click', '#scan', function()
{
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	scanner.scan( function (result)
	{
		var data = data_atual();
		var hora = hora_atual();
		$('#data').val(data);
		$('#hora').val(hora);
		$('#capturar_coordenadas').trigger('click');
		try
		{
			var ev = jQuery.parseJSON(result.text);
			$('#codigo').val(ev.codigo);
			$('#nome_perito').val(ev.nome_perito);
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
			output += '<li data-id="' + re[i].id + '"><a href="#formulario"><h2>' + re[i].crime + '</h2><p><strong>' + re[i].data + ', ' + re[i].hora + '</strong></p><p>' + re[i].obs + '</p><p class="ui-li-aside"><strong>' + re[i].codigo + '</strong></p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_re').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_re li', function()
{
	re_id = $(this).data('id');
	sessionStorage.re_id = re_id;
	get_re(re_id, function(re){
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
			output += '<li data-id="' + evidencia[i].id + '"><a href="#formulario"><h2>' + evidencia[i].nome_perito + '</h2><p><strong>' + evidencia[i].data + ', ' + evidencia[i].hora + '</strong></p><p>' + evidencia[i].obs + '</p><p class="ui-li-aside"><strong>' + evidencia[i].codigo + '</strong></p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_evidencia').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_evidencia li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario" );
});

$(document).on('click', '#lista_evidencia li .excluir', function(event)
{
	evidencia_id = $(this).closest('li').data('id');
	sessionStorage.evidencia_id = evidencia_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_evidencia(evidencia_id, function(resultado) {
			$(this).closest('li').remove(function() {
				toast(resultado.mensagem);
			});
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
			$('#data').val(evidencia.data);
			$('#hora').val(evidencia.hora);
			$('#codigo').val(evidencia.codigo);
			$('#nome_perito').val(evidencia.nome_perito);
			$('#coordenadas').val(evidencia.coordenadas);
			$('#unidade').val(evidencia.unidade);
			$('#obs').val(evidencia.obs);
			$('#imagem_uri').val(evidencia.imagem_uri);
			$('#visualizacao_imagem').attr('src', evidencia.imagem_uri);
		});
	} else {
		var evidencia_id = sessionStorage.evidencia_id;
		$('#operacao_bd').val(operacao_bd);
		$('#id').val(evidencia_id);
		$('#evidencia_tipo_id').val('').selectmenu('refresh');
		$('#re_id').val(sessionStorage.re_id);
		$('#data').val('');
		$('#hora').val('');
		$('#codigo').val('');
		$('#nome_perito').val('');
		$('#coordenadas').val('');
		$('#unidade').val('');
		$('#obs').val('');
		$('#imagem_uri').val('');
		$('#visualizacao_imagem').attr('src', '');
	}
});

$(document).on('click', '#btn_evidencia_novo', function(event)
{
	event.preventDefault();
	sessionStorage.evidencia_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#evidencia_formulario" );
});

$(document).on('click', '#btn_evidencia_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#evidencia_form").serializeJSON();
	salvar_evidencia(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
	});
});

$(document).on('click', '#btn_evidencia_limpar', function(event)
{
	event.preventDefault();
	$('#data').val('');
	$('#hora').val('');
	$('#codigo').val('');
	$('#nome_perito').val('');
	$('#coordenadas').val('');
	$('#unidade').val('');
	$('#obs').val('');
	$('#imagem_uri').val('');
	$('#visualizacao_imagem').attr('src', '');
});