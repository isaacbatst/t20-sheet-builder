import {LearnSpell} from '../../../Action/AddSpell';
import type {Attribute} from '../../../Sheet';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {Spell} from '../../../Spell/Spell';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {ArcanistPath, ArcanistPathName} from './ArcanistPath';

export class ArcanistPathMage extends ArcanistPath {
	spellsAttribute: Attribute = 'intelligence';
	spellLearnFrequency: SpellLearnFrequency = 'all';
	name: ArcanistPathName = ArcanistPathName.mage;

	constructor(readonly additionalSpell: Spell) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new LearnSpell({
			source: this.name,
			spell: this.additionalSpell,
		}), sheet);
	}
}
