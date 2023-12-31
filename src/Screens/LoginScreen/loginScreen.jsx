import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal";
import Jkbank from "../../assets/banklogo.png";
import loginSuccess from "../../assets/loginSuccess.gif";
import chatimage from "../../assets/message.gif";
import Password from "../../assets/password.png";
import personimg from "../../assets/person.png";
import { AppContext } from "../../context/AppContext";
import Chatbot from "../Chat/ChatBot";
import "./loginscreen.css";

const Loginscreen = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [success, setSucces] = useState(false);

  const { setUser, apiUrl } = useContext(AppContext);

  const [errordata, setErrorData] = useState({
    UserIDError: "",
    PasswordError: "",
    CredentialError: "",
    serviceError: "",
  });
  const [userDetails, setUserDetails] = useState({
    UserID: "",
    Password: "",
  });
  console.log(apiUrl);
  // const fetch = require("node-fetch");
  // const https = require("https");

  // const httpsAgent = new https.Agent({
  //   rejectUnauthorized: false,
  // });
  const login = async (userDetails) => {
    fetch(`http://${apiUrl.ip_port}/login`, {
      method: "POST",
      body: JSON.stringify({
        UserID: userDetails.UserID,
        Password: userDetails.Password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": apiUrl?.api_key,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setUser(resp);
        if (resp.StatusCode === "LOGIN SUCCESSFUL") {
          setSucces(true);
          setTimeout(() => {
            setSucces(false);
            navigate("/home", {
              state: {
                data: "true",
              },
            });
          }, 1500);
        }
        if (resp.StatusCode === "LOGIN FAILED - CUSTOMER ID DOES NOT EXIST") {
          setErrorData({
            ...errordata,
            CredentialError: resp.StatusCode,
          });

          setUserDetails({
            ...userDetails,
            UserID: "",
            Password: "",
          });
        }
      })
      .catch((e) => {
        console.log(e, "logerrr");
      });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const closeModal = () => {
    setSucces(!success);
  };

  return (
    <div
      id="homescreen"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Modal className="backdrop" isOpen={success} onClose={closeModal}>
        <div
          className=" d-flex flex-column rounded-5 justify-content-center align-items-center login position-fixed top-50 start-50 translate-middle input-border-radius box-shadow bg-white 
         "
        >
          <img
            style={{
              width: "150px",
              height: "150px",
            }}
            src={loginSuccess}
            alt="login"
          />

          <h1 className="mt-4">Logged in successfully</h1>
        </div>
      </Modal>
      <div
        id="homescreenleft"
        style={{
          display: "flex",
          width: "50%",
        }}
      >
        <div className="chat-box">
          {open && <Chatbot handleClose={handleOpen} open={open} />}
        </div>
        <div className="chat-button">
          <div className="tooltip">Hi, how can I help you?</div>
          <button onClick={handleOpen}>
            <img src={chatimage} alt="chat-icon" />
          </button>
        </div>
      </div>
      <div
        id="homescreenright"
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "center",
        }}
      >
        <div className="project-info">
          <div
            style={{
              justifyContent: "flex-start",
            }}
          >
            <img
              style={{
                display: "flex",
                width: "200px",
                height: "90px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              src={Jkbank}
              alt="chat-icon"
            />
          </div>
          <h3 className="welcome">Welcome to</h3>
          <h1>ABC Bank</h1>
          <div>
            <div
              className="buttons"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {errordata.CredentialError ? (
                <div className="text-danger"> {errordata.CredentialError}</div>
              ) : (
                ""
              )}
              <div className="user">
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  src={personimg}
                  alt="chat-icon"
                />
                <div
                  style={{
                    color: "black",
                    paddingLeft: "3px",
                  }}
                >
                  User Name{" "}
                  {errordata.UserIDError ? (
                    <span className="text-danger">{errordata.UserIDError}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <input
                className="user-input"
                style={{
                  color: "black",
                  border: "1px solid black",
                }}
                type="text"
                placeholder="Enter the user name"
                onChange={(e) => {
                  setErrorData({
                    ...errordata,
                    UserIDError: "",
                    CredentialError: "",
                  });
                  setUserDetails({
                    ...userDetails,
                    UserID: e.target.value,
                  });
                }}
                value={userDetails.UserID}
              />
            </div>
            <div
              className="buttons"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <div className="user">
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  src={Password}
                  alt="chat-icon"
                />
                <div
                  style={{
                    color: "black",
                    paddingLeft: "3px",
                  }}
                >
                  Password{" "}
                  {errordata.PasswordError ? (
                    <span className="text-danger">
                      {errordata.PasswordError}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <input
                style={{
                  color: "black",
                  border: "1px solid black",
                }}
                className="user-input"
                id="passicon"
                type="password"
                placeholder=" Enter the Password"
                onChange={(e) => {
                  setErrorData({
                    ...errordata,

                    PasswordError: "",
                    CredentialError: "",
                  });
                  setUserDetails({
                    ...userDetails,
                    Password: e.target.value,
                  });
                }}
                value={userDetails.Password}
              />
            </div>
            <div className="buttons">
              <button
                className="view"
                onClick={() => {
                  if (userDetails.UserID && userDetails.Password) {
                    login(userDetails);
                  } else if (
                    userDetails.UserID === "" &&
                    userDetails.Password === ""
                  ) {
                    setErrorData({
                      ...errordata,
                      UserIDError: "username required !!",
                      PasswordError: "password required !!",
                    });
                  } else if (userDetails.UserID === "") {
                    setErrorData({
                      ...errordata,
                      UserIDError: "username required !!",
                    });
                  } else if (userDetails.Password === "") {
                    setErrorData({
                      ...errordata,
                      PasswordError: "password required !!",
                    });
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
