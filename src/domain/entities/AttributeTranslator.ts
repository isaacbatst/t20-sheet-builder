import type {Attribute} from './Attributes';

export class AttributeTranslator {
	static getTranslatedAttribute(attribute: Attribute, capitalized = true) {
		const translatedAttribute = AttributeTranslator.attributeToString[attribute];

		if (capitalized) {
			return AttributeTranslator.capitalize(translatedAttribute);
		}

		return translatedAttribute;
	}

	private static readonly attributeToString: Record<Attribute, string> = {
		charisma: 'carisma',
		constitution: 'constituição',
		dexterity: 'destreza',
		intelligence: 'inteligência',
		strength: 'força',
		wisdom: 'sabedoria',
	};

	private static capitalize(string: string): string {
		const firstChar = string.charAt(0);
		const firstCharCapitalized = firstChar.toUpperCase();

		return `${firstCharCapitalized}${string.slice(1)}`;
	}
}
