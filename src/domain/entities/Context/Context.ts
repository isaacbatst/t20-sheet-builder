import {type CharacterInterface} from '../Character/CharacterInterface';
import {type Location} from '../Sheet';
import type {ContextInterface} from './ContextInterface';
export abstract class Context implements ContextInterface {
	abstract character: CharacterInterface | undefined;
	abstract activateContextualModifiers: boolean;
	abstract getCurrentLocation(): Location | undefined;
}
