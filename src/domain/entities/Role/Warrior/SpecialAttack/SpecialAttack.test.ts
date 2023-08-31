import {TriggeredEffectName} from '../../../Ability';
import {Character, type CharacterAttack} from '../../../Character';
import {PreviewContext} from '../../../Context';
import {type Context} from '../../../Context/Context';
import {Dagger, LeatherArmor, LongSword, EquipmentName} from '../../../Inventory';
import {type OriginInterface, Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill} from '../../../Origin';
import {OneWeaponStyle, IronWill} from '../../../Power';
import {type Race, type VersatileChoice, VersatileChoiceSkill, VersatileChoicePower, Human} from '../../../Race';
import {type CharacterSheet} from '../../../Sheet';
import {SheetBuilder} from '../../../Sheet/SheetBuilder';
import {SkillName} from '../../../Skill';
import {type Role} from '../../Role';
import {RoleAbilityName} from '../../RoleAbilityName';
import {Warrior} from '../Warrior';

describe('SpecialAttack', () => {
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
		role = new Warrior([[SkillName.fight], [SkillName.aim, SkillName.athletics]]);
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

	let dagger: CharacterAttack;

	beforeEach(() => {
		const attacks = character.getAttacks(context);
		dagger = attacks.get(EquipmentName.dagger)!;
	});
	it('should enable special attack', () => {
		const attack = character.getAttacks(context).get(EquipmentName.dagger)!;
		attack.enableTriggeredEffect({
			effectName: TriggeredEffectName.specialAttack,
			bonus: 'attack',
		});

		const modifier = attack.modifiers.test.fixed.get(RoleAbilityName.specialAttack);
		expect(modifier).toBeDefined();
		expect(modifier?.baseValue).toBe(4);
	});

	it('should enable special attack splitting bonus', () => {
		const attack = character.getAttacks(context).get(EquipmentName.dagger)!;
		attack.enableTriggeredEffect({
			effectName: TriggeredEffectName.specialAttack,
			bonus: 'both',
		});

		const modifier = attack.modifiers.test.fixed.get(RoleAbilityName.specialAttack);
		expect(modifier).toBeDefined();
		expect(modifier?.baseValue).toBe(2);

		const damageModifier = attack.modifiers.damage.fixed.get(RoleAbilityName.specialAttack);
		expect(damageModifier).toBeDefined();
		expect(damageModifier?.baseValue).toBe(2);
	});

	it('should enable special attack on damage', () => {
		const attack = character.getAttacks(context).get(EquipmentName.dagger)!;
		attack.enableTriggeredEffect({
			effectName: TriggeredEffectName.specialAttack,
			bonus: 'damage',
		});

		const modifier = attack.modifiers.damage.fixed.get(RoleAbilityName.specialAttack);
		expect(modifier).toBeDefined();
		expect(modifier?.baseValue).toBe(4);
	});

	it('should enable special attack using 2 mana points', () => {
		const attack = character.getAttacks(context).get(EquipmentName.dagger)!;
		attack.enableTriggeredEffect({
			effectName: TriggeredEffectName.specialAttack,
			mana: 2,
		});

		const manaCost = attack.getManaCost();
		expect(manaCost).toBeDefined();
		expect(manaCost?.value).toBe(2);
		const modifier = attack.modifiers.test.fixed.get(RoleAbilityName.specialAttack);
		expect(modifier).toBeDefined();
		expect(modifier?.baseValue).toBe(8);
	});
});
