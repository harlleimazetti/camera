function get_all_vestigio(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio WHERE re_id = '" + re_id + "' ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var vestigio = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					vestigio[i] = new Object();
					vestigio[i].id					= row.id;
					vestigio[i].vestigio_tipo_id	= row.vestigio_tipo_id;
					vestigio[i].re_id				= row.re_id;
					vestigio[i].numero_ordem		= row.numero_ordem;
					vestigio[i].data				= row.data;
					vestigio[i].hora				= row.hora;
					vestigio[i].coordenadas			= row.coordenadas;
					vestigio[i].descricao			= row.descricao;
					vestigio[i].localizacao			= row.localizacao;
					vestigio[i].imagem_uri			= row.imagem_uri;
				}
				fn(vestigio);
			}
		});
	});
}

function get_all_vestigio_t(fn) 
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var vestigio = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					vestigio[i] = new Object();
					vestigio[i].id					= row.id;
					vestigio[i].vestigio_tipo_id	= row.vestigio_tipo_id;
					vestigio[i].re_id				= row.re_id;
					vestigio[i].numero_ordem		= row.numero_ordem;
					vestigio[i].data				= row.data;
					vestigio[i].hora				= row.hora;
					vestigio[i].coordenadas			= row.coordenadas;
					vestigio[i].descricao			= row.descricao;
					vestigio[i].localizacao			= row.localizacao;
					vestigio[i].imagem_uri			= row.imagem_uri;
				}
				fn(vestigio);
			}
		});
	});
}

function get_vestigio(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var vestigio = new Object();
				var row = result.rows.item(0);
				vestigio.id				= row.id;
				vestigio.vestigio_tipo_id	= row.vestigio_tipo_id;
				vestigio.re_id				= row.re_id;
				vestigio.numero_ordem		= row.numero_ordem;
				vestigio.data				= row.data;
				vestigio.hora				= row.hora;
				vestigio.coordenadas		= row.coordenadas;
				vestigio.descricao			= row.descricao;
				vestigio.localizacao		= row.localizacao;
				vestigio.imagem_uri			= row.imagem_uri;
				fn(vestigio);
			}
		});
	});
}

function get_no_vestigio(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio WHERE re_id = '" + re_id + "' ORDER BY id DESC LIMIT 0,1";
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

function get_last_vestigio(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var vestigio = new Object();
				var row = result.rows.item(0);
				vestigio.id	= row.id;
				fn(vestigio);
			}
		});
	});
}

function salvar_vestigio(vestigio, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO vestigio (" +
					"vestigio_tipo_id, " + 
					"re_id, " + 
					"numero_ordem, " + 
					"data, " + 
					"hora, " + 
					"coordenadas, " + 
					"descricao, " + 
					"localizacao, " + 
					"imagem_uri " + 
				") VALUES ( " +
					"'" + vestigio.vestigio_tipo_id + "', " + 
					"'" + vestigio.re_id + "', " + 
					"'" + vestigio.numero_ordem + "', " + 
					"'" + formata_data_db(vestigio.data) + "', " + 
					"'" + vestigio.hora + "', " + 
					"'" + vestigio.coordenadas + "', " + 
					"'" + vestigio.descricao + "', " + 
					"'" + vestigio.localizacao + "', " + 
					"'" + vestigio.imagem_uri + "'" + 
				")";
		} else {
			var sql = "UPDATE vestigio SET " +
						"vestigio_tipo_id = '" + vestigio.vestigio_tipo_id + "', " +  
						"re_id = '" + vestigio.re_id + "', " +  
						"numero_ordem = '" + vestigio.numero_ordem + "', " + 
						"data = '" + formata_data_db(vestigio.data) + "', " + 
						"hora = '" + vestigio.hora + "', " + 
						"coordenadas = '" + vestigio.coordenadas + "', " + 
						"descricao = '" + vestigio.descricao + "', " + 
						"localizacao = '" + vestigio.localizacao + "', " + 
						"imagem_uri = '" + vestigio.imagem_uri + "'" + 
					" WHERE id = " + vestigio.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_vestigio(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM vestigio WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

function reordena_vestigio()
{
	get_all_vestigio(function(vestigio) {
		var x = 1;
		for (var i = 0; i < vestigio.length; i++) 
		{
			vestigio[i].numero_ordem = x;
			salvar_vestigio(vestigio[i], 'editar', function(resultado) {});
			x++;
		}		
	});
}

///////// VESTÍGIOS INÍCIO

$(document).on('pageshow', '#vestigio_lista', function()
{
	var output = '';
	$('#lista_vestigio').empty();
	get_all_vestigio(function(vestigio) {
		for (var i = 0; i < vestigio.length; i++)
		{
			output += '<li id="' + vestigio[i].id + '" data-id="' + vestigio[i].id + '"><a href="#"><h2>' + vestigio[i].localizacao + '</h2><p><strong>' + formata_data(vestigio[i].data) + ', ' + vestigio[i].hora + '</strong></p><p>' + vestigio[i].descricao + '</p></a><a href="#" class="excluir">Excluir</a></li>';
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
			$('#vestigio_form #data').val(formata_data(vestigio.data));
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
		if (dados.operacao_bd == 'novo') {
			get_last_vestigio(function(vestigio) {
				var id = vestigio.id;
				$('#vestigio_form #operacao_bd').val('editar');
				$('#vestigio_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_vestigio_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#vestigio_form #id").val();
	transmitir_vestigio(id);
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