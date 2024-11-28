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

    const supercar = await redis.get(`supercar_${id}`);
    if (!supercar) throw new Error(`Supercar with ID ${id} not found.`);

    let supercars = [supercar];
    supercars.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(supercars) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
