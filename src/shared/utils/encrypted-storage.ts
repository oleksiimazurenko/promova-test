import CryptoJS from 'crypto-js'

export const encryptedStorage = {
	getItem: (name: string) => {
		const encrypted = localStorage.getItem(name)
		if (!encrypted) return null

		const SECRET = process.env.NEXT_PUBLIC_ZUSTAND_PERSIST_SECRET
		if (!SECRET) return null

		const bytes = CryptoJS.AES.decrypt(encrypted, SECRET)
		const decrypted = bytes.toString(CryptoJS.enc.Utf8)
		return JSON.parse(decrypted)
	},

	// eslint-disable-next-line
	setItem: (name: string, value: any) => {
		const SECRET = process.env.NEXT_PUBLIC_ZUSTAND_PERSIST_SECRET

		if (!SECRET) throw new Error('No secret provided')

		const encrypted = CryptoJS.AES.encrypt(
			JSON.stringify(value),
			SECRET
		).toString()
		localStorage.setItem(name, encrypted)
	},
	removeItem: (name: string) => {
		localStorage.removeItem(name)
	},
}
