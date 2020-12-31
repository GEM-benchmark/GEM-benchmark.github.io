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
  return (
    <Layout>
    <MUIDataTable
      title={"Leaderboard"}
      data={leaderboardData.data}
      columns={leaderboardData.schema}
    />
    </Layout>
  );
}
