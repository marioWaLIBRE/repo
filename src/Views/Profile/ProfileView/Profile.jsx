import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bigbutton from "../../../Components/BigButtons/Bigbutton";
import Layoutmu from "../../../Components/Layouts/LayoutMU/Layoutmu";
import Smallbutton from "../../../Components/SmallButtons/Smallbutton";
import { getProfileApi } from "../../../Services/Profile.api";
import ModalNewWallet from "../../../Components/Modales/ModalNewWallet/ModalNewWallet";
import ModalShare from "../../../Components/Modales/ModalShare/ModalShare";
import DataTableWallets from "../../../Components/DataTableWallets/DataTableWallets";
import { getWallets } from "../../../Services/Wallets.api";
import { referralLinkBaseUrl } from "../../../Share/Constants";
import SupportComponent from "../../../Components/SupportComponent/SupportComponent";
import ExpandableList from "../../../Components/ExpandibleList/ExpandableList";
import { getSelectExchangesWallets } from "../../../Services/Packages.api";
import {
  faqsTutorialsListFilteredByTypeView,
  useFaqsTutorialsContext,
} from "../../../Hooks/FaqsTutorialsProvider";
import "./profile.css";
import LinkReferral from "../../../Components/LinkReferral/LinkReferral";

const Profile = () => {
  /**
   * CONSTANTES AND USE
   */
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  // const [isOpenGoogle, setIsOpenGoogle] = useState(false);
  const [firstName, firstNameUpdateState] = useState("");
  const [lastName, lastNameUpdateState] = useState("");
  const [userName, userNameUpdateState] = useState("");
  const [email, emailUpdateState] = useState("");
  const [referralCode, referralCodeState] = useState("");
  const [profileImg, profileImgUpdateState] = useState("");
  const [exchangesWallets, setExchangesWallets] = useState([]);
  const [dataWallets, setDataWallets] = useState([]);
  const [supportedWallet, setSupportedWallet] = useState([]);

  const fullLinkReferral = referralLinkBaseUrl + referralCode;
  const linkReferralShare = `${referralLinkBaseUrl}${referralCode}`;

  const [filteredFinalFaqsArray, setFilteredFinalFaqsArray] = useState([]);
  const faqsTutorialsList = useFaqsTutorialsContext();

  /**
   *
   * useEffect dispara la función getProfile
   * para ver los datos del usuario en la vista.
   */
  useEffect(() => {
    getProfile();
    getWalletsUser();
    getApiExchagesWallets();
  }, []);

  /**
   *
   * La función permite obtener los datos del usuario, se actualiza los estados de la
   * variables para visualizar la información del usuario en la
   * vista.
   */
  const getProfile = () => {
    setLoading(true);
    getProfileApi()
      .then((response) => {
        if (response.data.length > 0) {
          let user = response.data[0];
          firstNameUpdateState(user.UsersCliFirstName);
          lastNameUpdateState(user.UsersCliLastName);
          userNameUpdateState(user.UsersCliUserName);
          emailUpdateState(user.UsersCliEmail);
          referralCodeState(user.UsersCliReferralCode);
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              referralCode: response.data[0].UsersCliReferralCode ?? "",
              usersCliWallets: response.data[0].UsersCliWallets ?? 0,
              UsersCliActivePackages:
                response.data[0].UsersCliActivePackages ?? 0,
            })
          );
          //Se agrega un randomico a la url de la imgene para que no tome el cache y se pueda actaulizar
          profileImgUpdateState(
            user.UsersCliProfilePicture &&
              user.UsersCliProfilePicture.length > 0
              ? user.UsersCliProfilePicture +
                  "?" +
                  (Math.random() + 1).toString(36).substring(7)
              : ""
          );
        }
      })
      .catch(function (error) {
        // handle error
        console.log("Error: " + [error]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   *
   * CONSUMO DE API PARA GET WALLETS
   */
  const getWalletsUser = () => {
    getWallets()
      .then((res) => {
        if (res.data.length > 0) {
          setDataWallets(res.data);
        } else {
          setDataWallets([]);
        }
        const newUserData = JSON.parse(sessionStorage.getItem("userData"));
        newUserData.usersCliWallets = res.data.length;
        sessionStorage.setItem("userData", JSON.stringify(newUserData));
      })
      .catch((e) => {
        console.log("Error: ", e.response?.data);
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  /**
   * CONSUMO PARA API DE GET WALLETS TO PLAY
   */
  const getApiExchagesWallets = () => {
    getSelectExchangesWallets()
      .then((response) => {
        let body = [];
        let bodySupported = [];
        response.data?.map((item) => {
          body.push({
            exchangesWalletsId: item.ExchangesWalletsId,
            label: item.ExchangesWalletsName,
            supported: item.ExchangesWalletsSupported,
          });
          if (item.ExchangesWalletsSupported) {
            bodySupported.push({
              exchangesWalletsId: item.ExchangesWalletsId,
              label: item.ExchangesWalletsName,
              supported: item.ExchangesWalletsSupported,
            });
          }
        });
        // Pasarle el body a mi useState
        setExchangesWallets(body);
        setSupportedWallet(bodySupported);
      })
      .catch((e) => {
        console.log("Error: ", e.response?.data);
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  const handleClose = () => {
    setIsOpen(false);
    getWalletsUser();
  };

  const closeShare = () => {
    setIsOpenShare(false);
  };

  const filteredFaqsTutorialsListProfile = () => {
    setFilteredFinalFaqsArray(
      faqsTutorialsListFilteredByTypeView(
        faqsTutorialsList,
        "2",
        "profile"
      ).map((itemFaqsTutorialsListFiltered) => {
        return dataWallets.length <= 0
          ? { ...itemFaqsTutorialsListFiltered, isOpenByDefault: true }
          : { ...itemFaqsTutorialsListFiltered, isOpenByDefault: false };
      })
    );
  };

  useEffect(() => {
    filteredFaqsTutorialsListProfile();
  }, [faqsTutorialsList, dataWallets]);

  return (
    /**
     *
     */
    // componente padre
    <Layoutmu loading={loading}>
      {/* CONTENEDOR PADRE DEL GRID */}
      <div className="container__grid__profile">
        <div className="profile_expandable_list">
          <ExpandableList faqsTutorialsList={filteredFinalFaqsArray} />
        </div>
        <div className="atributos__comunes__profile container__button__profile">
          <div className="red_text_profile_warning">
            <p className="noSelectedWallet_alert">
              YOU MAY ONLY ADD AND USE DECENTRALIZED WALLETS SUPPORTED BY
              CRYPTOPROGRAM TO PURCHASE PACKAGES.
            </p>
            <p className="noSelectedWallet_alert">
              If you currently have a <b>NOT SUPPORTED</b> exchange wallet such
              as Binance, Kraken, Coinbase, Kucoin, etc. set for your payouts
              the system will no longer payout to those wallets. Change your
              wallet to a decentralized wallet for all your payouts and for
              purchases or your payouts will not be paid.
            </p>
          </div>
          <div className="conditional_SelectedWallet_alert_container">
            {dataWallets.filter((wallet) => {
              return wallet.UsersCliWalletsForReceipt;
            }).length > 0 ? null : (
              <p className="red_text_profile_black">
                You have not selected a wallet to receive your packages profits,
                please go to your profile to create a new wallet or select an
                existing one.
                <br />
                <br />
              </p>
            )}
            {dataWallets.filter((wallet) => {
              return wallet.UsersCliWalletsForReferrals;
            }).length > 0 ? null : (
              <p className="red_text_profile_black">
                You have not selected a wallet to receive your referral
                commissions, please go to your profile to create a new wallet or
                select an existing one.
              </p>
            )}
          </div>
        </div>
        <div className="wallets_alert_container">
          <div className="atributos__comunes__profile container__button__profile">
            <p className="wallets_alert_black">
              You can have multiple wallets, for example 3 wallets, one to
              receive your referral commissions, one to receive your 25%
              package(s) profits, and one to purchase packages. The wallets you
              use <span className="wallets_alert_red">MUST BE supported</span>{" "}
              by the program.(List below).
              <span className="wallets_alert_red">
                DO NOT USE a non-supported Decentralized Wallet to purchase
                packages (List below).{" "}
              </span>{" "}
            </p>
            <div className="walletsSupported_container">
              <div className="walletsSupported_info">
                <h3>SUPPORTED</h3>
                <ul>
                  {exchangesWallets
                    ?.filter((item) => {
                      return item.supported;
                    })
                    .map((itemMap) => {
                      return <li key={itemMap.label}>{itemMap.label}</li>;
                    })}
                </ul>
              </div>
              <div className="walletsSupported_info">
                <h3>NOT SUPPORTED</h3>
                <ul>
                  {exchangesWallets
                    ?.filter((item) => {
                      return !item.supported;
                    })
                    .map((itemMap) => {
                      return <li key={itemMap.label}>{itemMap.label}</li>;
                    })}
                </ul>
              </div>
            </div>
            <br />
            <br />
            <p className="wallets_alert_black">
              <span className="wallets_alert_red">WARNING:</span>
              If you fail to send funds from a decentralized wallet and send
              from a centralized wallet to purchase your package it will not be
              activated, support will assign you a unique fee between 70 and 75
              USDT you will have to send, and your funds will be returned to you
              within 7 days.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="container__button__profile atributos__comunes__profile edit__button__profile">
          <div className="notes_warnings_wallets_grid">
            <p>
              {" "}
              <span className="text_note"> Note: </span> Click the button of{" "}
              <b> "Referral Comissions" </b> of the wallet you want to select to
              receive payments of your referral commissions for your tier one
              and tier two referrals.
            </p>
            <br />
            <p>
              {" "}
              <span className="text_note"> Note: </span> Click the button of{" "}
              <b> "Wallet to pay me" </b> of the wallet you want to select to
              receive payments of your packages profits.
            </p>
            <br />
            <p>
              {" "}
              <span className="text_note"> Note: </span>At this time you can
              <b> ONLY </b>select withdrawal payouts of any kind to a
              <b> Decentralized USDT ERC20 wallet</b>. In the future USDT TRC20
              will be added as options for withdrawal payouts, check back on a
              regular basis for those options.
              {/* In the future USDC ERC20
							and USDT TRC20 will be added as options for withdrawal payouts,
							check back on a regular basis for those options. */}
            </p>
            <br />
            <p>
              <span className="text_note"> Note: </span>Purchases can be made in
              <b> USDT ERC20, USDT TRC20</b>
              {/* & <b>USDC ERC20</b> */}
            </p>
            <br />
            <p>
              <span className="text_note"> Note: </span>Marking the wallets:{" "}
              <b>Dark Blue</b> = selected. <b>White</b> = not selected
            </p>
            <br />
          </div>
          {/* <p>{auxiliar.toString()}</p> */}
          {dataWallets.length > 0 ? (
            <center>
              <div className="Container_div_datatablets_profile">
                <DataTableWallets
                  datosTablaWallets={dataWallets}
                  getWalletByUser={getWalletsUser}
                  optionsList={supportedWallet}
                />
              </div>
            </center>
          ) : (
            <div>
              <p className="titulo__wallet__profile1 edit__text__profile">
                YOU DON'T HAVE{" "}
                <span className="titulo__wallet__profile2 edit__text__profile">
                  ANY WALLET
                </span>
              </p>
              <p className="texto__wallet__profile">
                Please, click on "New wallet" to associate your first wallet
              </p>
            </div>
          )}
          {/* BILLETERAS */}
          <br />
          <div>
            <p className="text_note_wallet">
              <span className="wallets_alert_red">WARNING: </span>If you fail to
              send funds from a decentralized wallet and send from a centralized
              wallet to purchase your package it will not be activated, support
              will assign you a unique fee between 70 and 75 USDT you will have
              to send, and your funds will be returned to you within 7 days.
              {/* USDT/USDC admin fee to send them back to you. */}
            </p>
          </div>
          <Bigbutton action={() => setIsOpen(true)}>New wallet</Bigbutton>
        </div>

        {/* PASSWORD Y REFERIDO */}
        <div className="containe__doble__profile ">
          <div className="container__pass__profile atributos__comunes__profile">
            <div>
              <p className="texto1__pass__profile">Password</p>
              <p className="texto2__pass__profile">********</p>
            </div>
            <div>
              <Smallbutton
                action={() => navigate("/codeqr?params=profile-password")}
              >
                Edit
              </Smallbutton>
            </div>
          </div>
          <div className="container__inve__profile atributos__comunes__profile">
            <LinkReferral />
          </div>
        </div>

        {/* PROFILE */}
        <div className="container__info__profile atributos__comunes__profile ">
          <div className="formato__profile__profile__centerXY">
            <div className="circulo__profile formato__profile__profile__centerXY">
              {profileImg && profileImg.length > 0 ? (
                <img
                  className="img__profile__profile"
                  src={profileImg}
                  alt=""
                />
              ) : (
                <img
                  className="img__profile__profile"
                  src="./Assets/Iconos/Avatar.svg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="edit__position__textopro__profile">
            <div className="position__texto__profile__profile">
              <p className="texto1__pass__profile">First name</p>
              <p className="texto2__pass__profile">{firstName}</p>
            </div>
            <div className="position__texto__profile__profile">
              <p className="texto1__pass__profile">User name</p>
              <p className="texto2__pass__profile">{userName}</p>
            </div>
          </div>
          <div className="edit__position__textopro__profile">
            <div className="position__texto__profile__profile">
              <p className="texto1__pass__profile">Last name</p>
              <p className="texto2__pass__profile">{lastName}</p>
            </div>
            <div className="position__texto__profile__profile">
              <p className="texto1__pass__profile">Email</p>
              <p className="texto2__pass__profile">{email}</p>
            </div>
          </div>
          <div className="edit__button__profile__profile">
            <Smallbutton action={() => navigate("/profile-edit")}>
              Edit
            </Smallbutton>
          </div>
        </div>
        <SupportComponent />
      </div>

      {/* MODAL AL FINAL DE TODO MENOS LA ETIQUETA O CONTENEDOR PADRE */}
      <ModalNewWallet
        titulo1={""}
        titulo2={""}
        open={isOpen}
        close={handleClose}
        backbutton={false}
        optionsList={supportedWallet}
        dataWallets={dataWallets}
      />
      <ModalShare
        open={isOpenShare}
        close={closeShare}
        referralCode={referralCode}
        linkReferralShare={linkReferralShare}
      />
    </Layoutmu>
  );
};

export default Profile;
