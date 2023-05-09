import {ChangeDisplacement} from '../../../Action/ChangeDisplacement';
import {TransactionFake} from '../../../Sheet/TransactionFake';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RaceName} from '../../RaceName';
import {SlowAndAlways} from './SlowAndAlways';

describe('SlowAndAlways', () => {
	it('should dispatch displacement change', () => {
		const slowAndAlways = new SlowAndAlways();
		const transaction = new TransactionFake();
		slowAndAlways.addToSheet(transaction, RaceName.dwarf);

		expect(transaction.run).toHaveBeenCalledWith(new ChangeDisplacement({
			payload: {
				displacement: 6,
				source: RaceAbilityName.slowAndAlways,
			},
			transaction,
		}));
	});
});
