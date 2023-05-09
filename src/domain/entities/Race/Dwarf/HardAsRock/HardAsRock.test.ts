import {AddFixedModifierToLifePoints} from '../../../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../../../Action/AddPerLevelModifierToLifePoints';
import {FixedModifier} from '../../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../../Modifier/PerLevelModifier/PerLevelModifier';
import {TransactionFake} from '../../../Sheet/TransactionFake';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RaceName} from '../../RaceName';
import {HardAsRock} from './HardAsRock';

describe('HardAsRock', () => {
	it('should dispatch addOtherModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const transaction = new TransactionFake();
		hardAsRock.addToSheet(transaction, RaceName.dwarf);

		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToLifePoints({
			payload: {
				modifier: new FixedModifier(RaceAbilityName.hardAsRock, 3),
			},
			transaction,
		}));
	});

	it('should dispatch addPerLevelModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const transaction = new TransactionFake();

		hardAsRock.addToSheet(transaction, RaceName.dwarf);

		expect(transaction.run).toHaveBeenCalledWith(new AddPerLevelModifierToLifePoints({
			payload: {
				modifier: new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false),
			},
			transaction,
		}));
	});
});
