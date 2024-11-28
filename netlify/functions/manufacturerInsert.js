"use strict";

const redis = require("./redisDB");
const headers = require("./headersCORS");

exports.handler = async (event, context) => {
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    redis.on("connect", function () {
      console.log("You are now connected");
    });

    const data = JSON.parse(event.body);
    const n = await redis.incr("manufacturer_N");

    await redis.set(`manufacturer_${n}`, JSON.stringify({ id: n, ...data }));
    return { statusCode: 200, headers, body: JSON.stringify({ id: n }) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
