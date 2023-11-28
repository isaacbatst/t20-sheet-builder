import {type BuildingSheet} from '../../Sheet/BuildingSheet/BuildingSheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {SkillName} from '../../Skill/SkillName';
import {RoleAbilityName} from '../RoleAbilityName';
import {Fighter} from './Fighter';

describe('Fighter', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		const figher = new Fighter([
			[
				SkillName.acrobatics,
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.cheat,
			],
		]);
		const builder = new SheetBuilder();
		builder.chooseRole(figher);
		sheet = builder.getBuildingSheet();
	});

	it('should have Fight ability', () => {
		const abilities = sheet.getSheetAbilities().getRoleAbilities();
		const fight = abilities.get(RoleAbilityName.fight);
		expect(fight).toBeDefined();
	});

	it('should have Lightning Strike ability', () => {
		const abilities = sheet.getSheetAbilities().getRoleAbilities();
		const fight = abilities.get(RoleAbilityName.lightningStrike);
		expect(fight).toBeDefined();
	});
});
