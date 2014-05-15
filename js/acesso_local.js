function get_all_acesso_local(fn)
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_local WHERE re_id = '" + re_id + "' ORDER BY id";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_local = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					acesso_local[i] = new Object();
					acesso_local[i].id					= row.id;
					acesso_local[i].re_id				= row.re_id;
					acesso_local[i].limite_id			= row.limite_id;
					acesso_local[i].escalada_id			= row.escalada_id;
					acesso_local[i].modo_escalada_id	= row.modo_escalada_id;
					acesso_local[i].rompimento_id		= row.rompimento_id;
					acesso_local[i].modo_rompimento_id	= row.modo_rompimento_id;
					acesso_local[i].chave_falsa_id		= row.chave_falsa_id;
					acesso_local[i].imagem1				= row.imagem1;
					acesso_local[i].imagem1_uri			= row.imagem1_uri;
					acesso_local[i].imagem2				= row.imagem2;
					acesso_local[i].imagem2_uri			= row.imagem2_uri;
					acesso_local[i].obs					= row.obs;
					acesso_local[i].hipoteses			= row.hipoteses;
				}
				fn(acesso_local);
			}
		});
	});
}

function get_acesso_local(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_local WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_local = new Object();
				var row = result.rows.item(0);
				acesso_local.id					= row.id;
				acesso_local.re_id				= row.re_id;
				acesso_local.limite_id			= row.limite_id;
				acesso_local.escalada_id		= row.escalada_id;
				acesso_local.modo_escalada_id	= row.modo_escalada_id;
				acesso_local.rompimento_id		= row.rompimento_id;
				acesso_local.modo_rompimento_id	= row.modo_rompimento_id;
				acesso_local.chave_falsa_id		= row.chave_falsa_id;
				acesso_local.imagem1			= row.imagem1;
				acesso_local.imagem1_uri		= row.imagem1_uri;
				acesso_local.imagem2			= row.imagem2;
				acesso_local.imagem2_uri		= row.imagem2_uri;
				acesso_local.obs				= row.obs;
				acesso_local.hipoteses			= row.hipoteses;
				fn(acesso_local);
			}
		});
	});
}

function get_acesso_local_re(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_local WHERE re_id = " + re_id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_local = new Object();
				var row = result.rows.item(0);
				acesso_local.id					= row.id;
				acesso_local.re_id				= row.re_id;
				acesso_local.limite_id			= row.limite_id;
				acesso_local.escalada_id		= row.escalada_id;
				acesso_local.modo_escalada_id	= row.modo_escalada_id;
				acesso_local.rompimento_id		= row.rompimento_id;
				acesso_local.modo_rompimento_id	= row.modo_rompimento_id;
				acesso_local.chave_falsa_id		= row.chave_falsa_id;
				acesso_local.imagem1			= row.imagem1;
				acesso_local.imagem1_uri		= row.imagem1_uri;
				acesso_local.imagem2			= row.imagem2;
				acesso_local.imagem2_uri		= row.imagem2_uri;
				acesso_local.obs				= row.obs;
				acesso_local.hipoteses			= row.hipoteses;
				fn(acesso_local);
			} else {
				fn(false);
			}
		});
	});
}

function get_last_acesso_local(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_local ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_local = new Object();
				var row = result.rows.item(0);
				acesso_local.id	= row.id;
				fn(acesso_local);
			}
		});
	});
}

function salvar_acesso_local(acesso_local, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO acesso_local (" +
					"re_id, " + 
					"limite_id, " + 
					"escalada_id, " + 
					"modo_escalada_id, " + 
					"rompimento_id, " + 
					"modo_rompimento_id, " + 
					"chave_falsa_id, " + 
					"imagem1, " + 
					"imagem1_uri, " + 
					"imagem2, " + 
					"imagem2_uri, " + 
					"obs, " + 
					"hipoteses " + 
				") VALUES ( " +
					"'" + acesso_local.re_id + "', " + 
					"'" + acesso_local.limite_id + "', " + 
					"'" + acesso_local.escalada_id + "', " + 
					"'" + acesso_local.modo_escalada_id + "', " + 
					"'" + acesso_local.rompimento_id + "', " + 
					"'" + acesso_local.modo_rompimento_id + "', " + 
					"'" + acesso_local.chave_falsa_id + "', " + 
					"'', " + 
					"'" + acesso_local.imagem1_uri + "', " + 
					"'', " + 
					"'" + acesso_local.imagem2_uri + "', " + 
					"'" + acesso_local.obs + "', " + 
					"'" + acesso_local.hipoteses + "'" + 
				")";
		} else {
			var sql = "UPDATE acesso_local SET " +
						"re_id = '" + acesso_local.re_id + "', " +  
						"limite_id = '" + acesso_local.limite_id + "', " + 
						"escalada_id = '" + acesso_local.escalada_id + "', " + 
						"modo_escalada_id = '" + acesso_local.modo_escalada_id + "', " + 
						"rompimento_id = '" + acesso_local.rompimento_id + "', " + 
						"modo_rompimento_id = '" + acesso_local.modo_rompimento_id + "', " + 
						"chave_falsa_id = '" + acesso_local.chave_falsa_id + "', " + 
						"imagem1 = '', " + 
						"imagem1_uri = '" + acesso_local.imagem1_uri + "', " + 
						"imagem2 = '', " + 
						"imagem2_uri = '" + acesso_local.imagem2_uri + "', " + 
						"obs = '" + acesso_local.obs + "', " + 
						"hipoteses = '" + acesso_local.hipoteses + "'" + 
					" WHERE id = " + acesso_local.id;
		} 
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_acesso_local(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM acesso_local WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

/////// acesso_local INÍCIO

$(document).on('pageshow', '#acesso_local_lista', function()
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

$(document).on('click', '#lista_acesso_local li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_acesso_local li .excluir', function()
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

$(document).on('pagebeforeshow', '#formulario_acesso_local', function()
{
	var re_id = sessionStorage.re_id;
	get_acesso_local_re(re_id, function(acesso_local) {
		if (acesso_local == false) {
			operacao_bd = 'novo';
			$('#acesso_local_form #operacao_bd').val(operacao_bd);
			$('#acesso_local_form #id').val(0);
			$('#acesso_local_form #re_id').val(sessionStorage.re_id);
			$('#acesso_local_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#acesso_local_form #limite_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #escalada_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #modo_escalada_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #rompimento_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #modo_rompimento_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #chave_falsa_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #imagem1_uri').val('');
			$('#acesso_local_form #visualizacao_imagem1').attr('src', '');
			$('#acesso_local_form #imagem2_uri').val('');
			$('#acesso_local_form #visualizacao_imagem2').attr('src', '');
			$('#acesso_local_form #obs').val('');
			$('#acesso_local_form #hipoteses').val('');
		} else {
			operacao_bd = 'editar';
			$('#acesso_local_form #operacao_bd').val(operacao_bd);
			$('#acesso_local_form #id').val(acesso_local.id);
			$('#acesso_local_form #re_id').val(sessionStorage.re_id);
			$('#acesso_local_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#acesso_local_form #limite_id').val(acesso_local.limite_id).selectmenu('refresh');
			$('#acesso_local_form #escalada_id').val(acesso_local.escalada_id).selectmenu('refresh');
			$('#acesso_local_form #modo_escalada_id').val(acesso_local.modo_escalada_id).selectmenu('refresh');
			$('#acesso_local_form #rompimento_id').val(acesso_local.rompimento_id).selectmenu('refresh');
			$('#acesso_local_form #modo_rompimento_id').val(acesso_local.modo_rompimento_id).selectmenu('refresh');
			$('#acesso_local_form #chave_falsa_id').val(acesso_local.chave_falsa_id).selectmenu('refresh');
			$('#acesso_local_form #imagem1_uri').val(acesso_local.imagem1_uri);
			$('#acesso_local_form #visualizacao_imagem1').attr('src', acesso_local.imagem1_uri);
			$('#acesso_local_form #imagem2_uri').val(acesso_local.imagem2_uri);
			$('#acesso_local_form #visualizacao_imagem2').attr('src', acesso_local.imagem2_uri);
			$('#acesso_local_form #obs').val(acesso_local.obs);
			$('#acesso_local_form #hipoteses').val(acesso_local.hipoteses);
		}
	});
});

$(document).on('click', '#btn_acesso_local_novo', function(event)
{
	event.preventDefault();
	sessionStorage.acesso_local_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#acesso_local_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_acesso_local_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#acesso_local_form").serializeJSON();
	salvar_acesso_local(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		if (dados.operacao_bd == 'novo') {
			get_last_acesso_local(function(acesso_local) {
				var id = acesso_local.id;
				$('#acesso_local_form #operacao_bd').val('editar');
				$('#acesso_local_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_acesso_local_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#acesso_local_form #id").val();
	transmitir_acesso_local(id);
});

$(document).on('click', '#btn_acesso_local_limpar', function(event)
{
	event.preventDefault();
			$('#acesso_local_form #limite_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #escalada_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #modo_escalada_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #rompimento_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #modo_rompimento_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #chave_falsa_id').val(0).selectmenu('refresh');
			$('#acesso_local_form #imagem1_uri').val('');
			$('#acesso_local_form #visualizacao_imagem1').attr('src', '');
			$('#acesso_local_form #imagem2_uri').val('');
			$('#acesso_local_form #visualizacao_imagem2').attr('src', '');
			$('#acesso_local_form #obs').val('');
			$('#acesso_local_form #hipoteses').val('');
});

///////// acesso_local FIM