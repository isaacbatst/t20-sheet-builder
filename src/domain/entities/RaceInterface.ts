import type {Attributes} from './Attributes';
import type {CharacterDispatch, CharacterInterface} from './CharacterInterface';
import type {AttributeModifier} from './Race/Race';

export type RaceInterface = {
	name: string;
	attributeModifiers: AttributeModifier[];
	applyAttributesModifiers(attributes: Attributes, dispatch: CharacterDispatch): void;
	applyAbilities(character: CharacterInterface): void;
};
