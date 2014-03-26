function get_all_vestigio(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio WHERE re_id = '" + re_id + "' ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var vestigio = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					vestigio[i] = new Object();
					vestigio[i].id					= row.id;
					vestigio[i].vestigio_tipo_id	= row.vestigio_tipo_id;
					vestigio[i].re_id				= row.re_id;
					vestigio[i].numero_ordem		= row.numero_ordem;
					vestigio[i].data				= formata_data(row.data);
					vestigio[i].hora				= row.hora;
					vestigio[i].coordenadas			= row.coordenadas;
					vestigio[i].descricao			= row.descricao;
					vestigio[i].localizacao			= row.localizacao;
					vestigio[i].imagem_uri			= row.imagem_uri;
				}
				fn(vestigio);
			}
		});
	});
}

function get_vestigio(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var vestigio = new Object();
				var row = result.rows.item(0);
				vestigio.id				= row.id;
				vestigio.vestigio_tipo_id	= row.vestigio_tipo_id;
				vestigio.re_id				= row.re_id;
				vestigio.numero_ordem		= row.numero_ordem;
				vestigio.data				= formata_data(row.data);
				vestigio.hora				= row.hora;
				vestigio.coordenadas		= row.coordenadas;
				vestigio.descricao			= row.descricao;
				vestigio.localizacao		= row.localizacao;
				vestigio.imagem_uri			= row.imagem_uri;
				fn(vestigio);
			}
		});
	});
}

function get_no_vestigio(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM vestigio WHERE re_id = '" + re_id + "' ORDER BY id DESC LIMIT 0,1";
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

function salvar_vestigio(vestigio, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO vestigio (" +
					"vestigio_tipo_id, " + 
					"re_id, " + 
					"numero_ordem, " + 
					"data, " + 
					"hora, " + 
					"coordenadas, " + 
					"descricao, " + 
					"localizacao, " + 
					"imagem_uri " + 
				") VALUES ( " +
					"'" + vestigio.vestigio_tipo_id + "', " + 
					"'" + vestigio.re_id + "', " + 
					"'" + vestigio.numero_ordem + "', " + 
					"'" + formata_data_db(vestigio.data) + "', " + 
					"'" + vestigio.hora + "', " + 
					"'" + vestigio.coordenadas + "', " + 
					"'" + vestigio.descricao + "', " + 
					"'" + vestigio.localizacao + "', " + 
					"'" + vestigio.imagem_uri + "'" + 
				")";
		} else {
			var sql = "UPDATE vestigio SET " +
						"vestigio_tipo_id = '" + vestigio.vestigio_tipo_id + "', " +  
						"re_id = '" + vestigio.re_id + "', " +  
						"numero_ordem = '" + vestigio.numero_ordem + "', " + 
						"data = '" + formata_data_db(vestigio.data) + "', " + 
						"hora = '" + vestigio.hora + "', " + 
						"coordenadas = '" + vestigio.coordenadas + "', " + 
						"descricao = '" + vestigio.descricao + "', " + 
						"localizacao = '" + vestigio.localizacao + "', " + 
						"imagem_uri = '" + vestigio.imagem_uri + "'" + 
					" WHERE id = " + vestigio.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_vestigio(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM vestigio WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

function reordena_vestigio()
{
	get_all_vestigio(function(vestigio) {
		var x = 1;
		for (var i = 0; i < vestigio.length; i++) 
		{
			vestigio[i].numero_ordem = x;
			salvar_vestigio(vestigio[i], 'editar', function(resultado) {});
			x++;
		}		
	});
}