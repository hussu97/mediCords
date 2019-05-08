const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList
  } = require('../public/js/constants'),
  middlewareObj = require('../middleware'),
  con = require('../web-service-connector'),
  path = require('path');
middlware_hasTypePatient = middlewareObj.isLoggedIn('patient');

//=========================================
//                patient profile routes
//=========================================
router.get('/:id', (req, res) => {
  res.redirect(`/patient/${req.params.id}/profile`);
});
router.get('/:id/profile', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = patient.isVerified;
    res.render('patient/profile', {
      patient: patient,
      countryList: countryList
    });
  }
});
//update patient profile
router.put('/:id', middlware_hasTypePatient, async (req, res) => {
  var status = await con.updatePatient(req.params.id, req.body.patient);
  if (status === 200) {
    req.flash('success', 'Patient successfully updated');
  } else {
    req.flash('error', 'patient could not be updated');
  }
  res.redirect(`/patient/${req.params.id}/profile`);
});
//=========================================
//                patient medical info routes
//=========================================
router.get('/:id/operation', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = patient.isVerified;
    res.render('patient/operation', {
      patient: patient
    });
  }
});
router.get('/:id/allergy', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = patient.isVerified;
    res.render('patient/allergy', {
      patient: patient
    });
  }
});
router.get('/:id/disease', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = patient.isVerified;
    res.render('patient/disease', {
      patient: patient
    });
  }
});
router.get('/:id/disability', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = patient.isVerified;
    res.render('patient/disability', {
      patient: patient
    });
  }
});
//=========================================
//                patient bills routes
//=========================================
router.get('/:id/bill', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    var insurance;
    if (patient.insuranceId) {
      insurance = await con.getInsurance(patient.insuranceId);
    } else {
      insurance = {
        id: 1
      }
    }
    res.render('patient/bill', {
      patient: patient,
      insurance: insurance
    });
  }
});
//=========================================
//                patient insurance routes
//=========================================

router.get('/:id/insurance', middlware_hasTypePatient, async (req, res) => {
  var patient = await con.getPatient(req.params.id);
  if (patient.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    var insurance;
    if (patient.insuranceId) {
      insurance = await con.getInsurance(patient.insuranceId);
    } else {
      insurance = {
        id: 1
      }
    }
    var pendingCount = 0;
    var approvedCount = 0;
    patient.bills.forEach((el) => {
      if (el.status === 'pending') {
        pendingCount += 1;
      } else if (el.status === 'approved') {
        approvedCount += 1;
      }
    })
    res.render('patient/insurance', {
      patient: patient,
      countryList: countryList,
      patientInsurance: insurance,
      billsCount: {
        approved: approvedCount,
        pending: pendingCount
      }
    });
  }
});
module.exports = router;