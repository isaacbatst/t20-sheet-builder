import type {Attributes} from './Attributes';
import {Character} from './Character';
import {InGameContext} from './InGameContext';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import {Skill} from './Skill/Skill';
import {SkillNameEnum} from './Skill/SkillName';
import {Vision} from './Vision';

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

		expect(skills.acrobatics).toEqual(new Skill({
			attribute: 'dexterity',
			characterAttributes: character.getAttributes(),
			name: SkillNameEnum.acrobatics,
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
				{name: SkillNameEnum.acrobatics, type: 'skill'},
				{name: SkillNameEnum.fight, type: 'skill'},
			],
		);
		character.chooseRace(human);

		expect(character.getTrainedSkills()).toContain(SkillNameEnum.acrobatics);
		expect(character.getTrainedSkills()).toContain(SkillNameEnum.fight);
	});

	it('should apply human versatile ability with one power', () => {
		const character = new Character({
			initialAttributes,
		});

		const human = new Human(
			['strength', 'charisma', 'constitution'],
			[
				{name: SkillNameEnum.acrobatics, type: 'skill'},
				{name: GeneralPowerNameEnum.dodge, type: 'power'},
			],
		);
		character.chooseRace(human);

		expect(character.getTrainedSkills()).toContain(SkillNameEnum.acrobatics);
		expect(character.getDefenseTotal()).toBe(12);
		expect(character.getSkills().reflexes.getTotal()).toBe(2);
	});

	it('should save dodge applience step', () => {
		const character = new Character({
			initialAttributes,
		});

		const human = new Human(
			['strength', 'charisma', 'constitution'],
			[
				{name: SkillNameEnum.acrobatics, type: 'skill'},
				{name: GeneralPowerNameEnum.dodge, type: 'power'},
			],
		);

		character.chooseRace(human);
		expect(character.progressionSteps[2].description).toBe('Esquiva: você recebe +2 na defesa (12) e reflexos (2).');
	});

	it('should apply night vision', () => {
		const character = new Character({
			initialAttributes,
		});

		const dwarf = new Dwarf();
		character.chooseRace(dwarf);

		expect(character.getVision()).toBe(Vision.dark);
	});

	it('should not activate +2 at perception and survival in build context', () => {
		const character = new Character({
			initialAttributes,
		});

		const dwarf = new Dwarf();
		character.chooseRace(dwarf);

		const perception = character.getSkillTotal(SkillNameEnum.perception);
		const survival = character.getSkillTotal(SkillNameEnum.survival);

		expect(perception).toBe(0);
		expect(survival).toBe(0);
	});

	it('should not activate +2 at perception and survival in game context outside underground', () => {
		const character = new Character({
			initialAttributes,
			context: new InGameContext({isUnderground: false}),
		});

		const dwarf = new Dwarf();
		character.chooseRace(dwarf);

		const perception = character.getSkillTotal(SkillNameEnum.perception);
		const survival = character.getSkillTotal(SkillNameEnum.survival);

		expect(perception).toBe(0);
		expect(survival).toBe(0);
	});

	it('should activate +2 at perception and survival in game context in the underground', () => {
		const character = new Character({
			initialAttributes,
			context: new InGameContext({isUnderground: true}),
		});

		const dwarf = new Dwarf();
		character.chooseRace(dwarf);

		const perception = character.getSkillTotal(SkillNameEnum.perception);
		const survival = character.getSkillTotal(SkillNameEnum.survival);

		expect(perception).toBe(2);
		expect(survival).toBe(2);
	});
});
