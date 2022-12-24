import {LearnSpell} from '../../../Action/AddSpell';
import type {BuildingSheetInterface} from '../../../BuildingSheetInterface';
import type {Dispatch} from '../../../Sheet/SheetInterface';
import type {Spell} from '../../../Spell/Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {ArcanistPath, ArcanistPathName} from './ArcanistPath';

export class ArcanistPathMage extends ArcanistPath {
	name: ArcanistPathName = ArcanistPathName.mage;

	constructor(readonly additionalSpell: Spell) {
		super();
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new LearnSpell({
			source: RoleAbilityName.arcanistPath,
			spell: this.additionalSpell,
		}));
	}
}
