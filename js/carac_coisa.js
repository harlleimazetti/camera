function get_all_carac_coisa(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_coisa WHERE re_id = '" + re_id + "' ORDER BY id";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_coisa = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					carac_coisa[i] = new Object();
					carac_coisa[i].id					= row.id;
					carac_coisa[i].re_id				= row.re_id;
					carac_coisa[i].tipo_busca_id		= row.tipo_busca_id;
					carac_coisa[i].visibilidade_id		= row.visibilidade_id;
					carac_coisa[i].tipo_principal_id	= row.tipo_principal_id;
					carac_coisa[i].tipo_secundario_id	= row.tipo_secundario_id;
					carac_coisa[i].dimensao_id			= row.dimensao_id;
					carac_coisa[i].peso_id				= row.peso_id;
					carac_coisa[i].transporte_id		= row.transporte_id;
					carac_coisa[i].vestigios_id			= row.vestigios_id;
					carac_coisa[i].fluidos_id			= row.fluidos_id;
					carac_coisa[i].obs					= row.obs;
					carac_coisa[i].hipoteses			= row.hipoteses;
				}
				fn(carac_coisa);
			}
		});
	});
}

function get_carac_coisa(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_coisa WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_coisa = new Object();
				var row = result.rows.item(0);
				carac_coisa.id					= row.id;
				carac_coisa.re_id				= row.re_id;
				carac_coisa.tipo_busca_id		= row.tipo_busca_id;
				carac_coisa.visibilidade_id		= row.visibilidade_id;
				carac_coisa.tipo_principal_id	= row.tipo_principal_id;
				carac_coisa.tipo_secundario_id	= row.tipo_secundario_id;
				carac_coisa.dimensao_id			= row.dimensao_id;
				carac_coisa.peso_id				= row.peso_id;
				carac_coisa.transporte_id		= row.transporte_id;
				carac_coisa.vestigios_id		= row.vestigios_id;
				carac_coisa.fluidos_id			= row.fluidos_id;
				carac_coisa.obs					= row.obs;
				carac_coisa.hipoteses			= row.hipoteses;
				fn(carac_coisa);
			}
		});
	});
}

function get_carac_coisa_re(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_coisa WHERE re_id = " + re_id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_coisa = new Object();
				var row = result.rows.item(0);
				carac_coisa.id					= row.id;
				carac_coisa.re_id				= row.re_id;
				carac_coisa.tipo_busca_id		= row.tipo_busca_id;
				carac_coisa.visibilidade_id		= row.visibilidade_id;
				carac_coisa.tipo_principal_id	= row.tipo_principal_id;
				carac_coisa.tipo_secundario_id	= row.tipo_secundario_id;
				carac_coisa.dimensao_id			= row.dimensao_id;
				carac_coisa.peso_id				= row.peso_id;
				carac_coisa.transporte_id		= row.transporte_id;
				carac_coisa.vestigios_id		= row.vestigios_id;
				carac_coisa.fluidos_id			= row.fluidos_id;
				carac_coisa.obs					= row.obs;
				carac_coisa.hipoteses			= row.hipoteses;
				fn(carac_coisa);
			} else {
				fn(false);
			}
		});
	});
}

function get_last_carac_coisa(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_coisa ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_coisa = new Object();
				var row = result.rows.item(0);
				carac_coisa.id = row.id;
				fn(carac_coisa);
			}
		});
	});
}

function salvar_carac_coisa(carac_coisa, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO carac_coisa (" +
					"re_id, " + 
					"tipo_busca_id, " + 
					"visibilidade_id, " + 
					"tipo_principal_id, " + 
					"tipo_secundario_id, " + 
					"dimensao_id, " + 
					"peso_id, " + 
					"transporte_id, " + 
					"vestigios_id, " + 
					"fluidos_id, " + 
					"obs, " + 
					"hipoteses " + 
				") VALUES ( " +
					"'" + carac_coisa.re_id + "', " + 
					"'" + carac_coisa.tipo_busca_id + "', " + 
					"'" + carac_coisa.visibilidade_id + "', " + 
					"'" + carac_coisa.tipo_principal_id + "', " + 
					"'" + carac_coisa.tipo_secundario_id + "', " + 
					"'" + carac_coisa.dimensao_id + "', " + 
					"'" + carac_coisa.peso_id + "', " + 
					"'" + carac_coisa.transporte_id + "', " + 
					"'" + carac_coisa.vestigios_id + "', " + 
					"'" + carac_coisa.fluidos_id + "', " + 
					"'" + carac_coisa.obs + "', " + 
					"'" + carac_coisa.hipoteses + "'" + 
				")";
		} else {
			var sql = "UPDATE carac_coisa SET " +
						"re_id = '" + carac_coisa.re_id + "', " +  
						"tipo_busca_id = '" + carac_coisa.tipo_busca_id + "', " + 
						"visibilidade_id = '" + carac_coisa.visibilidade_id + "', " + 
						"tipo_principal_id = '" + carac_coisa.tipo_principal_id + "', " + 
						"tipo_secundario_id = '" + carac_coisa.tipo_secundario_id + "', " + 
						"dimensao_id = '" + carac_coisa.dimensao_id + "', " + 
						"peso_id = '" + carac_coisa.peso_id + "', " + 
						"transporte_id = '" + carac_coisa.transporte_id + "', " + 
						"vestigios_id = '" + carac_coisa.vestigios_id + "', " + 
						"fluidos_id = '" + carac_coisa.fluidos_id + "', " + 
						"obs = '" + carac_coisa.obs + "', " + 
						"hipoteses = '" + carac_coisa.hipoteses + "'" + 
					" WHERE id = " + carac_coisa.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_carac_coisa(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM carac_coisa WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

/////// carac_coisa INÍCIO

$(document).on('pageshow', '#carac_coisa_lista', function()
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

$(document).on('click', '#lista_carac_coisa li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_carac_coisa li .excluir', function()
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

$(document).on('pagebeforeshow', '#formulario_carac_coisa', function()
{
	var re_id = sessionStorage.re_id;
	get_carac_coisa_re(re_id, function(carac_coisa) {
		if (carac_coisa == false) {
			operacao_bd = 'novo';
			$('#carac_coisa_form #operacao_bd').val(operacao_bd);
			$('#carac_coisa_form #id').val(0);
			$('#carac_coisa_form #re_id').val(sessionStorage.re_id);
			$('#carac_coisa_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#carac_coisa_form #tipo_busca_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #visibilidade_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #tipo_principal_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #tipo_secundario_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #dimensao_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #peso_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #transporte_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #vestigios_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #fluidos_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #obs').val('');
			$('#carac_coisa_form #hipoteses').val('');
		} else {
			operacao_bd = 'editar';
			$('#carac_coisa_form #operacao_bd').val(operacao_bd);
			$('#carac_coisa_form #id').val(carac_coisa.id);
			$('#carac_coisa_form #re_id').val(sessionStorage.re_id);
			$('#carac_coisa_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#carac_coisa_form #res_pri_comodo_id').val(carac_coisa.res_pri_comodo_id).selectmenu('refresh');
			$('#carac_coisa_form #tipo_busca_id').val(carac_coisa.tipo_busca_id).selectmenu('refresh');
			$('#carac_coisa_form #visibilidade_id').val(carac_coisa.visibilidade_id).selectmenu('refresh');
			$('#carac_coisa_form #tipo_principal_id').val(carac_coisa.tipo_principal_id).selectmenu('refresh');
			$('#carac_coisa_form #tipo_secundario_id').val(carac_coisa.tipo_secundario_id).selectmenu('refresh');
			$('#carac_coisa_form #peso_id').val(carac_coisa.peso_id).selectmenu('refresh');
			$('#carac_coisa_form #transporte_id').val(carac_coisa.transporte_id).selectmenu('refresh');
			$('#carac_coisa_form #vestigios_id').val(carac_coisa.vestigios_id).selectmenu('refresh');
			$('#carac_coisa_form #fluidos_id').val(carac_coisa.fluidos_id).selectmenu('refresh');
			$('#carac_coisa_form #obs').val(carac_coisa.obs);
			$('#carac_coisa_form #hipoteses').val(carac_coisa.hipoteses);
		}
	});
});

$(document).on('click', '#btn_carac_coisa_novo', function(event)
{
	event.preventDefault();
	sessionStorage.carac_coisa_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#carac_coisa_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_carac_coisa_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#carac_coisa_form").serializeJSON();
	salvar_carac_coisa(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		if (dados.operacao_bd == 'novo') {
			get_last_carac_coisa(function(carac_coisa) {
				var id = carac_coisa.id;
				$('#carac_coisa_form #operacao_bd').val('editar');
				$('#carac_coisa_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_carac_coisa_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#carac_coisa_form #id").val();
	transmitir_carac_coisa(id);
});

$(document).on('click', '#btn_carac_coisa_limpar', function(event)
{
	event.preventDefault();
			$('#carac_coisa_form #tipo_busca_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #visibilidade_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #tipo_principal_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #tipo_secundario_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #dimensao_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #peso_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #transporte_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #vestigios_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #fluidos_id').val(0).selectmenu('refresh');
			$('#carac_coisa_form #obs').val('');
			$('#carac_coisa_form #hipoteses').val('');
});

///////// carac_coisa FIM