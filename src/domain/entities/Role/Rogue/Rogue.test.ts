import {BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {Rogue} from './Rogue';
import {type Specialist} from './Specialist/Specialist';

describe('Rogue', () => {
	let rogue: Rogue;
	let sheet: BuildingSheet;
	let transaction: Transaction;
	const chosenSkills: SkillName[][] = [
		[
			SkillName.acrobatics,
			SkillName.athletics,
			SkillName.acting,
			SkillName.animalRide,
			SkillName.knowledge,
			SkillName.diplomacy,
			SkillName.cheat,
			SkillName.stealth,
		],
	];

	describe('Basic', () => {
		beforeEach(() => {
			rogue = new Rogue(chosenSkills, new Set([SkillName.reflexes]));
			sheet = new BuildingSheet();
			transaction = new Transaction(sheet);
			rogue.addToSheet(transaction);
		});

		it('should have sneak attack ability', () => {
			const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
			expect(roleAbilities.get(RoleAbilityName.sneakAttack)).toBeDefined();
		});

		it('should have specialist ability', () => {
			const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
			expect(roleAbilities.get(RoleAbilityName.specialist)).toBeDefined();
		});

		it('should have specialist skill', () => {
			const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
			const specialist = roleAbilities.get(RoleAbilityName.specialist) as Specialist;
			const specialistSkills = specialist.getSkills();
			expect(specialistSkills).toHaveLength(1);
		});
	});

	describe('Specialist', () => {
		it('should throw if doesn\'t receive specialist skill with 0 intelligence', () => {
			const rogue = new Rogue(chosenSkills, new Set());
			const builder = new SheetBuilder();

			expect(() => {
				builder.chooseRole(rogue);
			}).toThrow('INVALID_SPECIALIST_SKILLS_SIZE');
		});

		it('should throw if receive different specialist skills size for intelligence bigger than 0', () => {
			const rogue = new Rogue(chosenSkills, new Set([SkillName.reflexes, SkillName.stealth, SkillName.athletics]));
			const builder = new SheetBuilder();
			builder.getBuildingSheet().getSheetAttributes().increaseAttribute('intelligence', 2);

			expect(() => {
				builder.chooseRole(rogue);
			}).toThrow('INVALID_SPECIALIST_SKILLS_SIZE');
		});

		it('should throw if specialist skills are not trained', () => {
			const rogue = new Rogue(chosenSkills, new Set([SkillName.reflexes, SkillName.aim]));
			const builder = new SheetBuilder();
			builder.getBuildingSheet().getSheetAttributes().increaseAttribute('intelligence', 2);

			expect(() => {
				builder.chooseRole(rogue);
			}).toThrow('INVALID_SPECIALIST_SKILLS_NOT_TRAINED');
		});
	});
});
