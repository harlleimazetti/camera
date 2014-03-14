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
					evidencia[i].data				= formata_data(row.data);
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
				evidencia.data				= formata_data(row.data);
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
				evidencia.data				= formata_data(row.data);
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