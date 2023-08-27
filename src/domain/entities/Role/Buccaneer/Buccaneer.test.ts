import {TriggerEvent, TriggeredEffectName} from '../../Ability';
import {Character} from '../../Character';
import {OutOfGameContext, type Context} from '../../Context';
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
	let character: Character;
	let context: Context;

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
		character = new Character(sheet);
		context = new OutOfGameContext();
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

	describe('audacity', () => {
		it('should dispatch audacity ability add', () => {
			const abilities = sheet.getSheetAbilities();
			expect(abilities.getRoleAbilities().get(RoleAbilityName.audacity)).toBeDefined();
		});

		it('should have audacity as testExceptAttack triggered effect', () => {
			const effects = sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.skillTestExceptAttack);
			const audacity = effects.get(TriggeredEffectName.audacity);
			expect(audacity).toBeDefined();
		});

		it('should enable audacity triggered effect', () => {
			const skill = character.getSkills(context)[SkillName.gambling];
			skill.enableTriggeredEffect({
				attributes: sheet.getSheetAttributes().getValues(),
				effectName: TriggeredEffectName.audacity,
			});
			const triggeredEffect = skill.triggeredEffects.get(TriggeredEffectName.audacity);
			expect(triggeredEffect?.getIsEnabled()).toBe(true);
		});

		it('should add skill modifier when audacity is enabled', () => {
			const skill = character.getSkills(context)[SkillName.gambling];
			skill.enableTriggeredEffect({
				attributes: sheet.getSheetAttributes().getValues(),
				effectName: TriggeredEffectName.audacity,
			});
			expect(skill.getFixedModifier('skillExceptAttack', RoleAbilityName.audacity)).toBeDefined();
		});

		it('should roll skill test with audacity', () => {
			character.sheet.getSheetAttributes().increaseAttribute('charisma', 2);
			const skill = character.getSkills(context)[SkillName.stealth];
			skill.enableTriggeredEffect({
				attributes: sheet.getSheetAttributes().getValues(),
				effectName: TriggeredEffectName.audacity,
			});
			const roll = skill.roll({get: () => 10});
			expect(roll.modifiers.fixed.get(RoleAbilityName.audacity)).toBeDefined();
			expect(roll.modifiersTotal).toBe(2);
			expect(roll.total).toBe(12);
		});
	});
});
