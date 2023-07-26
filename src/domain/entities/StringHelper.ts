import {Capitalizer} from './Capitalizer';
import type {Attribute, Attributes} from './Sheet/Attributes';
import {TextSeparatorGenerator} from './TextSeparatorGenerator';
import {Translator} from './Translator';

export class StringHelper {
	static capitalize(string: string): string {
		return Capitalizer.capitalize(string);
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

