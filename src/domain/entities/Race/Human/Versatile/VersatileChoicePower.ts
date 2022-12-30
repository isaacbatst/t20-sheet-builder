import type {GeneralPowerInterface} from '../../../Power/GeneralPower';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {Translatable} from '../../../Translator';
import {VersatileChoice} from './VersatileChoice';

export class VersatileChoicePower extends VersatileChoice {
	constructor(readonly power: GeneralPowerInterface) {
		super(power.name, 'power');
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		this.power.addToSheet(sheet, dispatch, source);
	}
}
