function get_all_evidencia_tipo(fn) 
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia_tipo ORDER BY tipo";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var evidencia_tipo = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					evidencia_tipo[i] = new Object();
					evidencia_tipo[i].id	= row.id;
					evidencia_tipo[i].tipo	= row.tipo;
				}
				fn(evidencia_tipo);
			}
		});
	});
}

function get_evidencia_tipo(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM evidencia_tipo WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var evidencia_tipo = new Object();
				var row = result.rows.item(0);
				evidencia_tipo.id	= row.id;
				evidencia_tipo.tipo	= row.tipo;
				fn(evidencia_tipo);
			}
		});
	});
}

function salvar_evidencia_tipo(evidencia_tipo, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO evidencia_tipo (" +
					"tipo " + 
				") VALUES ( " +
					"'" + evidencia_tipo.tipo + "'" + 
				")";
		} else {
			var sql = "UPDATE evidencia_tipo SET " +
						"tipo = '" + evidencia_tipo.tipo + "'" +
					" WHERE id = " + evidencia_tipo.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}