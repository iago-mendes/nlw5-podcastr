import {useEffect, useState} from 'react'

function useDimensions()
{
	const [width, setWidth] = useState(600)
	const [height, setHeight] = useState(800)

	const inMobile = width <= 600
	const inTablet = width > 600 || width <= 1000
	const inDesktop = width > 1000
	
	useEffect(() =>
	{
		updateDimensions()
		window.addEventListener('resize', updateDimensions)

		return () => window.removeEventListener('resize', updateDimensions)
	}, [])

	function updateDimensions()
	{
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	return {width, height, inMobile, inTablet, inDesktop}
}

export default useDimensions