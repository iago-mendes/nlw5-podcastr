import server from '../../server.json'

export default function Home(props)
{
	return (
		<div>
			{JSON.stringify(props.episodes)}
		</div>
	)
}

export async function getStaticProps() {
	const episodes = server.episodes

	return {
		props: {
			episodes
		},
		revalidate: 60 * 60 * 8
	}
}