import {PassiveEffect} from '../../../Ability/PassiveEffect';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {ArcanistPath} from './ArcanistPath';

export class ArcanistPathEffect extends PassiveEffect {
	constructor(readonly path: ArcanistPath) {
		super(RoleAbilityName.arcanistPath);
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		this.path.addToSheet(sheet, dispatch);
	}
}
