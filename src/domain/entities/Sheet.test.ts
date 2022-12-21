import {GeneralPowerName} from './Power/GeneralPowerName';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import type {VersatileChoice} from './RaceAbility/Human/Versatile';
import {Arcanist} from './Role/Arcanist';
import {Warrior} from './Role/Warrior';
import {SheetBuilder} from './SheetBuilder';
import {SkillName} from './Skill/SkillName';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		it('should choose class', () => {
			const choices: VersatileChoice[] = [{name: SkillName.acrobatics, type: 'skill'}, {name: GeneralPowerName.dodge, type: 'power'}];
			const race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			const role = new Warrior();

			const sheet = SheetBuilder
				.setInitialAttributes()
				.choseRace(race)
				.chooseRole(role);
			expect(sheet.getRole()).toBe(role);
		});

		// It('should apply initial life points + constitution', () => {

		// });
	});

	describe('Dwarf Arcanist', () => {
		it('should choose class', () => {
			const role = new Arcanist();
			const sheet = SheetBuilder
				.setInitialAttributes()
				.choseRace(new Dwarf())
				.chooseRole(role);

			expect(sheet.getRole()).toBe(role);
		});
	});
});
