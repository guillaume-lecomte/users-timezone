function getBase64FromBuffer(buffer) {
  return Buffer.from(buffer).toString("base64");
}

function isBase64Input(input) {
  return Buffer.from(input, "base64").toString("base64") === input;
}

module.exports = { getBase64FromBuffer, isBase64Input };
