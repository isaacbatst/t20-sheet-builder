import {WeaponAttack} from '../Attack/WeaponAttack';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../Inventory';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill} from '../Origin';
import type {Origin} from '../Origin/Origin';
import {IronWill} from '../Power';
import {OneWeaponStyle} from '../Power/GeneralPower/FightStyle/OneWeaponStyle';
import {Human, VersatileChoicePower, VersatileChoiceSkill} from '../Race';
import type {Race} from '../Race/Race';
import {Warrior} from '../Role';
import type {Role} from '../Role/Role';
import type {Sheet} from '../Sheet/Sheet';
import {SheetBuilder} from '../Sheet/SheetBuilder';
import {SkillName} from '../Skill';
import {Character} from './Character';

describe('Character', () => {
	let sheet: Sheet;
	let role: Role;
	let race: Race;
	let sheetBuilder: SheetBuilder;
	let origin: Origin;
	let character: Character;
	beforeAll(() => {
		const choices = [
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

	it('should get dagger attack', () => {
		const attacks = character.getAttacks();
		expect(attacks.has(EquipmentName.dagger)).toBeTruthy();
		const dagger = attacks.get(EquipmentName.dagger);
		expect(dagger!.attack).toEqual(new WeaponAttack(new Dagger()));
	});
});
