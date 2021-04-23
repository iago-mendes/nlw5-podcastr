import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

import {light, dark, Theme} from '../styles/themes'

type ThemeContextData =
{
	isDark: boolean
	changeTheme: (isDark: boolean) => void
}

const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider: React.FC = ({children}:{children: ReactNode}) =>
{
	const [isDark, setIsDark] = useState(true)

	useEffect(() =>
	{
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme)
			changeTheme(savedTheme === 'dark')
	}, [])

	function changeTheme(isDark: boolean)
	{
		if (isDark)
		{
			localStorage.setItem('theme', 'dark')
			setThemeVariables(dark)
			setIsDark(true)
		}
		else
		{
			localStorage.setItem('theme', 'light')
			setThemeVariables(light)
			setIsDark(false)
		}
	}

	function setThemeVariables(theme: Theme)
	{
		
		document.documentElement.style.setProperty('--white', theme.background1)

		document.documentElement.style.setProperty('--gray-50', theme.background2)
		document.documentElement.style.setProperty('--gray-100', theme.detail2)
		document.documentElement.style.setProperty('--gray-200', theme.detail3)
		document.documentElement.style.setProperty('--gray-500', theme.detail4)
		document.documentElement.style.setProperty('--gray-800', theme.detail5)

		document.documentElement.style.setProperty('--green-500', theme.secondary)
		
		document.documentElement.style.setProperty('--purple-300', theme.primary1)
		document.documentElement.style.setProperty('--purple-400', theme.primary2)
		document.documentElement.style.setProperty('--purple-500', theme.primary3)
		document.documentElement.style.setProperty('--purple-800', theme.primary4)
	}

	return (
		<ThemeContext.Provider value={{isDark, changeTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () =>
{
	return useContext(ThemeContext)
}