import {DiceRoll} from './DiceRoll';

describe('DiceRoll', () => {
	it('should roll 1d6', () => {
		const diceRoll = new DiceRoll(1, 6);
		const result = diceRoll.roll({get: () => 1});
		expect(result.total).toBe(1);
		expect(result.rolls).toEqual([1]);
		expect(result.discartedRolls).toEqual([]);
	});

	it('should roll 2d6', () => {
		const diceRoll = new DiceRoll(2, 6);
		const result = diceRoll.roll({get: () => 1});
		expect(result.total).toBe(2);
		expect(result.rolls).toEqual([1, 1]);
		expect(result.discartedRolls).toEqual([]);
	});

	it('should roll 4d6 and discard lowest', () => {
		const diceRoll = new DiceRoll(4, 6, 1);
		const result = diceRoll.roll({get: () => 1});
		expect(result.total).toBe(3);
		expect(result.rolls).toEqual([1, 1, 1]);
		expect(result.discartedRolls).toEqual([1]);
	});
});
