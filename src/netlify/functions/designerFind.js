"use strict";

const redis = require("./redisDB");
const headers = require("./headersCORS");

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = event.path.split("/").reverse()[0];

    redis.on("connect", function () {
      console.log("You are now connected");
    });

    const designer = await redis.get(`designer_${id}`);
    if (!designer) throw new Error(`Designer with ID ${id} not found.`);

    let designers = [designer];
    designers.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(designers) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
