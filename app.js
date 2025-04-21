const express = require('express')
const session = require('express-session')

const app = express()
const port = 3000
let path = require('path')

app.use(session({ secret: 'meuSegredo', resave: false }))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))



app.get('/', (req, res) => {
  ;
  res.render('index');

})

app.post('/', (req, res) => {
  const { nome, senha } = req.body
  req.session.nome = nome
  req.session.senha = senha
  if (req.session.nome == 'admin' && req.session.senha == '123') {
    res.render('home', { nome: req.session.nome })
  }
  else {
    res.redirect('/')
  }

})

app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})