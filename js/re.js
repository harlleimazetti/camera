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
					re[i].data			= formata_data(row.data);
					re[i].hora			= row.hora;
					re[i].endereco		= row.endereco;
					re[i].coordenadas	= row.coordenadas;
					re[i].crime			= row.crime;
					re[i].obs			= row.obs;
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
				re.data			= formata_data(row.data);
				re.hora			= row.hora;
				re.endereco		= row.endereco;
				re.coordenadas	= row.coordenadas;
				re.crime		= row.crime;
				re.obs			= row.obs;
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
							"data, " + 
							"hora, " + 
							"endereco, " + 
							"coordenadas, " + 
							"crime, " + 
							"obs " + 
						") VALUES ( " +
							"'" + formata_data_db(re.data) + "', " + 
							"'" + re.hora + "', " + 
							"'" + evidencia_tipo.tipo + "', " +
							"'" + re.endereco + "', " + 
							"'" + re.coordenadas + "', " +
							"'" + re.crime + "', " +
							"'" + re.obs + "' " +
						")";
		} else {
			var sql =	"UPDATE evidencia_tipo SET " +
							"data = '" + formata_data_db(re.data) + "', " +
							"hora = '" + re.hora + "', " +
							"endereco = '" + re.endereco + "', " +
							"coordenadas = '" + re.coordenadas + "', " +
							"crime = '" + re.crime + "', " +
							"obs = '" + re.obs + "' " +
						"WHERE id = " + re.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}