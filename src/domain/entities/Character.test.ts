import type {Attributes} from './Attributes';
import {Character} from './Character';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import {Skill} from './Skill/Skill';

const initialAttributes = {
	strength: 0,
	dexterity: 0,
	constitution: 0,
	intelligence: 0,
	wisdom: 0,
	charisma: 0,
};

describe('Character', () => {
	it('should save initial attributes definition step', () => {
		const character = new Character({
			initialAttributes,
		});

		expect(character.progressionSteps[0].description).toBe('Definição inicial de atributos: Força 0, Destreza 0, Constituição 0, Inteligência 0, Sabedoria 0 e Carisma 0.');
	});

	it('should set initial skills', () => {
		const character = new Character({
			initialAttributes: {
				...initialAttributes,
				dexterity: 2,
			},
		});

		const skills = character.getSkills();

		expect(skills.acrobacia).toEqual(new Skill({
			attribute: 'dexterity',
			character,
			name: 'acrobacia',
		}));
	});

	it('should apply Dwarf attributes modifiers', () => {
		const character = new Character({
			initialAttributes,
		});

		character.chooseRace(new Dwarf());

		expect(character.getAttributes()).toEqual<Attributes>({
			...initialAttributes,
			dexterity: -1,
			constitution: 2,
			wisdom: 1,
		});
	});

	it('should save race modifiers appliance step after choose race', () => {
		const character = new Character({
			initialAttributes,
		});

		character.chooseRace(new Dwarf());

		expect(character.progressionSteps[1].description).toBe('Aplicação dos modificadores de atributo da raça: -1 Destreza, +2 Constituição e +1 Sabedoria.');
	});

	it('should apply human versatile ability', () => {
		const character = new Character({
			initialAttributes,
		});

		const human = new Human(
			['strength', 'charisma', 'constitution'],
			[
				{name: 'acrobacia', type: 'skill'},
				{name: 'adestramento', type: 'skill'},
			],
		);
		character.chooseRace(human);

		expect(character.getTrainedSkills()).toContain('acrobacia');
		expect(character.getTrainedSkills()).toContain('adestramento');
	});
});
