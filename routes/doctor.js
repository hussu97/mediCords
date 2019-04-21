const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList,
    patient
  } = require('../public/js/constants'),
  moment = require('moment');

  module.exports = router;