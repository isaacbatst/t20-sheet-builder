export class Capitalizer {
	static capitalize(string: string) {
		const firstChar = string.charAt(0);
		const firstCharCapitalized = firstChar.toUpperCase();
		return `${firstCharCapitalized}${string.slice(1)}`;
	}
}
