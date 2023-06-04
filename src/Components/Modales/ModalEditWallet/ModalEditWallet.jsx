import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateWallet } from "../../../Services/Wallets.api";
import Bigbutton from "../../BigButtons/Bigbutton";
import Modal from "../Modal/Modal";
import { schema } from "./SchemaForModalEditWallet";
import Selects from "../../Select/Select";
import "./modaleditwallet.css";

const ModalEditWallet = ({
  open,
  close,
  titulo1,
  titulo2,
  backbutton,
  information,
  optionsList,
  ...props
}) => {
  /**
   * *
   * Pasarle la función de getWallets automaticamente cuando se cierren los modales
   */
  const getWalletByUser = props.getWalletByUser;
  const [selectedExchange, setSelectedExchange] = useState(null);

  const selectExchangeWallet = (selectOptionsWalletEdit) => {
    setSelectedExchange(selectOptionsWalletEdit);
    trigger();
    document.getElementById("exchangeWalletEdit").focus();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    //La validación por defecto, solo se dispara cuando hay un cambio en un input; y usar la función setValue no dispara la validación por lo cual, se pone reValidateMode para que vuelva a validar cuando se hace un submit del formulario.
    // reValidateMode: "onSubmit",
  });

  useEffect(() => {
    initUseFormValuesEditWallet();
    let filteredList = optionsList?.filter((item) => {
      return item.exchangesWalletsId === information.ExchangesWalletsId;
    });
    if (filteredList.length > 0) {
      setSelectedExchange(filteredList[0]);
    } else {
      setSelectedExchange(null);
    }
  }, [information, open]);

  /**
   *
   * CONSUMO EDIT WALLETS
   */

  const putApiUpdateWallet = (data) => {
    let body = {
      walletAddress: data.walletAddress,
      walletName: data.walletName,
      ExchangesWalletsId: selectedExchange.exchangesWalletsId,
      token: data.token,
    };
    let walletId = information.UsersCliWalletsId;
    if (isValid && selectedExchange) {
      updateWallet(body, walletId)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            if (response.status === 200) {
              close();
            }
            getWalletByUser();
          }
        })
        .catch((e) => {
          // alert("User was not updated");
          if (e.response?.data.message) {
            alert(e.response?.data.message);
          }
        });
    } else {
    }
  };

  /**
   *
   * Se crea la funcion para inicializar los valores de los campos del UseForm
   */

  const initUseFormValuesEditWallet = () => {
    // shouldValidate se usa para que el estado de validación del formulario sea acorde con los valores puestos en setValue
    setValue("walletName", information?.UsersCliWalletsName, {
      shouldValidate: true,
    });
    setValue("walletAddress", information?.UsersCliWalletsAddress, {
      shouldValidate: true,
    });
    setValue("selectedCurrencyHidden", information?.UsersCliWalletsCurrencyId, {
      shouldValidate: true,
    });
    setValue(
      "selectedExchangeWalletEdit",
      information?.ExchangesWalletsName ?? "",
      {
        shouldValidate: true,
      }
    );
    setValue("token", "");
  };

  return (
    <Modal
      titulo1={titulo1}
      titulo2={titulo2}
      open={open}
      close={close}
      backbutton={backbutton}
    >
      <section className="flex_modal_editwallet">
        <div className="options_container_EditModal">
          <div className="addresspublic_editwallet_container">
            <label className="label_currency_editwallet" htmlFor="">
              Decentralized Wallet
            </label>
            <Selects
              value={selectedExchange}
              onChange={selectExchangeWallet}
              options={optionsList}
            ></Selects>
            <input
              className="currenciesHiddenInput"
              name="exchangeWalletEdit"
              id="exchangeWalletEdit"
              value={selectedExchange ? selectedExchange.label ?? "" : ""}
              {...register("selectedExchangeWalletEdit")}
              readOnly
            ></input>
            <p style={{ color: "red" }}>
              {errors.selectedExchangeWalletEdit &&
                errors.selectedExchangeWalletEdit.message}
            </p>
            <label className="label_nickname_editwallet" htmlFor="">
              Wallet Nickname
            </label>
            <input
              className="nickname_input_editwallet"
              type="text"
              placeholder="Name your wallet"
              id="input_nickname_wallet"
              name="walletName"
              {...register("walletName")}
            />
            <p style={{ color: "red" }}>
              {errors.walletName && errors.walletName.message}
            </p>
          </div>
        </div>
        <div className="wallet_address_edit_container display_column">
          <div className="attributes_in_common_edit_wallet">
            <label className="label_addresspublic_editwallet" htmlFor="">
              <b>Paste wallet public address</b>
            </label>
          </div>
          <div className="attributes_in_common_edit_wallet">
            <input
              className="addresspublic_editwallet"
              type="text"
              placeholder=""
              id="input_address_wallet"
              name="walletAddress"
              {...register("walletAddress")}
            />
            <p style={{ color: "red" }}>
              {errors.walletAddress && errors.walletAddress.message}
            </p>
          </div>
        </div>
        <div className="wallet_token_container display_column">
          <div className="attributes_in_common_edit_wallet">
            <label className="label_token_editwallet" htmlFor="">
              <b>Paste your 2FA Authentication</b>
            </label>
          </div>
          <div className="attributes_in_common_edit_wallet">
            <input
              className="input_token_editwallet"
              type="text"
              placeholder=""
              id="input_address_wallet"
              name="tokenAddress"
              {...register("token")}
            />
            <p className="input_token_error">
              {errors.token && errors.token.message}
            </p>
          </div>
        </div>
        <div className="button_edit_wallet_container display_evenly">
          <Bigbutton action={close}> Cancel </Bigbutton>
          <Bigbutton action={handleSubmit(putApiUpdateWallet)}>
            Accept
          </Bigbutton>
        </div>
      </section>
    </Modal>
  );
};

export default ModalEditWallet;
