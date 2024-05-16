import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0' //Todas as interfaces (placas de rede) do computador hospedeiro
const app = express();
//definir as funcionalidades do servidor acessiveis por endpoints (rotas) ou (endereços e URLS)

var listaUsuario = [];

//Declarar a nossa aplicação express onde esta a fonte dos arquivos estaticos
app.use(express.static(path.join(process.cwd, 'publico')));

app.use('/cadastrarUsuario', (req, resp) => {

    // Extraindo os dados do usuário da requisição enviada pelo navegador (dados do formulário HTML)
    const nome = req.query.nome;
    const sobrenome = req.query.sobrenome;
    const usuario = req.query.usuario;
    const cidade = req.query.cidade;
    const estado = req.query.estado;
    const cep = req.query.cep;

    // Adicionando um novo usuário à lista (assumindo que 'listaUsuario' já foi definida em outro lugar)
    listaUsuario.push({
        nome: nome,
        sobrenome: sobrenome,
        usuario: usuario,
        cidade: cidade,
        estado: estado,
        cep: cep
    });

    // Escrevendo a resposta HTML
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write(`<h1>Usuário ${nome} ${sobrenome} cadastrado com sucesso</h1>`);
    resp.write('<a href="/cadastroUsuario.html">Continuar cadastrando....</a>');
    resp.write('<br/>');
    resp.write('<a href="/listarUsuario">Listar Usuários</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});

app.use('/listarUsuario', (req, resp) => {

    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Usuários</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Sobrenome</th>');
    resp.write('<th>Nome de Usuario</th>')
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('<th>CEP</th>');
    resp.write('</tr>');
    for(let i=0; i<listaUsuario.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaUsuario[i].nome}`);
        resp.write(`<td>${listaUsuario[i].sobrenome}`);
        resp.write(`<td>${listaUsuario[i].usuario}`);
        resp.write(`<td>${listaUsuario[i].cidade}`);
        resp.write(`<td>${listaUsuario[i].estado}`);
        resp.write(`<td>${listaUsuario[i].cep}`);
        resp.write('<tr/>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>');
    resp.write('<html>');
    resp.end();
});


app.listen(porta, host, () => {
    console.log(`Servidor executando na porta http://${host}:${porta}`);
})