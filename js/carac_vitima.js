function get_all_carac_vitima(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_vitima WHERE re_id = '" + re_id + "' ORDER BY id";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_vitima = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					carac_vitima[i] = new Object();
					carac_vitima[i].id					= row.id;
					carac_vitima[i].re_id				= row.re_id;
					carac_vitima[i].imovel_tipo_id		= row.imovel_tipo_id;
					carac_vitima[i].trafego_veiculos_id	= row.trafego_veiculos_id;
					carac_vitima[i].trafego_pessoas_id	= row.trafego_pessoas_id;
					carac_vitima[i].iluminacao_id		= row.iluminacao_id;
					carac_vitima[i].imagem1				= row.imagem1;
					carac_vitima[i].imagem1_uri			= row.imagem1_uri;
					carac_vitima[i].vedacao_frontal_id	= row.vedacao_frontal_id;
					carac_vitima[i].ofendiculas_id		= row.ofendiculas_id;
					carac_vitima[i].defesas_id			= row.defesas_id;
					carac_vitima[i].construcao_id		= row.construcao_id;
					carac_vitima[i].imagem2				= row.imagem2;
					carac_vitima[i].imagem2_uri			= row.imagem2_uri;
					carac_vitima[i].dimensao_frontal_id	= row.dimensao_frontal_id;
					carac_vitima[i].ocupacao_id			= row.ocupacao_id;
					carac_vitima[i].obs					= row.obs;
					carac_vitima[i].hipoteses			= row.hipoteses;
				}
				fn(carac_vitima);
			}
		});
	});
}

function get_carac_vitima(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_vitima WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_vitima = new Object();
				var row = result.rows.item(0);
				carac_vitima.id						= row.id;
				carac_vitima.re_id					= row.re_id;
				carac_vitima.imovel_tipo_id			= row.imovel_tipo_id;
				carac_vitima.trafego_veiculos_id	= row.trafego_veiculos_id;
				carac_vitima.trafego_pessoas_id		= row.trafego_pessoas_id;
				carac_vitima.iluminacao_id			= row.iluminacao_id;
				carac_vitima.imagem1				= row.imagem1;
				carac_vitima.imagem1_uri			= row.imagem1_uri;
				carac_vitima.vedacao_frontal_id		= row.vedacao_frontal_id;
				carac_vitima.ofendiculas_id			= row.ofendiculas_id;
				carac_vitima.defesas_id				= row.defesas_id;
				carac_vitima.construcao_id			= row.construcao_id;
				carac_vitima.imagem2				= row.imagem2;
				carac_vitima.imagem2_uri			= row.imagem2_uri;
				carac_vitima.dimensao_frontal_id	= row.dimensao_frontal_id;
				carac_vitima.ocupacao_id			= row.ocupacao_id;
				carac_vitima.obs					= row.obs;
				carac_vitima.hipoteses				= row.hipoteses;
				fn(carac_vitima);
			}
		});
	});
}

function get_carac_vitima_re(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_vitima WHERE re_id = " + re_id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_vitima = new Object();
				var row = result.rows.item(0);
				carac_vitima.id						= row.id;
				carac_vitima.re_id					= row.re_id;
				carac_vitima.imovel_tipo_id			= row.imovel_tipo_id;
				carac_vitima.trafego_veiculos_id	= row.trafego_veiculos_id;
				carac_vitima.trafego_pessoas_id		= row.trafego_pessoas_id;
				carac_vitima.iluminacao_id			= row.iluminacao_id;
				carac_vitima.imagem1				= row.imagem1;
				carac_vitima.imagem1_uri			= row.imagem1_uri;
				carac_vitima.vedacao_frontal_id		= row.vedacao_frontal_id;
				carac_vitima.ofendiculas_id			= row.ofendiculas_id;
				carac_vitima.defesas_id				= row.defesas_id;
				carac_vitima.construcao_id			= row.construcao_id;
				carac_vitima.imagem2				= row.imagem2;
				carac_vitima.imagem2_uri			= row.imagem2_uri;
				carac_vitima.dimensao_frontal_id	= row.dimensao_frontal_id;
				carac_vitima.ocupacao_id			= row.ocupacao_id;
				carac_vitima.obs					= row.obs;
				carac_vitima.hipoteses				= row.hipoteses;
				fn(carac_vitima);
			} else {
				fn(false);
			}
		});
	});
}

function get_last_carac_vitima(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM carac_vitima ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var carac_vitima = new Object();
				var row = result.rows.item(0);
				carac_vitima.id	= row.id;
				fn(carac_vitima);
			}
		});
	});
}

function salvar_carac_vitima(carac_vitima, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO carac_vitima (" +
					"re_id, " + 
					"imovel_tipo_id, " + 
					"trafego_veiculos_id, " + 
					"trafego_pessoas_id, " + 
					"iluminacao_id, " + 
					"imagem1, " + 
					"imagem1_uri, " + 
					"vedacao_frontal_id, " + 
					"ofendiculas_id, " + 
					"defesas_id, " + 
					"construcao_id, " + 
					"imagem2, " + 
					"imagem2_uri, " + 
					"dimensao_frontal_id, " + 
					"ocupacao_id, " + 
					"obs, " + 
					"hipoteses " + 
				") VALUES ( " +
					"'" + carac_vitima.re_id + "', " + 
					"'" + carac_vitima.imovel_tipo_id + "', " + 
					"'" + carac_vitima.trafego_veiculos_id + "', " + 
					"'" + carac_vitima.trafego_pessoas_id + "', " + 
					"'" + carac_vitima.iluminacao_id + "', " + 
					"'', " + 
					"'" + carac_vitima.imagem1_uri + "', " + 
					"'" + carac_vitima.vedacao_frontal_id + "', " + 
					"'" + carac_vitima.ofendiculas_id + "', " + 
					"'" + carac_vitima.defesas_id + "', " + 
					"'" + carac_vitima.construcao_id + "'," + 
					"''," + 
					"'" + carac_vitima.imagem2_uri + "'," + 
					"'" + carac_vitima.dimensao_frontal_id + "'," + 
					"'" + carac_vitima.ocupacao_id + "'," + 
					"'" + carac_vitima.obs + "'," + 
					"'" + carac_vitima.hipoteses + "'" + 
				")";
		} else {
			var sql = "UPDATE carac_vitima SET " +
						"re_id = '" + carac_vitima.re_id + "', " +  
						"imovel_tipo_id = '" + carac_vitima.imovel_tipo_id + "', " + 
						"trafego_veiculos_id = '" + carac_vitima.trafego_veiculos_id + "', " + 
						"trafego_pessoas_id = '" + carac_vitima.trafego_pessoas_id + "', " + 
						"iluminacao_id = '" + carac_vitima.iluminacao_id + "', " + 
						"imagem1 = '', " + 
						"imagem1_uri = '" + carac_vitima.imagem1_uri + "', " + 
						"vedacao_frontal_id = '" + carac_vitima.vedacao_frontal_id + "', " + 
						"ofendiculas_id = '" + carac_vitima.ofendiculas_id + "', " + 
						"defesas_id = '" + carac_vitima.defesas_id + "', " + 
						"construcao_id = '" + carac_vitima.construcao_id + "', " + 
						"imagem2 = '" + carac_vitima.imagem2 + "', " + 
						"imagem2_uri = '" + carac_vitima.imagem2_uri + "', " + 
						"dimensao_frontal_id = '" + carac_vitima.dimensao_frontal_id + "', " + 
						"ocupacao_id = '" + carac_vitima.ocupacao_id + "', " + 
						"obs = '" + carac_vitima.obs + "', " + 
						"hipoteses = '" + carac_vitima.hipoteses + "'" + 
					" WHERE id = " + carac_vitima.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_carac_vitima(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM carac_vitima WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

/////// carac_vitima INÍCIO

$(document).on('pageshow', '#carac_vitima_lista', function()
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

$(document).on('click', '#lista_carac_vitima li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_carac_vitima li .excluir', function()
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

$(document).on('pagebeforeshow', '#formulario_carac_vitima', function()
{
	var re_id = sessionStorage.re_id;
	get_carac_vitima_re(re_id, function(carac_vitima) {
		if (carac_vitima == false) {
			operacao_bd = 'novo';
			$('#carac_vitima_form #operacao_bd').val(operacao_bd);
			$('#carac_vitima_form #id').val(0);
			$('#carac_vitima_form #re_id').val(sessionStorage.re_id);
			$('#carac_vitima_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#carac_vitima_form #imovel_tipo_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #trafego_veiculos_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #trafego_pessoas_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #iluminacao_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #imagem1_uri').val('');
			$('#carac_vitima_form #visualizacao_imagem1_uri').attr('src','');
			$('#carac_vitima_form #vedacao_frontal_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #ofendiculas_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #defesas_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #construcao_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #imagem2_uri').val('');
			$('#carac_vitima_form #visualizacao_imagem2_uri').attr('src','');
			$('#carac_vitima_form #dimensao_frontal_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #ocupacao_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #obs').val('');
			$('#carac_vitima_form #hipoteses').val('');
		} else {
			operacao_bd = 'editar';
			$('#carac_vitima_form #operacao_bd').val(operacao_bd);
			$('#carac_vitima_form #id').val(carac_vitima.id);
			$('#carac_vitima_form #re_id').val(sessionStorage.re_id);
			$('#carac_vitima_form #re_codigo').html('RE: ' + sessionStorage.re_codigo);
			$('#carac_vitima_form #imovel_tipo_id').val(carac_vitima.imovel_tipo_id).selectmenu('refresh');
			$('#carac_vitima_form #trafego_veiculos_id').val(carac_vitima.trafego_veiculos_id).selectmenu('refresh');
			$('#carac_vitima_form #trafego_pessoas_id').val(carac_vitima.trafego_pessoas_id).selectmenu('refresh');
			$('#carac_vitima_form #iluminacao_id').val(carac_vitima.iluminacao_id).selectmenu('refresh');
			$('#carac_vitima_form #imagem1_uri').val(carac_vitima.imagem1_uri);
			$('#carac_vitima_form #visualizacao_imagem1').attr('src', carac_vitima.imagem1_uri);
			$('#carac_vitima_form #vedacao_frontal_id').val(carac_vitima.vedacao_frontal_id).selectmenu('refresh');
			$('#carac_vitima_form #ofendiculas_id').val(carac_vitima.ofendiculas_id).selectmenu('refresh');
			$('#carac_vitima_form #defesas_id').val(carac_vitima.defesas_id).selectmenu('refresh');
			$('#carac_vitima_form #construcao_id').val(carac_vitima.construcao_id).selectmenu('refresh');
			$('#carac_vitima_form #imagem2_uri').val(carac_vitima.imagem2_uri);
			$('#carac_vitima_form #visualizacao_imagem2').attr('src', carac_vitima.imagem2_uri);
			$('#carac_vitima_form #dimensao_frontal_id').val(carac_vitima.dimensao_frontal_id).selectmenu('refresh');
			$('#carac_vitima_form #ocupacao_id').val(carac_vitima.ocupacao_id).selectmenu('refresh');
			$('#carac_vitima_form #obs').val(carac_vitima.obs);
			$('#carac_vitima_form #hipoteses').val(carac_vitima.hipoteses);
		}
	});
});

$(document).on('click', '#btn_carac_vitima_novo', function(event)
{
	event.preventDefault();
	sessionStorage.carac_vitima_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#carac_vitima_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_carac_vitima_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#carac_vitima_form").serializeJSON();
	salvar_carac_vitima(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		if (dados.operacao_bd == 'novo') {
			get_last_carac_vitima(function(carac_vitima) {
				var id = carac_vitima.id;
				$('#carac_vitima_form #operacao_bd').val('editar');
				$('#carac_vitima_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_carac_vitima_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#carac_vitima_form #id").val();
	transmitir_carac_vitima(id);
});

$(document).on('click', '#btn_carac_vitima_limpar', function(event)
{
	event.preventDefault();
			$('#carac_vitima_form #imovel_tipo_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #trafego_veiculos_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #trafego_pessoas_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #iluminacao_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #imagem1_uri').val('');
			$('#carac_vitima_form #visualizacao_imagem1_uri').attr('src','');
			$('#carac_vitima_form #vedacao_frontal_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #ofendiculas_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #defesas_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #construcao_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #imagem2_uri').val('');
			$('#carac_vitima_form #visualizacao_imagem2_uri').attr('src','');
			$('#carac_vitima_form #dimensao_frontal_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #ocupacao_id').val(0).selectmenu('refresh');
			$('#carac_vitima_form #obs').val('');
			$('#carac_vitima_form #hipoteses').val('');
});

///////// carac_vitima FIM