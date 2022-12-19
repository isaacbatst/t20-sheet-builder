import type {Attributes} from './Attributes';
import {Character} from './Character';
import {Dwarf} from './races/Dwarf';
import {Human} from './races/Human';

describe('Character', () => {
	it('should save initial attributes definition step', () => {
		const character = new Character({
			initialAttributes: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
		});

		expect(character.progressionSteps[0].description).toBe('Definição inicial de atributos: Força 0, Destreza 0, Constituição 0, Inteligência 0, Sabedoria 0 e Carisma 0.');
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
		});

		character.chooseRace(new Dwarf());

		expect(character.getAttributes()).toEqual<Attributes>({
			strength: 0,
			dexterity: -1,
			constitution: 2,
			intelligence: 0,
			wisdom: 1,
			charisma: 0,
		});
	});

	it('should save race modifiers appliance step after choose race', () => {
		const character = new Character({
			initialAttributes: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0,
			},
		});

		character.chooseRace(new Dwarf());

		expect(character.progressionSteps[1].description).toBe('Aplicação dos modificadores de atributo da raça: -1 Destreza, +2 Constituição e +1 Sabedoria.');
	});
});
