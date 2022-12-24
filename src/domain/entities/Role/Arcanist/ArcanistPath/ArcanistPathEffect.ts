import {PassiveEffect} from '../../../Ability/PassiveEffect';
import type {BuildingSheetInterface} from '../../../BuildingSheetInterface';
import type {Dispatch} from '../../../Sheet/SheetInterface';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {ArcanistPath} from './ArcanistPath';

export class ArcanistPathEffect extends PassiveEffect {
	constructor(readonly path: ArcanistPath) {
		super(RoleAbilityName.arcanistPath);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		this.path.addToSheet(sheet, dispatch);
	}
}
