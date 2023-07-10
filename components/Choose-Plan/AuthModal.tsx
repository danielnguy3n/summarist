import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Google from "../../public/images/google.png";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal, openModal } from "@/redux/modalSlice";


function AuthModal() {
  const [signIn, setSignIn] = useState(true);
  const modalOpen = useAppSelector(state => state.modals.modalOpen)
  const dispatch = useAppDispatch()
//   {() => setLogin(false)}

  return (
    <div className="modal__wrapper" onClick={() => dispatch(closeModal())}>
      <div className="modal">
        <div className="modal__content" onClick={e => e.stopPropagation()}>
          {signIn ? (
            <>
              <div className="modal__title">Login to Summarist</div>
              <button className="btn btn__login--guest">
                <figure className="btn__icon">
                  <BsFillPersonFill />
                </figure>
                <div className="btn__text">Login as a Guest</div>
              </button>
              <div className="modal__separator">
                <div className="modal__separator--text">or</div>
              </div>
              <button className="btn btn__login--google">
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text">Login with Google</div>
              </button>
            </>
          ) : (
            <>
              <div className="modal__title">Sign up Summarist</div>
              <button className="btn btn__login--google">
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text">Sign Up With Google</div>
              </button>
            </>
          )}

          <div className="modal__separator">
            <span>or</span>
          </div>
          <form className="login__form">
            <input
              type="text"
              className="login__input"
              placeholder="Email Address"
            />
            <input
              type="password"
              className="login__input"
              placeholder="Password"
            />
            {signIn ? (
              <button className="btn">Login</button>
            ) : (
              <button className="btn">Sign Up</button>
            )}
          </form>
        </div>
        <div className="modal__forgot-password">Forgot your password?</div>
        
        <button className="modal__account" onClick={() => setSignIn(!signIn)}>
            {
                signIn ? `Don't have an account?` : `Already have an account?`
            }
            </button>
        <div className="modal__close" onClick={() => dispatch(closeModal())}>
          <IoMdClose />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;