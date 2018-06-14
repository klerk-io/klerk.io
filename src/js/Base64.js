const Base64 = (function () {
  const encode = function (string, encoding = "utf-8") {
    var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(string);
    return base64js.fromByteArray(bytes);
  }

  const decode = function (string, encoding = "utf-8") {
    var bytes = base64js.toByteArray(string);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
  }

  return {
    encode: encode,
    decode: decode
  }
})();