import {type BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {Noble} from './Noble';

describe('Noble', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		const noble = new Noble([
			[SkillName.diplomacy],
			[SkillName.acting, SkillName.animalRide, SkillName.aim, SkillName.animalHandling],
		]);
		const builder = new SheetBuilder();
		builder.chooseRole(noble);
		sheet = builder.getBuildingSheet();
	});

	it('should have will trained', () => {
		expect(sheet.getSkill(SkillName.will).isTrained()).toBe(true);
	});

	it('should have self confidence', () => {
		const ability = sheet
			.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.selfConfidence);
		expect(ability).toBeDefined();
	});

	it('should have asset', () => {
		const ability = sheet
			.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.asset);
		expect(ability).toBeDefined();
	});
});
