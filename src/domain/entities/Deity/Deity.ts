import {PickGrantedPower} from '../Action/PickGrantedPower';
import {type GrantedPower} from '../Power/GrantedPower/GrantedPower';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type DeityName} from './DeityName';

export abstract class Deity {
	abstract name: DeityName;

	constructor(
		readonly grantedPowers: GrantedPower[],
	) {}

	addToSheet(transaction: TransactionInterface) {
		this.grantedPowers.forEach(grantedPower => {
			transaction.run(new PickGrantedPower({
				payload: {
					power: grantedPower,
					source: this.name,
				},
				transaction,
			}));
		});
	}
}
