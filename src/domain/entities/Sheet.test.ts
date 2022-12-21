import {GeneralPowerName} from './Power/GeneralPowerName';
import {Human} from './Race/Human';
import type {VersatileChoice} from './RaceAbility/Human/Versatile';
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
});
