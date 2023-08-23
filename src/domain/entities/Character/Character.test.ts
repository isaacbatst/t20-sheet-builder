import {WeaponAttack} from '../Attack/WeaponAttack';
import type {ContextInterface} from '../Context/ContextInterface';
import {InGameContextFake} from '../Context/InGameContextFake';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../Inventory';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill} from '../Origin';
import type {OriginInterface} from '../Origin/Origin';
import {GeneralPowerName, IronWill, OneWeaponStyle} from '../Power';
import {Human, VersatileChoicePower, VersatileChoiceSkill, type VersatileChoice} from '../Race';
import type {Race} from '../Race/Race';
import {Warrior} from '../Role';
import type {Role} from '../Role/Role';
import type {Attributes} from '../Sheet';
import type {CharacterSheet} from '../Sheet/CharacterSheet/CharacterSheet';
import {SheetBuilder} from '../Sheet/SheetBuilder';
import {SkillName} from '../Skill';
import {Character} from './Character';
import type {CharacterAttack} from './CharacterAttack';

describe('Character', () => {
	let sheet: CharacterSheet;
	let role: Role;
	let race: Race;
	let sheetBuilder: SheetBuilder;
	let origin: OriginInterface;
	let character: Character;
	beforeEach(() => {
		const choices: VersatileChoice[] = [
			new VersatileChoiceSkill(SkillName.acrobatics),
			new VersatileChoicePower(new OneWeaponStyle()),
		];
		race = new Human(['charisma', 'constitution', 'dexterity'], choices);
		role = new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]);
		sheetBuilder = new SheetBuilder();
		origin = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitSkill(SkillName.cure)]);
		sheet = sheetBuilder
			.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
			.chooseRace(race)
			.chooseRole(role)
			.chooseOrigin(origin)
			.trainIntelligenceSkills([])
			.addInitialEquipment({
				simpleWeapon: new Dagger(),
				armor: new LeatherArmor(),
				martialWeapon: new LongSword(),
				money: 24,
			})
			.build();
		character = new Character(sheet);
	});

	it('should have fight style', () => {
		expect(character.getFightStyle()).toBeDefined();
	});

	it('should toggle wield item', () => {
		expect(character.getWieldedItems()).toEqual([]);
		character.toggleEquipItem(EquipmentName.dagger);
		expect(character.getWieldedItems()).toEqual([EquipmentName.dagger]);
		character.toggleEquipItem(EquipmentName.dagger);
		expect(character.getWieldedItems()).toEqual([]);
	});

	it('should have armor defense modifier', () => {
		character.toggleEquipItem(EquipmentName.leatherArmor);
		const modifier = character.modifiers.defense.fixed.get(EquipmentName.leatherArmor);
		expect(modifier).toBeTruthy();
		expect(modifier?.baseValue).toBe(2);
	});

	it('should have shield defense modifier', () => {
		character.toggleEquipItem(EquipmentName.lightShield);
		const modifier = character.modifiers.defense.fixed.get(EquipmentName.lightShield);
		expect(modifier).toBeTruthy();
		expect(modifier?.baseValue).toBe(1);
	});

	describe('Attack', () => {
		let dagger: CharacterAttack;
		let attributes: Attributes;
		let context: ContextInterface;
		let totalCalculator: ContextualModifiersListTotalCalculator;

		beforeEach(() => {
			const attacks = character.getAttacks();
			dagger = attacks.get(EquipmentName.dagger)!;
			attributes = character.getAttributes();
			context = new InGameContextFake(character);
			totalCalculator = new ContextualModifiersListTotalCalculator(context, character.getAttributes());
		});

		it('should find dagger attack', () => {
			expect(dagger).toBeDefined();
			expect(dagger.attack).toEqual(new WeaponAttack(new Dagger()));
		});

		it('should get dagger attack without one weapon style modifier', () => {
			expect(dagger.modifiers.contextual.getMaxTotal(attributes)).toBe(2);
			expect(dagger.modifiers.contextual.getTotal(totalCalculator)).toBe(0);
		});

		it('should get dagger attack with one weapon style modifier', () => {
			character.toggleEquipItem(EquipmentName.dagger);
			expect(dagger.modifiers.contextual.getMaxTotal(attributes)).toBe(2);
			expect(dagger.modifiers.contextual.getTotal(totalCalculator)).toBe(2);
		});

		it('should unselect fight style and remove modifiers', () => {
			character.unselectFightStyle();
			expect(character.getFightStyle()).toBeUndefined();
			expect(dagger.modifiers.contextual.getMaxTotal(attributes)).toBe(0);
			expect(dagger.modifiers.contextual.getTotal(totalCalculator)).toBe(0);
		});

		it('should roll dagger attack', () => {
			const result = dagger.roll({get: () => 1}, totalCalculator);
			expect(result.rollResult.rolls).toEqual([1]);
			expect(result.rollResult.discartedRolls).toEqual([]);
			expect(result.rollResult.total).toEqual(1);
			expect(result.total).toBe(1);
		});

		it('should roll dagger attack with one weapon style modifier', () => {
			character.toggleEquipItem(EquipmentName.dagger);
			const result = dagger.roll({get: () => 1}, totalCalculator);
			expect(result.rollResult.total).toBe(1);
			expect(result.rollResult.rolls).toEqual([1]);
			expect(result.rollResult.discartedRolls).toEqual([]);
			expect(result.modifiers.contextual.modifiers).toHaveLength(1);
			const oneWeaponStyleModifier = result.modifiers.contextual.get(GeneralPowerName.oneWeaponStyle);
			expect(oneWeaponStyleModifier).toBeDefined();
			expect(oneWeaponStyleModifier?.baseValue).toBe(2);
			expect(result.total).toBe(3);
		});
	});
});
