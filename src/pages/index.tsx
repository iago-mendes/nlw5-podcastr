import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import Image from 'next/image'
import Link from 'next/link'

import server from '../../server.json'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import { truncateText } from '../utils/truncateText'
import { usePlayer } from '../contexts/PlayerContext'
import useDimensions from '../hooks/useDimensions'
import SEOHead from '../components/SEOHead'

import styles from './home.module.scss'

type Episode =
{
	id: string,
	title: string
	thumbnail: string
	members: string
	publishedAt: string
	duration: number
	durationAsString: string
	url: string
}

type HomeProps =
{
	latestEpisodes: Episode[]
	allEpisodes: Episode[]
}

export default function Home({latestEpisodes, allEpisodes}: HomeProps)
{
	const {playList} = usePlayer()
	const {inMobile} = useDimensions()

	const episodeList = [...latestEpisodes, ...allEpisodes]
	const titleLength = inMobile ? 50 : 80

	return (
		<div className={styles.homepage}>
			<SEOHead
				title='Home | Podcastr'
			/>

			<div className='scrollableContent'>
				<section className={styles.latestEpisodes}>
					<h2>Last releases</h2>

					<ul>
						{latestEpisodes.map((episode, index) => (
							<li key={episode.id}>
								<Image
									src={episode.thumbnail}
									alt={episode.title}
									width={192}
									height={192}
									objectFit='cover'
								/>

								<div className={styles.episodeDetails}>
									<Link href={`/episodes/${episode.id}`} >
										{truncateText(episode.title, titleLength)}
									</Link>
									<p>{episode.members}</p>
									<span>{episode.publishedAt}</span>
									<span>{episode.durationAsString}</span>
								</div>

								<button type='button' onClick={() => playList(episodeList, index)} >
									<img src='/play-green.svg' alt='Play episode'/>
								</button>
							</li>
						))}
					</ul>
				</section>

				<section className={styles.allEpisodes}>
					<h2>All episodes</h2>

					{
						inMobile
						? (
							<ul>
								{allEpisodes.map((episode, index) => (
									<li key={episode.id}>
										<Image
											src={episode.thumbnail}
											alt={episode.title}
											width={192}
											height={192}
											objectFit='cover'
										/>

										<div className={styles.episodeDetails}>
											<Link href={`/episodes/${episode.id}`} >
												{truncateText(episode.title, titleLength)}
											</Link>
											<p>{episode.members}</p>
											<span>{episode.publishedAt}</span>
											<span>{episode.durationAsString}</span>
										</div>

										<button type='button' onClick={() => playList(episodeList, index)} >
											<img src='/play-green.svg' alt='Play episode'/>
										</button>
									</li>
								))}
							</ul>
						)
						: (
							<table cellSpacing={0}>
								<thead>
									<tr>
										<th></th>
										<th>Podcast</th>
										<th>Members</th>
										<th>Date</th>
										<th>Duration</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{allEpisodes.map((episode, index) => (
										<tr key={episode.id}>
											<td style={{width: 72}}>
												<Image
													src={episode.thumbnail}
													alt={episode.title}
													width={120}
													height={120}
													objectFit='cover'
												/>
											</td>
											<td>
												<Link href={`/episodes/${episode.id}`} >
													{truncateText(episode.title, titleLength)}
												</Link>
											</td>
											<td>{truncateText(episode.members, 60)}</td>
											<td style={{width: 100}}>
												{episode.publishedAt}
											</td>
											<td>{episode.durationAsString}</td>
											<td>
												<button type='button' onClick={() => playList(episodeList, index + latestEpisodes.length)}>
													<img src='/play-green.svg' alt='Play episode'/>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)
					}
				</section>
			</div>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const data = server.episodes.sort((a,b) => a.published_at > b.published_at ? -1 : 1)

	const episodes = data.map(episode => (
		{
			id: episode.id,
			title: episode.title,
			thumbnail: episode.thumbnail,
			members: episode.members,
			publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: enUS}),
			duration: Number(episode.file.duration),
			durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
			url: episode.file.url
		}))
	
	const latestEpisodes = episodes.slice(0, 2)
	const allEpisodes = episodes.slice(2, episodes.length)

	return {
		props: {
			latestEpisodes,
			allEpisodes
		},
		revalidate: 60 * 60 * 8
	}
}