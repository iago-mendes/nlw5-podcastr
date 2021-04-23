export type Theme =
{
	background: string

	detail1: string
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
	background: '#FFF',

	detail1: '#F7F8FA',
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
	background: '#191622',

	detail1: '#221e2e',
	detail2: '#2e283e',
	detail3: '#39324d',
	detail4: '#443c5d',
	detail5: '#483C67',

	secondary: '#04D361',
	
	primary1: '#9F75FF',
	primary2: '#9164FA' ,
	primary3: '#8257E5',
	primary4: '#6F48C9'
}