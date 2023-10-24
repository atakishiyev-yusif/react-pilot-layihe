import { VictoryPie } from "victory";
import { MainContext, useContext } from "../../context/main-context";

export const Analiz1 = () => {
  const { json, calculatePercentage } = useContext(MainContext);
  const status0Percentage = calculatePercentage(json, 0);
  const status1Percentage = calculatePercentage(json, 1);
  const status2Percentage = calculatePercentage(json, 2);

  const getStatusCounts = () => {
    return json.reduce((acc, item) => {
      const status = item.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="flex items-center justify-around">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="purple-box"></div>
          <span>
            Status 0 : {statusCounts[0]} ({status0Percentage.toFixed(0)}%)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="aqua-box"></div>
          <span>
            Status 1 : {statusCounts[1]} ({status1Percentage.toFixed(1)}%)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="yellow-box"></div>
          <span>
            Status 2 : {statusCounts[2]} ({status2Percentage.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className="size-md">
        <VictoryPie
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          colorScale={["yellow", "aqua", "purple", "cyan", "navy"]}
          data={[
            { x: " ", y: status0Percentage.toFixed(0) },
            { x: " ", y: status1Percentage.toFixed(1) },
            { x: " ", y: status2Percentage.toFixed(2) },
          ]}
        />
      </div>
    </div>
  );
};
