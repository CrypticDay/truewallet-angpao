"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemAngpao = redeemAngpao;
// src/redeemAngpao.ts
const node_fetch_1 = __importDefault(require("node-fetch"));
function redeemAngpao(phone, voucherCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://gift.truemoney.com/campaign/vouchers/${voucherCode}/redeem`;
            const response = yield (0, node_fetch_1.default)(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: phone,
                    voucher_hash: voucherCode
                })
            });
            const data = yield response.json();
            if (data.status.code === 'SUCCESS') {
                return {
                    status: 'SUCCESS',
                    amount: data.data.amount_baht,
                };
            }
            else {
                return {
                    status: 'FAIL',
                    message: data.status.message || 'Unknown error',
                };
            }
        }
        catch (error) {
            return {
                status: 'FAIL',
                message: error.message,
            };
        }
    });
}
