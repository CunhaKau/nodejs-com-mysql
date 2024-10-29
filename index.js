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
    //res.send("Estudante cadastrado com sucesso! " +result.insertId);
    res.redirect('/estudantes');
});

    });
});

//READ do banco de dados
app.get('/estudantes', function(req, res){
 conexao.connect(function(error){
 if(error) console.log(error);

 var sql = "select * from estudante";

 conexao.query(sql, function(error, result){
    if(error) console.log(error);
   // console.log(result); Mostra no terminal o select

   res.render("estudantes", {estudante:result});
 });
 });

});


app.listen(7008);


