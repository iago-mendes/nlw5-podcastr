import Head from 'next/head'

interface SEOHeadProps
{
	title?: string
	description?: string
	image?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({title, description, image}) =>
{
	const meta =
	{
		title: title ? title : 'Podcastr',
		description: description ? description : 'The best for you to hear, always',
		image: image ? image : 'https://podcastr.iago-mendes.me/thumbnail.png',
		url: 'https://podcastr.iago-mendes.me'
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name='title' content={meta.title} />
			<meta name='description' content={meta.description} />

			<meta property='og:type' content='article' />
			<meta property='og:url' content={meta.url} />
			<meta property='og:title' content={meta.title} />
			<meta property='og:description' content={meta.description} />
			<meta property='og:image' content={meta.image} />
			<meta property='og:site_name' content='Podcastr' />

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content={meta.url} />
			<meta property='twitter:title' content={meta.title} />
			<meta property='twitter:description' content={meta.description} />
			<meta property='twitter:image' content={meta.image} />
		</Head>
	)
}

export default SEOHead