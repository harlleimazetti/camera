function get_all_administrativa(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM administrativa WHERE re_id = '" + re_id + "' ORDER BY id, data_requisicao, hora_requisicao";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var administrativa = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					administrativa[i] = new Object();
					administrativa[i].id				= row.id;
					administrativa[i].re_id				= row.re_id;
					administrativa[i].cidade_id			= row.cidade_id;
					administrativa[i].bo_tc				= row.bo_tc;
					administrativa[i].dp				= row.dp;
					administrativa[i].data_requisicao	= row.data_requisicao;
					administrativa[i].hora_requisicao	= row.hora_requisicao;
					administrativa[i].data_atendimento	= row.data_atendimento;
					administrativa[i].hora_atendimento	= row.hora_atendimento;
					administrativa[i].preservacao		= row.preservacao;
					administrativa[i].logradouro		= row.logradouro;
					administrativa[i].numero			= row.numero;
					administrativa[i].complemento		= row.complemento;
					administrativa[i].coordenadas		= row.coordenadas;
					administrativa[i].bairro			= row.bairro;
					administrativa[i].obs				= row.obs;
					administrativa[i].hipoteses			= row.hipoteses;
				}
				fn(administrativa);
			}
		});
	});
}

function get_administrativa(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM administrativa WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var administrativa = new Object();
				var row = result.rows.item(0);
				administrativa.id				= row.id;
				administrativa.re_id			= row.re_id;
				administrativa.cidade_id		= row.cidade_id;
				administrativa.bo_tc			= row.bo_tc;
				administrativa.dp				= row.dp;
				administrativa.data_requisicao	= row.data_requisicao;
				administrativa.hora_requisicao	= row.hora_requisicao;
				administrativa.data_atendimento	= row.data_atendimento;
				administrativa.hora_atendimento	= row.hora_atendimento;
				administrativa.preservacao		= row.preservacao;
				administrativa.logradouro		= row.logradouro;
				administrativa.numero			= row.numero;
				administrativa.complemento		= row.complemento;
				administrativa.bairro			= row.bairro;
				administrativa.coordenadas		= row.coordenadas;
				administrativa.obs				= row.obs;
				administrativa.hipoteses		= row.hipoteses;
				fn(administrativa);
			}
		});
	});
}

function get_administrativa_re(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM administrativa WHERE re_id = " + re_id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var administrativa = new Object();
				var row = result.rows.item(0);
				administrativa.id				= row.id;
				administrativa.re_id			= row.re_id;
				administrativa.cidade_id		= row.cidade_id;
				administrativa.bo_tc			= row.bo_tc;
				administrativa.dp				= row.dp;
				administrativa.data_requisicao	= row.data_requisicao;
				administrativa.hora_requisicao	= row.hora_requisicao;
				administrativa.data_atendimento	= row.data_atendimento;
				administrativa.hora_atendimento	= row.hora_atendimento;
				administrativa.preservacao		= row.preservacao;
				administrativa.logradouro		= row.logradouro;
				administrativa.numero			= row.numero;
				administrativa.complemento		= row.complemento;
				administrativa.bairro			= row.bairro;
				administrativa.coordenadas		= row.coordenadas;
				administrativa.obs				= row.obs;
				administrativa.hipoteses		= row.hipoteses;
				fn(administrativa);
			} else {
				fn(false);
			}
		});
	});
}

function get_last_administrativa(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM administrativa ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var administrativa = new Object();
				var row = result.rows.item(0);
				administrativa.id = row.id;
				fn(administrativa);
			}
		});
	});
}

function salvar_administrativa(administrativa, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO administrativa (" +
					"id, " + 
					"re_id, " + 
					"cidade_id, " + 
					"bo_tc, " + 
					"dp, " + 
					"data_requisicao, " + 
					"hora_requisicao, " + 
					"data_atendimento, " + 
					"hora_atendimento, " + 
					"preservacao, " + 
					"logradouro, " + 
					"numero, " + 
					"complemento, " + 
					"bairro, " + 
					"coordenadas, " + 
					"obs, " + 
					"hipoteses " + 
				") VALUES ( " +
					"'" + administrativa.id + "', " + 
					"'" + administrativa.re_id + "', " + 
					"'" + administrativa.cidade_id + "', " + 
					"'" + administrativa.bo_tc + "', " + 
					"'" + administrativa.dp + "', " + 
					"'" + formata_data_db(administrativa.data_requisicao) + "', " + 
					"'" + administrativa.hora_requisicao + "', " + 
					"'" + formata_data_db(administrativa.data_atendimento) + "', " + 
					"'" + administrativa.hora_atendimento + "', " + 
					"'" + administrativa.preservacao + "', " + 
					"'" + administrativa.logradouro + "', " + 
					"'" + administrativa.numero + "', " + 
					"'" + administrativa.complemento + "', " + 
					"'" + administrativa.bairro + "', " + 
					"'" + administrativa.coordenadas + "', " + 
					"'" + administrativa.obs + "', " + 
					"'" + administrativa.hipoteses + "'" + 
				")";
		} else {
			var sql = "UPDATE administrativa SET " +
						"re_id = '" + administrativa.re_id + "', " +  
						"cidade_id = '" + administrativa.cidade_id + "', " + 
						"bo_tc = '" + administrativa.bo_tc + "', " + 
						"dp = '" + administrativa.dp + "', " + 
						"data_requisicao = '" + formata_data_db(administrativa.data_requisicao) + "', " + 
						"hora_requisicao = '" + administrativa.hora_requisicao + "', " + 
						"data_atendimento = '" + formata_data_db(administrativa.data_atendimento) + "', " + 
						"hora_atendimento = '" + administrativa.hora_atendimento + "', " + 
						"preservacao = '" + administrativa.preservacao + "', " + 
						"logradouro = '" + administrativa.logradouro + "', " + 
						"numero = '" + administrativa.numero + "', " + 
						"complemento = '" + administrativa.complemento + "', " + 
						"bairro = '" + administrativa.bairro + "', " + 
						"coordenadas = '" + administrativa.coordenadas + "', " + 
						"obs = '" + administrativa.obs + "', " + 
						"hipoteses = '" + administrativa.hipoteses + "'" + 
					" WHERE id = " + administrativa.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_administrativa(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM administrativa WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

/////// ADMINISTRATIVA INÍCIO

$(document).on('pageshow', '#administrativa_lista', function()
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

$(document).on('click', '#lista_administrativa li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_administrativa li .excluir', function()
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

$(document).on('pagebeforeshow', '#formulario_administrativa', function()
{
	var re_id = sessionStorage.re_id;
	get_administrativa_re(re_id, function(administrativa) {
		if (administrativa == false) {
			operacao_bd = 'novo';
			$('#administrativa_form #operacao_bd').val(operacao_bd);
			$('#administrativa_form #id').val(0);
			$('#administrativa_form #cidade_id').val(0).selectmenu('refresh');
			$('#administrativa_form #re_id').val(sessionStorage.re_id);
			$('#administrativa_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#administrativa_form #bo_tc').val('');
			$('#administrativa_form #dp').val('');
			$('#administrativa_form #data_requisicao').val('');
			$('#administrativa_form #hora_requisicao').val('');
			$('#administrativa_form #data_atendimento').val('');
			$('#administrativa_form #hora_atendimento').val('');
			$('#administrativa_form #preservacao').val(1).selectmenu('refresh');
			$('#administrativa_form #logradouro').val('');
			$('#administrativa_form #numero').val('');
			$('#administrativa_form #complemento').val('');
			$('#administrativa_form #bairro').val('');
			$('#administrativa_form #coordenadas').val('');
			$('#administrativa_form #obs').val('');
			$('#administrativa_form #hipoteses').val('');
			var data = data_atual();
			var hora = hora_atual();
			$('#administrativa_form #data_requisicao').val(data);
			$('#administrativa_form #hora_requisicao').val(hora);
			$('#administrativa_form #data_atendimento').val(data);
			$('#administrativa_form #hora_atendimento').val(hora);
		} else {
			operacao_bd = 'editar';
			$('#administrativa_form #operacao_bd').val(operacao_bd);
			$('#administrativa_form #id').val(administrativa.id);
			$('#administrativa_form #cidade_id').val(administrativa.cidade_id).selectmenu('refresh');
			$('#administrativa_form #re_id').val(sessionStorage.re_id);
			$('#administrativa_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#administrativa_form #bo_tc').val(administrativa.bo_tc);
			$('#administrativa_form #dp').val(administrativa.dp);
			$('#administrativa_form #data_requisicao').val(formata_data(administrativa.data_requisicao));
			$('#administrativa_form #hora_requisicao').val(administrativa.hora_requisicao);
			$('#administrativa_form #data_atendimento').val(formata_data(administrativa.data_atendimento));
			$('#administrativa_form #hora_atendimento').val(administrativa.hora_atendimento);
			$('#administrativa_form #preservacao').val(administrativa.preservacao).selectmenu('refresh');
			$('#administrativa_form #logradouro').val(administrativa.logradouro);
			$('#administrativa_form #numero').val(administrativa.numero);
			$('#administrativa_form #complemento').val(administrativa.complemento);
			$('#administrativa_form #bairro').val(administrativa.bairro);
			$('#administrativa_form #coordenadas').val(administrativa.coordenadas);
			$('#administrativa_form #obs').val(administrativa.obs);
			$('#administrativa_form #hipoteses').val(administrativa.hipoteses);	
		}
	});
});

$(document).on('click', '#btn_administrativa_novo', function(event)
{
	event.preventDefault();
	sessionStorage.administrativa_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#administrativa_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_administrativa_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#administrativa_form").serializeJSON();
	salvar_administrativa(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		if (dados.operacao_bd == 'novo') {
			get_last_administrativa(function(administrativa) {
				var id = administrativa.id;
				$('#administrativa_form #operacao_bd').val('editar');
				$('#administrativa_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_administrativa_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#administrativa_form #id").val();
	transmitir_administrativa(id);
});

$(document).on('click', '#btn_administrativa_limpar', function(event)
{
	event.preventDefault();
			$('#administrativa_form #cidade_id').val(0).selectmenu('refresh');
			$('#administrativa_form #bo_tc').val('');
			$('#administrativa_form #dp').val('');
			$('#administrativa_form #data_requisicao').val('');
			$('#administrativa_form #hora_requisicao').val('');
			$('#administrativa_form #data_atendimento').val('');
			$('#administrativa_form #hora_atendimento').val('');
			$('#administrativa_form #preservacao').val(0).selectmenu('refresh');
			$('#administrativa_form #logradouro').val('');
			$('#administrativa_form #numero').val('');
			$('#administrativa_form #complemento').val('');
			$('#administrativa_form #bairro').val('');
			$('#administrativa_form #coordenadas').val('');
			$('#administrativa_form #obs').val('');
			$('#administrativa_form #hipoteses').val('');
});

///////// ADMINISTRATIVA FIM