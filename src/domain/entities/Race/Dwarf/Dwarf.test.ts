import {ApplyRaceAbility} from '../../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../../Action/ApplyRaceModifiers';
import {RockKnowledge} from './RockKnowledge/RockKnowledge';
import {SlowAndAlways} from './SlowAndAlways/SlowAndAlways';
import {Dwarf} from './Dwarf';
import {HardAsRock} from './HardAsRock/HardAsRock';
import {RaceName} from '../RaceName';
import {vi} from 'vitest';
import {TransactionFake} from '../../Sheet/TransactionFake';

describe('Dwarf', () => {
	it('should dispatch dwarf attributes modifiers appliance', () => {
		const dwarf = new Dwarf();
		const transaction = new TransactionFake();
		dwarf.addToSheet(transaction);
		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceModifiers({
			payload: {
				modifiers: {
					dexterity: -1,
					constitution: 2,
					wisdom: 1,
				},
			},
			transaction,
		}));
	});

	it('should dispatch rock knowledge appliance', () => {
		const dwarf = new Dwarf();
		const transaction = new TransactionFake();
		dwarf.addToSheet(transaction);
		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceAbility({
			payload: {
				ability: new RockKnowledge(),
				source: RaceName.dwarf,
			},
			transaction,
		}));
	});

	it('should dispatch slow and always appliance', () => {
		const dwarf = new Dwarf();
		const transaction = new TransactionFake();
		dwarf.addToSheet(transaction);
		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceAbility({
			payload: {
				ability: new SlowAndAlways(),
				source: RaceName.dwarf,
			},
			transaction,
		}));
	});

	it('should dispatch Hard as Rock appliance', () => {
		const dwarf = new Dwarf();
		const transaction = new TransactionFake();
		dwarf.addToSheet(transaction);
		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceAbility({
			payload: {
				ability: new HardAsRock(),
				source: RaceName.dwarf,
			},
			transaction,
		}));
	});
});
