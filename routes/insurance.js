const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList
  } = require('../public/js/constants'),
  con = require('../web-service-connector'),
  middleWareObj = require('../middleware');
middlware_hasTypeInsurance = middleWareObj.isLoggedIn('insurance');
//=========================================
//                insurance profile routes
//=========================================
router.get('/:id', middlware_hasTypeInsurance, (req, res) => {
  res.redirect(`/insurance/${req.params.id}/profile`);
});
router.get('/:id/profile', middlware_hasTypeInsurance, async (req, res) => {
  var insurance = await con.getInsurance(req.params.id);
  if (insurance.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = insurance.isVerified;
    res.render('insurance/profile', {
      insurance: insurance,
      countryList: countryList
    });
  }
});
//update insurance profile
router.put('/:id', middlware_hasTypeInsurance, async (req, res) => {
  var status = await con.updateInsurance(req.params.id, req.body.insurance);
  if (status === 200) {
    req.flash('success', 'insurance successfully updated');
  } else {
    req.flash('error', 'insurance could not be updated');
  }
  res.redirect(`/insurance/${req.params.id}/profile`);
});
//=========================================
//                insurance patients routes
//=========================================
router.get('/:id/patients', middlware_hasTypeInsurance, async (req, res) => {
  var insurance = await con.getInsurance(req.params.id);
  if (insurance.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = insurance.isVerified;
    patients = [];
    if (insurance.patientIds) {
      for (i = 0; i < insurance.patientIds.length; i++) {
        var p = await con.getPatient(insurance.patientIds[i])
        patients.push(p);
      }
    }
    res.render('insurance/patients', {
      insurance: insurance,
      patients: patients
    });
  }

});
// more info about a patient
router.get('/:id/patients/:patientid', middlware_hasTypeInsurance, async (req, res) => {
  var insurance = await con.getInsurance(req.params.id);
  if (insurance.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = insurance.isVerified;
    var patient = await con.getPatient(req.params.patientid);
    patient.bills = patient.bills.filter((el) => {
      return el.status != 'not sent';
    })
    res.render('insurance/patient-details', {
      insurance: insurance,
      patient: patient
    });
  }
});
// approve a patient bill
router.put('/:id/patient/:patientid/bill/:billid/approve', middlware_hasTypeInsurance, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.insuranceChangeBillStatus(req.params.patientid, req.params.billid, 'approved');
    if (status === 200) {
      req.flash('success', 'bill was approved successfully');
    } else {
      req.flash('error', 'bill could not be approved');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
// removes patient from insurance entity
router.delete('/:id/patients/:patientid', middlware_hasTypeInsurance, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.removePatientFromInsurance(req.params.id, req.params.patientid);
    if (status === 200) {
      req.flash('success', 'you successfully removed the customer');
    } else {
      req.flash('error', 'you could not remove the customer');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  var insuranceID = req.params.id;
  res.redirect(`/insurance/${insuranceID}/patients`);
});
//=========================================
//                insurance add patient routes
//=========================================
// adds new patient using id
router.post('/:id/patient', middlware_hasTypeInsurance, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.addPatientToInsurance(req.params.id, req.body.patientid);
    if (status === 200) {
      req.flash('success', 'you successfully added the customer');
    } else {
      req.flash('error', 'you could not the customer');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
//=========================================
//                insurance patient bill routes
//=========================================
router.put('/:insuranceid/patient/:patientid/bill/:billid/send', async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.insuranceChangeBillStatus(req.params.patientid, req.params.billid, 'pending');
    if (status === 200) {
      req.flash('success', 'bill was sent successfully');
    } else {
      req.flash('error', 'bill was not sent successfully');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
module.exports = router;