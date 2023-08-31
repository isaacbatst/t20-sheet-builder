import {TriggerEvent, TriggeredEffectName} from '../../Ability';
import {Character} from '../../Character';
import {Modifiers} from '../../Modifier';
import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {RoleAbilityName} from '../RoleAbilityName';
import {Knight} from './Knight';

describe('Knight', () => {
	let knight: Knight;
	let sheet: BuildingSheet;
	let transaction: Transaction;
	let character: Character;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
		knight = new Knight([
			[
				SkillName.animalHandling,
				SkillName.athletics,
			],
		]);
		knight.addToSheet(transaction);
		character = new Character(sheet);
	});

	it('should have honour code ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.honourCode)).toBeDefined();
	});

	it('should have bulwark ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.bulwark)).toBeDefined();
	});

	it('should have bulwark defense triggered effect', () => {
		const effects = sheet.getSheetTriggeredEffects();
		const defenseEffects = effects.getByEvent(TriggerEvent.defend);
		expect(defenseEffects).toHaveLength(1);
		expect(defenseEffects.get(TriggeredEffectName.bulwark)).toBeDefined();
	});

	it('should have bulwark resistance test triggered effect', () => {
		const effects = sheet.getSheetTriggeredEffects();
		const resistanceEffects = effects.getByEvent(TriggerEvent.resistanceTest);
		expect(resistanceEffects).toHaveLength(1);
	});

	it('should enable bulwark receiving +2 defense', () => {
		const effects = character.getDefenseTriggeredEffects();
		const effect = effects.get(TriggeredEffectName.bulwark);
		effect?.enable({
			effectName: TriggeredEffectName.bulwark,
		});
		expect(character.modifiers.defense.fixed.get(RoleAbilityName.bulwark)).toBeDefined();
		expect(character.modifiers.defense.fixed.get(RoleAbilityName.bulwark)?.baseValue).toBe(2);
	});

	it('should disable bulwark receiving +2 defense', () => {
		const effects = character.getDefenseTriggeredEffects();
		const effect = effects.get(TriggeredEffectName.bulwark);
		effect?.enable({
			effectName: TriggeredEffectName.bulwark,
		});
		effect?.disable();
		expect(character.modifiers.defense.fixed.get(RoleAbilityName.bulwark)).toBeUndefined();
	});
});
