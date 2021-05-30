# API GW + Lambda + DynamoDB

This project implements connection to API Gateway to Lambda and creation of DynamoDB Table. There's no CRUD yet for Lambda to DynamoDB.

## Deployment steps
Below are the steps to deploy the use case:

```
npm run build
cdk bootstrap
cdk deploy
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
