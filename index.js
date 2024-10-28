//importando módulo do banco de dados
var conexao = require("./conexaobanco");

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
res.sendFile(__dirname+'/cadastro.html');
});

//POST continuar
app.post('/', function(req, res){
   var nomecompleto = req.body.nomecompleto;
   var email = req.body.email;
   var senha = req.body.senha; 

   conexao.connect(function(error){
    if(error) throw error;

/* var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES(' "+nomecompleto+" ', ' "+email+" ', ' "+senha+" ')";

conexao.query(sql, function(error, result){
if(error) throw error;
   res.send("Estudante cadastrado com sucesso!"+result.insertId);         
}); */


//previnindo SQL Injection
var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES (?, ?, ?)";

conexao.query(sql, [nomecompleto, email, senha], function(error, result){
    if(error) throw error;
    res.send("Estudante cadastrado com sucesso! " +result.insertId);
});

    });
});

//continuar criar READ do banco de dados


app.listen(7002);



// conexao.connect(function(error){
//    if(error) throw error; 
//    //console.log("O banco de dados foi conectado!");

//    conexao.query("select * from estudante", function(error, result){
//     if(error) throw error;
//     console.log(result);
//     console.log(result[0]);
//     console.log(result[0].nomecompleto);
//    });
// });