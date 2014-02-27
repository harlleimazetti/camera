var db = openDatabase ("spcr", "1.0", "Test", 65535);
db.transaction (function (transaction) 
{
	console.log('Configurando Banco de Dados...');

	var sql = "DROP TABLE evidencia";
	transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS evidencia " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"evidencia_tipo_id INTEGER, " +
		"codigo VARCHAR(50), " +
		"data DATE, " +
		"hora TIME, " +
		"nome_perito VARCHAR(50), " +
		"coordenadas VARCHAR(200), " +
		"obs TEXT, " +
		"imagem BLOB, " +
		"imagem_uri TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, codigo, data, hora, nome_perito, coordenadas, obs) VALUES ('1', '1', '12345', '2014-02-23','11:00:00','Fulano de Tal','-18.92424, -48.249893','Arrombamento ocorrido à noite na ausência dos proprietários do imóvel. Encontrados vestígios no local.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, codigo, data, hora, nome_perito, coordenadas, obs) VALUES ('2', '2', '54321', '2014-02-24','19:00:00','Beltrano da Silva','-18.92424, -48.249893','Roubo a mão armada na Asa Norte. A vítima levou várias coronhadas na cabeça.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, codigo, data, hora, nome_perito, coordenadas, obs) VALUES ('3', '3', '98765', '2014-02-24','21:00:00','Ciclano de Alcantara','-18.92424, -48.249893','Agressão doméstica. A vítima alega que o esposo a agrediu enquanto ela dormia.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, codigo, data, hora, nome_perito, coordenadas, obs) VALUES ('4', '4', '56789', '2014-02-25','12:00:00','Jose de Sousa','-18.92424, -48.249893','Furto de veículo em Taguatinga. Vítima alega que havia um malote de tranporte de valores no interior do veículo.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, codigo, data, hora, nome_perito, coordenadas, obs) VALUES ('5', '1', '56712', '2014-02-25','15:00:00','Joao Francisco','-18.92424, -48.249893','Invasão em estabelecimento comercial. Mercadorias e valores do caixa foram subtraídos.') ";
	transaction.executeSql (sql, undefined, function() { }, error);

	//var sql = "DROP TABLE evidencia_tipo";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS evidencia_tipo " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"tipo VARCHAR(50))"
	transaction.executeSql (sql, undefined, function() { }, error);
});

function ok ()
{
}

function error (transaction, err) 
{
	console.log("Erro no banco de dados: " + err.message);
	return false;
}
$(document).on('click', '#mostrar_tabelas', function()
{
	db.transaction(function (transaction)
	{
		var sql = "SELECT name FROM sqlite_master WHERE type='table'";
		transaction.executeSql (sql, undefined, function (transaction, result)
		{
			var html = '<ul data-role="listview">';
			if (result.rows.length)
			{
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					var name = row.name;
					html += "<li>" + name + "</li>";
				}
			}
				else
			{
				html += "<li> Nenhum registro </li>";
			}
			html += "</ul>";
			$('#resultado').html(html);
		});
	});
});

$(document).on('click', '#mostrar_campos', function()
{
	db.transaction(function (transaction)
	{
		transaction.executeSql('SELECT name, sql FROM sqlite_master WHERE type="table" AND name = "evidencia";', [], function (transaction, results) {
		var columnNames = results.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').replace(/ [^,]+/g, '').split(',');
		console.log(columnNames);
		///// Your code which uses the columnNames;
		});
	});
});

$(document).on('click', '#mostrar_registros', function()
{
	db.transaction(function (transaction)
	{
		var sql = "SELECT * FROM evidencia";
		transaction.executeSql (sql, undefined, function (transaction, result)
		{
			var html = '<ul data-role="listview">';
			if (result.rows.length)
			{
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					var id = row.id;
					var tipo_evidencia_id = row.tipo_evidencia_id;
					var codigo = row.codigo;
					var data = row.data;
					var hora = row.hora;
					var coordenadas = row.coordenadas;
					var obs = row.obs;
					var imagem_uri = row.imagem_uri;
					html += "<li>" + "ID: " + id + ", TIPO_ID: " + tipo_evidencia_id + ", Código: " + codigo + ", Data: " + data + ", Hora: " + hora + ", Coordenadas: " + coordenadas + ", OBS: " + obs + ", Imagem URI: " + imagem_uri + "</li>";
				}
			}
				else
			{
				html += "<li> Nenhum registro </li>";
			}
			html += "</ul>";
			$('#resultado').html(html);
		});
	});
});