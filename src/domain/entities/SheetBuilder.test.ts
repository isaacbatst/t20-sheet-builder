import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet';
import {OutGameContext} from './BuildingSheetContext';
import {Modifier} from './Modifier/Modifier';
import type {ConditionVerify} from './ModifierList';
import {GeneralPowerName} from './Power/GeneralPowerName';
import {Proficiency} from './Proficiency';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import type {Race} from './Race/Race';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import {Arcanist} from './Role/Arcanist/Arcanist';
import type {Role} from './Role/Role';
import {Warrior} from './Role/Warrior/Warrior';
import {SheetBuilder} from './SheetBuilder';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import {SkillName} from './Skill/SkillName';
import {Vision} from './Vision';

const initialAttributes = {strength: 2, dexterity: 3, constitution: 0, intelligence: 2, wisdom: 2, charisma: 1};

describe('SheetBuilder', () => {
	it('should save initial attributes definition step', () => {
		const sheet = new BuildingSheet();
		const sheetBuilder = new SheetBuilder(sheet);

		sheetBuilder.setInitialAttributes(initialAttributes);

		expect(sheet.getAttributes()).toEqual(initialAttributes);
		expect(sheet.buildSteps[0].description).toBe('Definição inicial de atributos: +2 Força, +3 Destreza, +0 Constituição, +2 Inteligência, +2 Sabedoria e +1 Carisma.');
	});

	it('should set initial skills', () => {
		const sheet = new BuildingSheet();
		const skills = sheet.getSkills();
		expect(skills).toEqual(InitialSkillsGenerator.generate());
	});

	describe('Human', () => {
		let sheet: BuildingSheet;
		let sheetBuilder: SheetBuilder;
		let race: Race;

		beforeEach(() => {
			sheet = new BuildingSheet();
			sheetBuilder = new SheetBuilder(sheet);

			race = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: GeneralPowerName.dodge, type: 'power'},
				],
			);

			sheetBuilder
				.setInitialAttributes(initialAttributes)
				.choseRace(race);
		});

		it('should apply human attribute modifiers', () => {
			expect(sheet.getAttributes().strength).toBe(3);
			expect(sheet.getAttributes().constitution).toBe(1);
			expect(sheet.getAttributes().charisma).toBe(2);
		});

		it('should apply human versatile ability with one power and one skill', () => {
			const context = new OutGameContext();
			expect(sheet.getSkills().acrobatics.getIsTrained()).toBeTruthy();
			expect(sheet.getSkills().acrobatics.getTotal(sheet.getAttributes(), 1, context)).toBe(5);
			expect(sheet.getSkills().reflexes.getTotal(sheet.getAttributes(), 1, context)).toBe(5);
			expect(sheet.getDefense().getTotal(sheet.getAttributes().dexterity, 0, 0, context)).toBe(15);
		});

		it('should save dodge applience step', () => {
			expect(sheet.buildSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Defesa aplicado ao modificador "outros".'}));
			expect(sheet.buildSteps).toContainEqual(expect.objectContaining({description: 'Esquiva: +2 Reflexos aplicado ao modificador "outros".'}));
		});

		it('should have 9m displacement', () => {
			expect(sheet.getDisplacement()).toBe(9);
		});

		it('should apply human versatile ability with two skills', () => {
			race = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: SkillName.fight, type: 'skill'},
				],
			);

			sheet = new BuildingSheet();

			sheetBuilder
				.reset(sheet)
				.setInitialAttributes(initialAttributes)
				.choseRace(race);

			expect(sheet.getSkills().acrobatics.getIsTrained()).toBeTruthy();
			expect(sheet.getSkills().fight.getIsTrained()).toBeTruthy();
		});
	});

	describe('Human Warrior', () => {
		let sheet: BuildingSheet;
		let sheetBuilder: SheetBuilder;
		let race: Race;
		let role: Role;

		beforeEach(() => {
			sheet = new BuildingSheet();
			sheetBuilder = new SheetBuilder(sheet);

			race = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: GeneralPowerName.dodge, type: 'power'},
				],
			);
			role = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.athletics]);

			sheetBuilder
				.setInitialAttributes(initialAttributes)
				.choseRace(race)
				.chooseRole(role);
		});

		it('should choose role', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have max life points 21', () => {
			const context = new OutGameContext();

			const maxLifePoints = sheet.getLifePoints().getMax({constitution: sheet.getAttributes().constitution, context, level: sheet.getLevel(), role});
			expect(maxLifePoints).toBe(21);
		});

		it('should have max mana points 3', () => {
			const context = new OutGameContext();

			const maxLifePoints = sheet.getManaPoints().getMax({context, level: sheet.getLevel(), role});
			expect(maxLifePoints).toBe(3);
		});
	});

	describe('Human Arcanist', () => {
		let sheet: BuildingSheet;
		let sheetBuilder: SheetBuilder;
		let race: Race;
		let role: Role;

		beforeEach(() => {
			sheet = new BuildingSheet();
			sheetBuilder = new SheetBuilder(sheet);

			race = new Human(
				['strength', 'charisma', 'constitution'],
				[
					{name: SkillName.acrobatics, type: 'skill'},
					{name: GeneralPowerName.dodge, type: 'power'},
				],
			);
			role = new Arcanist([SkillName.knowledge, SkillName.diplomacy]);

			sheetBuilder
				.setInitialAttributes(initialAttributes)
				.choseRace(race)
				.chooseRole(role);
		});

		it('should choose role', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have max life points 9', () => {
			const context = new OutGameContext();

			const maxLifePoints = sheet.getLifePoints().getMax({constitution: sheet.getAttributes().constitution, context, level: sheet.getLevel(), role});
			expect(maxLifePoints).toBe(9);
		});

		it('should have max mana points 6', () => {
			const context = new OutGameContext();
			const maxLifePoints = sheet
				.getManaPoints()
				.getMax({
					context,
					role,
					level: sheet.getLevel(),
				});
			expect(maxLifePoints).toBe(6);
		});

		it('should have basic proficiencies', () => {
			expect(sheet.getProficiencies()).toContain(Proficiency.simple);
			expect(sheet.getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});

	describe('Dwarf', () => {
		let sheet: BuildingSheet;
		let sheetBuilder: SheetBuilder;
		let race: Race;

		beforeEach(() => {
			sheet = new BuildingSheet();
			sheetBuilder = new SheetBuilder(sheet);

			race = new Dwarf();

			sheetBuilder
				.setInitialAttributes(initialAttributes)
				.choseRace(race);
		});

		it('should apply Dwarf attributes modifiers', () => {
			expect(sheet.getAttributes()).toEqual<Attributes>({
				...initialAttributes,
				dexterity: 2,
				constitution: 2,
				wisdom: 3,
			});
		});

		it('should save race modifiers appliance step after choose race', () => {
			expect(sheet.buildSteps).toContainEqual(expect.objectContaining({description: 'Modificadores de raça aplicados: -1 Destreza, +2 Constituição e +1 Sabedoria.'}));
		});

		it('should apply night vision', () => {
			expect(sheet.getVision()).toBe(Vision.dark);
		});

		it('should have perception and survival rock knowledge modifiers', () => {
			const skills = sheet.getSkills();
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
			expect(sheet.getDisplacement()).toBe(6);
		});

		it('should have hard as rock +3 life points modifier', () => {
			expect(sheet.lifePoints.modifiers.modifiers).toContainEqual(new Modifier(RaceAbilityName.hardAsRock, 3));
		});
	});

	describe('Dwarf Warrior', () => {
		let sheet: BuildingSheet;
		let sheetBuilder: SheetBuilder;
		let race: Race;
		let role: Role;

		beforeEach(() => {
			sheet = new BuildingSheet();
			sheetBuilder = new SheetBuilder(sheet);
			role = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.athletics]);
			race = new Dwarf();
			sheetBuilder
				.setInitialAttributes(initialAttributes)
				.choseRace(race)
				.chooseRole(role);
		});

		it('should choose role', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have max life points 25', () => {
			const context = new OutGameContext();
			const maxLifePoints = sheet
				.getLifePoints()
				.getMax({
					constitution: sheet.getAttributes().constitution,
					context,
					level: sheet.getLevel(),
					role,
				});
			expect(maxLifePoints).toBe(25);
		});

		it('should have max mana points 3', () => {
			const context = new OutGameContext();
			const maxLifePoints = sheet
				.getManaPoints()
				.getMax({
					context,
					role,
					level: sheet.getLevel(),
				});
			expect(maxLifePoints).toBe(3);
		});

		it('should have role skills trained', () => {
			const context = new OutGameContext();
			const skills = sheet
				.getSkills();

			expect(skills.fortitude.getIsTrained()).toBe(true);
			expect(skills.fight.getIsTrained()).toBe(true);
			expect(skills.animalHandling.getIsTrained()).toBe(true);
			expect(skills.athletics.getIsTrained()).toBe(true);
		});

		it('should have warriors proficiencies', () => {
			expect(sheet.getProficiencies()).toContain(Proficiency.simple);
			expect(sheet.getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});
});
