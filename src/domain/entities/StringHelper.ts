import type {Attribute, Attributes} from './Attributes';
import {TextSeparatorGenerator} from './TextSeparatorGenerator';
import {Translator} from './Translator';

export class StringHelper {
	static capitalize(string: string): string {
		const firstChar = string.charAt(0);
		const firstCharCapitalized = firstChar.toUpperCase();

		return `${firstCharCapitalized}${string.slice(1)}`;
	}

	static addNumberSign(number: number): string {
		return number >= 0 ? `+${number}` : String(number);
	}

	static getAttributesText(attributes: Partial<Attributes>) {
		return Object.entries(attributes).reduce<string>((acc, [attribute, value], index, array) => {
			const separator = TextSeparatorGenerator.generateSeparator(index, array.length);
			const translatedAttribute = Translator.getAttributeTranslation(attribute as Attribute);
			const modifierWithSign = StringHelper.addNumberSign(value);
			return acc + `${modifierWithSign} ${translatedAttribute}${separator}`;
		}, '');
	}
}

