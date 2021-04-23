import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Slider from 'rc-slider'
import { FaExpandArrowsAlt, FaCompressArrowsAlt} from 'react-icons/fa'

import { usePlayer } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import useDimensions from '../../hooks/useDimensions'

import styles from './styles.module.scss'
import 'rc-slider/assets/index.css'

export function Player()
{
	const
	{
		episodeList,
		currentEpisodeIndex,
		isPlaying,
		isLooping,
		isShuffling,
		togglePlay,
		toggleLoop,
		toggleShuffle,
		setPlayingState,
		clearPlayerState,
		playNext,
		playPrevious,
		hasNext,
		hasPrevious
	} = usePlayer()
	const audioRef = useRef<HTMLAudioElement>(null)
	const {inDesktop} = useDimensions()

	const [progress, setProgress] = useState(0)
	const [isExpanded, setIsExpanded] = useState(false)

	const episode = episodeList[currentEpisodeIndex]

	useEffect(() =>
	{
		if (!audioRef.current)
			return
		
		if (isPlaying)
			audioRef.current.play()
		else
			audioRef.current.pause()
	}, [isPlaying])

	function setupProgressListener()
	{
		audioRef.current.currentTime = 0

		audioRef.current.addEventListener('timeupdate', () =>
		{
			setProgress(Math.floor(audioRef.current.currentTime))
		})
	}

	function handleSeek(amount: number)
	{
		audioRef.current.currentTime = amount
		setProgress(amount)
	}

	function handleEpisodeEnded()
	{
		if (hasNext)
			playNext()
		else
			clearPlayerState()
	}

	return (
		<div className={styles.playerContainer}>
			{(inDesktop || isExpanded) && (
				<>
					<div className={styles.expandContainer} >
						<button onClick={() => setIsExpanded(false)} >
							<FaCompressArrowsAlt />
						</button>
					</div>

					<header>
						<img src='/playing.svg' alt='Playing now'/>
						<strong>Playing now</strong>
					</header>

					{
						episode
						? (
							<div className={styles.currentEpisode}>
								<Image
									src={episode.thumbnail}
									alt={episode.title}
									width={592}
									height={592}
									objectFit='cover'
								/>
								<strong>{episode.title}</strong>
								<span>{episode.members}</span>
							</div>
						)
						: (
							<div className={styles.emptyPlayer}>
								<strong>Select a podcast to listen</strong>
							</div>
						)
					}
				</>
			)}

			<footer className={!episode ? styles.empty : ''}>
				<div className={styles.progress}>
					<span>{convertDurationToTimeString(progress)}</span>
					<div className={styles.slider}>
						{
							episode
							? (
								<Slider
									max={episode.duration}
									value={progress}
									onChange={handleSeek}
									trackStyle={{backgroundColor: '#04d361'}}
									railStyle={{backgroundColor: '#9f75ff'}}
									handleStyle={{borderColor: '#04d361', borderWidth: 4}}
								/>
							)
							: (
								<div className={styles.emptySlider} />
							)
						}
					</div>
					<span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
				</div>

				{episode && (
					<audio
						src={episode.url}
						ref={audioRef}
						loop={isLooping}
						autoPlay
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
						onLoadedMetadata={setupProgressListener}
						onEnded={handleEpisodeEnded}
					/>
				)}

				<div className={styles.buttons}>
					<button
						type='button'
						disabled={!episode || episodeList.length === 1}
						onClick={toggleShuffle}
						className={isShuffling ? styles.isActive : ''}
					>
						<img src='/shuffle.svg' alt='Shuffle' />
					</button>
					<button type='button' disabled={!episode || !hasPrevious} onClick={playPrevious}>
						<img src='/play-previous.svg' alt='Play previous' />
					</button>
					<button
						type='button'
						className={styles.playButton}
						disabled={!episode}
						onClick={togglePlay}
					>
						{
							isPlaying
							? (
								<img src='/pause.svg' alt='Pause' />
							)
							: (
								<img src='/play.svg' alt='Play' />
							)
						}
					</button>
					<button type='button' disabled={!episode || !hasNext} onClick={playNext}>
						<img src='/play-next.svg' alt='Play next' />
					</button>
					<button
						type='button'
						disabled={!episode}
						onClick={toggleLoop}
						className={isLooping ? styles.isActive : ''}
					>
						<img src='/repeat.svg' alt='Repeat' />
					</button>
				</div>

				{(!inDesktop && !isExpanded) && (
					<div className={styles.expandContainer} >
						<button onClick={() => setIsExpanded(true)} >
							<FaExpandArrowsAlt />
						</button>
					</div>
				)}
			</footer>
		</div>
	)
}