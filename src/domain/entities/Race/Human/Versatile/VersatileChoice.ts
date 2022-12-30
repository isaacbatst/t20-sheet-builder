import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {Translatable} from '../../../Translator';

export type VersatileChoiceType = 'skill' | 'power';

export abstract class VersatileChoice {
	constructor(readonly name: string, readonly type: VersatileChoiceType) {}

	abstract addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void;
}
