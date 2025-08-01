"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  clientRedeemAngpao: () => clientRedeemAngpao,
  redeemAngpao: () => redeemAngpao
});
module.exports = __toCommonJS(index_exports);

// src/redeemAngpao.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
async function redeemAngpao(phone, voucherCode) {
  try {
    const url = `https://gift.truemoney.com/campaign/vouchers/${voucherCode}/redeem`;
    const response = await (0, import_node_fetch.default)(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile: phone,
        voucher_hash: voucherCode
      })
    });
    const data = await response.json();
    if (data.status.code === "SUCCESS") {
      return {
        status: "SUCCESS",
        amount: data.data.amount_baht
      };
    } else {
      return {
        status: "FAIL",
        message: data.status.message || "Unknown error"
      };
    }
  } catch (error) {
    return {
      status: "FAIL",
      message: error.message
    };
  }
}

// src/clientRedeemAngpao.ts
async function clientRedeemAngpao(phone, voucherCode) {
  try {
    const url = `https://gift.truemoney.com/campaign/vouchers/${voucherCode}/redeem`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        mobile: phone,
        voucher_hash: voucherCode
      })
    });
    const data = await response.json();
    if (data.status.code === "SUCCESS") {
      return {
        status: "SUCCESS",
        amount: data.data.amount_baht
      };
    } else {
      return {
        status: "FAIL",
        message: data.status.message || "Unknown error"
      };
    }
  } catch (error) {
    const errorMessage = error.message;
    if (errorMessage.includes("CORS") || errorMessage.includes("Cross-Origin") || errorMessage.includes("blocked")) {
      return {
        status: "CORS_ERROR",
        message: "CORS Error: \u0E15\u0E49\u0E2D\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32 CORS \u0E2B\u0E23\u0E37\u0E2D\u0E43\u0E0A\u0E49 Proxy Server"
      };
    }
    return {
      status: "FAIL",
      message: errorMessage
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clientRedeemAngpao,
  redeemAngpao
});
