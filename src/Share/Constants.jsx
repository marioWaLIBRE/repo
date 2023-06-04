export const referralLinkBaseUrl = "https://cryptoprogram.me?referralCode=";
export const baseApiUrl =
  "https://cryptoserverback.com/GjEMeHQVaWAQwSeUYMkxLzQthmuHQqEBWfdgLFVNbDo/api/";

// EXPORT DEL SIDEBAR
export const menuLists = [
  {
    name: "Profile",
    img: "./Assets/IconosColor/ProfileYellow.svg",
    href: "/profile",
  },
  {
    name: "Packages",
    img: "./Assets/IconosColor/PackagesGreenYellow.svg",
    href: "/packages",
  },
  {
    name: "Profits",
    img: "./Assets/IconosColor/ProfitsYellowGreen.svg",
    href: "/profits",
  },
  {
    name: "Tutorials",
    img: "./Assets/IconosColor/TutorialsBlue.svg",
    href: "/tutorials",
  },
  {
    name: "FAQ",
    img: "./Assets/IconosColor/FaqPurple.svg",
    href: "/frequentQuestions",
  },
];

export const listaCarruTesti = [
  {
    texto: "",
    img: "",
    name: "",
    fecha: "",
  },
];

export const commissionWallet = "./Assets/Iconos/commissionWallet.svg";
export const EditWallet = "./Assets/Iconos/Edit_Wallet.svg";
export const DeleteWallet = "./Assets/Iconos/Delete_Wallet.svg";
export const WalletToPayMeOff = "./Assets/Iconos/Wallet_to_pay_me_Off.svg";
export const iconsWallets = "./Assets/Iconos/Wallet_to_pay_me_Off.svg";

///// API consumo en packages
export const headersTable = [
  { id: 1, titulo: "STATUS", botton: true },
  { id: 2, titulo: "PACKAGES NUMBER", botton: true },
  { id: 2, titulo: "CAMPAIGN", botton: false },
  { id: 3, titulo: "PURCHASE CRYPTO CURRENCY", botton: false },
  { id: 4, titulo: "PURCHASE AMOUNT IN CRYPTO", botton: true },
  { id: 5, titulo: "INITIAL DATE", botton: true },
  { id: 6, titulo: "CYCLE", botton: true },
  { id: 7, titulo: "PAYOUT DATE", botton: true },
  { id: 8, titulo: "PAYOUT IN CRYPTO", botton: true },
  { id: 9, titulo: "TOTAL PAYOUT", botton: true },
  { id: 10, titulo: "ACTION", botton: false },
  { id: 11, titulo: "PCK PURCHASE TRANSACTIONS", botton: false },
  { id: 12, titulo: "PAYMENT TRANSACTIONS", botton: false },
];

export const headerTableLeaders = [
  { id: 1, titulo: "SUPER AFFILIATE USERNAME" },
  { id: 3, titulo: "TOTAL # OF TIER 1 & 2 ACTIVE PACKAGES" },
];

// HEADER PARA WALLET TABLE
export const headersWalletTable = [
  { titulo: "Decentralized Wallet", botton: true },
  { titulo: "Currency", botton: true },
  { titulo: "Wallet Address", botton: true },
  { titulo: "Wallet Nickname", botton: true },
  { titulo: "Referral Commissions", botton: true },
  { titulo: "Wallet to pay me", botton: true },
  { titulo: "Configuration", botton: true },
];

export const headersProfits = [
  { title: "DATE PURCHASED" },
  { title: "PACKAGES AMOUNT" },
  { title: "PACKAGES STATUS" },
  { title: "CYCLE" },
  { title: "NEXT PAYOUT DATE" },
  { title: "AMOUNT YOUR REFERRAL WILL RECEIVE" },
  { title: "MONTHLY COMMISSIONS" },
  { title: "YOUR TOTAL COMMISSIONS PAYOUT" },
];

export const headersProfitsTotals = [
  { title: "NAME" },
  { title: "DATE PURCHASED" },
  { title: "PACKAGES AMOUNT" },
  { title: "PACKAGES STATUS" },
  { title: "CYCLE" },
  { title: "NEXT PAYOUT DATE" },
  { title: "AMOUNT YOUR REFERRAL WILL RECEIVE" },
  { title: "MONTHLY COMMISSIONS" },
  { title: "YOUR TOTAL COMMISSIONS PAYOUT" },
];

export const TierOneReferralsInformation = [
  { title: "FULL NAME" },
  { title: "EMAIL" },
  { title: "DATE THEY REGISTERED" },
  { title: "NUMBER OF ACTIVE PACKAGES" },
];

export const TierTwoReferralsInformation = [
  { title: "FULL NAME" },
  { title: "DATE THEY REGISTERED" },
  { title: "NUMBER OF ACTIVE PACKAGES" },
  { title: "REFERRER FULL NAME" },
  { title: "REFERRER EMAIL" },
];
export const statePackages = [
  {
    name: "Pending",
    id: "1",
    style: "color__pending",
    color_hexa: "e08645",
    button: true,
    nameButton: "PAY",
    styleButton: "botton__color__peding__table",
  },
  {
    name: "Active",
    id: "2",
    style: "color__activate",
    color_hexa: "64c491",
    button: true,
    nameButton: "CANCEL",
  },
  {
    name: "Cancellation",
    id: "3",
    style: "color__cancel",
    color_hexa: "db5f5f",
    button: true,
    nameButton: "REACTIVATE",
    styleButton: "botton__color__nuevo__table",
  },
  { name: "Cancelled", id: "4", style: "", button: false },
  { name: "Rejected", id: "5", style: "", button: false },
];
export const PublicListRouters = [
  {
    path: "/",
  },
  {
    path: "/register",
  },
  {
    path: "/registertwo",
  },
  {
    path: "/login",
  },
  {
    path: "/frequentQuestions-public",
  },
  {
    path: "/tutorials-public",
  },
  {
    path: "/support-public",
  },
];

export const PrivateListRouters = [
  {
    path: "/profile",
  },
  {
    path: "/packages",
  },
  {
    path: "/profits",
  },
  {
    path: "/packages/:id",
  },
  {
    path: "/profile-password",
  },
  {
    path: "/profile-edit",
  },
  {
    path: "/tutorials",
  },
  {
    path: "/frequentQuestions",
  },
  {
    path: "/support",
  },
];

export const currencyPermitidaPayMe = ["USDT ERC20"];
export const currencyPermitidaProfits = ["USDT ERC20"];

export const categoriesSupport = [
  {
    name: "Register",
    id: "1",
  },
  {
    name: "Login",
    id: "2",
  },
  {
    name: "Validation",
    id: "3",
  },
  {
    name: "Profile",
    id: "4",
  },
  {
    name: "Packages",
    id: "5",
  },
  {
    name: "Profits",
    id: "6",
  },
  {
    name: "FAQs and Tutorials",
    id: "7",
  },
  {
    name: "Others",
    id: "8",
  },
];

export const datosAbout = [
  {
    title: "WHO WE ARE",
    image: "./Assets/Images/About_1.svg",
    text:
      "We are a group of people who specialize in applying an arbitrage strategy along dozens of different niches in the online world for the past 20+ years. \n \n" +
      "When you purchase a package, we use the funds to buy goods & services at one price then offer them at another price.  This is called online affiliate marketing sending paid and organic traffic to purchase services when the opportunity presents itself. \n \n" +
      "That has created a long-term sustainable program for people who purchase package where they earn a fixed 25% USDT on their crypto month after month. \n \n" +
      "We don’t disclose the niches, the inventory, search terms, paid traffic sources, platforms or affiliate offers used with the proceeds from the packages purchased.",
  },
  {
    title: "REFERRAL PROGRAM",
    image: "./Assets/Images/About_2.svg",
    text:
      "2 TIERS \n \n" +
      "1st tier is 25 in crypto per package when your referral makes their initial purchase. Each cycle (1st cycle is 32 days, each cycle thereafter is 30 days) the referral commission is 15 in crypto. \n \n" +
      "2nd tier is 6.25 in crypto and each cycle thereafter is 6.25 in crypto. \n \n" +
      "All referral commissions are paid out as long as the person who made the initial purchase of packages keeps their crypto in the program. No referral commission is paid out if the clients crypto is taken out of the program at the end of a cycle. \n \n" +
      "You must purchase at least 1 package in order to earn referral commissions. Also, if you cancel your 1 package and have referrals you won’t earn referral commission since you don’t have at least 1 active package.",
  },
];

export const blockExplorerInfoByCurrency = [
  {
    currency: "USDC ERC20",
    baseUrlTransactionByHash: "https://etherscan.io/tx/",
    baseUrlAddress: "https://etherscan.io/address/",
  },
  {
    currency: "USDT ERC20",
    baseUrlTransactionByHash: "https://etherscan.io/tx/",
    baseUrlAddress: "https://etherscan.io/address/",
  },
  {
    currency: "USDT TRC20",
    baseUrlTransactionByHash: "https://tronscan.org/#/transaction/",
    baseUrlAddress: "https://tronscan.org/#/address/",
  },
];
