import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document
{
	render()
	{
		const pwa =
		{
			name: 'Podcastr',
			description: 'The best for you to hear, always',
		}

		return (
			<Html>
				<Head>
					<link rel='icon' href='/favicon.png' type='image/png' />

					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link href='https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap' rel='stylesheet' />

					{/* PWA */}
					
					<meta name='application-name' content={pwa.name} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={pwa.name} />
          <meta name='description' content={pwa.description} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#9F75FF' />
          
          <link rel='apple-touch-icon' sizes='64x64' href='/favicon.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.png' type='image/png' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}