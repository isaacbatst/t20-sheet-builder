import {WeaponAttack} from '../Attack/WeaponAttack';
import {PreviewContext, type Context} from '../Context';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../Inventory';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill} from '../Origin';
import type {OriginInterface} from '../Origin/Origin';
import {GeneralPowerName, IronWill, OneWeaponStyle} from '../Power';
import {Human, VersatileChoicePower, VersatileChoiceSkill, type VersatileChoice} from '../Race';
import type {Race} from '../Race/Race';
import {type RandomInterface} from '../Random';
import {Warrior} from '../Role';
import type {Role} from '../Role/Role';
import type {CharacterSheet} from '../Sheet/CharacterSheet/CharacterSheet';
import {SheetBuilder} from '../Sheet/SheetBuilder';
import {SkillName} from '../Skill';
import {Character} from './Character';
import type {AttackResult, CharacterAttack} from './CharacterAttack';

describe('Character', () => {
	let sheet: CharacterSheet;
	let role: Role;
	let race: Race;
	let sheetBuilder: SheetBuilder;
	let origin: OriginInterface;
	let character: Character;
	let context: Context;
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
			.setInitialAttributes({strength: 2, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
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
		context = new PreviewContext(character);
	});

	it('should get trained skill', () => {
		expect(character.sheet.getSheetSkills().getSkill(SkillName.fight).getIsTrained()).toBeTruthy();
	});

	it('should get untrained skill', () => {
		expect(character.sheet.getSheetSkills().getSkill(SkillName.animalHandling).getIsTrained()).toBeFalsy();
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

		beforeEach(() => {
			const attacks = character.getAttacks(context);
			dagger = attacks.get(EquipmentName.dagger)!;
		});

		it('should find dagger attack', () => {
			expect(dagger).toBeDefined();
			expect(dagger.attack).toEqual(new WeaponAttack(new Dagger()));
		});

		it('should roll dagger attack', () => {
			const fakeRandom = {get: vi.fn().mockReturnValue(1)};
			const result = character.attack(dagger, fakeRandom);
			expect(result).toBeDefined();
		});

		describe('With one weapon style active', () => {
			let fakeRandom: RandomInterface;
			let result: AttackResult;

			beforeAll(() => {
				fakeRandom = {get: vi.fn().mockReturnValue(1)};
			});

			beforeEach(() => {
				character.toggleEquipItem(EquipmentName.dagger);
				const attack = character.getAttack(EquipmentName.dagger, context);
				result = attack.roll(fakeRandom);
			});

			it('should calculate damage roll result', () => {
				expect(result.damage.rollResult.rolls).toEqual([1]);
				expect(result.damage.rollResult.discartedRolls).toEqual([]);
			});

			it('should have default attribute modifier on damage', () => {
				const modifier = result.damage.modifiers.fixed.get('strength');
				expect(modifier).toBeDefined();
				expect(modifier?.baseValue).toBe(2);
			});

			it('should calculate damage total', () => {
				expect(result.damage.total).toBe(3);
			});

			it('should have one weapon style modifier on test', () => {
				const oneWeaponStyleModifier = result.test.modifiers.contextual.get(GeneralPowerName.oneWeaponStyle);
				expect(oneWeaponStyleModifier).toBeDefined();
				expect(oneWeaponStyleModifier?.baseValue).toBe(2);
				const appliableValue = character.getContextualModifierAppliableValue(oneWeaponStyleModifier!, context);
				expect(appliableValue).toBe(2);
			});

			it('should have default skill modifier on test', () => {
				const modifier = result.test.modifiers.fixed.get(SkillName.fight);
				expect(modifier).toBeDefined();
				expect(modifier?.baseValue).toBe(4);
			});

			it('should calculate test total', () => {
				expect(result.test.total).toBe(7);
			});

			it('should sum test modifiers total', () => {
				expect(dagger.getTestModifiersTotal()).toBe(6);
			});

			it('should sum test modifiers max total', () => {
				expect(dagger.getTestModifiersMaxTotal()).toBe(6);
			});
		});

		it('should get dagger attack without one weapon style modifier', () => {
			expect(dagger.getTestModifiersMaxTotal()).toBe(6);
			expect(dagger.getTestModifiersTotal()).toBe(4);
		});

		it('should unselect fight style and remove modifiers', () => {
			const fightStyle = character.getFightStyle();
			expect(fightStyle).toBeDefined();
			character.unselectFightStyle();
			expect(character.getFightStyle()).toBeUndefined();
		});

		it('should have default purpose damage modifier', () => {
			dagger = character.getAttacks(context).get(EquipmentName.dagger)!;
			expect(dagger.getDamageModifiersMaxTotal()).toBe(2);
			expect(dagger.getDamageModifiersTotal()).toBe(2);
		});

		it('should roll dagger with default purpose skill (fight)', () => {
			const fakeRandom = {get: vi.fn(() => 1)};
			const result = character.attack(dagger, fakeRandom);
			const fightModifier = result.test.modifiers.fixed.get(SkillName.fight);
			expect(fightModifier).toBeDefined();
		});

		it('should change skill to dexterity', () => {
			character.changeAttackTestAttribute(dagger, 'dexterity', context);
			const fightModifier = dagger.modifiers.test.fixed.get(SkillName.fight);
			expect(fightModifier?.baseValue).toBe(3);
		});
	});
});
