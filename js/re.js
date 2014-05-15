function get_all_re(fn) 
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM re ORDER BY data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var re = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					re[i] = new Object();
					re[i].id			= row.id;
					re[i].codigo		= row.codigo;
					re[i].data			= row.data;
					re[i].hora			= row.hora;
					re[i].endereco		= row.endereco;
					re[i].coordenadas	= row.coordenadas;
					re[i].crime			= row.crime;
					re[i].obs			= row.obs;
					re[i].novo			= row.novo;
				}
				fn(re);
			}
		});
	});
}

function get_re(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM re WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var re = new Object();
				var row = result.rows.item(0);
				re.id			= row.id;
				re.codigo		= row.codigo;
				re.data			= row.data;
				re.hora			= row.hora;
				re.endereco		= row.endereco;
				re.coordenadas	= row.coordenadas;
				re.crime		= row.crime;
				re.obs			= row.obs;
				re.novo			= row.novo;
				fn(re);
			}
		});
	});
}

function salvar_re(re, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql =	"INSERT INTO re (" +
							"id, " + 
							"codigo, " + 
							"data, " + 
							"hora, " + 
							"endereco, " + 
							"coordenadas, " + 
							"crime, " + 
							"obs, " + 
							"novo " + 
						") VALUES ( " +
							"'" + re.id + "', " + 
							"'" + re.codigo + "', " + 
							"'" + formata_data_db(re.data) + "', " + 
							"'" + re.hora + "', " + 
							"'" + re.endereco + "', " + 
							"'" + re.coordenadas + "', " +
							"'" + re.crime + "', " +
							"'" + re.obs + "', " +
							"'" + re.novo + "' " +
						")";
		} else {
			var sql =	"UPDATE re SET " +
							"data = '" + formata_data_db(re.data) + "', " +
							"hora = '" + re.hora + "', " +
							"endereco = '" + re.endereco + "', " +
							"coordenadas = '" + re.coordenadas + "', " +
							"crime = '" + re.crime + "', " +
							"obs = '" + re.obs + "', " +
							"novo = '" + re.novo + "' " +
						"WHERE id = " + re.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_re(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM evidencia WHERE re_id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var sql = "DELETE FROM re WHERE id = " + id;
			tx.executeSql (sql, undefined, function (tx, result)
			{
				var resultado = new Object();
				resultado.status = 1;
				resultado.mensagem = 'Registro excluído com sucesso';	
				fn(resultado);
			});
		});
	});
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
			output += '<li data-theme="' + data_theme + '" data-id="' + re[i].id + '"><a href="#formulario"><h2>' + re[i].crime + '</h2><p><strong>' + formata_data(re[i].data) + ', ' + re[i].hora + '</strong></p><p>' + re[i].obs + '</p><p class="ui-li-aside"><strong>' + re[i].codigo + '</strong></p></a></a><a href="#" class="excluir">Excluir</a></li>';
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
		re.data = formata_data(re.data);
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
			$('#re_form #data').val(formata_data(re.data));
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