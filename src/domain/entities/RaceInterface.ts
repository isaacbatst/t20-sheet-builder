import type {Attributes} from './Attributes';
import type {CharacterDispatch, CharacterInterface} from './CharacterInterface';
import type {RaceNameEnum} from './Race/RaceName';

export type RaceInterface = {
	name: RaceNameEnum;
	attributeModifiers: Partial<Attributes>;
	applyAttributesModifiers(attributes: Attributes, dispatch: CharacterDispatch): void;
	applyAbilities(character: CharacterInterface): void;
};
