import * as AWS from 'aws-sdk/global';
// ES Modules, e.g. transpiling with Babel
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

var authenticationData = {
    Username: 'cxuanyi',
    Password: 'Password@123',
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
);
var poolData = {
    UserPoolId: 'ap-southeast-1_Krx5EBNva', // Your user pool id here
    ClientId: '31it8rd08fvmj8evp5po8s73oc', // Your client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username: 'cxuanyi',
    Pool: userPool,
};
const testCognito = () => {
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // var cognitoidentity = new AWS.CognitoIdentity();
    // cognitoidentity.getOpenIdToken({
    //     IdentityId: 'ap-southeast-1:0dc11051-304f-4e55-a3fb-af07393a179c', // your identity pool id here
    //     Logins: {
    //         // Change the key below according to the specific region your user pool is in.
    //         '<IdentityProviderName>' : 'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_Krx5EBNva'
    //     }, function(err, data) {
    //         console.log('hahaha');
    //         if (err) console.log(err, err.stack); // an error occurred
    //         else     console.log(data);           // successful response
    //       }
    // });

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {

            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'ap-southeast-1';
   
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'ap-southeast-1:0dc11051-304f-4e55-a3fb-af07393a179c', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_Krx5EBNva': result
                        .getIdToken()
                        .getJwtToken(),
                },
            });
        
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh(error => {
                if (error) {
                    console.error(error);
                } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    console.log('Successfully logged!');
                }
            });
        },
    
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
};

export { testCognito };