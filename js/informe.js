function get_all_informe(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM informe WHERE re_id = '" + re_id + "' ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var informe = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					informe[i] = new Object();
					informe[i].id					= row.id;
					informe[i].testemunha_tipo_id	= row.testemunha_tipo_id;
					informe[i].re_id				= row.re_id;
					informe[i].numero_ordem			= row.numero_ordem;
					informe[i].data					= row.data;
					informe[i].hora					= row.hora;
					informe[i].coordenadas			= row.coordenadas;
					informe[i].declaracao			= row.declaracao;
					informe[i].localizacao			= row.localizacao;
					informe[i].imagem_uri			= row.imagem_uri;
				}
				fn(informe);
			}
		});
	});
}

function get_all_informe_t(fn) 
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM informe ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var informe = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					informe[i] = new Object();
					informe[i].id					= row.id;
					informe[i].testemunha_tipo_id	= row.testemunha_tipo_id;
					informe[i].re_id				= row.re_id;
					informe[i].numero_ordem			= row.numero_ordem;
					informe[i].data					= row.data;
					informe[i].hora					= row.hora;
					informe[i].coordenadas			= row.coordenadas;
					informe[i].declaracao			= row.declaracao;
					informe[i].localizacao			= row.localizacao;
					informe[i].imagem_uri			= row.imagem_uri;
				}
				fn(informe);
			}
		});
	});
}

function get_informe(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM informe WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var informe = new Object();
				var row = result.rows.item(0);
				informe.id					= row.id;
				informe.testemunha_tipo_id	= row.testemunha_tipo_id;
				informe.re_id				= row.re_id;
				informe.numero_ordem		= row.numero_ordem;
				informe.data				= row.data;
				informe.hora				= row.hora;
				informe.coordenadas			= row.coordenadas;
				informe.declaracao			= row.declaracao;
				informe.localizacao			= row.localizacao;
				informe.imagem_uri			= row.imagem_uri;
				fn(informe);
			}
		});
	});
}

function get_no_informe(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM informe WHERE re_id = '" + re_id + "' ORDER BY id DESC LIMIT 0,1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var row = result.rows.item(0);
				var numero_ordem = parseInt(row.numero_ordem);
				numero_ordem++;
				fn(numero_ordem);
			} else {
				fn(1);
			}
		});
	});
}

function get_last_informe(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM informe ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var informe = new Object();
				var row = result.rows.item(0);
				informe.id = row.id;
				fn(informe);
			}
		});
	});
}

function salvar_informe(informe, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO informe (" +
					"testemunha_tipo_id, " + 
					"re_id, " + 
					"numero_ordem, " + 
					"data, " + 
					"hora, " + 
					"coordenadas, " + 
					"declaracao, " + 
					"localizacao, " + 
					"imagem_uri " + 
				") VALUES ( " +
					"'" + informe.testemunha_tipo_id + "', " + 
					"'" + informe.re_id + "', " + 
					"'" + informe.numero_ordem + "', " + 
					"'" + formata_data_db(informe.data) + "', " + 
					"'" + informe.hora + "', " + 
					"'" + informe.coordenadas + "', " + 
					"'" + informe.declaracao + "', " + 
					"'" + informe.localizacao + "', " + 
					"'" + informe.imagem_uri + "'" + 
				")";
		} else {
			var sql = "UPDATE informe SET " +
						"testemunha_tipo_id = '" + informe.testemunha_tipo_id + "', " +  
						"re_id = '" + informe.re_id + "', " +  
						"numero_ordem = '" + informe.numero_ordem + "', " + 
						"data = '" + formata_data_db(informe.data) + "', " + 
						"hora = '" + informe.hora + "', " + 
						"coordenadas = '" + informe.coordenadas + "', " + 
						"declaracao = '" + informe.declaracao + "', " + 
						"localizacao = '" + informe.localizacao + "', " + 
						"imagem_uri = '" + informe.imagem_uri + "'" + 
					" WHERE id = " + informe.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_informe(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM informe WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

function reordena_informe()
{
	get_all_informe(function(informe) {
		var x = 1;
		for (var i = 0; i < informe.length; i++) 
		{
			informe[i].numero_ordem = x;
			salvar_informe(informe[i], 'editar', function(resultado) {});
			x++;
		}		
	});
}

///////// INFORMES INÍCIO

$(document).on('pageshow', '#informe_lista', function()
{
	var output = '';
	$('#lista_informe').empty();
	get_all_informe(function(informe) {
		for (var i = 0; i < informe.length; i++)
		{
			output += '<li id="' + informe[i].id + '" data-id="' + informe[i].id + '"><a href="#"><h2>' + informe[i].localizacao + '</h2><p><strong>' + formata_data(informe[i].data) + ', ' + informe[i].hora + '</strong></p><p>' + informe[i].declaracao + '</p></a><a href="#" class="excluir">Excluir</a></li>';
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
			$('#informe_form #data').val(formata_data(informe.data));
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
		if (dados.operacao_bd == 'novo') {
			get_last_informe(function(informe) {
				var id = informe.id;
				$('#informe_form #operacao_bd').val('editar');
				$('#informe_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_informe_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#informe_form #id").val();
	transmitir_informe(id);
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