import "./ZoneSelector.css";

interface IZoneSelector {
  selectedZone: number;
  setSelectedZone: (zone: number) => void;
}

function ZoneSelector(props: IZoneSelector) {
  const zones = [1, 2, 3, 4, 5];
  const { selectedZone, setSelectedZone } = props;

  const isSelected = (zone: number) =>
    zone === selectedZone ? "btn-selected" : "";

  return (
    <div className="zone-btns">
      {zones.map((zone) => {
        if (zone === 5) {
          return (
            <button
              className={isSelected(zone)}
              onClick={() => setSelectedZone(zone)}
            >
              Alle soner
            </button>
          );
        }
        return (
          <button
            className={isSelected(zone)}
            onClick={() => setSelectedZone(zone)}
          >
            {zone} sone
          </button>
        );
      })}
    </div>
  );
}

export default ZoneSelector;
