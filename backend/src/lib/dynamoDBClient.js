const { DynamoDB } = require('aws-sdk')
const REGION = 'us-east-1'
const dynamoDB = new DynamoDB({ region: REGION })
module.exports = { dynamoDB }
