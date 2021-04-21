export function truncateText(text: string, length: number)
{
	const truncatedText = text.length > length
		? text.slice(0, length-3) + '...'
		: text
	
	return truncatedText
}