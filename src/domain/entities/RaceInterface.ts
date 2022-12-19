import type {Attributes} from './Attributes';
import type {CharacterInterface} from './Character';
import type {AttributeModifier} from './Race/Race';

export type RaceInterface = {
	name: string;
	attributeModifiers: AttributeModifier[];
	applyAttributesModifiers(attributes: Attributes): Attributes;
	applyAbilities(character: CharacterInterface): void;
};
