import redeemAngpao from "truewallet-angpao";

redeemAngpao('0901234567', 'abcdef123456')
    .then(console.log)
    .catch(console.error);