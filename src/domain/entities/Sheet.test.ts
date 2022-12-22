import {OutGameContext} from './BuildingSheetContext';
import type {ContextInterface} from './Context';
import {GeneralPowerName} from './Power/GeneralPowerName';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import type {VersatileChoice} from './RaceAbility/Human/Versatile';
import {Arcanist} from './Role/Arcanist';
import type {Role} from './Role/Role';
import {Warrior} from './Role/Warrior';
import type {Sheet} from './Sheet';
import {SheetBuilder} from './SheetBuilder';
import {SkillName} from './Skill/SkillName';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		let humanWarrior: Sheet;
		let role: Role;
		let context: ContextInterface;

		beforeEach(() => {
			const choices: VersatileChoice[] = [{name: SkillName.acrobatics, type: 'skill'}, {name: GeneralPowerName.dodge, type: 'power'}];
			const race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			context = new OutGameContext();
			role = new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]);

			humanWarrior = SheetBuilder
				.setInitialAttributes()
				.choseRace(race)
				.chooseRole(role);
		});

		it('should choose class', () => {
			expect(humanWarrior.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			expect(humanWarrior.getMaxLifePoints(context)).toBe(21);
		});

		it('should have role skills trained', () => {
			const trainedSkills = humanWarrior.getTrainedSkills();
			expect(trainedSkills).toContain(SkillName.fight);
			expect(trainedSkills).toContain(SkillName.aim);
			expect(trainedSkills).toContain(SkillName.fortitude);
			expect(trainedSkills).toContain(SkillName.athletics);
		});
	});

	describe('Dwarf Arcanist', () => {
		let dwarfArcanist: Sheet;
		let role: Role;
		let context: ContextInterface;

		beforeEach(() => {
			context = new OutGameContext();
			role = new Arcanist([SkillName.knowledge, SkillName.diplomacy]);

			dwarfArcanist = SheetBuilder
				.setInitialAttributes()
				.choseRace(new Dwarf())
				.chooseRole(role);
		});

		it('should choose class', () => {
			expect(dwarfArcanist.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			expect(dwarfArcanist.getMaxLifePoints(context)).toBe(13);
		});

		it('should have role skills trained', () => {
			const trainedSkills = dwarfArcanist.getTrainedSkills();
			expect(trainedSkills).toContain(SkillName.mysticism);
			expect(trainedSkills).toContain(SkillName.will);
			expect(trainedSkills).toContain(SkillName.knowledge);
			expect(trainedSkills).toContain(SkillName.diplomacy);
		});
	});
});
