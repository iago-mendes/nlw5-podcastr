import format from 'date-fns/format'
import enUS from 'date-fns/locale/en-US'
import Link from 'next/link'
import Switch from 'react-switch'
import {FiSun, FiMoon} from 'react-icons/fi'

import { useTheme } from '../../contexts/ThemeContext'
import useDimensions from '../../hooks/useDimensions'

import styles from './styles.module.scss'

export function Header()
{
	const {isDark, changeTheme} = useTheme()
	const {inMobile} = useDimensions()

	const currentDate = format(new Date(), 'EEEEEE, d MMM', {locale: enUS})

	return (
		<header className={styles.headerContainer} >
			<Link href='/'>
				<img src='/logo.svg' alt='Podcastr'/>
			</Link>

			{!inMobile && (
				<p>The best for you to hear, always</p>
			)}

			<div className={styles.group}>
				{!inMobile && (
					<span>{currentDate}</span>
				)}
				
				<Switch
					checked={isDark}
					onChange={changeTheme}
					offColor='#ffe4ad'
					offHandleColor='#ffad05'
					uncheckedIcon={<div style={{color: '#ffad05'}} className={styles.themeIcon}><FiSun/></div>}
					onColor='#44475a'
					onHandleColor='#6272a4'
					checkedIcon={<div style={{color: '#6272a4'}} className={styles.themeIcon}><FiMoon/></div>}
					height={30}
					width={65}
				/>
			</div>
		</header>
	)
}