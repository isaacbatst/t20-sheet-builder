import type {Attributes} from './Attributes';
import type {CharacterInterface} from './Character';
import type {AttributeModifier} from './Race';

export type RaceInterface = {
	attributeModifiers: AttributeModifier[];
	applyAttributesModifiers(attributes: Attributes): Attributes;
	applyAbilities(character: CharacterInterface): void;
};
