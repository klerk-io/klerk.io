import base64js from "base64-js";

export default class Base64 {
  static encode(string, encoding = "utf-8") {
    var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(string);
    return base64js.fromByteArray(bytes);
  }

  static decode(string, encoding = "utf-8") {
    var bytes = base64js.toByteArray(string);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
  }
};