global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var aws_exports = require('../src/aws-exports');
var AWS = require('aws-sdk/global');
var moment = require('moment');
var path = require('path');
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
                    console.log('a: '+req.flash);
                    req.flash('error', 'You need to be logged in to do that!');
                    res.sendFile(path.join(__dirname + '/../403.html'));
                    return;
                }
                if(req.params.id!=session.getIdToken().decodePayload().sub){
                    req.flash('error', 'You need to be logged in to do that!');
                    res.sendFile(path.join(__dirname + '/../403.html'));
                    return;
                }
                //call refresh method in order to authenticate user and get new temp credentials
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.log('b: '+req.flash);
                        console.error(error);
                        req.flash('error', 'You need to be logged in to do that!');
                        res.sendFile(path.join(__dirname + '/../403.html'));
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
                                        res.sendFile(path.join(__dirname + '/../403.html'));
                                    }
                                }
                            }
                        });
                    }
                });
            });
        } else {
            console.log('c: '+req.flash);
            console.error('no user');
            req.flash('error', 'You need to be logged in to do that!');
            res.sendFile(path.join(__dirname + '/../403.html'));
        }
    };

}
middlewareObj.convertToTimeStamp = date => {
    return new Date(date).getTime()
}
middlewareObj.convertToDate = timeStamp => {
    return moment.unix(timeStamp/1000).format('YYYY-MM-DD');
}
middlewareObj.getCurrentTS = () => {
    return new Date().getTime();
}
module.exports = middlewareObj;