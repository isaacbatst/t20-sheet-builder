import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {CharacterContextAbstract} from './CharacterContextAbstract';
import {type ContextType} from './ContextInterface';

export abstract class InGameContextAbstract extends CharacterContextAbstract {
	get type(): ContextType {
		return 'ingame';
	}
	abstract override getCurrentLocation(): Location;
}
