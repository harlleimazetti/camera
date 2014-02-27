$(document).on('pageshow', '#evidencia_lista', function()
{
	$('#lista_evidencia').empty();
	db.transaction(function (transaction)
	{
		var sql = "SELECT * FROM evidencia ORDER BY data, hora";
		transaction.executeSql (sql, undefined, function (transaction, result)
		{
			var output = '';
			if (result.rows.length)
			{
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					var id			= row.id;
					var data		= formata_data(row.data);
					var hora		= row.hora;
					var codigo		= row.codigo;
					var nome_perito	= row.nome_perito;
					var obs			= row.obs;
					output += '<li data-id="' + id + '"><a href="#formulario"><h2>' + nome_perito + '</h2><p><strong>' + data + ', ' + hora + '</strong></p><p>' + obs + '</p><p class="ui-li-aside"><strong>' + codigo + '</strong></p></a></li>';
				}
				$('#lista_evidencia').append(output).listview('refresh');
			}
		});
	});
});

$(document).on('click', '#lista_evidencia li', function()
{
	evidencia_id = $(this).data('id');
	sessionStorage.evidencia_id = evidencia_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#evidencia_formulario" );
});

$(document).on('pagebeforeshow', '#evidencia_formulario', function()
{
	var operacao_bd = sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var evidencia_id = sessionStorage.evidencia_id;
		get_evidencia(evidencia_id, function(evidencia){
			$('#operacao_bd').val(operacao_bd);
			$('#id').val(evidencia.id);
			$('#data').val(evidencia.data);
			$('#hora').val(evidencia.hora);
			$('#codigo').val(evidencia.codigo);
			$('#nome_perito').val(evidencia.nome_perito);
			$('#coordenadas').val(evidencia.coordenadas);
			$('#obs').val(evidencia.obs);
		});
	} else {
		var evidencia_id = sessionStorage.evidencia_id;
		$('#operacao_bd').val(operacao_bd);
	}
});

$(document).on('click', '#btn_evidencia_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#evidencia_form").serializeJSON();
	salvar_evidencia(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
	});
});

$(document).on('click', '#btn_evidencia_novo', function(event)
{
	event.preventDefault();
	sessionStorage.evidencia_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#evidencia_formulario" );
});