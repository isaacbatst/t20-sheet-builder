import type {Attributes} from './Attributes';
import {Character} from './Character';

describe('Character', () => {
	it('should have attributes', () => {
		const character = new Character({
			initialAttributes: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
			race: 'dwarf',
		});

		expect(character).toHaveProperty('attributes');
	});

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
			race: 'dwarf',
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
});
