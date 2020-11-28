import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import BasicDataComponent from "../components/BasicData";
import TableDataComponent from "../components/TableData";
import ChartDataComponent from "../components/ChartData";
import SelectComponent from "../components/SelectComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomeScreen(props) {
  const { global, historical } = props.data;
  const { todayCases, todayDeaths, todayRecovered } = global;
  const { cases, deaths, recovered } = global;

  // TODO: Figure a way to show graphs with only one value
  // TODO: Format the numbers to one or 0 decimal places before showing as an legend to the chart
  //LAST I DID: imporved the chart component and researched more about the char itself
  // console.log(historical);
  // chart.js library
  // also need to find a way to generate graph from 0 to a certain value
  // or from a value to another value => prolly the best

  const today_data = {
    table: {
      cases: todayCases,
      deaths: todayDeaths,
      recovered: todayRecovered,
    },
    graph: {
      cases: [todayCases],
      deaths: todayDeaths,
      recovered: todayRecovered,
    },
  };

  const week_data = {
    table: {
      cases:
        Object.values(historical.cases)[29] -
        Object.values(historical.cases)[22],
      deaths:
        Object.values(historical.deaths)[29] -
        Object.values(historical.deaths)[22],
      recovered:
        Object.values(historical.recovered)[29] -
        Object.values(historical.recovered)[22],
    },
    graph: {
      cases: Object.values(historical.cases).slice(22),
      deaths: Object.values(historical.deaths).slice(22),
      recovered: Object.values(historical.recovered).slice(22),
    },
  };

  const month_data = {
    table: {
      cases:
        Object.values(historical.cases)[29] -
        Object.values(historical.cases)[0],
      deaths:
        Object.values(historical.deaths)[29] -
        Object.values(historical.deaths)[0],
      recovered:
        Object.values(historical.recovered)[29] -
        Object.values(historical.recovered)[0],
    },
    graph: {
      cases: Object.values(historical.cases),
      deaths: Object.values(historical.deaths),
      recovered: Object.values(historical.recovered),
    },
  };

  const [select_data, set_select_data] = useState(today_data);
  const [display_graph, set_display_graph] = useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.basicDataComponent}>
          <BasicDataComponent
            cases={cases}
            deaths={deaths}
            recovered={recovered}
          />
        </View>

        <View style={styles.selectComponent}>
          <SelectComponent
            today={() => {
              set_select_data(today_data);
              set_display_graph(false);
            }}
            week={() => {
              set_select_data(week_data);
              set_display_graph(true);
            }}
            month={() => {
              set_select_data(month_data);
              set_display_graph(true);
            }}
          />
        </View>

        <View style={styles.tableDataComponent}>
          <TableDataComponent
            headline={"TOTAL"}
            row1={select_data.table.cases}
            row2={select_data.table.deaths}
            row3={select_data.table.recovered}
          />
        </View>

        <View style={styles.chartDataComponent}>
          {display_graph ? (
            <ChartDataComponent
              data={[
                select_data.graph.cases,
                select_data.graph.deaths,
                select_data.graph.recovered,
              ]}
            />
          ) : (
            <View>
              <Text>{"There is a no fucking graph fuck off"}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    height: hp("175%"),
    padding: 0,
    alignItems: "center",
  },
  basicDataComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("15%"),
  },
  selectComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("73%"),
  },
  tableDataComponent: {
    alignSelf: "center",
    top: hp("32%"),
  },
  chartDataComponent: {
    alignSelf: "center",
    top: hp("38%"),
  },
});
