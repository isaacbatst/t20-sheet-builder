export class TextSeparatorGenerator {
	static generateSeparator(index: number, arrayLength: number): string {
		const isCurrentLast = index === arrayLength - 1;
		const isNextLast = index + 1 === arrayLength - 1;
		const separator = isNextLast
			? ' e '
			: isCurrentLast
				? '.'
				: ', ';

		return separator;
	}
}
