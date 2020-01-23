const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const forecastRouter = require('./routes/forecast');
const breadRouter = require('./routes/breads');
const methodOverride = require('method-override');
const renderForecastRouter = require('./routes/render-forecast');

const port = process.env.PORT || 9876;
const app = express();

app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// routes
app.use('/api/forecast', forecastRouter);
app.use('/api/breads', breadRouter);
app.use('/forecast', renderForecastRouter);

app.get('*', (req, res) => {
  res.redirect('/forecast');
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
