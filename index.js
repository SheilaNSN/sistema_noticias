var mysql = require('mysql2');
// Inclusao dos pacotes
const express = require('express')

// Instancia o express
const app = express()

//Definicao de porta
const port = 3000

// Abrindo conexao com banco de dados
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_noticias'
})

connection.connect()

//Servico de Hello World
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Serviço de busca de categorias
app.get('/new-api/v1/categorias', (req, res) => {

    // busca categorias
    connection.query('SELECT id, nome FROM sistema_noticias.categoria', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows)
    })
})


// Serviço de busca de categorias
app.get('/new-api/v1/categorias/:categoriaId/noticias', (req, res) => {

    // busca noticias de uma categoria
    connection.query('SELECT id, titulo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaId, function (err, rows, fields) {
        if (err) throw err

        res.send(rows)
    })
})

// Serviço de busca uma noticias
app.get('/new-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {

    // busca noticia 
    connection.query('SELECT id, titulo, conteudo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaId + ' AND id =' + req.params.noticiaId, function (err, rows, fields) {
        if (err) throw err

        res.send(rows[0])
    })
})

// Subindo servidor Node
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
