module.exports = {
    async redirects() {
      return [
        {
          source: '/workshop',
          destination: '/workshop/2021',
          permanent: true,
        },
        {
          source: '/team',
          destination: '/team/2022',
          permanent: true,
        },
        {
          source: '/panel',
          destination: 'https://www.dory.app/c/google.com/a89b88b9_gem-workshop',
          permanent: true,

        }
      ]
    },
  }