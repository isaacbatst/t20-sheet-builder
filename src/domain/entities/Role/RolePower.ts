import type {AbilityEffect} from '../Ability/AbilityEffect';
import {PickRolePower} from '../Action/PickRolePower';
import type {PowerInterface} from '../Power/Power';
import {Power} from '../Power/Power';
import type {ActionInterface} from '../SheetActions';
import type {Translatable} from '../Translator';
import type {RolePowerName} from './RolePowerName';

export type RolePowerInterface = PowerInterface & {
	name: RolePowerName;
};

export abstract class RolePower extends Power implements RolePowerInterface {
	constructor(
		override readonly name: RolePowerName,
		effects: AbilityEffect[],
	) {
		super(name, 'role', effects);
	}

	protected getAddAction(source: Translatable): ActionInterface	{
		return new PickRolePower({
			power: this,
			source,
		});
	}
}
