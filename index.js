require("dotenv").config();

var AWS = require("aws-sdk");

const my_AWSAccessKeyId = process.env.AWSAccessKeyId;
const my_AWSSecretKey = process.env.AWSSecretKey;
const aws_region = process.env.region;
const empTable = process.env.tableName;

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: aws_region,
  accessKeyId: my_AWSAccessKeyId,
  secretAccessKey: my_AWSSecretKey,
});

const insertDynamoDB = async () => {
  const params = {
    TableName: empTable,
    Item: { name: "Arunkumar S", sub_id: "USER_02", id: "AWS_02", address: "chennai-6000025" },
  };

  const putItem = new Promise((res, rej) => {
    dynamoDB.put(params, (err, data) => {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success!");
        res("Inserted data into Dynamodb!");
      }
    });
  });

  const result = await putItem;
  console.log(result);
};

const fetchAllDataDynamoDB = async () => {
  const params = {
    TableName: empTable,
  };

  const getItems = new Promise((res, rej) => {
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success!");
        res(JSON.stringify(data, null, 2));
      }
    });
  });
  const result = await getItems;
  console.log(result);
};

const fetchDataByIdDynamoDB = async () => {
  // const primaryKey = {
  //   YourPartitionKey: 'your_partition_key_value',
  //   YourSortKey: 'your_sort_key_value'
  // };

  const primaryKey = {
    id: "AWS_02",
    sub_id: "USER_02",
  };

  var params = {
    TableName: empTable,
    Key: primaryKey,
  };

  let queryExecute = new Promise((res, rej) => {
    dynamoDB.get(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success! get method fetch data from dynamodb");
        res(JSON.stringify(data, null, 2));
      }
    });
  });
  const result = await queryExecute;
  console.log(result);
};

const fetchDataBasedOnCondition = async () => {
  const id = "AWS_02";
  const name = "Arunkumar S";
  const params = {
    TableName: empTable,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":id": id,
      ":nameValue": name,
    },
    FilterExpression: "#name = :nameValue", //AttributeName with attributeValue
    Limit: 5,
    ScanIndexForward: false, // Set ScanIndexForward to false to display most recent entries first
  };

  // const queryParams = {
  //   TableName: tableName,
  //   KeyConditionExpression: '#partitionKey = :partitionKeyValue',
  //   ExpressionAttributeNames: {
  //     '#partitionKey': 'YourPartitionKey'
  //   },
  //   ExpressionAttributeValues: {
  //     ':partitionKeyValue': 'your_partition_key_value'
  //   }
  // };

  let queryExecute = new Promise((res, rej) => {
    dynamoDB.query(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success! get method fetch data from dynamodb");
        res(JSON.stringify(data, null, 2));
      }
    });
  });
  const result = await queryExecute;
  console.log(result);
};

const updateDatafromDatabase = async () => {
  const id = "AWS_02";
  const name = "Arunkumar ST";
  const sub_id = "USER_02";

  const params = {
    TableName: empTable,
    Key: {
      id,
      sub_id,
    },
    UpdateExpression: "SET #name = :nameValue",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":nameValue": name,
    },
    ReturnValues: "UPDATED_NEW",
  };

  // const updateParams = {
  //   TableName: tableName,
  //   Key: {
  //     YourPartitionKey: "your_partition_key_value",
  //     YourSortKey: "your_sort_key_value",
  //   },
  //   UpdateExpression: "SET #attributeName = :newValue",
  //   ExpressionAttributeNames: {
  //     "#attributeName": "YourAttributeName",
  //   },
  //   ExpressionAttributeValues: {
  //     ":newValue": "new_attribute_value",
  //   },
  //   ReturnValues: "UPDATED_NEW",
  // };

  let queryExecute = new Promise((res, rej) => {
    dynamoDB.update(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Updated Successfully done for :" + id);
        res(JSON.stringify(data, null, 2));
      }
    });
  });
  const result = await queryExecute;
  console.log(result);
};

const deleteDatafromDatabase = async () => {
  // delete method fetch data from dynamodb
  const id = "AWS_002";
  const sub_id = "USER_002";
  const params = {
    TableName: empTable,
    Key: {
      id,
      sub_id,
    },
  };

  let queryExecute = new Promise((res, rej) => {
    dynamoDB.delete(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Deleted Successfully user :" + id);
        res(JSON.stringify(data, null, 2));
      }
    });
  });
  const result = await queryExecute;
  console.log(result);
};

insertDynamoDB(); // to create data items and insert values into database

// fetchAllDataDynamoDB(); // to get data from db using scan method

// fetchDataByIdDynamoDB(); // to get data from db based on the id

// fetchDataBasedOnCondition(); // to get data based on the condition

// updateDatafromDatabase(); // to update exist table values

// deleteDatafromDatabase(); // to delete exist table values

// arn:aws:lambda:eu-north-1:540373817807:function:helloWorld

// https://e9v0pihrr3.execute-api.eu-north-1.amazonaws.com/prod
