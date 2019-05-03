global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var aws_exports = require('../src/aws-exports');
var AWS = require('aws-sdk/global');
var middlewareObj = {};

middlewareObj.isLoggedIn = (type) => {
    return function(req, res, next) {
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
                    res.redirect('/login');
                    return;
                }
                //call refresh method in order to authenticate user and get new temp credentials
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                        req.flash('error', 'You need to be logged in to do that!');
                        res.redirect('/login');
                    } else {
                        cognitoUser.getUserAttributes((err, result)=> {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            for (i = 0; i < result.length; i++) {
                                console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                                if(result[i].getName()==='custom:type'){
                                    console.log('Type is: '+type);
                                    if(result[i].getValue()===type){
                                        console.log('right user type');
                                        return next();
                                    }else{
                                        console.log('wrong user type');
                                        res.redirect('/');
                                    }
                                }
                            }
                        });
                    }
                });
            });
        } else {
            console.error('no user');
            req.flash('error', 'You need to be logged in to do that!');
            res.redirect('/login');
        }
    };

}

module.exports = middlewareObj;