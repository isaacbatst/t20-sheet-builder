import {AttributeTranslator} from '../AttributeTranslator';
import type {AttributeModifier} from '../Race/Race';
import {TextSeparatorGenerator} from '../TextSeparatorGenerator';

export class RaceAttributeModifiersAppliance {
	static generate(
		character: {getRace(): {attributeModifiers: AttributeModifier[]} | undefined},
	): string {
		const race = character.getRace();

		if (!race) {
			throw new Error('MISSING_CHARACTER_RACE');
		}

		const attributesModifiersText = RaceAttributeModifiersAppliance.generateAttributeModifiersText(race.attributeModifiers);

		return `Aplicação dos modificadores de atributo da raça: ${attributesModifiersText}.`;
	}

	private static generateAttributeModifiersText(attributeModifiers: AttributeModifier[]): string {
		const text = attributeModifiers.reduce<string>((acc, attributeModifier, index) => {
			const separator = TextSeparatorGenerator.generateSeparator(index, attributeModifiers.length);
			const translatedAttribute = AttributeTranslator.getTranslatedAttribute(attributeModifier.attribute);
			const modifierWithSign = attributeModifier.modifier >= 0 ? `+${attributeModifier.modifier}` : attributeModifier.modifier;
			return acc + `${modifierWithSign} ${translatedAttribute}${separator}`;
		}, '');

		return text;
	}
}
