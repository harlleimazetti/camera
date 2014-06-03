var db = openDatabase ("spcr", "1.0", "Test", 65535);
db.transaction (function (transaction) 
{
	console.log('Configurando Banco de Dados...');
	
	//var sql = "DROP TABLE carac_vitima";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS carac_vitima " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"re_id INTEGER, " +
		"imovel_tipo_id INTEGER, " +
		"trafego_veiculos_id INTEGER, " +
		"trafego_pessoas_id INTEGER, " +
		"iluminacao_id INTEGER, " + 
		"imagem1 BLOB, " + 
		"imagem1_uri TEXT, " + 
		"vedacao_frontal_id INTEGER, " +
		"ofendiculas_id INTEGER, " + 
		"defesas_id INTEGER, " + 
		"construcao_id INTEGER, " + 
		"imagem2 BLOB, " + 
		"imagem2_uri TEXT, " + 
		"dimensao_frontal_id INTEGER, " + 
		"ocupacao_id INTEGER, " + 
		"obs TEXT, " +
		"hipoteses TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "DROP TABLE carac_coisa";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS carac_coisa " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"re_id INTEGER, " +
		"tipo_busca_id INTEGER, " + 
		"visibilidade_id INTEGER, " + 
		"tipo_principal_id INTEGER, " +
		"tipo_secundario_id INTEGER, " +
		"dimensao_id INTEGER, " +
		"peso_id INTEGER, " +
		"transporte_id INTEGER, " + 
		"vestigios_id INTEGER, " + 
		"fluidos_id INTEGER, " +
		"obs TEXT, " +
		"hipoteses TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "DROP TABLE acesso_coisa";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS acesso_coisa " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"re_id INTEGER, " +
		"res_pri_comodo_id INTEGER, " + 
		"res_atuacao_id INTEGER, " + 
		"res_outro_comodo_id INTEGER, " + 
		"res_imagem1 BLOB, " + 
		"res_imagem1_uri TEXT, " + 
		"res_imagem2 BLOB, " + 
		"res_imagem2_uri TEXT, " + 
		"com_pri_comodo_id INTEGER, " + 
		"com_atuacao_id INTEGER, " + 
		"com_outro_comodo_id INTEGER, " + 
		"com_imagem1 BLOB, " + 
		"com_imagem1_uri TEXT, " + 
		"com_imagem2 BLOB, " + 
		"com_imagem2_uri TEXT, " + 
		"ind_pri_comodo_id INTEGER, " + 
		"ind_atuacao_id INTEGER, " + 
		"ind_outro_comodo_id INTEGER, " + 
		"ind_imagem1 BLOB, " + 
		"ind_imagem1_uri TEXT, " + 
		"ind_imagem2 BLOB, " + 
		"ind_imagem2_uri TEXT, " + 
		"esco_pri_comodo_id INTEGER, " + 
		"esco_atuacao_id INTEGER, " + 
		"esco_outro_comodo_id INTEGER, " + 
		"esco_imagem1 BLOB, " + 
		"esco_imagem1_uri TEXT, " + 
		"esco_imagem2 BLOB, " + 
		"esco_imagem2_uri TEXT, " + 
		"escr_pri_comodo_id INTEGER, " + 
		"escr_atuacao_id INTEGER, " + 
		"escr_outro_comodo_id INTEGER, " + 
		"escr_imagem1 BLOB, " + 
		"escr_imagem1_uri TEXT, " + 
		"escr_imagem2 BLOB, " + 
		"escr_imagem2_uri TEXT, " + 
		"obs TEXT, " +
		"hipoteses TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "DROP TABLE acesso_local";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS acesso_local " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"re_id INTEGER, " +
		"limite_id INTEGER, " +
		"escalada_id INTEGER, " +
		"modo_escalada_id INTEGER, " +
		"rompimento_id INTEGER, " +
		"modo_rompimento_id INTEGER, " +
		"chave_falsa_id INTEGER, " +
		"imagem1 BLOB, " +
		"imagem1_uri TEXT, " +
		"imagem2 BLOB, " +
		"imagem2_uri TEXT, " +
		"obs TEXT, " +
		"hipoteses TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "DROP TABLE administrativa";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS administrativa " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"re_id INTEGER, " +
		"cidade_id INTEGER, " +
		"bo_tc VARCHAR(100), " +
		"dp VARCHAR(100), " +
		"data_requisicao DATE, " +
		"hora_requisicao TIME, " +
		"data_atendimento DATE, " +
		"hora_atendimento TIME, " +
		"preservacao VARCHAR(5), " +
		"logradouro VARCHAR(100), " +
		"numero VARCHAR(5), " +
		"complemento VARCHAR(100), " +
		"bairro VARCHAR(100), " + 
		"coordenadas VARCHAR(200), " + 
		"obs TEXT, " +
		"hipoteses TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "DROP TABLE config";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS config " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"url_servidor VARCHAR(200) " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	var sql = "INSERT INTO config (id, url_servidor) VALUES ('1', 'http://www.hlcontabil.com.br/spcr/sincronizar.php') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "DROP TABLE vestigio";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS vestigio " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"vestigio_tipo_id INTEGER, " +
		"re_id INTEGER, " +
		"numero_ordem INTEGER, " +
		"data DATE, " +
		"hora TIME, " +
		"coordenadas VARCHAR(200), " +
		"descricao TEXT, " +
		"localizacao TEXT, " +
		"imagem BLOB, " +
		"imagem_uri TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql = "INSERT INTO vestigio (id, vestigio_tipo_id, re_id, numero_ordem, data, hora, coordenadas, descricao, localizacao) VALUES ('1', '1', '1', '1', '2014-02-23','11:00:00','-18.92424, -48.249893','Descrição do vestígio 1.','Localização do vestígio 1') ";
	//transaction.executeSql (sql, undefined, function() { }, error);
	//var sql = "INSERT INTO vestigio (id, vestigio_tipo_id, re_id, numero_ordem, data, hora, coordenadas, descricao, localizacao) VALUES ('2', '2', '2', '1', '2014-02-24','19:00:00','-18.92424, -48.249893','Descrição do vestígio 2.','Localização do vestígio 2') ";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	//var sql = "DROP TABLE informe";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS informe " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"testemunha_tipo_id INTEGER, " +
		"re_id INTEGER, " +
		"numero_ordem INTEGER, " +
		"data DATE, " +
		"hora TIME, " +
		"coordenadas VARCHAR(200), " +
		"declaracao TEXT, " +
		"localizacao TEXT, " +
		"imagem BLOB, " +
		"imagem_uri TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
		
	//var sql = "DROP TABLE evidencia";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS evidencia " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"evidencia_tipo_id INTEGER, " +
		"re_id INTEGER, " +
		"numero_ordem INTEGER, " +
		"numero_lacre VARCHAR(50), " +
		"data DATE, " +
		"hora TIME, " +
		"nome_perito VARCHAR(50), " +
		"coordenadas VARCHAR(200), " +
		"unidade VARCHAR(200), " +
		"obs TEXT, " +
		"imagem BLOB, " +
		"imagem_uri TEXT " +
		")"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	/*var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, re_id, numero_ordem, numero_lacre, data, hora, nome_perito, coordenadas, unidade, obs) VALUES ('1', '1', '1', '1', '12345', '2014-02-23','11:00:00','Fulano de Tal','-18.92424, -48.249893','SBC - São Bernardo do Campo','Arrombamento ocorrido à noite na ausência dos proprietários do imóvel. Encontrados vestígios no local.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, re_id, numero_ordem, numero_lacre, data, hora, nome_perito, coordenadas, unidade, obs) VALUES ('2', '2', '1', '2', '54321', '2014-02-24','19:00:00','Beltrano da Silva','-18.92424, -48.249893','SBC - São Bernardo do Campo','Roubo a mão armada na Asa Norte. A vítima levou várias coronhadas na cabeça.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, re_id, numero_ordem, numero_lacre, data, hora, nome_perito, coordenadas, unidade, obs) VALUES ('3', '3', '1', '3', '98765', '2014-02-24','21:00:00','Ciclano de Alcantara','-18.92424, -48.249893','SBC - São Bernardo do Campo','Agressão doméstica. A vítima alega que o esposo a agrediu enquanto ela dormia.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, re_id, numero_ordem, numero_lacre, data, hora, nome_perito, coordenadas, unidade, obs) VALUES ('4', '4', '2', '1', '56789', '2014-02-25','12:00:00','Jose de Sousa','-18.92424, -48.249893','SBC - São Bernardo do Campo','Furto de veículo em Taguatinga. Vítima alega que havia um malote de tranporte de valores no interior do veículo.') ";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql = "INSERT INTO evidencia (id, evidencia_tipo_id, re_id, numero_ordem, numero_lacre, data, hora, nome_perito, coordenadas, unidade, obs) VALUES ('5', '1', '2', '2', '56712', '2014-02-25','15:00:00','Joao Francisco','-18.92424, -48.249893','SBC - São Bernardo do Campo','Invasão em estabelecimento comercial. Mercadorias e valores do caixa foram subtraídos.') ";
	transaction.executeSql (sql, undefined, function() { }, error);*/

	//var sql = "DROP TABLE evidencia_tipo";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS evidencia_tipo " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"tipo VARCHAR(50))"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	var sql =	" INSERT INTO evidencia_tipo (id, tipo) VALUES ('1', 'Arma')";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql	=	" INSERT INTO evidencia_tipo (id, tipo) VALUES ('2', 'Digital')";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql	=	" INSERT INTO evidencia_tipo (id, tipo) VALUES ('3', 'Ferramenta')";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql	=	" INSERT INTO evidencia_tipo (id, tipo) VALUES ('4', 'Marcas')";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql =	" INSERT INTO evidencia_tipo (id, tipo) VALUES ('5', 'Pegada')";
	transaction.executeSql (sql, undefined, function() { }, error);
	var sql =	" INSERT INTO evidencia_tipo (id, tipo) VALUES ('6', 'Pneumatico')";
	transaction.executeSql (sql, undefined, function() { }, error);
	
	//var sql = "DROP TABLE re";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
	var sql = "CREATE TABLE IF NOT EXISTS re " +
		" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		"codigo VARCHAR(50), " +
		"data DATE, " +
		"hora TIME, " +
		"endereco VARCHAR(200), " + 
		"logradouro VARCHAR(200), " + 
		"numero VARCHAR(5), " + 
		"complemento VARCHAR(200), " + 
		"bairro VARCHAR(200), " + 
		"cidade VARCHAR(200), " + 
		"uf VARCHAR(200), " + 
		"coordenadas VARCHAR(200), " +
		"crime VARCHAR(200), " +
		"obs TEXT, " +
		"novo CHAR(1))"
	transaction.executeSql (sql, undefined, function() { }, error);
	console.log(sql);
	
	//var sql =	" INSERT INTO re (id, codigo, data, hora, endereco, coordenadas, crime, obs, novo) VALUES ('1', '99110033', '2014-03-10', '23:00:00', 'SCS Quadra 01 bloco M sala 930 - Asa Sul - Brasília', '-18.92424, -48.249893', 'Furto em Residência', 'Observações 1', '1')";
	//transaction.executeSql (sql, undefined, function() { }, error);
	//var sql =	" INSERT INTO re (id, codigo, data, hora, endereco, coordenadas, crime, obs, novo) VALUES ('2', '99110025', '2014-03-10', '23:15:00', 'SCS Quadra 01 bloco G sala 508 - Asa Sul - Brasília','-18.92424, -48.249893','Furto em Escritório','Observações 2', '0')";
	//transaction.executeSql (sql, undefined, function() { }, error);
	
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
					var evidencia_tipo_id = row.evidencia_tipo_id;
					var re_id = row.re_id;
					var codigo = row.codigo;
					var data = row.data;
					var hora = row.hora;
					var coordenadas = row.coordenadas;
					var obs = row.obs;
					var imagem_uri = row.imagem_uri;
					html += "<li>" + "ID: " + id + ", TIPO_ID: " + evidencia_tipo_id + ", RE_ID: " + re_id + ", Código: " + codigo + ", Data: " + data + ", Hora: " + hora + ", Coordenadas: " + coordenadas + ", OBS: " + obs + ", Imagem URI: " + imagem_uri + "</li>";
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