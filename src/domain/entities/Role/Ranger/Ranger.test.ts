import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {Ranger} from './Ranger';

describe('Ranger', () => {
	let ranger: Ranger;
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		const chosenSkills: SkillName[][] = [
			[SkillName.fight],
			[
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.cure,
				SkillName.fortitude,
				SkillName.stealth,
			],
		];
		ranger = new Ranger(chosenSkills);
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
		ranger.addToSheet(transaction);
	});

	it('should have prey mark ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.preyMark)).toBeDefined();
	});

	it('should have tracker ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.tracker)).toBeDefined();
	});

	it('should have tracker +2 survival', () => {
		const survival = sheet.getSkill(SkillName.survival);
		expect(survival.getFixedModifier(RoleAbilityName.tracker)).toBeDefined();
	});

	it('should have prey mark activateble effect', () => {
		const preyMark = sheet.getActivateableEffect(RoleAbilityName.preyMark);
		expect(preyMark).toBeDefined();
		expect(preyMark?.executionType).toBe('moviment');
		expect(preyMark?.getManaCost()).toBe(1);
	});
});
