const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    {
        countryList
    } = require('../public/js/constants');

    global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var aws_exports = require('../src/aws-exports');
var AWS = require('aws-sdk/global');

router.get('/', (req, res) => {
    res.render('landing');
});
router.post('/register', (req, res) => {
    switch (req.body.userType) {
        case 'Patient':
            username = `p.${req.body.patient.username}`;
            var date = new Date(req.body.patient.expiry);
            var timestamp = date.getTime();
            req.body.patient.expiry = timestamp/1000;
            break;
        case 'Doctor':
            username = `d.${req.body.doctor.username}`;
            var date = new Date(req.body.doctor.expiry);
            var timestamp = date.getTime();
            req.body.doctor.expiry = timestamp/1000;
            break;
        case 'Hospital':
            username = `h.${req.body.hospital.username}`;
            var date = new Date(req.body.hospital.expiry);
            var timestamp = date.getTime();
            req.body.hospital.expiry = timestamp/1000;
            break;
        case 'Insurance':
            username = `i.${req.body.insurance.username}`;
            var date = new Date(req.body.insurance.expiry);
            var timestamp = date.getTime();
            req.body.insurance.expiry = timestamp/1000;
            break;
    }
    console.log(req.body);
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var attributeList = [];
    var dataEmail = {
        Name: 'email',
        Value: req.body.email
    };
    var dataType = {
        Name: 'custom:type',
        Value: req.body.userType
    };
    // var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    // var attributeType = new AmazonCognitoIdentity.CognitoUserAttribute(dataType);
    // attributeList.push(attributeType);
    // attributeList.push(attributeEmail);
    // userPool.signUp(username, req.body.password, attributeList, null, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(result)
    // });

});
router.post('/verify', (req, res) => {
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: req.body.username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(req.body.code, true, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('call result: ' + result);

    });
})
router.post('/login', (req, res) => {
    switch(req.body.type){
        case 'Patient':
            req.body.username = `p.${req.body.username}`;
            break;
            case 'Doctor':
            req.body.username = `d.${req.body.username}`;
            break;
            case 'Hospital':
            req.body.username = `h.${req.body.username}`;
            break;
            case 'Insurance':
            req.body.username = `i.${req.body.username}`;
            break;
            case 'Government':
            req.body.username = `g.${req.body.username}`;
            break;
    }
    console.log(req.body);
    // var poolData = {
    //     UserPoolId: aws_exports.aws_user_pools_id,
    //     ClientId: aws_exports.aws_user_pools_web_client_id
    // };
    // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // var userData = {
    //     Username: req.body.username,
    //     Pool: userPool
    // };
    // var authenticationData = {
    //     Username: req.body.username,
    //     Password: req.body.password
    // }
    // var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    // var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // cognitoUser.authenticateUser(authenticationDetails, {
    //     onSuccess: function (result) {
    //         console.log(result)
    //         //POTENTIAL: Region needs to be set if not already set previously elsewhere.
    //         AWS.config.region = aws_exports.aws_cognito_region;

    //         AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //             IdentityPoolId: aws_exports.aws_cognito_identity_pool_id, // your identity pool id here
    //             Logins: {
    //                 // Change the key below according to the specific region your user pool is in.
    //                 'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_4cWxsaOo2': result.getIdToken().getJwtToken()
    //             }
    //         });
    //         //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
    //         AWS.config.credentials.refresh((error) => {
    //             if (error) {
    //                 console.error(error);
    //             } else {
    //                 console.log('Successfully logged!');
    //                 cognitoUser.getUserAttributes((err, result) => {
    //                     if (err) {
    //                         console.log(err);
    //                         return;
    //                     }
    //                     for (i = 0; i < result.length; i++) {
    //                         console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
    //                         if (result[i].getName() === 'custom:type') {
    //                             if (result[i].getValue() === req.body.type) {
    //                                 console.log('right user type');
    //                                 return next();
    //                             } else {
    //                                 console.log('wrong user type');
    //                                 res.redirect('/');
    //                             }
    //                         }
    //                     }
    //                 });
    //             }
    //         });
    //     },
    //     onFailure: function (err) {
    //         console.log(err);
    //         res.redirect('/');
    //     },

    // });
})
router.post('/logout', (req, res) => {
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.signOut();
        console.log('signed out');
    }
    res.redirect('/');
})
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register/index', {
        countryList: countryList
    });
});
router.post('/changePassword',(req,res)=> {
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    cognitoUser.changePassword(req.body.password, req.body.new_password, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('back');
    });
})
module.exports = router;