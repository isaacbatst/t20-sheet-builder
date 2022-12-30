import type {Attributes} from '../Sheet/Attributes';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {GeneralPowerName} from '../Power/GeneralPowerName';
import {Defense} from './Defense';
import {DefenseTotalCalculatorFactory} from './DefenseTotalCalculatorFactory';

describe('Defense', () => {
	it('should calc defense total', () => {
		const defense = new Defense();

		const attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
		const calculator = DefenseTotalCalculatorFactory.make(attributes, 0, 0);

		expect(defense.getTotal(calculator)).toBe(10);
	});

	it('should calc defense total with modifiers', () => {
		const defense = new Defense();
		defense.fixedModifiers.add(new FixedModifier(GeneralPowerName.dodge, 2));

		const attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 2, intelligence: 0, strength: 0, wisdom: 0};
		const calculator = DefenseTotalCalculatorFactory.make(attributes, 0, 0);

		expect(defense.getTotal(calculator)).toBe(14);
	});
});
