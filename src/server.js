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

  // send email to figslimes

  const figsMailOptions = {
    from: 'figslimes@gmail.com',
    to: 'figslimes@gmail.com',
    subject: 'New Message',
    text: emailString
  }

  transporter.sendMail(figsMailOptions, function(err, info) {
    if (err) return console.log(err)

    return res.send(info.response)
  })

  // send email to customer

  const customerMailOptions = {
    from: 'figslimes@gmail.com',
    to: req.body.email,
    subject: 'Figs & Limes Enquiry',
    text: `
      Thanks for your enquiry. We'll be in touch shortly!

      - The Figs & Limes team


      www.figsandlimes.com

      Wedding and function band agency - ${new Date().getFullYear()}.
    `
  }

  transporter.sendMail(customerMailOptions, function(err, info) {
    if (err) return console.log(err)

    return res.send(info.response)
  })
})

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`)
})
