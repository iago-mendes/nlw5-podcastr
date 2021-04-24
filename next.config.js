const withPWA = require('next-pwa')

module.exports = withPWA(
{
	images:
	{
		domains: ['cdn.vox-cdn.com']
	},
	pwa:
	{
    dest: 'public'
  }
})