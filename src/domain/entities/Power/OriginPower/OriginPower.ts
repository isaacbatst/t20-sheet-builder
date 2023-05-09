import {type Action} from '../../Action/Action';
import {PickOriginPower} from '../../Action/PickOriginPower';
import type {OriginName} from '../../Origin/OriginName';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import type {OriginPowerName} from './OriginPowerName';

export type OriginPowerInterface = PowerInterface & {
	source: OriginName;
	name: OriginPowerName;
};

export abstract class OriginPower extends Power implements OriginPowerInterface {
	abstract source: OriginName;

	constructor(
		override readonly name: OriginPowerName,
	) {
		super(name, 'origin');
	}

	protected makeAction(transaction: TransactionInterface): Action {
		return new PickOriginPower({
			payload: {
				power: this,
				source: this.source,
			},
			transaction,
		});
	}
}
