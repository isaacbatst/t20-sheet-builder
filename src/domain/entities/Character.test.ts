import {OutGameContext} from './BuildingSheetContext';
import {Character} from './Character';
import {InGameContext} from './InGameContext';
import {Dwarf} from './Race/Dwarf';
import {Warrior} from './Role/Warrior';
import {SheetBuilder} from './SheetBuilder';
import {SkillName} from './Skill/SkillName';

describe('Character', () => {
	it('should calculate defense', () => {
		const sheet = SheetBuilder
			.setInitialAttributes({charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 0, wisdom: 1})
			.choseRace(new Dwarf())
			.chooseRole(new Warrior([]));
		const context = new OutGameContext();
		const character = new Character(sheet, context);
		const defense = character.getDefenseTotal();

		expect(defense).toBe(11);
	});

	it('should not calculate dwarf rock knowledge perception in build context', () => {
		const sheet = SheetBuilder
			.setInitialAttributes({charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 0, wisdom: 1})
			.choseRace(new Dwarf())
			.chooseRole(new Warrior([]));
		const context = new OutGameContext();
		const character = new Character(sheet, context);
		const perception = character.getSkillTotal(SkillName.perception);

		expect(perception).toBe(2);
	});

	it('should calculate dwarf rock knowledge perception underground', () => {
		const sheet = SheetBuilder
			.setInitialAttributes({charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 0, wisdom: 1})
			.choseRace(new Dwarf())
			.chooseRole(new Warrior([]));
		const context = new InGameContext({isUnderground: true});
		const character = new Character(sheet, context);
		const perception = character.getSkillTotal(SkillName.perception);

		expect(perception).toBe(4);
	});

	it('should calculate dwarf rock knowledge perception outside underground', () => {
		const sheet = SheetBuilder
			.setInitialAttributes({charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 0, wisdom: 1})
			.choseRace(new Dwarf())
			.chooseRole(new Warrior([]));
		const context = new InGameContext({isUnderground: false});
		const character = new Character(sheet, context);
		const perception = character.getSkillTotal(SkillName.perception);

		expect(perception).toBe(2);
	});
});
