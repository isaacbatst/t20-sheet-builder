import {AddFixedModifierToLifePoints} from '../../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import {AddPerLevelModifierToManaPoints} from '../../Action/AddPerLevelModifierToManaPoints';
import {AddProficiency} from '../../Action/AddProficiency';
import {ApplyRoleAbility} from '../../Action/ApplyRoleAbility';
import {TrainSkill} from '../../Action/TrainSkill';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {BuildingSheet} from '../../Sheet';
import {Proficiency} from '../../Sheet/Proficiency';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {SpecialAttack} from './SpecialAttack/SpecialAttack';
import {Warrior} from './Warrior';

describe('Warrior', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch proper train skills', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		warrior.addToSheet(transaction);

		const skills = transaction.sheet.getSkills();

		expect(skills[SkillName.fight].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.animalHandling].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.aim].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.fortitude].skill.getIsTrained()).toBe(true);
	});

	it('should not train skills choosing more than allowed from the same group', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim, SkillName.athletics]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not train skills with less than required', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.animalHandling]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train skills with repeated skills', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.fight]);
		}).toThrow('REPEATED_ROLE_SKILLS');
	});

	it('should dispatch profiencies add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		warrior.addToSheet(transaction);

		const proficiencies = transaction.sheet.getSheetProficiencies().getProficiencies();
		expect(proficiencies).toContain(Proficiency.martial);
		expect(proficiencies).toContain(Proficiency.heavyArmor);
		expect(proficiencies).toContain(Proficiency.shield);
	});

	it('should dispatch abilities add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		warrior.addToSheet(transaction);

		expect(sheet.getSheetAbilities().getRoleAbilities().get(RoleAbilityName.specialAttack)).toBeDefined();
	});

	it('should dispatch life points modifiers add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		warrior.addToSheet(transaction);

		const lifePoints = sheet.getSheetLifePoints();
		const fixedModifier = lifePoints.getFixedModifiers().get(RoleName.warrior);
		const perLevelModifier = lifePoints.getPerLevelModifiers().get(RoleName.warrior);

		expect(fixedModifier).toBeDefined();
		expect(fixedModifier?.baseValue).toBe(20);
		expect(perLevelModifier).toBeDefined();
		expect(perLevelModifier?.baseValue).toBe(5);
		expect(perLevelModifier?.includeFirstLevel).toBe(false);
	});

	it('should dispatch mana points modifiers add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		warrior.addToSheet(transaction);

		const manaPoints = sheet.getSheetManaPoints();
		const perLevelModifier = manaPoints.getPerLevelModifiers().get(RoleName.warrior);
		expect(perLevelModifier).toBeDefined();
		expect(perLevelModifier?.baseValue).toBe(3);
		expect(perLevelModifier?.includeFirstLevel).toBe(true);
	});
});
