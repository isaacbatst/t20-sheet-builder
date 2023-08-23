import {type CharacterInterface} from '../Character/CharacterInterface';
import {type Location} from '../Sheet';
import {type ContextType, type ContextInterface} from './ContextInterface';

export abstract class PreviewContextAbstract implements ContextInterface {
	activateContextualModifiers = true;
	abstract type: ContextType;
	abstract character?: CharacterInterface;
	abstract getCurrentLocation(): Location | undefined;
}
