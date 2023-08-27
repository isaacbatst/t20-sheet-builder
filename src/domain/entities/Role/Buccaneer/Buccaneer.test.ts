import {TriggerEvent, TriggeredEffectName} from '../../Ability';
import {BuildingSheet, Proficiency} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {Buccaneer} from './Buccaneer';

describe('buccaneer', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;
	let buccaneer: Buccaneer;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
		buccaneer = new Buccaneer([
			SkillName.fight,
			SkillName.aim,
			SkillName.acting,
			SkillName.perception,
			SkillName.gambling,
		]);
		buccaneer.addToSheet(transaction);
	});

	it('should have reflexes trained', () => {
		const skills = sheet.getSkills();
		expect(skills[SkillName.reflexes].skill.getIsTrained()).toBe(true);
	});

	it('should dispatch profiencies add', () => {
		const proficiencies = transaction.sheet.getSheetProficiencies().getProficiencies();
		expect(proficiencies).toContain(Proficiency.martial);
	});

	it('should dispatch life points fixed modifier add', () => {
		const lifePoints = sheet.getSheetLifePoints();
		const fixedModifier = lifePoints.getFixedModifiers().get(RoleName.buccaneer);
		expect(fixedModifier).toBeDefined();
		expect(fixedModifier?.baseValue).toBe(16);
	});

	it('should dispatch life points per level modifier add', () => {
		const lifePoints = sheet.getSheetLifePoints();
		const perLevelModifier = lifePoints.getPerLevelModifiers().get(RoleName.buccaneer);
		expect(perLevelModifier).toBeDefined();
		expect(perLevelModifier?.baseValue).toBe(4);
		expect(perLevelModifier?.includeFirstLevel).toBe(false);
	});

	it('should dispatch mana points modifiers add', () => {
		const manaPoints = sheet.getSheetManaPoints();
		const perLevelModifier = manaPoints.getPerLevelModifiers().get(RoleName.buccaneer);
		expect(perLevelModifier).toBeDefined();
		expect(perLevelModifier?.baseValue).toBe(3);
		expect(perLevelModifier?.includeFirstLevel).toBe(true);
	});

	it('should dispatch audacity ability add', () => {
		const abilities = sheet.getSheetAbilities();
		expect(abilities.getRoleAbilities().get(RoleAbilityName.audacity)).toBeDefined();
	});

	it.skip('should have audacity as testExceptAttack triggered effect', () => {
		const effects = sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.skillTestExceptAttack);
		const audacity = effects.get(TriggeredEffectName.audacity);
		expect(audacity).toBeDefined();
	});
});
