import {WeaponAttack} from '../Attack/WeaponAttack';
import {PreviewContext} from '../Context/PreviewContext';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../Inventory';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill} from '../Origin';
import type {OriginInterface} from '../Origin/Origin';
import {GeneralPowerName, IronWill, OneWeaponStyle} from '../Power';
import {Human, VersatileChoicePower, VersatileChoiceSkill, type VersatileChoice} from '../Race';
import type {Race} from '../Race/Race';
import {Warrior} from '../Role';
import type {Role} from '../Role/Role';
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
		let context: PreviewContext;

		beforeEach(() => {
			context = new PreviewContext(character);
			const attacks = context.getAttacks();
			dagger = attacks.get(EquipmentName.dagger)!;
		});

		it('should find dagger attack', () => {
			expect(dagger).toBeDefined();
			expect(dagger.attack).toEqual(new WeaponAttack(new Dagger()));
		});

		it('should get dagger attack without one weapon style modifier', () => {
			expect(context.getAttackTestModifiersMaxTotal(dagger)).toBe(4);
			expect(context.getAttackTestModifiersTotal(dagger)).toBe(2);
		});

		it('should get dagger attack with one weapon style modifier', () => {
			character.toggleEquipItem(EquipmentName.dagger);
			expect(context.getAttackTestModifiersMaxTotal(dagger)).toBe(4);
			expect(context.getAttackTestModifiersTotal(dagger)).toBe(4);
		});

		it('should unselect fight style and remove modifiers', () => {
			const fightStyle = character.getFightStyle();
			expect(fightStyle).toBeDefined();
			character.unselectFightStyle();
			expect(character.getFightStyle()).toBeUndefined();
			expect(context.getAttackTestModifiersMaxTotal(dagger)).toBe(2);
			expect(context.getAttackTestModifiersTotal(dagger)).toBe(2);
		});

		it('should roll dagger attack', () => {
			const fakeRandom = {get: vi.fn(() => 1)};
			const result = context.roll(dagger, fakeRandom);
			expect(result.damage.rollResult.rolls).toEqual([1]);
			expect(result.damage.rollResult.discartedRolls).toEqual([]);
			expect(result.damage.rollResult.total).toBe(1);
			expect(result.damage.total).toEqual(1);
			expect(result.test.total).toBe(3);
		});

		it('should roll dagger attack with one weapon style modifier', () => {
			character.toggleEquipItem(EquipmentName.dagger);
			const fakeRandom = {get: vi.fn(() => 1)};
			const result = context.roll(dagger, fakeRandom);
			expect(result.damage.total).toBe(1);
			expect(result.damage.rollResult.rolls).toEqual([1]);
			expect(result.damage.rollResult.discartedRolls).toEqual([]);
			expect(result.test.modifiers.contextual.modifiers).toHaveLength(1);
			const oneWeaponStyleModifier = result.test.modifiers.contextual.get(GeneralPowerName.oneWeaponStyle);
			expect(oneWeaponStyleModifier).toBeDefined();
			expect(oneWeaponStyleModifier?.baseValue).toBe(2);
			expect(result.damage.total).toBe(1);
			expect(result.test.total).toBe(5);
		});

		it('should roll dagger with default purpose skill (fight)', () => {
			const fakeRandom = {get: vi.fn(() => 1)};
			const result = context.roll(dagger, fakeRandom);
			const fightModifier = result.test.modifiers.fixed.get(SkillName.fight);
			expect(fightModifier).toBeDefined();
		});

		it('should change skill to dexterity', () => {
			const fakeRandom = {get: vi.fn(() => 1)};
			context.changeAttackTestAttribute(dagger, 'dexterity');
			const fightModifier = dagger.modifiers.test.fixed.get(SkillName.fight);
			expect(fightModifier?.baseValue).toBe(3);
		});
	});
});
