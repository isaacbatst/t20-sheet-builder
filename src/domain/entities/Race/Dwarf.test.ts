import type {Attributes} from '../Attributes';
import {Dwarf} from './Dwarf';

describe('Dwarf', () => {
	it('should apply +2 to constitution, +1 to wistom and -1 to dexterity', () => {
		const dwarf = new Dwarf();

		const attributes = dwarf.applyAttributesModifiers({
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			strength: 0,
			wisdom: 0,
		});

		expect(attributes).toEqual<Attributes>({
			strength: 0,
			dexterity: -1,
			constitution: 2,
			intelligence: 0,
			wisdom: 1,
			charisma: 0,
		});
	});
});
