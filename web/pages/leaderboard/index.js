import { getLeaderboardData } from "../../lib/leaderboard";
import React from "react";

import MUIDataTable from "mui-datatables";
import Layout from "../../components/layout";

export async function getStaticProps() {
  const leaderboardData = getLeaderboardData();
  return {
    props: {
      leaderboardData,
    },
  };
}

export default function Leaderboard({ leaderboardData }) {
  const options = {
    filterType: "dropdown",
    filter: true,
    download: false,
    print: false
  };
  var tables = []
  for (var key in leaderboardData.taskschema) {
    tables.push(<MUIDataTable
      key={key}
      title={`Leaderboard ${key}`}
      data={leaderboardData.data[key]}
      columns={leaderboardData.taskschema[key]}
      options={options}
    />);
    tables.push(<br key={`br${key}`}/>);
  }

  return (
    <Layout>
    {tables}
    </Layout>
  );
}
