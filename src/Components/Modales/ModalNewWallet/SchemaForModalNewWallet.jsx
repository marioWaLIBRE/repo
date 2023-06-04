import * as yup from "yup";

export const schema = yup.object({
  selectedExchangeWallet: yup
    .string("Invalid value")
    .required("Select Decentralized Wallet"),
  selectedCurrencyHidden: yup
    .string("Invalid value")
    .required("Select the currency"),
  walletAddress: yup
    .string("Invalid format")
    .required("Field is required")
    .when("selectedCurrencyHidden", {
      is: (val) => {
        return val === "USDT TRC20";
      },
      then: yup
        .string("Invalid format")
        .matches(/^T[a-zA-Z0-9]+$/, "Invalid TRON format")
        .min(34, "Must have 34 Characters")
        .max(34, "Must have 34 Characters"),
      otherwise: yup
        .string("Invalid format")
        .matches(/^0x[a-fA-F0-9]+$/, "Invalid ETH format")
        .min(42, "Only 42 Characters Allowed")
        .max(42, "Only 42 Characters Allowed"),
    }),
  token: yup
    .string("Invalid format")
    .required("Field is required")
    .min(6, "Token must have 6 characters")
    .max(6, "Token must have 6 characters"),
  walletName: yup.string("Invalid format").required("Field is required"),
});
