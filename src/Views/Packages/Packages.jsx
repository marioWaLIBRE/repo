import React, { useState, useEffect } from "react";
import Layoutmu from "../../Components/Layouts/LayoutMU/Layoutmu";
import CurrentPackagesEmpty from "./Empty/CurrentPackagesEmpty";
import CurrentPackages from "./Full/CurrentPackages";
import {
  deleteAllPackagesRejectedApi,
  getCampaignsApi,
  getPackageEmail,
  getTransactionsApi,
} from "../../Services/Packages.api";
import ModalBuyPackages from "../../Components/Modales/ModalBuyPackages/ModalBuyPackages";
import ModalPaymentQR from "../../Components/Modales/ModalPaymentQR/ModalPaymentQR";
import ButtonOption from "../../Components/ButtonOptions/ButtonOption";
import TransactionsEmpty from "./Empty/TransactionsEmpty";
import Transactions from "./Full/Transactions";
import { getWallets } from "../../Services/Wallets.api";
import ModalSelectWalletToPay from "../../Components/Modales/ModalSelectWalletToPay/ModalSelectWalletToPay";
import ExpandableList from "../../Components/ExpandibleList/ExpandableList";
import SupportComponent from "../../Components/SupportComponent/SupportComponent";
import {
  faqsTutorialsListFilteredByTypeView,
  useFaqsTutorialsContext,
} from "../../Hooks/FaqsTutorialsProvider";
import ModalAlertas from "../../Components/Modales/ModalAlertas/ModalAlertas";
import "./packages.css";

/** @KATHE REY
 * Componente packages para la generación de
 */

const Packages = () => {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignType, setCampaignType] = useState([]);
  /**
   *
   * Crear useState para el modal Buy packages
   */
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [isOpenSelectWallet, setIsOpenSelectWallet] = useState(false);
  /**
   *
   * Crear useState para el modal PayMent
   * */
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [selectCurrency, setSelectCurrency] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [openModalAlerts, setOpenModalAlerts] = useState(false);
  const [data, setData] = useState([]);
  const [optionPackages, setOptionPackages] = useState(1);
  const [dataWallets, setDataWallets] = useState([]);
  const [filteredFinalFaqsArray, setFilteredFinalFaqsArray] = useState([]);
  const [selectWallet, setSelectWallet] = useState();
  const [walletToPayMe, setWalletToPayMe] = useState();
  const [walletToPayProfits, setWalletToPayProfits] = useState();

  const faqsTutorialsList = useFaqsTutorialsContext();

  /**
   * @TODOS
   * Crear useState para el getTransactionsApi que se utilizara en transactions
   */
  const [paymentsTransactions, getPaymentsTransactions] = useState([]);
  /**
   * @TODOS
   * Creamos un useState para obtener el total a pagar
   */
  const [totalToPay, setTotalToPay] = useState();

  const [totalReceived, setTotalReceived] = useState(0);

  const [totalNumberOfActivePackages, setTotalNumberOfActivePackages] =
    useState(0);
  const [
    totalNumberOfActivePackagesTotalPurchased,
    setTotalNumberOfActivePackagesTotalPurchased,
  ] = useState(0);
  const [
    totalNumberOfActivePackagesTotalReturn,
    setTotalNumberOfActivePackagesTotalReturn,
  ] = useState(0);

  const updatePackageCloseModal = () => {
    getPackage();
    setIsOpen(false);
  };

  /**
   * @TODOS
   * Funcion para consumo de getTransactionsApi
   */
  const getTransactions = () => {
    setLoading(true);
    getTransactionsApi()
      .then((response) => {
        if (response.data.length > 0) {
          getPaymentsTransactions(response.data);
        } else {
          getPaymentsTransactions([]);
        }
      })
      .catch((e) => {
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTotalNumberOfActivePackages = (data) => {
    const totalNumberPackagesActive = data.reduce(
      (accumulator, currentValue) => {
        return (
          accumulator +
          (currentValue.PackagesState === "2" ||
          currentValue.PackagesState === "3"
            ? currentValue.PackagesNumber
            : 0)
        );
      },
      0
    );
    return totalNumberPackagesActive;
  };

  const getTotalNumberOfActivePackagesTotalPurchased = (data) => {
    const totalNumberOfActivePackagesTotalPurchased = data.reduce(
      (accumulator, currentValue) => {
        return (
          accumulator +
          (currentValue.PackagesState === "2" ||
          currentValue.PackagesState === "3"
            ? currentValue.PackagesTotalAmount
            : 0)
        );
      },
      0
    );
    return totalNumberOfActivePackagesTotalPurchased;
  };

  const getTotalNumberOfActivePackagesTotalReturn = (data) => {
    const totalNumberOfActivePackagesTotalReturn = data.reduce(
      (accumulator, currentValue) => {
        return (
          accumulator +
          (currentValue.PackagesState === "2" ||
          currentValue.PackagesState === "3"
            ? currentValue.TotalReturn
            : 0)
        );
      },
      0
    );
    return totalNumberOfActivePackagesTotalReturn;
  };

  // const get

  /**
   * @TODOS
   * Funcion para consumo de getPackageEmail
   */

  const getPackage = () => {
    getPackageEmail()
      .then((res) => {
        if (res.data.length > 0) {
          setData(res.data);
          setTotalNumberOfActivePackages(
            getTotalNumberOfActivePackages(res.data)
          );
          setTotalNumberOfActivePackagesTotalPurchased(
            getTotalNumberOfActivePackagesTotalPurchased(res.data)
          );
          setTotalNumberOfActivePackagesTotalReturn(
            getTotalNumberOfActivePackagesTotalReturn(res.data)
          );
        } else {
          setData([]);
          setTotalNumberOfActivePackages(0);
          setTotalNumberOfActivePackagesTotalPurchased(0);
          setTotalNumberOfActivePackagesTotalReturn(0);
        }
        const newUserData = JSON.parse(sessionStorage.getItem("userData"));
        newUserData.UsersCliActivePackages = res.data
          .filter((itemFilterPck) => {
            return (
              itemFilterPck.PackagesState > 1 && itemFilterPck.PackagesState < 5
            );
          })
          .reduce((accumulator, currentValue) => {
            return (
              accumulator +
              (currentValue.PackagesState === "2" ||
              currentValue.PackagesState === "3"
                ? currentValue.PackagesNumber
                : 0)
            );
          }, 0);
        sessionStorage.setItem("userData", JSON.stringify(newUserData));
      })
      .catch((e) => {
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  const getWalletsUser = () => {
    getWallets()
      .then((res) => {
        if (res.data.length > 0) {
          setDataWallets(res.data);
          let walletsToReceive = res.data.filter((wallet) => {
            return wallet.UsersCliWalletsForReceipt;
          });
          if (walletsToReceive.length > 0) {
            setWalletToPayMe(walletsToReceive[0]);
          } else setWalletToPayMe(null);
          let walletsToReferrals = res.data.filter((wallet) => {
            return wallet.UsersCliWalletsForReferrals;
          });
          if (walletsToReferrals.length > 0) {
            setWalletToPayProfits(walletsToReferrals[0]);
          } else setWalletToPayProfits(null);
        } else {
          setDataWallets([]);
        }
      })
      .catch((e) => {
        console.log("Error: ", e.response?.data);
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  /** COMSUMO PARA ELIMINAR TODOS LOS PACKETES RECHAZADOS */

  const deleteAllPackagesRejected = () => {
    deleteAllPackagesRejectedApi()
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
        }
        getPackage();
      })
      .catch((e) => {
        console.log("Error: ", e.response?.data);
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  /** COMSUMO PARA TRAER LAS CAMPAÑAS */
  const campaignsApi = () => {
    let bodyCampaignType = [];
    getCampaignsApi().then((res) => {
      if (res.status === 200) {
        setCampaigns(res.data);
        res.data.forEach((element) => {
          if (!bodyCampaignType.includes(element.CampaignsType)) {
            bodyCampaignType.push(element.CampaignsType);
          }
        });
        setCampaignType(bodyCampaignType);
      }
    });
  };

  /**
   *
   * Cerrar modal Buy packages y abrir modal Payment
   */
  const generatePaymentQR = () => {
    setIsOpenBuy(false);
    setIsOpenPayment(true);
  };

  const closeModalPayment = () => {
    setIsOpenPayment(false);
    getPackage();
  };

  const buttonOneAction = () => {
    setOptionPackages(1);
  };
  const buttonTwoAction = () => {
    setOptionPackages(2);
  };

  useEffect(() => {
    getTransactions();
    getPackage();
    getWalletsUser();
    campaignsApi();
  }, []);

  const navigationButtonPackages = (optionPackages) => {
    switch (optionPackages) {
      case 1:
        return (
          <>
            <div className="panels">
              <div className="text_active_container">
                <p className="packages_active_green">
                  Active Packages: {totalNumberOfActivePackages}
                </p>
                <p className="packages_active_green">
                  Total Purchased in Crypto:{" "}
                  {totalNumberOfActivePackagesTotalPurchased}
                </p>
                <p className="packages_active_green">
                  Total Payout: {totalNumberOfActivePackagesTotalReturn}
                </p>
              </div>
              {/* REVISAR EL RESPONSIVE */}
              <div className="noSelectedWallet_alert_container">
                {walletToPayMe ? (
                  <div className="noSelectedWallet_black_container">
                    You will receive your packages 25% payouts in your wallet:
                    <span className="noSelectedWallet_black">
                      {walletToPayMe.UsersCliWalletsName}
                    </span>
                    with address:{" "}
                    <span className="noSelectedWallet_black">
                      {walletToPayMe.UsersCliWalletsAddress}
                    </span>{" "}
                    and currency:{" "}
                    <span className="noSelectedWallet_black">
                      {walletToPayMe.CurrenciesName}
                    </span>
                  </div>
                ) : (
                  <p className="noSelectedWallet_alert">
                    You have not selected a wallet to receive your packages
                    profits, please go to your profile to create a new wallet or
                    select an existing one.
                  </p>
                )}
                <br />
                {walletToPayProfits ? (
                  <div className="noSelectedWallet_black_container">
                    You will receive your referral commission payouts in your
                    wallet:
                    <span className="noSelectedWallet_black">
                      {walletToPayProfits.UsersCliWalletsName}
                    </span>
                    with address:{" "}
                    <span className="noSelectedWallet_black">
                      {" "}
                      {walletToPayProfits.UsersCliWalletsAddress}
                    </span>
                    and currency:{" "}
                    <span className="noSelectedWallet_black">
                      {" "}
                      {walletToPayProfits.CurrenciesName}{" "}
                    </span>
                  </div>
                ) : (
                  <p className="noSelectedWallet_alert">
                    You have not selected a wallet to receive your referral
                    commissions, please go to your profile to create a new
                    wallet or select an existing one.
                  </p>
                )}
              </div>
              <br />
              {data.length > 0 ? (
                <div className="panel active_panel-packages">
                  <CurrentPackages
                    datosTabla={data}
                    openQ={isOpen}
                    closeQ={updatePackageCloseModal}
                    funtOpen={() => setIsOpen(true)}
                    getPackage={getPackage}
                    setIsOpenBuy={setIsOpenBuy}
                    setIsOpenSelectWallet={setIsOpenSelectWallet}
                    setSelectCurrency={setSelectCurrency}
                    selectCurrency={selectCurrency}
                    setTotalToPay={setTotalToPay}
                    setTotalReceived={setTotalReceived}
                    setIsOpenPayment={setIsOpenPayment}
                    deleteAllPackagesRejected={deleteAllPackagesRejected}
                    totalNumberOfActivePackagesTotalPurchased={
                      totalNumberOfActivePackagesTotalPurchased
                    }
                    totalNumberOfActivePackages={totalNumberOfActivePackages}
                    totalNumberOfActivePackagesTotalReturn={
                      totalNumberOfActivePackagesTotalReturn
                    }
                  />
                </div>
              ) : (
                <div className="panel active_panel-packages">
                  <CurrentPackagesEmpty
                    setIsOpenSelectWallet={setIsOpenSelectWallet}
                  />
                </div>
              )}
            </div>
            <br />
          </>
        );
      // break;
      case 2:
        return (
          <>
            <div className="panels">
              {paymentsTransactions.length > 0 ? (
                <div className="panel active_panel-packages">
                  <Transactions paymentsTransactions={paymentsTransactions} />
                </div>
              ) : (
                <div className="panel active_panel-packages">
                  <TransactionsEmpty />
                </div>
              )}
            </div>
            <br />
          </>
        );
      // break;
      default:
        break;
    }
  };

  const filteredFaqsTutorialsListPackages = () => {
    setFilteredFinalFaqsArray(
      faqsTutorialsListFilteredByTypeView(
        faqsTutorialsList,
        "2",
        "packages"
      ).map((itemFaqsTutorialsListFiltered) => {
        return data.length <= 0
          ? { ...itemFaqsTutorialsListFiltered, isOpenByDefault: true }
          : { ...itemFaqsTutorialsListFiltered, isOpenByDefault: false };
      })
    );
  };

  useEffect(() => {
    filteredFaqsTutorialsListPackages();
  }, [faqsTutorialsList, data]);
  return (
    <Layoutmu>
      <section className="profits_container_dad">
        <div className="buttons_tab_container display_evenly">
          <ButtonOption
            selectedValue={optionPackages}
            buttonValue={1}
            action={buttonOneAction}
          >
            {" "}
            My Packages{" "}
          </ButtonOption>
          <ButtonOption
            selectedValue={optionPackages}
            buttonValue={2}
            action={buttonTwoAction}
          >
            {" "}
            Transactions{" "}
          </ButtonOption>
        </div>
        <div className="campaings_text">
          {campaignType?.map((itemCampaignTypeMap) => {
            return (
              // <div key={itemCampaignTypeMap} className="campaign_packages_container">
              // <h3>{itemCampaignTypeMap}</h3>
              <ul key={itemCampaignTypeMap} className="ul_campaigns_packages">
                <h3>{itemCampaignTypeMap}</h3>
                {campaigns
                  .filter((itemCampaignFilter) => {
                    return (
                      itemCampaignFilter.CampaignsType === itemCampaignTypeMap
                    );
                  })
                  .map((itemCampaign) => {
                    return (
                      <li
                        className="list_campaigns_packages"
                        key={itemCampaign.CampaignsId}
                      >
                        On average, <b>{itemCampaign.CampaignsName}</b>{" "}
                        campaigns range from{" "}
                        {itemCampaign.CampaignsClicksLimitLower} clicks to{" "}
                        {itemCampaign.CampaignsClicksLimitUpper} clicks per
                        cycle/1 package, and can generate{" "}
                        {itemCampaign.CampaignsPercentageAverage}% per cycle/1
                        package.
                      </li>
                    );
                  })}
              </ul>
              // </div>
            );
          })}
        </div>
        <ExpandableList faqsTutorialsList={filteredFinalFaqsArray} />
        <div className="display">
          <div>{navigationButtonPackages(optionPackages)}</div>
        </div>
        <div>
          <SupportComponent />
        </div>
      </section>
      <ModalSelectWalletToPay
        titulo1={""}
        titulo2={"SELECT YOUR DECENTRALIZED WALLET"}
        open={isOpenSelectWallet}
        close={() => setIsOpenSelectWallet(false)}
        setIsOpenBuy={setIsOpenBuy}
        backbutton={false}
      />
      <ModalBuyPackages
        titulo1={""}
        titulo2={"BUY NEW PACKAGES"}
        open={isOpenBuy}
        close={() => setIsOpenBuy(false)}
        backbutton={false}
        openPayment={generatePaymentQR}
        setSelectCurrencyFromPackages={setSelectCurrency}
        setTotalToPay={setTotalToPay}
        setTotalReceived={setTotalReceived}
        getPackage={getPackage}
        setLoading={setLoading}
        loading={loading}
        selectWallet={selectWallet}
        setSelectWallet={setSelectWallet}
        setOpenModalAlerts={setOpenModalAlerts}
        campaigns={campaigns}
        campaignType={campaignType}
      ></ModalBuyPackages>
      <ModalPaymentQR
        titulo1={""}
        titulo2={"PAYMENT"}
        open={isOpenPayment}
        close={closeModalPayment}
        backbutton={false}
        selectCurrency={selectCurrency}
        totalReceived={totalReceived}
        totalToPay={totalToPay}
      ></ModalPaymentQR>
      <ModalAlertas
        open={openModalAlerts}
        close={() => setOpenModalAlerts(false)}
        // children={`Confirm your sending wallet or your crypto could be lost ${selectWallet?.label} ${selectWallet?.value}`}
        children={
          <p>
            Confirm your sending wallet or your crypto could be lost.
            <br />
            <span className="span_alert_red"> Nickname: </span>
            {selectWallet?.label}
            <br />
            <span className="span_alert_red"> Address: </span>
            <br />
            {selectWallet?.value}
          </p>
        }
      />
    </Layoutmu>
  );
};

export default Packages;
