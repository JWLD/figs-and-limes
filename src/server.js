const Express = require('express')
const Handlebars = require('express-handlebars')
const { bands, faqs } = require('./data.json')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = Express()

app.engine(
  'hbs',
  Handlebars({
    defaultLayout: 'main',
    partialsPath: './partials',
    extname: 'hbs'
  })
)

app.set('view engine', 'hbs')

app.use(Express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('landing', { bands, faqs })
})

app.get('/bands/:band', (req, res) => {
  res.render('band', {
    band: bands.find(band => band.url === req.params.band)
  })
})

app.post('/contact', (req, res) => {
  if (!process.env.EMAIL_PASSWORD) return console.log('No password!')

  let emailString = ''

  Object.keys(req.body).forEach(info => {
    emailString += `${info}: ${req.body[info]} \n`
  })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'figslimes@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: 'figslimes@gmail.com',
    to: 'figslimes@gmail.com',
    subject: 'New Message',
    text: emailString
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) return console.log(err)

    return res.send(info.response)
  })
})

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`)
})
