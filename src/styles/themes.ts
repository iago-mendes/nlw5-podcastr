export type Theme =
{
	background1: string
	background2: string

	detail2: string
	detail3: string
	detail4: string
	detail5: string

	secondary: string

	primary1: string
	primary2: string
	primary3: string
	primary4: string
}

export const light: Theme =
{
	background1: '#FFF',
	background2: '#F7F8FA',

	detail2: '#E6E8EB',
	detail3: '#AFB2B1',
	detail4: '#808080',
	detail5: '#494D4B',

	secondary: '#04D361',
	
	primary1: '#9F75FF',
	primary2: '#9164FA' ,
	primary3: '#8257E5',
	primary4: '#6F48C9'
}

export const dark: Theme =
{
	background1: '#191622',
	background2: '#221e2e',
	
	detail2: '#494D4B',
	detail3: '#808080',
	detail4: '#AFB2B1',
	detail5: '#E6E8EB',

	secondary: '#04D361',
	
	primary1: '#9F75FF',
	primary2: '#9164FA' ,
	primary3: '#8257E5',
	primary4: '#6F48C9'
}