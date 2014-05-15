function get_all_acesso_coisa(fn)
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_coisa WHERE re_id = '" + re_id + "' ORDER BY id";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_coisa = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					acesso_coisa[i] = new Object();
					acesso_coisa[i].id					= row.id;
					acesso_coisa[i].re_id				= row.re_id;
					acesso_coisa[i].res_pri_comodo_id	= row.res_pri_comodo_id;
					acesso_coisa[i].res_atuacao_id		= row.res_atuacao_id;
					acesso_coisa[i].res_outro_comodo_id	= row.res_outro_comodo_id;
					acesso_coisa[i].res_imagem1			= row.res_imagem1;
					acesso_coisa[i].res_imagem1_uri		= row.res_imagem1_uri;
					acesso_coisa[i].res_imagem2			= row.res_imagem2;
					acesso_coisa[i].res_imagem2_uri		= row.res_imagem2_uri;
					acesso_coisa[i].com_pri_comodo_id	= row.com_pri_comodo_id;
					acesso_coisa[i].com_atuacao_id		= row.com_atuacao_id;
					acesso_coisa[i].com_outro_comodo_id	= row.com_outro_comodo_id;
					acesso_coisa[i].com_imagem1			= row.com_imagem1;
					acesso_coisa[i].com_imagem1_uri		= row.com_imagem1_uri;
					acesso_coisa[i].com_imagem2			= row.com_imagem2;
					acesso_coisa[i].com_imagem2_uri		= row.com_imagem2_uri;
					acesso_coisa[i].ind_pri_comodo_id	= row.ind_pri_comodo_id;
					acesso_coisa[i].ind_atuacao_id		= row.ind_atuacao_id;
					acesso_coisa[i].ind_outro_comodo_id	= row.ind_outro_comodo_id;
					acesso_coisa[i].ind_imagem1			= row.ind_imagem1;
					acesso_coisa[i].ind_imagem1_uri		= row.ind_imagem1_uri;
					acesso_coisa[i].ind_imagem2			= row.ind_imagem2;
					acesso_coisa[i].ind_imagem2_uri		= row.ind_imagem2_uri;
					acesso_coisa[i].esco_pri_comodo_id	= row.esco_pri_comodo_id;
					acesso_coisa[i].esco_atuacao_id		= row.esco_atuacao_id;
					acesso_coisa[i].esco_outro_comodo_id= row.esco_outro_comodo_id;
					acesso_coisa[i].esco_imagem1		= row.esco_imagem1;
					acesso_coisa[i].esco_imagem1_uri	= row.esco_imagem1_uri;
					acesso_coisa[i].esco_imagem2		= row.esco_imagem2;
					acesso_coisa[i].esco_imagem2_uri	= row.esco_imagem2_uri;
					acesso_coisa[i].escr_pri_comodo_id	= row.escr_pri_comodo_id;
					acesso_coisa[i].escr_atuacao_id		= row.escr_atuacao_id;
					acesso_coisa[i].escr_outro_comodo_id= row.escr_outro_comodo_id;
					acesso_coisa[i].escr_imagem1		= row.escr_imagem1;
					acesso_coisa[i].escr_imagem1_uri	= row.escr_imagem1_uri;
					acesso_coisa[i].escr_imagem2		= row.escr_imagem2;
					acesso_coisa[i].escr_imagem2_uri	= row.escr_imagem2_uri;
					acesso_coisa[i].obs					= row.obs;
					acesso_coisa[i].hipoteses			= row.hipoteses;
				}
				fn(acesso_coisa);
			}
		});
	});
}

function get_acesso_coisa(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_coisa WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_coisa = new Object();
				var row = result.rows.item(0);
				acesso_coisa.id						= row.id;
				acesso_coisa.re_id					= row.re_id;
				acesso_coisa.res_pri_comodo_id		= row.res_pri_comodo_id;
				acesso_coisa.res_atuacao_id			= row.res_atuacao_id;
				acesso_coisa.res_outro_comodo_id	= row.res_outro_comodo_id;
				acesso_coisa.res_imagem1			= row.res_imagem1;
				acesso_coisa.res_imagem1_uri		= row.res_imagem1_uri;
				acesso_coisa.res_imagem2			= row.res_imagem2;
				acesso_coisa.res_imagem2_uri		= row.res_imagem2_uri;
				acesso_coisa.com_pri_comodo_id		= row.com_pri_comodo_id;
				acesso_coisa.com_atuacao_id			= row.com_atuacao_id;
				acesso_coisa.com_outro_comodo_id	= row.com_outro_comodo_id;
				acesso_coisa.com_imagem1			= row.com_imagem1;
				acesso_coisa.com_imagem1_uri		= row.com_imagem1_uri;
				acesso_coisa.com_imagem2			= row.com_imagem2;
				acesso_coisa.com_imagem2_uri		= row.com_imagem2_uri;
				acesso_coisa.ind_pri_comodo_id		= row.ind_pri_comodo_id;
				acesso_coisa.ind_atuacao_id			= row.ind_atuacao_id;
				acesso_coisa.ind_outro_comodo_id	= row.ind_outro_comodo_id;
				acesso_coisa.ind_imagem1			= row.ind_imagem1;
				acesso_coisa.ind_imagem1_uri		= row.ind_imagem1_uri;
				acesso_coisa.ind_imagem2			= row.ind_imagem2;
				acesso_coisa.ind_imagem2_uri		= row.ind_imagem2_uri;
				acesso_coisa.esco_pri_comodo_id		= row.esco_pri_comodo_id;
				acesso_coisa.esco_atuacao_id		= row.esco_atuacao_id;
				acesso_coisa.esco_outro_comodo_id	= row.esco_outro_comodo_id;
				acesso_coisa.esco_imagem1			= row.esco_imagem1;
				acesso_coisa.esco_imagem1_uri		= row.esco_imagem1_uri;
				acesso_coisa.esco_imagem2			= row.esco_imagem2;
				acesso_coisa.esco_imagem2_uri		= row.esco_imagem2_uri;
				acesso_coisa.escr_pri_comodo_id		= row.escr_pri_comodo_id;
				acesso_coisa.escr_atuacao_id		= row.escr_atuacao_id;
				acesso_coisa.escr_outro_comodo_id	= row.escr_outro_comodo_id;
				acesso_coisa.escr_imagem1			= row.escr_imagem1;
				acesso_coisa.escr_imagem1_uri		= row.escr_imagem1_uri;
				acesso_coisa.escr_imagem2			= row.escr_imagem2;
				acesso_coisa.escr_imagem2_uri		= row.escr_imagem2_uri;
				acesso_coisa.obs					= row.obs;
				acesso_coisa.hipoteses				= row.hipoteses;
				fn(acesso_coisa);
			}
		});
	});
}

function get_acesso_coisa_re(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_coisa WHERE re_id = " + re_id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_coisa = new Object();
				var row = result.rows.item(0);
				acesso_coisa.id						= row.id;
				acesso_coisa.re_id					= row.re_id;
				acesso_coisa.res_pri_comodo_id		= row.res_pri_comodo_id;
				acesso_coisa.res_atuacao_id			= row.res_atuacao_id;
				acesso_coisa.res_outro_comodo_id	= row.res_outro_comodo_id;
				acesso_coisa.res_imagem1			= row.res_imagem1;
				acesso_coisa.res_imagem1_uri		= row.res_imagem1_uri;
				acesso_coisa.res_imagem2			= row.res_imagem2;
				acesso_coisa.res_imagem2_uri		= row.res_imagem2_uri;
				acesso_coisa.com_pri_comodo_id		= row.com_pri_comodo_id;
				acesso_coisa.com_atuacao_id			= row.com_atuacao_id;
				acesso_coisa.com_outro_comodo_id	= row.com_outro_comodo_id;
				acesso_coisa.com_imagem1			= row.com_imagem1;
				acesso_coisa.com_imagem1_uri		= row.com_imagem1_uri;
				acesso_coisa.com_imagem2			= row.com_imagem2;
				acesso_coisa.com_imagem2_uri		= row.com_imagem2_uri;
				acesso_coisa.ind_pri_comodo_id		= row.ind_pri_comodo_id;
				acesso_coisa.ind_atuacao_id			= row.ind_atuacao_id;
				acesso_coisa.ind_outro_comodo_id	= row.ind_outro_comodo_id;
				acesso_coisa.ind_imagem1			= row.ind_imagem1;
				acesso_coisa.ind_imagem1_uri		= row.ind_imagem1_uri;
				acesso_coisa.ind_imagem2			= row.ind_imagem2;
				acesso_coisa.ind_imagem2_uri		= row.ind_imagem2_uri;
				acesso_coisa.esco_pri_comodo_id		= row.esco_pri_comodo_id;
				acesso_coisa.esco_atuacao_id		= row.esco_atuacao_id;
				acesso_coisa.esco_outro_comodo_id	= row.esco_outro_comodo_id;
				acesso_coisa.esco_imagem1			= row.esco_imagem1;
				acesso_coisa.esco_imagem1_uri		= row.esco_imagem1_uri;
				acesso_coisa.esco_imagem2			= row.esco_imagem2;
				acesso_coisa.esco_imagem2_uri		= row.esco_imagem2_uri;
				acesso_coisa.escr_pri_comodo_id		= row.escr_pri_comodo_id;
				acesso_coisa.escr_atuacao_id		= row.escr_atuacao_id;
				acesso_coisa.escr_outro_comodo_id	= row.escr_outro_comodo_id;
				acesso_coisa.escr_imagem1			= row.escr_imagem1;
				acesso_coisa.escr_imagem1_uri		= row.escr_imagem1_uri;
				acesso_coisa.escr_imagem2			= row.escr_imagem2;
				acesso_coisa.escr_imagem2_uri		= row.escr_imagem2_uri;
				acesso_coisa.obs					= row.obs;
				acesso_coisa.hipoteses				= row.hipoteses;
				fn(acesso_coisa);
			} else {
				fn(false);
			}
		});
	});
}

function get_last_acesso_coisa(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM acesso_coisa ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var acesso_coisa = new Object();
				var row = result.rows.item(0);
				acesso_coisa.id	= row.id;
				fn(acesso_coisa);
			}
		});
	});
}

function salvar_acesso_coisa(acesso_coisa, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO acesso_coisa (" +
					"re_id, " + 
					"res_pri_comodo_id, " + 
					"res_atuacao_id, " + 
					"res_outro_comodo_id, " + 
					"res_imagem1, " + 
					"res_imagem1_uri, " + 
					"res_imagem2, " + 
					"res_imagem2_uri, " + 
					"com_pri_comodo_id, " + 
					"com_atuacao_id, " + 
					"com_outro_comodo_id, " + 
					"com_imagem1, " + 
					"com_imagem1_uri, " + 
					"com_imagem2, " + 
					"com_imagem2_uri, " + 
					"ind_pri_comodo_id, " + 
					"ind_atuacao_id, " + 
					"ind_outro_comodo_id, " + 
					"ind_imagem1, " + 
					"ind_imagem1_uri, " + 
					"ind_imagem2, " + 
					"ind_imagem2_uri, " + 
					"esco_pri_comodo_id, " + 
					"esco_atuacao_id, " + 
					"esco_outro_comodo_id, " + 
					"esco_imagem1, " + 
					"esco_imagem1_uri, " + 
					"esco_imagem2, " + 
					"esco_imagem2_uri, " + 
					"escr_pri_comodo_id, " + 
					"escr_atuacao_id, " + 
					"escr_outro_comodo_id, " + 
					"escr_imagem1, " + 
					"escr_imagem1_uri, " + 
					"escr_imagem2, " + 
					"escr_imagem2_uri, " + 
					"obs, " + 
					"hipoteses " + 
				") VALUES ( " +
					"'" + acesso_coisa.re_id + "', " + 
					"'" + acesso_coisa.res_pri_comodo_id + "', " + 
					"'" + acesso_coisa.res_atuacao_id + "', " + 
					"'" + acesso_coisa.res_outro_comodo_id + "', " + 
					"'', " + 
					"'" + acesso_coisa.res_imagem1_uri + "', " + 
					"'', " + 
					"'" + acesso_coisa.res_imagem2_uri + "', " + 
					"'" + acesso_coisa.com_pri_comodo_id + "', " + 
					"'" + acesso_coisa.com_atuacao_id + "', " + 
					"'" + acesso_coisa.com_outro_comodo_id + "', " + 
					"'', " + 
					"'" + acesso_coisa.com_imagem1_uri + "', " + 
					"'', " + 
					"'" + acesso_coisa.com_imagem2_uri + "', " + 
					"'" + acesso_coisa.ind_pri_comodo_id + "', " + 
					"'" + acesso_coisa.ind_atuacao_id + "', " + 
					"'" + acesso_coisa.ind_outro_comodo_id + "', " + 
					"'', " + 
					"'" + acesso_coisa.ind_imagem1_uri + "', " + 
					"'', " + 
					"'" + acesso_coisa.ind_imagem2_uri + "', " + 
					"'" + acesso_coisa.esco_pri_comodo_id + "', " + 
					"'" + acesso_coisa.esco_atuacao_id + "', " + 
					"'" + acesso_coisa.esco_outro_comodo_id + "', " + 
					"'', " + 
					"'" + acesso_coisa.esco_imagem1_uri + "', " + 
					"'', " + 
					"'" + acesso_coisa.esco_imagem2_uri + "', " + 
					"'" + acesso_coisa.escr_pri_comodo_id + "', " + 
					"'" + acesso_coisa.escr_atuacao_id + "', " + 
					"'" + acesso_coisa.escr_outro_comodo_id + "', " + 
					"'', " + 
					"'" + acesso_coisa.escr_imagem1_uri + "', " + 
					"'', " + 
					"'" + acesso_coisa.escr_imagem2_uri + "', " + 
					"'" + acesso_coisa.obs + "', " + 
					"'" + acesso_coisa.hipoteses + "'" + 
				")";
		} else {
			var sql = "UPDATE acesso_coisa SET " +
						"re_id = '" + acesso_coisa.re_id + "', " +  
						"res_pri_comodo_id = '" + acesso_coisa.res_pri_comodo_id + "', " + 
						"res_atuacao_id = '" + acesso_coisa.res_atuacao_id + "', " + 
						"res_outro_comodo_id = '" + acesso_coisa.res_outro_comodo_id + "', " + 
						"res_imagem1 = '', " + 
						"res_imagem1_uri = '" + acesso_coisa.res_imagem1_uri + "', " + 
						"res_imagem2 = '', " + 
						"res_imagem2_uri = '" + acesso_coisa.res_imagem2_uri + "', " + 
						"com_pri_comodo_id = '" + acesso_coisa.com_pri_comodo_id + "', " + 
						"com_atuacao_id = '" + acesso_coisa.com_atuacao_id + "', " + 
						"com_outro_comodo_id = '" + acesso_coisa.com_outro_comodo_id + "', " + 
						"com_imagem1 = '', " + 
						"com_imagem1_uri = '" + acesso_coisa.com_imagem1_uri + "', " + 
						"com_imagem2 = '', " + 
						"com_imagem2_uri = '" + acesso_coisa.com_imagem2_uri + "', " + 
						"ind_pri_comodo_id = '" + acesso_coisa.ind_pri_comodo_id + "', " + 
						"ind_atuacao_id = '" + acesso_coisa.ind_atuacao_id + "', " + 
						"ind_outro_comodo_id = '" + acesso_coisa.ind_outro_comodo_id + "', " + 
						"ind_imagem1 = '', " + 
						"ind_imagem1_uri = '" + acesso_coisa.ind_imagem1_uri + "', " + 
						"ind_imagem2 = '', " + 
						"ind_imagem2_uri = '" + acesso_coisa.ind_imagem2_uri + "', " + 
						"esco_pri_comodo_id = '" + acesso_coisa.esco_pri_comodo_id + "', " + 
						"esco_atuacao_id = '" + acesso_coisa.esco_atuacao_id + "', " + 
						"esco_outro_comodo_id = '" + acesso_coisa.esco_outro_comodo_id + "', " + 
						"esco_imagem1 = '', " + 
						"esco_imagem1_uri = '" + acesso_coisa.esco_imagem1_uri + "', " + 
						"esco_imagem2 = '', " + 
						"esco_imagem2_uri = '" + acesso_coisa.esco_imagem2_uri + "', " + 
						"escr_pri_comodo_id = '" + acesso_coisa.escr_pri_comodo_id + "', " + 
						"escr_atuacao_id = '" + acesso_coisa.escr_atuacao_id + "', " + 
						"escr_outro_comodo_id = '" + acesso_coisa.escr_outro_comodo_id + "', " + 
						"escr_imagem1 = '', " + 
						"escr_imagem1_uri = '" + acesso_coisa.escr_imagem1_uri + "', " + 
						"escr_imagem2 = '', " + 
						"escr_imagem2_uri = '" + acesso_coisa.escr_imagem2_uri + "', " + 
						"obs = '" + acesso_coisa.obs + "', " + 
						"hipoteses = '" + acesso_coisa.hipoteses + "'" + 
					" WHERE id = " + acesso_coisa.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_acesso_coisa(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM acesso_coisa WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

/////// acesso_coisa INÍCIO

$(document).on('pageshow', '#acesso_coisa_lista', function()
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

$(document).on('click', '#lista_acesso_coisa li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_acesso_coisa li .excluir', function()
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

$(document).on('pagebeforeshow', '#formulario_acesso_coisa', function()
{
	var re_id = sessionStorage.re_id;
	get_acesso_coisa_re(re_id, function(acesso_coisa) {
		if (acesso_coisa == false) {
			operacao_bd = 'novo';
			$('#acesso_coisa_form #operacao_bd').val(operacao_bd);
			$('#acesso_coisa_form #id').val(0);
			$('#acesso_coisa_form #re_id').val(sessionStorage.re_id);
			$('#acesso_coisa_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#acesso_coisa_form #res_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #res_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #res_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #res_imagem1').val('');
			$('#acesso_coisa_form #res_imagem1_uri').val('');
			$('#acesso_coisa_form #res_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #res_imagem2').val('');
			$('#acesso_coisa_form #res_imagem2_uri').val('');
			$('#acesso_coisa_form #res_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #com_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #com_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #com_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #com_imagem1').val('');
			$('#acesso_coisa_form #com_imagem1_uri').val('');
			$('#acesso_coisa_form #com_visualizacao_imagem2').attr('src', '');
			//$('#acesso_coisa_form #com_imagem2').val('');
			$('#acesso_coisa_form #com_imagem2_uri').val('');
			$('#acesso_coisa_form #com_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #ind_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #ind_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #ind_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #ind_imagem1').val('');
			$('#acesso_coisa_form #ind_imagem1_uri').val('');
			$('#acesso_coisa_form #ind_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #ind_imagem2').val('');
			$('#acesso_coisa_form #ind_imagem2_uri').val('');
			$('#acesso_coisa_form #ind_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #esco_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #esco_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #esco_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #esco_imagem1').val('');
			$('#acesso_coisa_form #esco_imagem1_uri').val('');
			$('#acesso_coisa_form #esco_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #esco_imagem2').val('');
			$('#acesso_coisa_form #esco_imagem2_uri').val('');
			$('#acesso_coisa_form #esco_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #escr_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #escr_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #escr_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #escr_imagem1').val('');
			$('#acesso_coisa_form #escr_imagem1_uri').val('');
			$('#acesso_coisa_form #escr_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #escr_imagem2').val('');
			$('#acesso_coisa_form #escr_imagem2_uri').val('');
			$('#acesso_coisa_form #escr_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #obs').val('');
			$('#acesso_coisa_form #hipoteses').val('');
		} else {
			operacao_bd = 'editar';
			$('#acesso_coisa_form #btn_acesso_coisa_transmitir').show();
			$('#acesso_coisa_form #operacao_bd').val(operacao_bd);
			$('#acesso_coisa_form #id').val(acesso_coisa.id);
			$('#acesso_coisa_form #re_id').val(sessionStorage.re_id);
			$('#acesso_coisa_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#acesso_coisa_form #res_pri_comodo_id').val(acesso_coisa.res_pri_comodo_id).selectmenu('refresh');
			$('#acesso_coisa_form #res_atuacao_id').val(acesso_coisa.res_atuacao_id).selectmenu('refresh');
			$('#acesso_coisa_form #res_outro_comodo_id').val(acesso_coisa.res_outro_comodo_id).selectmenu('refresh');
			//$('#acesso_coisa_form #res_imagem1').val(acesso_coisa.res_imagem1);
			$('#acesso_coisa_form #res_imagem1_uri').val(acesso_coisa.res_imagem1_uri);
			$('#acesso_coisa_form #res_visualizacao_imagem1').attr('src', acesso_coisa.res_imagem1_uri);
			//$('#acesso_coisa_form #res_imagem2').val(acesso_coisa.res_imagem2);
			$('#acesso_coisa_form #res_imagem2_uri').val(acesso_coisa.res_imagem2_uri);
			$('#acesso_coisa_form #res_visualizacao_imagem2').attr('src', acesso_coisa.res_imagem2_uri);
			$('#acesso_coisa_form #com_pri_comodo_id').val(acesso_coisa.com_pri_comodo_id).selectmenu('refresh');
			$('#acesso_coisa_form #com_atuacao_id').val(acesso_coisa.com_atuacao_id).selectmenu('refresh');
			$('#acesso_coisa_form #com_outro_comodo_id').val(acesso_coisa.com_outro_comodo_id).selectmenu('refresh');
			//$('#acesso_coisa_form #com_imagem1').val(acesso_coisa.com_imagem1);
			$('#acesso_coisa_form #com_imagem1_uri').val(acesso_coisa.com_imagem1_uri);
			$('#acesso_coisa_form #com_visualizacao_imagem1').attr('src', acesso_coisa.com_imagem1_uri);
			//$('#acesso_coisa_form #com_imagem2').val(acesso_coisa.com_imagem2);
			$('#acesso_coisa_form #com_imagem2_uri').val(acesso_coisa.com_imagem2_uri);
			$('#acesso_coisa_form #com_visualizacao_imagem2').attr('src', acesso_coisa.com_imagem2_uri);
			$('#acesso_coisa_form #ind_pri_comodo_id').val(acesso_coisa.ind_pri_comodo_id).selectmenu('refresh');
			$('#acesso_coisa_form #ind_atuacao_id').val(acesso_coisa.ind_atuacao_id).selectmenu('refresh');
			$('#acesso_coisa_form #ind_outro_comodo_id').val(acesso_coisa.ind_outro_comodo_id).selectmenu('refresh');
			//$('#acesso_coisa_form #ind_imagem1').val(acesso_coisa.ind_imagem1);
			$('#acesso_coisa_form #ind_imagem1_uri').val(acesso_coisa.ind_imagem1_uri);
			$('#acesso_coisa_form #ind_visualizacao_imagem1').attr('src', acesso_coisa.ind_imagem1_uri);
			//$('#acesso_coisa_form #ind_imagem2').val(acesso_coisa.ind_imagem2);
			$('#acesso_coisa_form #ind_imagem2_uri').val(acesso_coisa.ind_imagem2_uri);
			$('#acesso_coisa_form #ind_visualizacao_imagem2').attr('src', acesso_coisa.ind_imagem2_uri);
			$('#acesso_coisa_form #esco_pri_comodo_id').val(acesso_coisa.esco_pri_comodo_id).selectmenu('refresh');
			$('#acesso_coisa_form #esco_atuacao_id').val(acesso_coisa.esco_atuacao_id).selectmenu('refresh');
			$('#acesso_coisa_form #esco_outro_comodo_id').val(acesso_coisa.esco_outro_comodo_id).selectmenu('refresh');
			//$('#acesso_coisa_form #esco_imagem1').val(acesso_coisa.esco_imagem1);
			$('#acesso_coisa_form #esco_imagem1_uri').val(acesso_coisa.esco_imagem1_uri);
			$('#acesso_coisa_form #esco_visualizacao_imagem1').attr('src', acesso_coisa.esco_imagem1_uri);
			//$('#acesso_coisa_form #esco_imagem2').val(acesso_coisa.esco_imagem2);
			$('#acesso_coisa_form #esco_imagem2_uri').val(acesso_coisa.esco_imagem2_uri);
			$('#acesso_coisa_form #esco_visualizacao_imagem2').attr('src', acesso_coisa.esco_imagem2_uri);
			$('#acesso_coisa_form #escr_pri_comodo_id').val(acesso_coisa.escr_pri_comodo_id).selectmenu('refresh');
			$('#acesso_coisa_form #escr_atuacao_id').val(acesso_coisa.escr_atuacao_id).selectmenu('refresh');
			$('#acesso_coisa_form #escr_outro_comodo_id').val(acesso_coisa.escr_outro_comodo_id).selectmenu('refresh');
			//$('#acesso_coisa_form #escr_imagem1').val(acesso_coisa.escr_imagem1);
			$('#acesso_coisa_form #escr_imagem1_uri').val(acesso_coisa.escr_imagem1_uri);
			$('#acesso_coisa_form #escr_visualizacao_imagem1').attr('src', acesso_coisa.escr_imagem1_uri);
			//$('#acesso_coisa_form #escr_imagem2').val(acesso_coisa.escr_imagem2);
			$('#acesso_coisa_form #escr_imagem2_uri').val(acesso_coisa.escr_imagem2_uri);
			$('#acesso_coisa_form #escr_visualizacao_imagem2').attr('src', acesso_coisa.escr_imagem2_uri);
			$('#acesso_coisa_form #obs').val(acesso_coisa.obs);
			$('#acesso_coisa_form #hipoteses').val(acesso_coisa.hipoteses);
		}
	});
});

$(document).on('click', '#btn_acesso_coisa_novo', function(event)
{
	event.preventDefault();
	sessionStorage.acesso_coisa_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#acesso_coisa_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_acesso_coisa_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#acesso_coisa_form").serializeJSON();
	salvar_acesso_coisa(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		if (dados.operacao_bd == 'novo') {
			get_last_acesso_coisa(function(acesso_coisa) {
				var id = acesso_coisa.id;
				$('#acesso_coisa_form #operacao_bd').val('editar');
				$('#acesso_coisa_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_acesso_coisa_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#acesso_coisa_form #id").val();
	transmitir_acesso_coisa(id);
});

$(document).on('click', '#btn_acesso_coisa_limpar', function(event)
{
	event.preventDefault();
			$('#acesso_coisa_form #res_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #res_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #res_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #res_imagem1').val('');
			$('#acesso_coisa_form #res_imagem1_uri').val('');
			$('#acesso_coisa_form #res_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #res_imagem2').val('');
			$('#acesso_coisa_form #res_imagem2_uri').val('');
			$('#acesso_coisa_form #res_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #com_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #com_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #com_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #com_imagem1').val('');
			$('#acesso_coisa_form #com_imagem1_uri').val('');
			$('#acesso_coisa_form #com_visualizacao_imagem2').attr('src', '');
			//$('#acesso_coisa_form #com_imagem2').val('');
			$('#acesso_coisa_form #com_imagem2_uri').val('');
			$('#acesso_coisa_form #com_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #ind_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #ind_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #ind_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #ind_imagem1').val('');
			$('#acesso_coisa_form #ind_imagem1_uri').val('');
			$('#acesso_coisa_form #ind_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #ind_imagem2').val('');
			$('#acesso_coisa_form #ind_imagem2_uri').val('');
			$('#acesso_coisa_form #ind_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #esco_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #esco_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #esco_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #esco_imagem1').val('');
			$('#acesso_coisa_form #esco_imagem1_uri').val('');
			$('#acesso_coisa_form #esco_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #esco_imagem2').val('');
			$('#acesso_coisa_form #esco_imagem2_uri').val('');
			$('#acesso_coisa_form #esco_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #escr_pri_comodo_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #escr_atuacao_id').val(0).selectmenu('refresh');
			$('#acesso_coisa_form #escr_outro_comodo_id').val(0).selectmenu('refresh');
			//$('#acesso_coisa_form #escr_imagem1').val('');
			$('#acesso_coisa_form #escr_imagem1_uri').val('');
			$('#acesso_coisa_form #escr_visualizacao_imagem1').attr('src', '');
			//$('#acesso_coisa_form #escr_imagem2').val('');
			$('#acesso_coisa_form #escr_imagem2_uri').val('');
			$('#acesso_coisa_form #escr_visualizacao_imagem2').attr('src', '');
			$('#acesso_coisa_form #obs').val('');
			$('#acesso_coisa_form #hipoteses').val('');
});

///////// acesso_coisa FIM