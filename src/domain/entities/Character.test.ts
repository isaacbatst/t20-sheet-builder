import type {Attributes} from './Attributes';
import {Character} from './Character';
import {Dwarf} from './races/Dwarf';

describe('Character', () => {
	it('should apply Dwarf attributes modifiers', () => {
		const character = new Character({
			initialAttributes: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
			race: new Dwarf(),
		});

		expect(character.attributes).toEqual<Attributes>({
			strength: 0,
			dexterity: -1,
			constitution: 2,
			intelligence: 0,
			wisdom: 1,
			charisma: 0,
		});
	});

	it('should snapshot initial attributes', () => {
		const character = new Character({
			initialAttributes: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
			race: new Dwarf(),
		});

		expect(character.snapshots[0].attributes).toEqual({
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
		});
	});

	it('should snapshot after applying race modifiers', () => {
		const character = new Character({
			initialAttributes: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
			race: new Dwarf(),
		});

		expect(character.snapshots[1].attributes).toEqual({
			strength: 0,
			dexterity: -1,
			constitution: 2,
			intelligence: 0,
			wisdom: 1,
			charisma: 0,
		});
	});
});
