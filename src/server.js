const Express = require('express');
const Handlebars = require('express-handlebars');
const { bands, faqs } = require('./data.json');

const app = Express();

app.engine('hbs', Handlebars({
  defaultLayout: 'main',
  partialsPath: './partials',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(Express.static('public'));

app.get('/', (req, res) => {
  res.render('landing', { bands, faqs });
});

app.get('/bands/:band', (req, res) => {
	res.render('band', {
		band: bands.find(band => band.url === req.params.band)
	});
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
