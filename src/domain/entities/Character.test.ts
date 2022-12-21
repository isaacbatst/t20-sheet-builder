import {ChooseRace} from './Action/ChooseRace';
import {BuildingSheetContext} from './BuildingSheetContext';
import {Character} from './Character';
import {Sheet} from './Sheet';
import {InGameContext} from './InGameContext';
import {Dwarf} from './Race/Dwarf';
import {SkillName} from './Skill/SkillName';

describe('Character', () => {
	it('should calculate defense', () => {
		const sheet = new Sheet({
			attributes: {charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 0, wisdom: 0},
		});
		sheet.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));
		const context = new BuildingSheetContext();
		const character = new Character(sheet, context);
		const defense = character.getDefenseTotal();

		expect(defense).toBe(11);
	});

	it('should not calculate dwarf rock knowledge perception in build context', () => {
		const sheet = new Sheet({
			attributes: {charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 1, wisdom: 1},
		});
		sheet.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));
		const context = new BuildingSheetContext();
		const character = new Character(sheet, context);
		const perception = character.getSkillTotal(SkillName.perception);

		expect(perception).toBe(2);
	});

	it('should calculate dwarf rock knowledge perception underground', () => {
		const sheet = new Sheet({
			attributes: {charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 1, wisdom: 1},
		});
		sheet.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));
		const context = new InGameContext({isUnderground: true});
		const character = new Character(sheet, context);
		const perception = character.getSkillTotal(SkillName.perception);

		expect(perception).toBe(4);
	});

	it('should calculate dwarf rock knowledge perception outside underground', () => {
		const sheet = new Sheet({
			attributes: {charisma: 0, constitution: 2, dexterity: 2, intelligence: 3, strength: 1, wisdom: 1},
		});
		sheet.dispatch(new ChooseRace({
			race: new Dwarf(),
		}));
		const context = new InGameContext({isUnderground: false});
		const character = new Character(sheet, context);
		const perception = character.getSkillTotal(SkillName.perception);

		expect(perception).toBe(2);
	});
});
