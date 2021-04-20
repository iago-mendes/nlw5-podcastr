export default function Home(props)
{
	return (
		<div>
			{JSON.stringify(props.episodes)}
		</div>
	)
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:7117/episodes')
	const data = await res.json()

	return {
		props: {
			episodes: data
		},
		revalidate: 60 * 60 * 8
	}
}