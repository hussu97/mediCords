const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    moment = require('moment');


//=========================================
//                government profile routes
//=========================================
router.get('/:id', (req, res) => {
    res.redirect(`/government/${req.params.id}/patients`);
});
//=========================================
//                government patients routes
//=========================================
router.get('/:id/patients', (req, res) => {
    res.render('government/patients', {
        government : {
            country : 'India',
            id : req.params.id, 
        },
        patients : [
            {
                firstName: 'John',
                lastName: 'Doe',
                country: 'Madagascar',
                isVerified: true,
                address : 'xyz,abc, helo',
                identificationNumber: '2iie02i3203i0ewi',
                id: 111,
                dob : moment().format('MMM Do YY')
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                country: 'Madagascar',
                isVerified: true,
                address : 'xyz,abc, helo',
                identificationNumber: '2iie02i3203i0ewi',
                id: 2222,
                dob : moment().format('MMM Do YY')
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                country: 'Madagascar',
                isVerified: true,
                address : 'xyz,abc, helo',
                identificationNumber: '2iie02i3203i0ewi',
                id: 333,
                dob : moment().format('MMM Do YY')
            },
        ]
    });
});
router.put('/:id/patient/:patientid/verify',(req,res)=> {
    // console.log(req.params.patientid);
    // console.log(req.params.id);
    // console.log(req.body.isVerified);
    res.redirect(`/government/${req.params.id}/patients`)
});
//=========================================
//                government doctors routes
//=========================================
router.get('/:id/doctors', (req, res) => {
    res.render('government/doctors', {
        government : {
            country : 'Egypt',
            id : req.params.id
        },
        doctors : [
            {
                firstName: 'John',
                lastName: 'Doe',
                country: 'Madagascar',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111,
                speciality : 'Surgeon'
            },
            {
                firstName: 'John',
                lastName: 'Carlos',
                country: 'Madagascar',
                isVerified: false,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111,
                speciality : 'Home Therapist'
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                country: 'Madagascar',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111,
                speciality : 'Surgeon'
            }
        ]
    });
});
router.put('/:id/doctor/:doctorid/verify',(req,res)=> {
    // console.log(req.params.doctorid);
    // console.log(req.params.id);
    // console.log(req.body.isVerified);
    res.redirect(`/government/${req.params.id}/doctors`)
});

//=========================================
//                government hospitals routes
//=========================================
router.get('/:id/hospitals', (req, res) => {
    res.render('government/hospitals', {
        government : {
            country : 'Egypt',
            id : req.params.id
        },
        hospitals : [
            {
                name : 'xyz-hospital',
                country: 'Madagascar',
                city : 'city A',
                address : 'Al Noor Branch',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111
            },
            {
                name : 'xyz-hospital',
                country: 'Madagascar',
                city : 'city A',
                address : 'Al Noor Branch',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111
            },
            {
                name : 'xyz-hospital',
                country: 'Madagascar',
                city : 'city A',
                address : 'Al Noor Branch',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111
            },
        ]
    });
});
router.put('/:id/hospital/:hospitalid/verify',(req,res)=> {
    // console.log(req.params.hospitalid);
    // console.log(req.params.id);
    // console.log(req.body.isVerified);
    res.redirect(`/government/${req.params.id}/hospitals`)
});
//=========================================
//                government hospitals routes
//=========================================
router.get('/:id/insurances', (req, res) => {
    res.render('government/insurances', {
        government : {
            country : 'Egypt',
            id : req.params.id
        },
        insurances : [
            {
                name : 'xyz-company',
                country: 'Madagascar',
                city : 'city A',
                address : 'Al Noor Branch',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111
            },
            {
                name : 'xyz-hospital',
                country: 'Madagascar',
                city : 'city A',
                address : 'Al Noor Branch',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111
            },
            {
                name : 'xyz-hospital',
                country: 'Madagascar',
                city : 'city A',
                address : 'Al Noor Branch',
                isVerified: true,
                expiry : moment().format('MMM Do YY'),
                identificationNumber: 'ii0ewi',
                id: 111
            },
        ]
    });
});
router.put('/:id/insurance/:insuranceid/verify',(req,res)=> {
    // console.log(req.params.insuranceid);
    // console.log(req.params.id);
    // console.log(req.body.isVerified);
    res.redirect(`/government/${req.params.id}/insurances`)
});
module.exports = router;