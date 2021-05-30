import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class ServerlessApiLambdaDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const dynamoTable = new dynamodb.Table(this, 'MyDynamoTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    // Lambda
    const myDynamoLambda = new lambda.Function(this, 'MyDynamoLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lib/lambda'),
      handler: "index.handler",
      environment: {
        HELLO_TABLE_NAME: dynamoTable.tableName,
      }
    });

    // permission from lambda to dynamo table
    dynamoTable.grantReadWriteData(myDynamoLambda);

    // API Gateway
    const apigGw = new apigateway.LambdaRestApi(this, 'dynamoLambdaApi', {
      handler: myDynamoLambda,
      proxy: false
    });

    const hello = apigGw.root.addResource('hello');
    hello.addMethod('GET');
    
    // -- CloudFormation Outputs --
    new cdk.CfnOutput(this, 'LbDns', {
      value: apigGw.url ?? "There's something wrong with deploy"
    })
  }
}
