import {PreviewContext, type Context} from '../Context';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../Inventory';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill} from '../Origin';
import type {OriginInterface} from '../Origin/Origin';
import {IronWill, OneWeaponStyle} from '../Power';
import {Human, VersatileChoicePower, VersatileChoiceSkill, type VersatileChoice} from '../Race';
import type {Race} from '../Race/Race';
import {Warrior} from '../Role';
import type {Role} from '../Role/Role';
import type {CharacterSheet} from '../Sheet/CharacterSheet/CharacterSheet';
import {SheetBuilder} from '../Sheet/SheetBuilder';
import {SkillName} from '../Skill';
import {Character} from './Character';

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
		character.toggleEquipItem(EquipmentName.lightShield);
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
});
