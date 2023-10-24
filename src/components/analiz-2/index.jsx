import { MainContext, useContext } from "../../context/main-context";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory";

export const Analiz2 = () => {
  const { json } = useContext(MainContext);

  const totalLenForStatus0 = json
    .filter((obj) => obj.status === 0)
    .reduce((total, obj) => total + obj.len, 0);

  const totalLenForStatus1 = json
    .filter((obj) => obj.status === 1)
    .reduce((total, obj) => total + obj.len, 1);

  const totalLenForStatus2 = json
    .filter((obj) => obj.status === 2)
    .reduce((total, obj) => total + obj.len, 2);

  return (
    <div className="size-md">
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        theme={VictoryTheme.material}
        domainPadding={{ x: 50 }}
        height={500}
        width={600}
      >
        <VictoryBar
          barRatio={0.8}
          style={{
            data: { fill: "#c43a31", width: 50 },
          }}
          data={[totalLenForStatus0, totalLenForStatus1, totalLenForStatus2]}
          categories={{ x: ["Status: 0", "Status: 1", "Status: 2"] }}
        />
      </VictoryChart>
    </div>
  );
};
