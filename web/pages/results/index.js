import { getResultsData as getResultsData } from "../../lib/results";
import React from "react";

import MUIDataTable from "mui-datatables";
import Layout from "../../components/layout";

export async function getStaticProps() {
  const resultsData = getResultsData();
  return {
    props: {
      resultsData: resultsData,
    },
  };
}

export default function Leaderboard({ resultsData }) {
  const options = {
    filterType: "dropdown",
    filter: true,
    download: false,
    print: false,
  };
  var tables = [];
  for (var taskName in resultsData.taskschema) {
    tables.push(
      <MUIDataTable
        key={taskName}
        title={`Results ${taskName}`}
        data={resultsData.data[taskName]}
        columns={resultsData.taskschema[taskName]}
        options={options}
      />
    );
    tables.push(<br key={`br${taskName}`} />);
  }

  return <Layout>{tables}</Layout>;
}
