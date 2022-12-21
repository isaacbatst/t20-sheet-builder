import {ChooseRace} from './Action/ChooseRace';
import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet';
import {OutGameContext} from './BuildingSheetContext';
import {Modifier} from './Modifier/Modifier';
import type {ConditionVerify} from './ModifierList';
import {GeneralPowerName} from './Power/GeneralPowerName';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

const initialAttributes = {
	strength: 0,
	dexterity: 0,
	constitution: 0,
	intelligence: 0,
	wisdom: 0,
	charisma: 0,
};

describe('BuildingSheet', () => {
	it('should save initial attributes definition step', () => {
		const sheet = new BuildingSheet();

		expect(sheet.buildSteps[0].description).toBe('Definição inicial de atributos: +0 Força, +0 Destreza, +0 Constituição, +0 Inteligência, +0 Sabedoria e +0 Carisma.');
	});

	it('should set initial skills', () => {
		const sheet = new BuildingSheet({dexterity: 2});
		const skills = sheet.getSkills();
		expect(skills).toEqual(InitialSkillsGenerator.generate());
	});

	describe('Human', () => {
		let humanSheet: BuildingSheet;

		beforeEach(() => {
			humanSheet = new BuildingSheet({dexterity: 1});

			const human = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: GeneralPowerName.dodge, type: 'power'},
				],
			);
			humanSheet.dispatch(new ChooseRace({
				race: human,
			}));
		});

		it('should apply human versatile ability with one power and one skill', () => {
			const context = new OutGameContext();
			expect(humanSheet.getSkills().acrobatics.getIsTrained()).toBeTruthy();
			expect(humanSheet.getDefense().getTotal(humanSheet.getAttributes().dexterity, 0, 0, context)).toBe(13);
			expect(humanSheet.getSkills().reflexes.getTotal(humanSheet.getAttributes(), 1, context)).toBe(3);
		});

		it('should apply human versatile ability with two skills', () => {
			humanSheet = new BuildingSheet();

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

			expect(humanSheet.getSkills().acrobatics.getIsTrained()).toBeTruthy();
			expect(humanSheet.getSkills().fight.getIsTrained()).toBeTruthy();
		});

		it('should save dodge applience step', () => {
			expect(humanSheet.buildSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Defesa aplicado ao modificador "outros".'}));
			expect(humanSheet.buildSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Reflexos aplicado ao modificador "outros".'}));
		});

		it('should have 9m displacement', () => {
			expect(humanSheet.getDisplacement()).toBe(9);
		});
	});

	describe('Dwarf', () => {
		let dwarfSheet: BuildingSheet;

		beforeEach(() => {
			dwarfSheet = new BuildingSheet();

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
			expect(dwarfSheet.buildSteps).toContainEqual(expect.objectContaining({description: 'Modificadores de raça aplicados: -1 Destreza, +2 Constituição e +1 Sabedoria.'}));
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
