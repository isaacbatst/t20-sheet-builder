import type {Attributes} from './Attributes';
import type {CharacterInterface} from './CharacterInterface';
import type {AttributeModifier} from './Race/Race';

export type RaceInterface = {
	name: string;
	attributeModifiers: AttributeModifier[];
	applyAttributesModifiers(attributes: Attributes): Attributes;
	applyAbilities(character: CharacterInterface): void;
};
