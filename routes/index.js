const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    {
        countryList
    } = require('../public/js/constants');
global.fetch = require('node-fetch')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js'),
    aws_exports = require('../src/aws-exports'),
    AWS = require('aws-sdk/global'),
    Amplify = require('aws-amplify'),
    {
        API
    } = require('aws-amplify');
API.configure(aws_exports);
router.get('/', (req, res) => {
    res.render('landing');
});

router.post('/register', (req, res) => {
    switch (req.body.userType) {
        case 'patient':
            req.session.user = req.body.patient;
            req.session.user.username = `p.${req.body.patient.username}`;
            break;
        case 'doctor':
            req.session.user = req.body.doctor;
            req.session.user.username = `d.${req.body.doctor.username}`;
            break;
        case 'hospital':
            req.session.user = req.body.hospital;
            req.session.user.username = `h.${req.body.hospital.username}`;
            break;
        case 'insurance':
            req.session.user = req.body.insurance;
            req.session.user.username = `i.${req.body.insurance.username}`;
            break;
    }
    req.session.user.expiry = new Date(req.session.user.expiry).getTime() / 1000;
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var attributeList = [];
    var dataEmail = {
        Name: 'email',
        Value: req.session.user.email
    };
    var dataType = {
        Name: 'custom:type',
        Value: req.body.userType
    };
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataType));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail));
    userPool.signUp(req.session.user.username, req.session.user.password, attributeList, null, function (err, result) {
        if (err) {
            console.log(err);
            req.flash('error',err.message);
            res.redirect('/register');
            return;
        }
        res.redirect('/verify');
    });

});
router.get('/verify', (req, res) => {
    res.render('verify');
})
router.post('/verify', (req, res) => {
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: req.session.user.username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    console.log(cognitoUser);
    cognitoUser.confirmRegistration(req.body.code, true, function (err, result) {
        if (err) {
            console.log(err);
            req.flash('error',err.message);
            res.redirect('/verify');
            return;
        }
        var authenticationData = {
            Username: req.session.user.username,
            Password: req.session.user.password
        }
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(result)
                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = aws_exports.aws_cognito_region;

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: aws_exports.aws_cognito_identity_pool_id, // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_JGkIKeItC': result.getIdToken().getJwtToken()
                    }
                });
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Successfully logged!');
                        req.session.user.id = result.getIdToken().decodePayload().sub;
                        var data = {
                            body: req.session.user
                        }
                        req.session.user.password = '';
                        req.session.user.email = '';
                        switch (req.session.user.username.split('.')[0]) {
                            case 'p':
                                break;
                            case 'd':
                                break;
                            case 'h':
                                break;
                            case 'i':
                                break;
                            case 'g':
                                break;
                        }
                    }
                    req.session.user = '';
                });
            },
            onFailure: function (err) {
                console.log(err);
                req.flash('error',err.message);
                res.redirect('/verify');
            },
        });
    });
})
router.post('/login', (req, res) => {
    var userLetter = req.body.type.toLowerCase()[0]+".";
    req.body.username = `${userLetter}${req.body.username}`;
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: req.body.username,
        Pool: userPool
    };
    var authenticationData = {
        Username: req.body.username,
        Password: req.body.password
    }
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = aws_exports.aws_cognito_region;

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: aws_exports.aws_cognito_identity_pool_id, // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_JGkIKeItC': result.getIdToken().getJwtToken()
                }
            });
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Successfully logged!');
                    var userID = result.getIdToken().decodePayload().sub;
                    res.redirect(`/${req.body.type.toLowerCase()}/${userID}`);
                }
            });
        },
        onFailure: function (err) {
            console.log(err);
            req.flash('error',err.message);
            res.redirect('/login');
        },

    });
})
router.get('/logout', (req, res) => {
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
    res.redirect('/login');
})
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register/index', {
        countryList: countryList
    });
});
router.post('/changePassword', (req, res) => {
    var poolData = {
        UserPoolId: aws_exports.aws_user_pools_id,
        ClientId: aws_exports.aws_user_pools_web_client_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession( (err, session)=> {
            if (err) {
                console.log(err)
                req.flash('error', 'You need to be logged in to do that!');
                res.render('back');
                return;
            }
            //call refresh method in order to authenticate user and get new temp credentials
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                    req.flash('error', 'You need to be logged in to do that!');
                    res.render('back');
                } else {
                    cognitoUser.changePassword(req.body.password, req.body.new_password, function (err, result) {
                        if (err) {
                            req.flash('error',err.message);
                            console.log(err);
                        }else{
                            req.flash('success','Password successfully changed');
                        }
                        res.redirect('back');
                    });
                }
            });
        });
    } else {
        console.error('no user');
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('back');
    }
})

module.exports = router;