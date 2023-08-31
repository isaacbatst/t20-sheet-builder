import {type Location} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import type {ContextInterface} from './ContextInterface';

export abstract class Context implements ContextInterface {
	abstract sheet: SheetInterface | undefined;
	abstract activateContextualModifiers: boolean;
	abstract getCurrentLocation(): Location | undefined;
}
