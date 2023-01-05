import type {Attribute} from '../../../Sheet';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {SpellLearnFrequency} from '../../SpellsAbility';

export enum ArcanistPathName {
	wizard = 'wizard',
	sorcerer = 'sorcerer',
	mage = 'mage',
}

export abstract class ArcanistPath {
	abstract name: ArcanistPathName;
	abstract spellsAttribute: Attribute;
	abstract spellLearnFrequency: SpellLearnFrequency;
	abstract addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
}
