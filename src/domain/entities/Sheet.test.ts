import {ChooseRace} from './Action/ChooseRace';
import type {Attributes} from './Attributes';
import {BuildingSheetContext} from './BuildingSheetContext';
import {Sheet} from './Sheet';
import type {ConditionVerify, ModifierInterface} from './ModifierList';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';
import {Modifier} from './Modifier/Modifier';

const initialAttributes = {
	strength: 0,
	dexterity: 0,
	constitution: 0,
	intelligence: 0,
	wisdom: 0,
	charisma: 0,
};

describe('Sheet', () => {
	it('should save initial attributes definition step', () => {
		const sheet = new Sheet();

		expect(sheet.progressionSteps[0].description).toBe('Definição inicial de atributos: +0 Força, +0 Destreza, +0 Constituição, +0 Inteligência, +0 Sabedoria e +0 Carisma.');
	});

	it('should set initial skills', () => {
		const sheet = new Sheet({attributes: {dexterity: 2}});
		const skills = sheet.getSkills();
		expect(skills).toEqual(InitialSkillsGenerator.generate());
	});

	describe('Human', () => {
		let humanSheet: Sheet;

		beforeEach(() => {
			humanSheet = new Sheet({attributes: {dexterity: 1}});

			const human = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: GeneralPowerNameEnum.dodge, type: 'power'},
				],
			);
			humanSheet.dispatch(new ChooseRace({
				race: human,
			}));
		});

		it('should apply human versatile ability with one power and one skill', () => {
			const context = new BuildingSheetContext();
			expect(humanSheet.getTrainedSkills()).toContain(SkillName.acrobatics);
			expect(humanSheet.getDefenseTotal(context)).toBe(13);
			expect(humanSheet.getSkillTotal(SkillName.reflexes, context)).toBe(3);
		});

		it('should apply human versatile ability with two skills', () => {
			humanSheet = new Sheet();

			const human = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: SkillName.fight, type: 'skill'},
				],
			);
			humanSheet.dispatch(new ChooseRace({
				race: human,
			}));

			expect(humanSheet.getTrainedSkills()).toContain(SkillName.acrobatics);
			expect(humanSheet.getTrainedSkills()).toContain(SkillName.fight);
		});

		it('should save dodge applience step', () => {
			expect(humanSheet.progressionSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Defesa aplicado ao modificador "outros".'}));
			expect(humanSheet.progressionSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Reflexos aplicado ao modificador "outros".'}));
		});

		it('should have 9m displacement', () => {
			expect(humanSheet.getDisplacement()).toBe(9);
		});
	});

	describe('Dwarf', () => {
		let dwarfSheet: Sheet;

		beforeEach(() => {
			dwarfSheet = new Sheet();

			dwarfSheet.dispatch(new ChooseRace({
				race: new Dwarf(),
			}));
		});

		it('should apply Dwarf attributes modifiers', () => {
			expect(dwarfSheet.getAttributes()).toEqual<Attributes>({
				...initialAttributes,
				dexterity: -1,
				constitution: 2,
				wisdom: 1,
			});
		});

		it('should save race modifiers appliance step after choose race', () => {
			expect(dwarfSheet.progressionSteps).toContainEqual(expect.objectContaining({description: 'Modificadores de raça aplicados: -1 Destreza, +2 Constituição e +1 Sabedoria.'}));
		});

		it('should apply night vision', () => {
			expect(dwarfSheet.getVision()).toBe(Vision.dark);
		});

		it('should have perception and survival rock knowledge modifiers', () => {
			const skills = dwarfSheet.getSkills();
			const modifier = {
				source: RaceAbilityName.rockKnowledge,
				value: 2,
				condition: {
					description: 'testes devem ser realizados no subterrâneo',
					verify: expect.any(Function) as ConditionVerify,
				},
			};

			expect(skills.perception.getOthersModifiers()).toContainEqual(modifier);
			expect(skills.survival.getOthersModifiers()).toContainEqual(modifier);
		});

		it('should have 6m displacement', () => {
			expect(dwarfSheet.getDisplacement()).toBe(6);
		});

		it('should have hard as rock +3 life points modifier', () => {
			expect(dwarfSheet.lifePoints.modifiers.modifiers).toContainEqual(new Modifier(RaceAbilityName.hardAsRock, 3));
		});
	});
});
