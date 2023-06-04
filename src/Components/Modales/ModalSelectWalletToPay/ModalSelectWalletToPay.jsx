import React, { useState } from "react";
import { useEffect } from "react";
import { getSelectExchangesWallets } from "../../../Services/Packages.api";

import Bigbutton from "../../BigButtons/Bigbutton";
import Selects from "../../Select/Select";
import Modal from "../Modal/Modal";

import "./modalselectwallettopay.css";

const ModalSelectWalletToPay = ({
  open,
  close,
  titulo1,
  titulo2,
  backbutton,
  setIsOpenBuy,
}) => {
  const [exchangesWallets, setExchangesWallets] = useState([]);

  const [selectWalletExhangeToPay, setSelectWalletExhangeToPay] = useState();

  const verificarExchangesWalletsBuyPackage = () => {
    if (selectWalletExhangeToPay) {
      setSelectWalletExhangeToPay(null);
      setIsOpenBuy(true);
      close();
    } else {
      alert(
        "Please, select the Decentralized Wallet you will use to send funds in order to proceed."
      );
    }
  };

  const getApiExchagesWallets = () => {
    getSelectExchangesWallets()
      .then((response) => {
        let body = [];
        response.data?.map((item) => {
          if (item.ExchangesWalletsSupported) {
            body.push({
              value: item.ExchangesWalletsId,
              label: (
                <div className="display_left">
                  <p className="select_wallet_modal_text">
                    {item.ExchangesWalletsSupported ? "✅ " : "⚠️ "}
                    {item.ExchangesWalletsName}
                  </p>
                </div>
              ),
              supported: item.ExchangesWalletsSupported,
              isSelfCustody: item.ExchangesWalletsIsSelfCustody,
            });
          }
        });
        // Pasarle el body a mi useState
        setExchangesWallets(body);
      })
      .catch((e) => {
        console.log("Error: ", e.response?.data);
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  const clearValuesModal = () => {
    setSelectWalletExhangeToPay(null);
  };

  const closeClear = () => {
    clearValuesModal();
    close();
  };

  useEffect(() => {
    getApiExchagesWallets();
  }, []);

  return (
    <Modal
      titulo1={titulo1}
      titulo2={titulo2}
      open={open}
      close={close}
      backbutton={backbutton}
    >
      <div className="container_modal_selectExchange">
        <div className="exchangesWallets_container">
          <p className="modalSelectWallet_alert">
            YOU MUST USE ONE OF THE WALLETS LISTED BELOW (supported by
            CryptoProgram, decentralized).
          </p>
          <div className="label_select_walletToPay_container display">
            <div>
              <div className="label__select_walletToPay_dad">
                <label className="label__select_walletToPay" htmlFor="">
                  Select the decentralized supported wallet you will use to send
                  funds
                </label>
              </div>
              <div className="select_container_son">
                <Selects
                  options={exchangesWallets}
                  onChange={(event) => setSelectWalletExhangeToPay(event)}
                  value={selectWalletExhangeToPay}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="exchangesWalletToPay_text">
          {!selectWalletExhangeToPay ? (
            <p> </p>
          ) : selectWalletExhangeToPay?.supported ? (
            <div>
              <p>
                You selected a correct type of wallet. Please make sure the
                wallet you will use to purchase, the one you will use to send
                the funds from, is setup in your profile and make sure to select
                it on the next screen for you package to be automatically
                activated.
              </p>
            </div>
          ) : (
            <div>
              <p>
                These are centralized wallets and your package will not be
                automatically activated. Be prepared for your package to be
                rejected after 12 hours, and you will have to send support the
                following information: your full name and email address on your
                account, and the full transaction URL on a blockexplorer like
                etherscan.io or tronscan.org For example:
                <br />
                <br />
                https://etherscan.io/tx/0x6a409157f91b2f6427a3690c42acfb186fd00b09411fff847887828325d146be
                <br />
                <br />
                or
                <br />
                <br />
                https://tronscan.org/#/transaction/291d94d53606374d800471662c87081236fc4df64ed2ef369d2cc384e55d02fc
              </p>
            </div>
          )}
        </div>

        <div className="selectWalletToPay_buttons_container display_evenly">
          <Bigbutton action={closeClear}> Cancel </Bigbutton>
          {/* {!loadingBuyPackages ?  */}
          <Bigbutton action={() => verificarExchangesWalletsBuyPackage()}>
            Accept
          </Bigbutton>
          {/* : <div className="display"> Loading...</div> } */}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectWalletToPay;
