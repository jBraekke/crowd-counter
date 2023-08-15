import { IDeviation } from "./IDeviation";
import "./Price.css";

interface IPriceProp {
  item: IDeviation;
}

function Price(props: IPriceProp) {
  const { item } = props;

  return (
    <div className="price-container">
      <div className="price-name">{item.name}</div>
      <div className="price-context">{item.severity}</div>
      <div className="price-context">{item.date.toString()}</div>
    </div>
  );
}

export default Price;
