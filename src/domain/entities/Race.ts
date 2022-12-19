import type {Ability} from './Ability';
import type {Attribute, Attributes} from './Attributes';
import type {CharacterInterface} from './Character';

export type AttributeModifier = {
	attribute: Attribute;
	modifier: number;
};

export abstract class Race {
	abstract readonly attributeModifiers: AttributeModifier[];
	abstract readonly abilities: Record<string, Ability>;

	applyAttributesModifiers(attributes: Attributes): Attributes {
		const modifiedAttributes: Partial<Attributes> = {};

		this.attributeModifiers.forEach(attributeModifier => {
			modifiedAttributes[attributeModifier.attribute] = attributes[attributeModifier.attribute] + attributeModifier.modifier;
		});

		return {
			...attributes,
			...modifiedAttributes,
		};
	}

	applyAbilities(character: CharacterInterface): void {
		Object.values(this.abilities).forEach(ability => {
			ability.apply(character);
		});
	}
}
