const express = require('express');
const router = express.Router();
const { getForecast, getForecastByDay } = require('../data/queries');

router.use((req, res, next) => {
  console.log('inside render forecast router');
  next();
});

router.get('/:day', (req, res) => {
  const forecast = getForecastByDay(req.params.day);
  if (!forecast.length) {
    return res.redirect('/');
  }
  res.render('daily', { forecast: forecast[0] });
});

router.get('/', (req, res) => {
  const forecast = getForecast();
  res.render('index', { forecast });
});

module.exports = router;
