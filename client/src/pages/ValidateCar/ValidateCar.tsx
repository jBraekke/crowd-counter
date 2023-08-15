import React, { FormEvent, useState, useEffect, useRef } from "react";

import "./ValidateCar.css";

import Card from "../../components/card/Card";
import Loading from "../../components/loading/Loading";
import { IUser } from "../../utils/user";
import { io } from "socket.io-client";
import Checkmark from "../../components/checkmark/Checkmark";

function ValidateCar() {
  const [fetching, setFetching] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userData, setUserData] = useState({} as IUser);
  const [coolness, setCoolnessMode] = useState(false);
  const isMounted = useRef(false);
  const firstRender = useRef(true);

  const connectWS = () => {
    const wsProtocol = location.protocol === "http:" ? "ws" : "wss";
    const wsServer = `${wsProtocol}://${location.host}`;
    const socket = io(wsServer, {});

    socket.on("enable-awesomeness", () => {
      setCoolnessMode(true);
    });

    socket.on("disconnect", () => {
      console.log(`disconnect`);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    if (firstRender.current) {
      firstRender.current = false;
      connectWS();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/car-validation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setFetching(false);
    if (data.status === 200) {
      setShowError(false);
      const user = await data.json();
      setUserData(user);
    } else {
      setShowError(true);
    }
  };

  const postStatus = async (url: string) => {
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userData.userID }),
    });
    setFetching(false);
    if (data.status === 200) {
      setShowError(false);
      const user = await data.json();
      setUserData(user);
    } else {
      setShowError(true);
    }
  };

  const handleAttemt = async (event: FormEvent) => {
    event.preventDefault();
    setFetching(true);
    await fetchData();
    setFetching(false);
  };

  const egerAction = async (event: FormEvent) => {
    event.preventDefault();
    setFetching(true);
    await postStatus("/api/set-eger");
    setFetching(false);
  };

  const coolAction = async (event: FormEvent) => {
    event.preventDefault();
    setFetching(true);
    await postStatus("/api/set-cool");
    setFetching(false);
  };

  return (
    <div className="center-stuff">
      <div className="center">
        <Card nopadding>
          {!userData.userID && (
            <form onSubmit={handleAttemt}>
              <div className="button-panel">
                <button type="submit" className="button" title="Send" disabled={fetching}>
                  {fetching ? <Loading /> : "Join"}
                </button>
              </div>
              <div className="center-text red-alert">
                {showError && "Noe galt skjedde"}
              </div>
            </form>
          )}
          {userData.status === 1 && !coolness && (
            <form onSubmit={egerAction}>
              <p>Ditt brukernavn: {userData.userID}</p>
              <div className="button-panel">
                <button
                  type="submit"
                  className="button red"
                  title="Send"
                  disabled={userData.status > 1 || fetching}
                >
                  {fetching ? <Loading /> : "Don't push the button!"}
                </button>
              </div>
              <div className="center-text red-alert">
                {showError && "Noe galt skjedde"}
              </div>
            </form>
          )}
          {userData.status === 2 && <div>
            <div className="center-text red-alert">
                Å nei, du er på slemmelisten nå, {userData.userID}! 😲
              </div>
            </div>}
          {userData.userID && userData.status === 1 && coolness && (
            <form onSubmit={coolAction}>
              <p>Ditt brukernavn: {userData.userID}</p>
              <div className="button-panel">
                <button
                  type="submit"
                  className="button green"
                  title="Send"
                  disabled={fetching}
                >
                  {fetching ? <Loading /> : "Push the button!!"}
                </button>
              </div>
              <div className="center-text red-alert">
                {showError && "Noe galt skjedde"}
              </div>
            </form>
          )}
          {userData.status === 3 && (
            <div>
              <div className="center-stuff">
                <Checkmark hidden={userData.status !== 3} />
              </div>
              <div className="center-stuff">
                <p> Du er awesome!</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ValidateCar;
