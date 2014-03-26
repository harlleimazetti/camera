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
					informe[i].data					= formata_data(row.data);
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
				informe.data				= formata_data(row.data);
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