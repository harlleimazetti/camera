function get_all_evidencia(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia WHERE re_id = '" + re_id + "' ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var evidencia = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					evidencia[i] = new Object();
					evidencia[i].id					= row.id;
					evidencia[i].evidencia_tipo_id	= row.evidencia_tipo_id;
					evidencia[i].re_id				= row.re_id;
					evidencia[i].numero_ordem		= row.numero_ordem;
					evidencia[i].numero_lacre		= row.numero_lacre;
					evidencia[i].data				= row.data;
					evidencia[i].hora				= row.hora;
					evidencia[i].nome_perito		= row.nome_perito;
					evidencia[i].coordenadas		= row.coordenadas;
					evidencia[i].unidade			= row.unidade;
					evidencia[i].obs				= row.obs;
					evidencia[i].imagem_uri			= row.imagem_uri;
				}
				fn(evidencia);
			}
		});
	});
}

function get_all_evidencia_t(fn) 
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var evidencia = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					evidencia[i] = new Object();
					evidencia[i].id					= row.id;
					evidencia[i].evidencia_tipo_id	= row.evidencia_tipo_id;
					evidencia[i].re_id				= row.re_id;
					evidencia[i].numero_ordem		= row.numero_ordem;
					evidencia[i].numero_lacre		= row.numero_lacre;
					evidencia[i].data				= row.data;
					evidencia[i].hora				= row.hora;
					evidencia[i].nome_perito		= row.nome_perito;
					evidencia[i].coordenadas		= row.coordenadas;
					evidencia[i].unidade			= row.unidade;
					evidencia[i].obs				= row.obs;
					evidencia[i].imagem_uri			= row.imagem_uri;
				}
				fn(evidencia);
			}
		});
	});
}

function get_evidencia(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var evidencia = new Object();
				var row = result.rows.item(0);
				evidencia.id				= row.id;
				evidencia.evidencia_tipo_id	= row.evidencia_tipo_id;
				evidencia.re_id				= row.re_id;
				evidencia.numero_ordem		= row.numero_ordem;
				evidencia.numero_lacre		= row.numero_lacre;
				evidencia.data				= row.data;
				evidencia.hora				= row.hora;
				evidencia.nome_perito		= row.nome_perito;
				evidencia.coordenadas		= row.coordenadas;
				evidencia.unidade			= row.unidade;
				evidencia.obs				= row.obs;
				evidencia.imagem_uri		= row.imagem_uri;
				fn(evidencia);
			}
		});
	});
}

function get_no_evidencia(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia WHERE re_id = '" + re_id + "' ORDER BY id DESC LIMIT 0,1";
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

function get_last_evidencia(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var evidencia = new Object();
				var row = result.rows.item(0);
				evidencia.id = row.id;
				fn(evidencia);
			}
		});
	});
}

function salvar_evidencia(evidencia, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO evidencia (" +
					"evidencia_tipo_id, " + 
					"re_id, " + 
					"numero_ordem, " + 
					"numero_lacre, " + 
					"data, " + 
					"hora, " + 
					"nome_perito, " + 
					"coordenadas, " + 
					"unidade, " + 
					"obs, " + 
					"imagem_uri " + 
				") VALUES ( " +
					"'" + evidencia.evidencia_tipo_id + "', " + 
					"'" + evidencia.re_id + "', " + 
					"'" + evidencia.numero_ordem + "', " + 
					"'" + evidencia.numero_lacre + "', " + 
					"'" + formata_data_db(evidencia.data) + "', " + 
					"'" + evidencia.hora + "', " + 
					"'" + evidencia.nome_perito + "', " + 
					"'" + evidencia.coordenadas + "', " + 
					"'" + evidencia.unidade + "', " + 
					"'" + evidencia.obs + "', " + 
					"'" + evidencia.imagem_uri + "'" + 
				")";
		} else {
			var sql = "UPDATE evidencia SET " +
						"evidencia_tipo_id = '" + evidencia.evidencia_tipo_id + "', " +  
						"re_id = '" + evidencia.re_id + "', " +  
						"numero_ordem = '" + evidencia.numero_ordem + "', " + 
						"numero_lacre = '" + evidencia.numero_lacre + "', " + 
						"data = '" + formata_data_db(evidencia.data) + "', " + 
						"hora = '" + evidencia.hora + "', " + 
						"nome_perito = '" + evidencia.nome_perito + "', " + 
						"coordenadas = '" + evidencia.coordenadas + "', " + 
						"unidade = '" + evidencia.unidade + "', " + 
						"obs = '" + evidencia.obs + "', " + 
						"imagem_uri = '" + evidencia.imagem_uri + "'" + 
					" WHERE id = " + evidencia.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_evidencia(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM evidencia WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
			/*if (result.rows.length)
			{
				var evidencia = new Object();
				var row = result.rows.item(0);
				evidencia.id				= row.id;
				evidencia.evidencia_tipo_id	= row.evidencia_tipo_id;
				evidencia.re_id				= row.re_id;
				evidencia.numero_lacre		= row.numero_lacre;
				evidencia.data				= row.data;
				evidencia.hora				= row.hora;
				evidencia.nome_perito		= row.nome_perito;
				evidencia.coordenadas		= row.coordenadas;
				evidencia.unidade			= row.unidade;
				evidencia.obs				= row.obs;
				evidencia.imagem_uri		= row.imagem_uri;
			}*/
		});
	});
}

function reordena_evidencia()
{
	get_all_evidencia(function(evidencia) {
		var x = 1;
		for (var i = 0; i < evidencia.length; i++) 
		{
			evidencia[i].numero_ordem = x;
			salvar_evidencia(evidencia[i], 'editar', function(resultado) {});
			x++;
		}		
	});
}

/////// EVIDÊNCIAS INÍCIO

$(document).on('pageshow', '#evidencia_lista', function()
{
	var output = '';
	$('#lista_evidencia').empty();
	get_all_evidencia(function(evidencia) {
		for (var i = 0; i < evidencia.length; i++)
		{
			output += '<li id="' + evidencia[i].id + '" data-id="' + evidencia[i].id + '"><a href="#"><h2>' + evidencia[i].nome_perito + '</h2><p><strong>' + formata_data(evidencia[i].data) + ', ' + evidencia[i].hora + '</strong></p><p>' + evidencia[i].obs + '</p><p class="ui-li-aside"><strong>' + evidencia[i].numero_lacre + '</strong></p></a><a href="#" class="excluir">Excluir</a></li>';
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
			$('#evidencia_form #data').val(formata_data(evidencia.data));
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
		if (dados.operacao_bd == 'novo') {
			get_last_evidencia(function(evidencia) {
				var id = evidencia.id;
				$('#evidencia_form #operacao_bd').val('editar');
				$('#evidencia_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_evidencia_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#evidencia_form #id").val();
	transmitir_evidencia(id);
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