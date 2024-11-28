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
    redis.on("connect", function () {
      console.log("You are now connected");
    });

    let keys = [];
    let n = await redis.get("manufacturer_N");

    for (let i = 1; i <= n; i++) keys.push(`manufacturer_${i}`);

    const manufacturers = await redis.mget(keys);
    manufacturers.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(manufacturers) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
