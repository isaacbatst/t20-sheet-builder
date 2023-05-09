import {type Action} from '../Action/Action';
import {PickRolePower} from '../Action/PickRolePower';
import type {PowerInterface} from '../Power/Power';
import {Power} from '../Power/Power';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type TranslatableName} from '../Translator';
import type {RolePowerName} from './RolePowerName';

export type RolePowerInterface = PowerInterface & {
	name: RolePowerName;
};

export abstract class RolePower extends Power implements RolePowerInterface {
	constructor(
		override readonly name: RolePowerName,
	) {
		super(name, 'role');
	}

	protected makeAction(transaction: TransactionInterface, source: TranslatableName): Action	{
		return new PickRolePower({
			payload: {
				power: this,
				source,
			},
			transaction,
		});
	}
}
