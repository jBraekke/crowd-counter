import { useTranslation } from "react-i18next";
import swing from "../../img/swing.png";
import "./Welcome.css";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

interface ITask {
  name: string;
  items: number;
}

function Task(props: ITask) {
  return (
    <div>
      <strong>{props.items} </strong>
      <span>{props.name}</span>
    </div>
  );
}

function Welcome() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const pendingTasks = [
    { name: "IBAN problems", items: 2 },
    { name: "unknown receiver", items: 10 },
  ] as ITask[];

  function generateGreetings() {
    const currentHour = parseInt(moment().format("HH"));

    let greeting = ''

    if (currentHour >= 3 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 15) {
      greeting = "Good Afternoon";
    } else if (currentHour >= 15 && currentHour < 20) {
      greeting = "Good Evening";
    } else if (currentHour >= 20 && currentHour < 3) {
      greeting = "Good Night";
    } else {
      greeting = "Hello";
    }

    return `${greeting}`;
  }

  return (
    <div className="welcome-card">
      <div className="center">
        <h1>{generateGreetings()}</h1>
      </div>
      <div className="vertical-devider" />
      <div>
        <span>
          {t("home.welcome.last")} <strong>24 {t("home.welcome.hours")}</strong>
        </span>
        <div className="pending-tasks">
          {pendingTasks.map((task, key) => (
            <Task {...task} key={key} />
          ))}
        </div>
      </div>
      <div className="swing-container">
        <figure className="swing">
          <img src={swing} alt="person-swinging" width={70} />
        </figure>
      </div>
    </div>
  );
}

export default Welcome;
