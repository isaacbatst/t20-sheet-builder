import {AttributeTranslator} from '../AttributeTranslator';
import type {Character} from '../Character';
import type {AttributeModifier} from '../Race';
import {TextSeparatorGenerator} from '../TextSeparatorGenerator';

export class RaceAttributeModifiersAppliance {
	static generate(
		character: Character,
	): string {
		return `Aplicação dos modificadores de atributo da raça: ${RaceAttributeModifiersAppliance.generateAttributeModifiersText(character.race.attributeModifiers)}.`;
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
