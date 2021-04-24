import { GetStaticPaths, GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import server from '../../../server.json'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import { usePlayer } from '../../contexts/PlayerContext'

import styles from './episode.module.scss'
import SEOHead from '../../components/SEOHead'

type Episode =
{
	id: string,
	title: string
	thumbnail: string
	members: string
	publishedAt: string
	duration: number
	durationAsString: string
	description: string
	url: string
}

type EpisodeProps =
{
	episode: Episode
}

export default function Episode({episode}: EpisodeProps)
{
	const {play} = usePlayer()

	const plaintextDescription = episode.description
		.replace('<p>', '').replace('</p>', '')

	return (
		<div className={styles.container}>
			<SEOHead
				title={`${episode.title} | Podcastr`}
				description={plaintextDescription}
				image={episode.thumbnail}
			/>

			<div className='scrollableContent'>
				<div className={styles.episode}>
					<div className={styles.thumbnail}>
						<Link href='/'>
							<button type='button'>
								<img src='/arrow-left.svg' alt='Go back'/>
							</button>
						</Link>

						<Image
							src={episode.thumbnail}
							alt={episode.title}
							width={700}
							height={160}
							objectFit='cover'
						/>

						<button type='button' onClick={() => play(episode)}>
							<img src='/play.svg' alt='Play episode'/>
						</button>
					</div>

					<header>
						<h1>{episode.title}</h1>
						<span>{episode.members}</span>
						<span>{episode.publishedAt}</span>
						<span>{episode.durationAsString}</span>
					</header>

					<div
						className={styles.description}
						dangerouslySetInnerHTML={{__html: episode.description}}
					/>
				</div>
			</div>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>
{
	const data = server.episodes
		.sort((a,b) => a.published_at > b.published_at ? -1 : 1)
		.slice(0, 2)

	const paths = data.map(episode => (
		{
			params: {slug: episode.id}
		}))

	return {
		paths,
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {slug} = ctx.params

	const data = server.episodes.find(({id}) => id === slug)

	const episode =
	{
		id: data.id,
		title: data.title,
		thumbnail: data.thumbnail,
		members: data.members,
		publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: enUS}),
		duration: Number(data.file.duration),
		durationAsString: convertDurationToTimeString(Number(data.file.duration)),
		description: data.description,
		url: data.file.url
	}

	return {
		props:
		{
			episode
		},
		revalidate: 60 * 60 * 24 // 24h
	}
}