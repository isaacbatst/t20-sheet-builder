import {ChooseRace} from './Action/ChooseRace';
import type {Attributes} from './Attributes';
import {BuildingSheetContext} from './BuildingSheetContext';
import {Sheet} from './Sheet';
import type {ConditionVerify, Modifier} from './ModifierOthers';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import {RaceAbilityNameEnum} from './RaceAbility/RaceAbilityName';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
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
		const character = new Sheet({
			initialAttributes,
		});

		expect(character.progressionSteps[0].description).toBe('Definição inicial de atributos: +0 Força, +0 Destreza, +0 Constituição, +0 Inteligência, +0 Sabedoria e +0 Carisma.');
	});

	it('should set initial skills', () => {
		const character = new Sheet({
			initialAttributes: {
				...initialAttributes,
				dexterity: 2,
			},
		});

		const skills = character.getSkills();

		expect(skills).toEqual(InitialSkillsGenerator.generate());
	});

	it('should apply Dwarf attributes modifiers', () => {
		const character = new Sheet({
			initialAttributes,
		});

		character.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));

		expect(character.getAttributes()).toEqual<Attributes>({
			...initialAttributes,
			dexterity: -1,
			constitution: 2,
			wisdom: 1,
		});
	});

	it('should save race modifiers appliance step after choose race', () => {
		const character = new Sheet({
			initialAttributes,
		});

		character.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));

		expect(character.progressionSteps).toContainEqual(expect.objectContaining({description: 'Modificadores de raça aplicados: -1 Destreza, +2 Constituição e +1 Sabedoria.'}));
	});

	it('should apply human versatile ability', () => {
		const character = new Sheet({
			initialAttributes,
		});

		const human = new Human(
			['strength', 'charisma', 'constitution'],
			[
				{name: SkillNameEnum.acrobatics, type: 'skill'},
				{name: SkillNameEnum.fight, type: 'skill'},
			],
		);
		character.dispatch(new ChooseRace({
			race: human,
		}));

		expect(character.getTrainedSkills()).toContain(SkillNameEnum.acrobatics);
		expect(character.getTrainedSkills()).toContain(SkillNameEnum.fight);
	});

	it('should apply human versatile ability with one power', () => {
		const character = new Sheet({
			initialAttributes,
		});

		const human = new Human(
			['strength', 'charisma', 'constitution'],
			[
				{name: SkillNameEnum.acrobatics, type: 'skill'},
				{name: GeneralPowerNameEnum.dodge, type: 'power'},
			],
		);
		character.dispatch(new ChooseRace({
			race: human,
		}));

		const context = new BuildingSheetContext();
		expect(character.getTrainedSkills()).toContain(SkillNameEnum.acrobatics);
		expect(character.getDefenseTotal(context)).toBe(12);
		expect(character.getSkillTotal(SkillNameEnum.reflexes, context)).toBe(2);
	});

	it('should save dodge applience step', () => {
		const character = new Sheet({
			initialAttributes,
		});

		const human = new Human(
			['strength', 'charisma', 'constitution'],
			[
				{name: SkillNameEnum.acrobatics, type: 'skill'},
				{name: GeneralPowerNameEnum.dodge, type: 'power'},
			],
		);

		character.dispatch(new ChooseRace({
			race: human,
		}));

		expect(character.progressionSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Defesa aplicado ao modificador "outros".'}));
		expect(character.progressionSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Reflexos aplicado ao modificador "outros".'}));
	});

	it('should apply night vision', () => {
		const character = new Sheet({
			initialAttributes,
		});

		character.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));
		expect(character.getVision()).toBe(Vision.dark);
	});

	it('should have perception and survival rock knowledge modifiers', () => {
		const character = new Sheet({
			initialAttributes,
		});
		character.dispatch({
			type: 'chooseRace',
			payload: {
				race: new Dwarf(),
			},
		});
		const skills = character.getSkills();
		const modifier: Modifier = {
			source: RaceAbilityNameEnum.rockKnowledge,
			value: 2,
			condition: {
				description: 'testes devem ser realizados no subterrâneo',
				verify: expect.any(Function) as ConditionVerify,
			},
		};

		expect(skills.perception.modifierOthers.modifiers).toContainEqual<Modifier>(modifier);
		expect(skills.survival.modifierOthers.modifiers).toContainEqual<Modifier>(modifier);
	});
});
