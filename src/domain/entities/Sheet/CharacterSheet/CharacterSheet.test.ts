import {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import {LeatherArmor} from '../../Inventory/Equipment/Weapon/DefensiveWeapon/Armor/LightArmor/LeatherArmor';
import {LongSword} from '../../Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/LongSword';
import {Dagger} from '../../Inventory/Equipment/Weapon/OffensiveWeapon/SimpleWeapon/Dagger';
import {Acolyte} from '../../Origin/Acolyte/Acolyte';
import {AnimalsFriend} from '../../Origin/AnimalsFriend/AnimalsFriend';
import type {Origin} from '../../Origin/Origin';
import {OriginBenefitGeneralPower} from '../../Origin/OriginBenefit/OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../../Origin/OriginBenefit/OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../../Origin/OriginBenefit/OriginBenefitSkill';
import {OneWeaponStyle} from '../../Power';
import {IronWill} from '../../Power/GeneralPower/DestinyPower/IronWill/IronWill';
import {GeneralPowerName} from '../../Power/GeneralPower/GeneralPowerName';
import {SpecialFriend} from '../../Power/OriginPower/SpecialFriend';
import {Dwarf} from '../../Race/Dwarf/Dwarf';
import {Human} from '../../Race/Human/Human';
import {VersatileChoicePower} from '../../Race/Human/Versatile/VersatileChoicePower';
import {VersatileChoiceSkill} from '../../Race/Human/Versatile/VersatileChoiceSkill';
import type {Race} from '../../Race/Race';
import {ArcanistBuilder} from '../../Role/Arcanist/ArcanistBuider';
import {ArcanistPathMage} from '../../Role/Arcanist/ArcanistPath/ArcanistPathMage/ArcanistPathMage';
import type {Role} from '../../Role/Role';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {Warrior} from '../../Role/Warrior/Warrior';
import {SkillName} from '../../Skill/SkillName';
import {ArcaneArmor} from '../../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../../Spell/MentalDagger/MentalDagger';
import type {CharacterSheet} from './CharacterSheet';
import {Proficiency} from '../Proficiency';
import {SheetBuilder} from '../SheetBuilder';
import {Vision} from '../Vision';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		let sheet: CharacterSheet;
		let role: Role;
		let race: Race;
		let sheetBuilder: SheetBuilder;
		let origin: Origin;
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
		});

		it('should choose race', () => {
			expect(sheet.getSheetRace().getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(sheet.getSheetDisplacement().getDisplacement()).toBe(9);
		});

		it('should have default vision', () => {
			expect(sheet.getSheetVision().getVision()).toBe(Vision.default);
		});

		it('should have versatile power', () => {
			const powers = sheet.getSheetPowers();
			expect(powers.getGeneralPowers().has(GeneralPowerName.oneWeaponStyle)).toBeTruthy();
		});

		it('should have versatile skill trained', () => {
			const skills = sheet.getSheetSkills().getSkills();
			expect(skills.acrobatics.getIsTrained()).toBeTruthy();
		});

		it('should choose role', () => {
			expect(sheet.getSheetRole().getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			expect(sheet.getMaxLifePoints()).toBe(21);
		});

		it('should have role skills trained', () => {
			const skills = sheet.getSheetSkills().getSkills();
			expect(skills.fight.getIsTrained()).toBeTruthy();
			expect(skills.aim.getIsTrained()).toBeTruthy();
			expect(skills.fortitude.getIsTrained()).toBeTruthy();
			expect(skills.athletics.getIsTrained()).toBeTruthy();
		});

		it('should have role abilities', () => {
			const abilities = sheet.getSheetAbilities();
			expect(abilities.getRoleAbilities().has(RoleAbilityName.specialAttack)).toBeTruthy();
		});

		it('should have origin power', () => {
			const powers = sheet.getSheetPowers();
			expect(powers.getGeneralPowers().has(GeneralPowerName.ironWill)).toBeTruthy();
		});

		it('should have origin skill trained', () => {
			const skills = sheet.getSheetSkills().getSkills();
			expect(skills.cure.getIsTrained()).toBeTruthy();
		});

		it('should have origin equipments', () => {
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.priestCostume)).toBeTruthy();
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.sacredSymbol)).toBeTruthy();
		});

		it('should have default initial equipments.has(', () => {
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.backpack)).toBeTruthy();
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.sleepingBag)).toBeTruthy();
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.travelerCostume)).toBeTruthy();
		});

		it('should have chosen weapo', () => {
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.dagger)).toBeTruthy();
		});

		it('should have chosen martial weapon', () => {
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.longSword)).toBeTruthy();
		});

		it('should have chosen armor', () => {
			expect(sheet.getSheetInventory().getEquipments().has(EquipmentName.leatherArmor)).toBeTruthy();
		});

		it('should have initial money', () => {
			expect(sheet.getSheetInventory().getMoney()).toBe(24);
		});
	});

	describe('Dwarf Arcanist', () => {
		let sheet: CharacterSheet;
		let role: Role;
		let race: Race;
		let sheetBuilder: SheetBuilder;
		let origin: Origin;

		beforeAll(() => {
			role = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
			race = new Dwarf();
			sheetBuilder = new SheetBuilder();
			origin = new AnimalsFriend([new OriginBenefitSkill(SkillName.animalHandling), new OriginBenefitOriginPower(new SpecialFriend(SkillName.religion))], EquipmentName.horse);
			sheet = sheetBuilder
				.setInitialAttributes({charisma: 0, constitution: 0, dexterity: 0, intelligence: 2, strength: 0, wisdom: 0})
				.chooseRace(race)
				.chooseRole(role)
				.chooseOrigin(origin)
				.trainIntelligenceSkills([SkillName.initiative, SkillName.athletics])
				.addInitialEquipment({
					simpleWeapon: new Dagger(),
					money: 20,
				})
				.build();
		});

		it('should choose race', () => {
			expect(sheet.getSheetRace().getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(sheet.getSheetDisplacement().getDisplacement()).toBe(6);
		});

		it('should have dark vision', () => {
			expect(sheet.getSheetVision().getVision()).toBe(Vision.dark);
		});

		it('should choose class', () => {
			expect(sheet.getSheetRole().getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			expect(sheet.getMaxLifePoints()).toBe(13);
		});

		it('should have role skills trained', () => {
			const skills = sheet.getSheetSkills().getSkills();
			expect(skills.mysticism.getIsTrained()).toBeTruthy();
			expect(skills.will.getIsTrained()).toBeTruthy();
			expect(skills.knowledge.getIsTrained()).toBeTruthy();
			expect(skills.diplomacy.getIsTrained()).toBeTruthy();
		});

		it('should have basic proficiencies', () => {
			expect(sheet.getSheetProficiencies().getProficiencies()).toContain(Proficiency.simple);
			expect(sheet.getSheetProficiencies().getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});

	describe('Human Warrior - Missing fight skill for one weapon style', () => {
		it('should throw UNFILLED_POWER_REQUIREMENTS error', () => {
			const choices = [
				new VersatileChoiceSkill(SkillName.acrobatics),
				new VersatileChoicePower(new OneWeaponStyle()),
			];
			const race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			const role = new Warrior([SkillName.intimidation, SkillName.aim, SkillName.athletics]);
			const sheetBuilder = new SheetBuilder();
			const origin = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitSkill(SkillName.cure)]);
			expect(() => {
				sheetBuilder
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
			}).toThrow('UNFULFILLED_REQUIREMENT');
		});
	});
});
