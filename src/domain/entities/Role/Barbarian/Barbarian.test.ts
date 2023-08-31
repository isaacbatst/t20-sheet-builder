import {BuildingSheet, Proficiency} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {Warrior} from '../Warrior';
import {Barbarian} from './Barbarian';

describe('Barbarian', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;
	let barbarian: Barbarian;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
		barbarian = new Barbarian([[
			SkillName.animalHandling,
			SkillName.athletics,
			SkillName.animalRide,
			SkillName.initiative,
		]]);
		barbarian.addToSheet(transaction);
	});

	it('should be have fortitude and fight trained', () => {
		const skills = sheet.getSkills();
		expect(skills[SkillName.fortitude].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.fight].skill.getIsTrained()).toBe(true);
	});

	it('should dispatch profiencies add', () => {
		const proficiencies = transaction.sheet.getSheetProficiencies().getProficiencies();
		expect(proficiencies).toContain(Proficiency.martial);
		expect(proficiencies).toContain(Proficiency.shield);
	});

	it('should dispatch life points fixed modifier add', () => {
		const lifePoints = sheet.getSheetLifePoints();
		const fixedModifier = lifePoints.getFixedModifiers().get(RoleName.barbarian);
		expect(fixedModifier).toBeDefined();
		expect(fixedModifier?.baseValue).toBe(24);
	});

	it('should dispatch life points per level modifier add', () => {
		const lifePoints = sheet.getSheetLifePoints();
		const perLevelModifier = lifePoints.getPerLevelModifiers().get(RoleName.barbarian);
		expect(perLevelModifier).toBeDefined();
		expect(perLevelModifier?.baseValue).toBe(6);
		expect(perLevelModifier?.includeFirstLevel).toBe(false);
	});

	it('should dispatch mana points modifiers add', () => {
		const manaPoints = sheet.getSheetManaPoints();
		const perLevelModifier = manaPoints.getPerLevelModifiers().get(RoleName.barbarian);
		expect(perLevelModifier).toBeDefined();
		expect(perLevelModifier?.baseValue).toBe(3);
		expect(perLevelModifier?.includeFirstLevel).toBe(true);
	});

	it('should dispatch rage ability add', () => {
		const abilities = sheet.getSheetAbilities();
		expect(abilities.getRoleAbilities().get(RoleAbilityName.rage)).toBeDefined();
	});
});
