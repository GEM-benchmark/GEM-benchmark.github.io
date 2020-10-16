const prod = process.env.NODE_ENV === 'production'

// Not necessary in our case since we are not using a sub-repo.
// Otherwise, replace '/' with repo name.
module.exports = {
  'process.env.BACKEND_URL': prod ? '/' : ''
}