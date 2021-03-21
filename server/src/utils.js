function getBase64FromBuffer(buffer) {
  return Buffer.from(buffer).toString("base64");
}

module.exports = { getBase64FromBuffer };
