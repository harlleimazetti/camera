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
				evidencia.evidencia_tipo_id	= row.tipo_id;
				evidencia.codigo			= row.codigo;
				evidencia.data				= formata_data(row.data);
				evidencia.hora				= row.hora;
				evidencia.nome_perito		= row.nome_perito;
				evidencia.coordenadas		= row.coordenadas;
				evidencia.obs				= row.obs;
				fn(evidencia);
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
					"codigo, " + 
					"data, " + 
					"hora, " + 
					"nome_perito, " + 
					"coordenadas, " + 
					"obs " + 
				") VALUES ( " +
					"'" + evidencia.evidencia_tipo_id + "', " + 
					"'" + evidencia.codigo + "', " + 
					"'" + formata_data_db(evidencia.data) + "', " + 
					"'" + evidencia.hora + "', " + 
					"'" + evidencia.nome_perito + "', " + 
					"'" + evidencia.coordenadas + "', " + 
					"'" + evidencia.obs + "'" + 
				")";
		} else {
			var sql = "UPDATE evidencia SET " +
						"evidencia_tipo_id = '" + evidencia.evidencia_tipo_id + "', " +  
						"codigo = '" + evidencia.codigo + "', " + 
						"data = '" + formata_data_db(evidencia.data) + "', " + 
						"hora = '" + evidencia.hora + "', " + 
						"nome_perito = '" + evidencia.nome_perito + "', " + 
						"coordenadas = '" + evidencia.coordenadas + "', " + 
						"obs = '" + evidencia.obs + "'" + 
					" WHERE id = " + evidencia.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}