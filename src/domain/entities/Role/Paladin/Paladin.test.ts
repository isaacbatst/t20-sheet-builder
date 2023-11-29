import {Level, type BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {Paladin} from './Paladin';

describe('Paladin', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		const paladin = new Paladin([[SkillName.animalHandling, SkillName.athletics]]);
		const builder = new SheetBuilder();
		builder.chooseRole(paladin);
		sheet = builder.getBuildingSheet();
	});

	it('should have blessed', () => {
		const blessed = sheet.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.blessed);
		expect(blessed).toBeDefined();
	});

	it('should have hero code', () => {
		const heroCode = sheet.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.heroCode);

		expect(heroCode).toBeDefined();
	});

	it('should have divine blow', () => {
		const divineBlow = sheet.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.divineBlow);

		expect(divineBlow).toBeDefined();
	});

	it('should add charisma to mana points', () => {
		sheet.getSheetAttributes().increaseAttribute('charisma', 2);
		const mana = sheet.getSheetManaPoints().getMax(sheet.getSheetAttributes().getValues(), Level.one);
		expect(mana).toBe(5);
	});
});
