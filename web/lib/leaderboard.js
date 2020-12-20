export function getLeaderboardData() {
  const schema = [
    {
      name: "task",
      label: "Task",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "model",
      label: "Model",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "param_size",
      label: "Number of Parameters",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "score",
      label: "Score",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return {
    data: [
      { task: "Task 1", model: "Model A", param_size: "398M", score: 78.1 },
      { task: "Task 1", model: "Model B", param_size: "768M", score: 68.3 },
      { task: "Task 1", model: "Model C", param_size: "398M", score: 95.0 },
    ],
    schema: schema,
  };
}
