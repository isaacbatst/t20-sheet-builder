import type {CharacterInterface} from '../Character/CharacterInterface';
import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {Context} from './Context';
import type {ContextInterface, ContextType} from './ContextInterface';

export type InGameContextInterface = ContextInterface & {
	character: CharacterInterface;
	getCurrentLocation(): Location;
};

export abstract class InGameContextAbstract extends Context implements InGameContextInterface {
	abstract character: CharacterInterface;
	constructor() {
		super('ingame', true);
	}

	abstract getCurrentLocation(): Location;
}
