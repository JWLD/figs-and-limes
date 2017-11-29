const Express = require('express');
const Handlebars = require('express-handlebars');

const app = Express();

app.engine('hbs', Handlebars({
  defaultLayout: 'main',
  partialsPath: './partials',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(Express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});