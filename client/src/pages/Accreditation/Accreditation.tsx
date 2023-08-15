import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import Card from "../../components/card/Card";
import Checkmark from "../../components/checkmark/Checkmark";
import "./Accreditation.css";
import { io } from "socket.io-client";

import { IAccreditationSessionResponse } from "../../../../server/controller/accreditation-session/IAccreditationSessionResponse";
import { IAccreditationLog } from "../../../../server/interface/IAccreditationLog";
import { SeverityEnum } from "../../utils/enum";
import { IUser, UserStatusEnum } from "../../utils/user";

function Accreditation() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [zone, setZone] = useState("");
  const [currentSession, setCurrentSession] = useState("");
  const [statusIndicator, setStatusIndicator] = useState(true);
  const isMounted = useRef(false);
  const firstRender = useRef(true);

  const [accreditationItem, setAccreditationItem] = useState<
    IAccreditationLog[]
  >([]);

  const fetchUsers = async () => {
    const request = await fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (request.status === 200) {
      const zones = await request.json();
      setUsers(zones);
    }
  };

  const connectWS = () => {
    const wsProtocol = location.protocol === "http:" ? "ws" : "wss";
    const wsServer = `${wsProtocol}://${location.host}`;
    const socket = io(wsServer, {});

    socket.on("validated-car", () => {
      fetchUsers();
    });

    socket.on("disconnect", () => {
      console.log(`disconnect`);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    if (firstRender.current) {
      firstRender.current = false;
      fetchUsers();
      connectWS();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAwesomeness = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetch('/api/enable-awesomeness')
  };

  return (
    <div className="home">
      <div className="center-stuff">
        <Checkmark hidden={statusIndicator} />
      </div>
      <div className="card-container">
        <Card title="Good" subTitle="😌">
          <ul>
            {users
              .filter((x) => x.status === UserStatusEnum.Idle)
              .map((x) => (
                <li key={x.userID}>{x.userID}</li>
              ))}
          </ul>
        </Card>
        <Card title="Bad" subTitle="😲">
          <ul>
            {users
              .filter((x) => x.status === UserStatusEnum.Eger)
              .map((x) => (
                <li key={x.userID}>{x.userID}</li>
              ))}
          </ul>
        </Card>
        <Card title="Awesome" subTitle="🤑">
          <ul>
            {users
              .filter((x) => x.status === UserStatusEnum.Cool)
              .map((x) => (
                <li key={x.userID}>{x.userID}</li>
              ))}
          </ul>
        </Card>
      </div>
      <button onClick={(event) => handleAwesomeness(event)}>Til Awesomeness-mode</button>
    </div>
  );
}

export default Accreditation;
