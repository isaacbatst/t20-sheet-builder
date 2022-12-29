import {AddRolePlayEffect} from '../Action/AddRolePlayEffect';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Transaction';
import type {AbilityName} from './Ability';
import {PassiveEffect} from './PassiveEffect';

export class RolePlayEffect extends PassiveEffect {
	constructor(
		source: AbilityName,
		readonly description: string,
	) {
		super(source);
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddRolePlayEffect({
			effect: this,
		}), sheet);
	}
}
