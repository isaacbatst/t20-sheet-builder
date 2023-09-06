import {TriggerEvent, TriggeredEffectName} from '../../Ability';
import {Character} from '../../Character';
import {Dagger, EquipmentName, LeatherArmor} from '../../Inventory';
import {Acid} from '../../Inventory/Equipment/EquipmentAlchemic/Prepared/Acid';
import {Accurate} from '../../Inventory/Equipment/EquipmentImprovement/Accurate';
import {Assegai} from '../../Inventory/Equipment/Weapon/OffensiveWeapon/SimpleWeapon/Assegai';
import {BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {Inventor} from './Inventor';

describe('Inventor', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;
	let inventor: Inventor;
	let character: Character;

	beforeEach(() => {
		sheet = new BuildingSheet();
		const sheetBuilder = new SheetBuilder(sheet);
		transaction = new Transaction(sheet);
		inventor = new Inventor([
			[
				SkillName.knowledge,
				SkillName.cure,
				SkillName.diplomacy,
				SkillName.fortitude,
			],
		], {
			equipment: new Assegai(),
			improvement: new Accurate(),
			choice: 'superiorItem',
		});
		sheetBuilder.chooseRole(inventor);
		sheetBuilder.addInitialEquipment({
			money: 10,
			simpleWeapon: new Dagger(),
			armor: new LeatherArmor(),
		});
		character = new Character(sheet);
	});

	it('should have ingenuity ability', () => {
		expect(sheet.getSheetAbilities().getRoleAbilities().has(RoleAbilityName.ingenuity)).toBe(true);
	});

	it('should have ingenuity triggered effect', () => {
		const triggeredEffects = sheet.getSheetTriggeredEffects().getByEvent(TriggerEvent.skillTestExceptAttack);
		expect(triggeredEffects).toHaveLength(1);
	});

	it('should apply ingenuity bonus on skill test', () => {
		character.sheet.getSheetAttributes().increaseAttribute('intelligence', 2);
		const skill = character.getSkill(SkillName.perception);
		const triggeredEffects = skill.getTriggeredEffects();
		const ingenuity = triggeredEffects.get(TriggeredEffectName.ingenuity);
		ingenuity?.enable({
			effectName: TriggeredEffectName.ingenuity,
		});
		const result = skill.roll({
			get: () => 10,
		});
		expect(result.total).toBe(12);
	});

	it('should not apply ingenuity bonus on attack test', () => {
		character.sheet.getSheetAttributes().increaseAttribute('intelligence', 2);
		const attack = character.getAttack(EquipmentName.dagger);
		expect(attack).toBeDefined();
		expect(attack.getTriggeredEffects().size).toBe(0);
	});

	it('should have prototype ability', () => {
		expect(sheet.getSheetAbilities().getRoleAbilities().has(RoleAbilityName.prototype)).toBe(true);
	});

	describe('Prototype with Superior Item', () => {
		it('should have prototype superior item', () => {
			const prototype = sheet.getSheetInventory().getEquipment(EquipmentName.assegai);
			expect(prototype).toBeDefined();
			expect(prototype?.equipment.improvements).toHaveLength(1);
		});
	});

	describe('Prototype with Alchemic Items', () => {
		beforeEach(() => {
			sheet = new BuildingSheet();
			const sheetBuilder = new SheetBuilder(sheet);
			transaction = new Transaction(sheet);
			inventor = new Inventor([
				[
					SkillName.knowledge,
					SkillName.cure,
					SkillName.diplomacy,
					SkillName.fortitude,
				],
			], {
				alchemicItems: Array.from({length: 10}, () => new Acid()),
				choice: 'alchemicItems',
			});
			sheetBuilder.chooseRole(inventor);
			sheetBuilder.addInitialEquipment({
				money: 10,
				simpleWeapon: new Dagger(),
				armor: new LeatherArmor(),
			});
			character = new Character(sheet);
		});

		it('should have prototype alchemic items', () => {
			const prototypeItems = sheet.getSheetInventory().getEquipment(EquipmentName.acid);
			expect(prototypeItems).toBeDefined();
			expect(prototypeItems?.getQuantity()).toBe(10);
		});
	});
});
