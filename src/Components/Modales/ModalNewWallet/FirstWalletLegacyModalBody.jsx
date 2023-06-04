import React, { useEffect, useState } from "react";
import { getCurrencyApi } from "../../../Services/Profile.api";
import Bigbutton from "../../BigButtons/Bigbutton";
import Selects from "../../Select/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./SchemaForModalNewWallet";
import { addWallet } from "../../../Services/Wallets.api";
import "./modalnewwallet.css";
import { useNavigate } from "react-router-dom";
import { decodeBase64 } from "../../../Share/functions";

const FirstWalletLegacyModalBody = ({
  close,
  optionsList,
  dataWallets,
}) => {
  const navigate = useNavigate();

  const [dataWalletsChild, setDataWalletsChild] = useState(dataWallets);

  useEffect(() => {
    setDataWalletsChild(dataWallets);
  }, [dataWallets]);

  /**
   *
   * useState guarda la informacion que me envia el API para mostrar en el select crypto currency.
   */
  const [currencies, setCurrencies] = useState([]);

  /**
   *
   * Se crea la funcion get para recibir la respuesta dentro de las primesas que se utilizaran dentro del getCurrencyApi.
   */
  const getApiSelectCurrency = () => {
    getCurrencyApi()
      .then((response) => {
        let body = [];
        response.data?.map((item) => {
          body.push({
            value: item.CurrenciesId,
            label: (
              <div className="display_left">
                <img
                  className="currencies__modal__buypack"
                  src={item.CurrenciesIconUrl}
                  alt=""
                />
                <p className="currencies__modal__texto">
                  {item.CurrenciesName}
                </p>
              </div>
            ),
          });
        });
        // Pasarle el body a mi useState
        setCurrencies(body);
      })
      .catch((e) => {
        console.log("Error: ", e.response?.data);
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      });
  };

  /**
   *
   * useEffect se encarga de activar las funciones al momento que se ingresa a la vista. Realiza la precarga de la info a partir del consumo de la API.
   */

  useEffect(() => {
    getApiSelectCurrency();
  }, []);

  /* 
	
	* userState para el valor seleccionado del select de currencies, y handleChanged para asignar el valor del selectedCurrency en el onchanged del Select 
	*/
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedExchange, setSelectedExchange] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    document.getElementById("currenciesHiddenInput").focus();
  };

  const selectExchangeWallet = (selectOptionsWallet) => {
    setSelectedExchange(selectOptionsWallet);
    document.getElementById("exchangeWallet").focus();
  };

  /**
   *
   * ?Se utiliza userForm para facilidad de validación de formulario con yup,
   * ?los (defaultValues.values) son los name de los input para obtener o agregar datos al formulario
   * // TO DO: Añadir un schema para la validación del formato de dirección de acuerdo a la currency (empiza con 0x y así)
   */

  // const [currenciesHidden, setCurrenciesHidden] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // Clear input values from modalnewwallet

  const clearValuesModalNewWallet = () => {
    setSelectedExchange(null);
    setSelectedCurrency(null);
    setValue("walletAddress", "");
    setValue("walletName", "");
    setValue("token", "");
  };

  const closeClear = () => {
    clearValuesModalNewWallet();
    close();
  };

  const registerNewWallet = (data) => {
    let emailCodification = decodeBase64(sessionStorage.getItem("id"));
    let body = {
      ...data,
      email: emailCodification,
      walletCurrencyId: selectedCurrency.value,
      ExchangesWalletsId: selectedExchange.exchangesWalletsId,
    };
    if (isValid && selectedCurrency && selectedExchange) {
      addWallet(body)
        .then((response) => {
          let message = response.data.message;
          alert(message); //TO DO: el alert no está siendo mostrado al utilizarlo dentro de un modal, revisar alternativas
          clearValuesModalNewWallet();
          if (response.status === 200) {
            close();
          }
          if (dataWalletsChild?.length === 0) {
            navigate("/packages");
          }
        })
        .catch((e) => {
          console.log("Error: ", e.response?.data);
          if (e.response?.data.message) {
            alert(e.response?.data.message);
          }
        });
    }
  };
  return (
      <div className="flex_modal_newwallet">
        <div className="options_container_NewModal">
          <div className="addresspublic_newwallet_container">
            <label className="label_currency_newwallet" htmlFor="">
              Decentralized Wallet
            </label>
            <Selects
              value={selectedExchange}
              onChange={selectExchangeWallet}
              options={optionsList}
            ></Selects>
            <input
              className="currenciesHiddenInput"
              name="exchangeWallet"
              id="exchangeWallet"
              value={selectedExchange ? selectedExchange.label : ""}
              {...register("selectedExchangeWallet")}
              readOnly
              // hidden
            ></input>
            <p style={{ color: "red" }}>
              {errors.selectedExchangeWallet &&
                errors.selectedExchangeWallet.message}
            </p>
            <label className="label_currency_newwallet" htmlFor="">
              Currency
            </label>
            <Selects
              value={selectedCurrency}
              onChange={handleChange}
              options={currencies}
            ></Selects>
            <input
              className="currenciesHiddenInput"
              name="currenciesHiddenInput"
              id="currenciesHiddenInput"
              value={selectedCurrency ? selectedCurrency.value : ""}
              {...register("selectedCurrencyHidden")}
              readOnly
              // hidden
            ></input>
            <p style={{ color: "red" }}>
              {errors.selectedCurrencyHidden &&
                errors.selectedCurrencyHidden.message}
            </p>
          </div>
          <div className="wallet_nickname_container">
            <label className="label_nickname_newwallet" htmlFor="">
              Wallet Nickname
            </label>
            <input
              className="nickname_input_newwallet"
              type="text"
              placeholder="Name your wallet"
              id="input_nickname_wallet"
              {...register("walletName")}
            />
            <p className="input_newwallet_error">
              {errors.walletName && errors.walletName.message}
            </p>
          </div>
        </div>
        <div className="wallet_address_container display_column">
          <div className="attributes_in_common_label_input">
            <label className="label_addresspublic_newwallet" htmlFor="">
              <b> Paste wallet public address</b>
            </label>
          </div>
          <div className="attributes_in_common_label_input">
            <input
              className="addresspublic_newwallet"
              type="text"
              placeholder=""
              id="input_address_wallet"
              {...register("walletAddress")}
            />
            <p className="input_newwallet_error">
              {errors.walletAddress && errors.walletAddress.message}
            </p>
          </div>
        </div>
        <div className="wallet_token_container display_column">
          <div className="attributes_in_common_label_input">
            <label className="label_token_newwallet" htmlFor="">
              <b> Paste your 2FA Authentication</b>
            </label>
          </div>
          <div className="attributes_in_common_label_input">
            <input
              className="input_token_newwallet"
              type="text"
              placeholder=""
              maxLength="6"
              minLength="6"
              id="input_token_wallet"
              {...register("token")}
            />
            <p className="input_token_error">
              {errors.token && errors.token.message}
            </p>
          </div>
        </div>
        <div className="button_new_wallet_container display_evenly">
          <Bigbutton action={closeClear}> Cancel </Bigbutton>
          {/* <Bigbutton disabled> Accept </Bigbutton> */}
          <Bigbutton
            // disabled
            action={handleSubmit(registerNewWallet)}
          >
            Accept
          </Bigbutton>
        </div>
      </div>
  );
};

export default FirstWalletLegacyModalBody;
