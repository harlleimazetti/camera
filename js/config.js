function get_config(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM config WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var config = new Object();
				var row = result.rows.item(0);
				config.id			= row.id;
				config.url_servidor	= row.url_servidor;
				fn(config);
			}
		});
	});
}

function salvar_config(config, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO config (" +
					"url_servidor " + 
				") VALUES ( " +
					"'" + config.url_servidor + "' " + 
				")";
		} else {
			var sql = "UPDATE config SET " +
						"url_servidor = '" + config.url_servidor + "' " +  
					" WHERE id = " + config.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}