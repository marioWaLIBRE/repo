import React, { useEffect, useState, useCallback } from "react";
import Input from "../../Input/Input";
import Bigbutton from "../../BigButtons/Bigbutton";
import { getProfileApi } from "../../../Services/Profile.api";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../Views/Profile/Password/SchemaFormLoginToolClient";
import { loginClientTool, requestEmailWalletUpdate, verifyClient2FactorAuthentication  } from "../../../Services/LoginAdminTool.api";
import { RCCaptcha } from '../../RCCaptcha/RCCaptcha'
import FirstWalletLegacyModalBody from './FirstWalletLegacyModalBody'

import "./modalnewwallet.css";

const ModalNewWallet = ({
  open,
  close,
  titulo1,
  titulo2,
  backbutton,
  optionsList,
  dataWallets,
}) => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [wallets, setWallets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [TOKEN, setTOKEN] = useState(null);
  const [step, setStep] = useState(1);
  const [token2fa, setToken2fa] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getProfileApi()
        if (response.data?.length > 0) {
          let user = response.data[0];
          console.log('user: ', user)
          setEmail(user.UsersCliEmail);
          setWallets(user.UsersCliWallets)
        }
      } catch (error) {
        alert("Error: " + [error]);
        console.log("Error: " + [error]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const loginClient = useCallback((form) => {
    if (!isValid || loading) return;
    (async () => {
      try {
        setLoading(true)
        const { data } = await loginClientTool({
          clientEmail: email,
          clientPassword: form.password,
        })
        setTOKEN(data.data.token)
        setStep(2)
      } catch (e) {
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      } finally {
        setLoading(false)
      };
    })(email);
  }, [email, isValid, loading])

  const handleToken2FAVerify = useCallback(e => {
    e.preventDefault()
    if (loading) return;
    (async () => {
      try {
        setLoading(false)
        await verifyClient2FactorAuthentication(TOKEN, token2fa)
        setStep(3)
      } catch (e) {
        if (e.response?.data.message) {
          alert(e.response?.data.message);
        }
      } finally {
        setLoading(false)
      }
    })();
  }, [loading, TOKEN, token2fa])

  const onVerify = useCallback(() => {
    if (loading) return;
    (async () => {
      try {
        setLoading(true)
        const r = await requestEmailWalletUpdate(TOKEN)
        setStep(4)
      } catch (ex) { } finally {
        setLoading(false)
      }
    })();
  }, [TOKEN, loading])

  const closeClear = useCallback(() => {
    setStep(1)
    close();
  }, [close]);

  const handleToken2fa = useCallback(e => {
    setToken2fa(e.target.value)
  }, [])

  return (
    <Modal
      titulo1={titulo1}
      titulo2={titulo2}
      open={open}
      close={close}
      backbutton={backbutton}
      loading={loading}
    >

      {(step === 4) && (
        <div className="flex">
          aca va un prretty confirmation message
          <Bigbutton action={closeClear}> Close </Bigbutton>
        </div>
      )}

      {(step === 3) && <RCCaptcha onVerify={onVerify} />}

      {(step === 2) && (
        <form>
          <div className="dad__label__container form_fullNameUser_space">
            <div className="label__container">
              <label className="edit__label__label" htmlFor="">
                <b>Paste your 2FA Authentication</b>
              </label>
            </div>
            <div>
              <input
                className="edit__input__label"
                type="text"
                placeholder=""
                maxLength="6"
                minLength="6"
                id="token"
                value={token2fa}
                onChange={handleToken2fa}
              />
            </div>
          </div>
          <Bigbutton
            action={handleToken2FAVerify}
          >
            Accept
          </Bigbutton>
        </form>
      )}

      {(step === 1) && (
        <>
          {!(wallets > 0) ? (
            <FirstWalletLegacyModalBody
              close={close}
              optionsList={optionsList}
              dataWallets={dataWallets}
            />
          ) : (
            <div className="flex_modal_newwallet--tool-login">
              <form className="modalform__grid__login">
                <div className="editpasspro__flex">
                  <Input
                    label={"Email"}
                    type={"email"}
                    forid={"email"}
                    value={email}
                    disabled
                  />
                </div>
                <br />
                <div className="editpasspro__flex">
                  <Input
                    label={"Password"}
                    type={"password"}
                    placehoder={""}
                    forid={"password"}
                    {...register("password")}
                    error={errors.password && errors.password.message}
                  ></Input>
                </div>

                <div className="button_new_wallet_container display_evenly">
                  <Bigbutton action={closeClear}> Cancel </Bigbutton>
                  <Bigbutton
                    action={handleSubmit(loginClient)}
                  >
                    Login
                  </Bigbutton>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default ModalNewWallet;
