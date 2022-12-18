import {AttributeTranslator} from '../AttributeTranslator';
import {SelectableAttributesRace} from '../SelectableAttributesRace';
import {TextSeparatorGenerator} from '../TextSeparatorGenerator';

export class Human extends SelectableAttributesRace {
	protected get restrictedAttributes(): string[] {
		return [];
	}

	protected get attributesModifier(): number {
		return 1;
	}

	protected get selectableQuantity(): number {
		return 3;
	}

	get attributeModifiersText(): string {
		const modifiers = this.selectedAttributes.reduce<string>((acc, attribute, index) => {
			const separator = TextSeparatorGenerator.generateSeparator(index, this.selectedAttributes.length);
			const translatedAttribute = AttributeTranslator.getTranslatedAttribute(attribute);
			const modifier = '+1';
			return acc + `${modifier} ${translatedAttribute}${separator}`;
		}, '');

		return `Aplicação dos modificadores de atributo da raça: ${modifiers}`;
	}
}
