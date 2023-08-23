import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {PreviewContextAbstract} from './PreviewContextAbstract';
import {type ContextType} from './ContextInterface';

export abstract class InGameContextAbstract extends PreviewContextAbstract {
	get type(): ContextType {
		return 'ingame';
	}
	abstract override getCurrentLocation(): Location;
}
