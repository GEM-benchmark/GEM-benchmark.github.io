import { getLeaderboardData } from "../../lib/leaderboard";
import React from "react";

import MUIDataTable from "mui-datatables";

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
    <MUIDataTable
      title={"Leaderboard"}
      data={leaderboardData.data}
      columns={leaderboardData.schema}
    />
  );
}
