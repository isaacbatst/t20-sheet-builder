import {LearnSpell} from '../../../Action/AddSpell';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {Spell} from '../../../Spell/Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {ArcanistPath, ArcanistPathName} from './ArcanistPath';

export class ArcanistPathMage extends ArcanistPath {
	name: ArcanistPathName = ArcanistPathName.mage;

	constructor(readonly additionalSpell: Spell) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new LearnSpell({
			source: RoleAbilityName.arcanistPath,
			spell: this.additionalSpell,
		}), sheet);
	}
}
