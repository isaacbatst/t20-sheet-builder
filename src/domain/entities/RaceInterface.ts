import type {Attributes} from './Attributes';
import type {CharacterDispatch, SheetInterface} from './SheetInterface';
import type {RaceName} from './Race/RaceName';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	applyAttributesModifiers(attributes: Attributes, dispatch: CharacterDispatch): void;
	applyAbilities(character: SheetInterface): void;
};
