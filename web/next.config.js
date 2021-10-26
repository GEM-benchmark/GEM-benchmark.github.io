module.exports = {
    async redirects() {
      return [
        {
          source: '/workshop',
          destination: '/workshop/2021',
          permanent: true,
        },
      ]
    },
  }