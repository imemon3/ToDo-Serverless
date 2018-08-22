console.log("function started");
var AWS = require("aws-sdk");
console.log("handler start");
exports.handler = async (event) => {
    return new Promise(function(resolve, reject){
        var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: 'ToDo'
        }
    console.log("scanning database");
    return docClient.scan(params, function(err, data) {
        if(err) {
            console.log("Error", err);
            reject(err);
        } else {
    console.log("Success", data.Items);
    var itemsString = JSON.stringify(data.Items);
    var response = {
            "statusCode": 200,
            "body": itemsString,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "GET,OPTIONS",
                "Access-Control-Allow-Origin": "*",
            }
    }
        resolve(response);
            
        }
    });
    }) 
    // TODO implement
    
    }
