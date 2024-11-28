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
    let n = await redis.get("supercar_N");

    for (let i = 1; i <= n; i++) keys.push(`supercar_${i}`);

    const supercars = await redis.mget(keys);
    supercars.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(supercars) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
