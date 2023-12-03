import {TriggeredEffectName} from '../../Ability';
import {Character} from '../../Character';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../../Inventory';
import {Level, type BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {SkillName} from '../../Skill';
import {RoleAbilityName} from '../RoleAbilityName';
import {Paladin} from './Paladin';

describe('Paladin', () => {
	let sheet: BuildingSheet;
	let character: Character;

	beforeEach(() => {
		const paladin = new Paladin([[SkillName.animalHandling, SkillName.athletics]]);
		const builder = new SheetBuilder();
		builder
			.chooseRole(paladin)
			.addInitialEquipment({
				simpleWeapon: new Dagger(),
				armor: new LeatherArmor(),
				martialWeapon: new LongSword(),
				money: 24,
			});
		sheet = builder.getBuildingSheet();
		character = new Character(sheet);
	});

	it('should have blessed', () => {
		const blessed = sheet.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.blessed);
		expect(blessed).toBeDefined();
	});

	it('should have hero code', () => {
		const heroCode = sheet.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.heroCode);

		expect(heroCode).toBeDefined();
	});

	it('should have divine blow', () => {
		const divineBlow = sheet.getSheetAbilities()
			.getRoleAbilities()
			.get(RoleAbilityName.divineBlow);

		expect(divineBlow).toBeDefined();
	});

	it('should add charisma to mana points', () => {
		sheet.getSheetAttributes().increaseAttribute('charisma', 2);
		const mana = sheet.getSheetManaPoints().getMax(sheet.getSheetAttributes().getValues(), Level.one);
		expect(mana).toBe(5);
	});

	it('should have 2 granted powers', () => {
		const count = sheet.getSheetDevotion().getGrantedPowerCount();
		expect(count).toBe(2);
	});

	it('should have divine blow triggered effect', () => {
		const attack = character.getAttack(EquipmentName.dagger);
		expect(attack).toBeDefined();
		expect(attack?.getTriggeredEffects().get(TriggeredEffectName.divineBlow)).toBeDefined();
	});

	it('should sum charisma to attack roll', () => {
		const sheetAttributes = sheet.getSheetAttributes();
		sheetAttributes.increaseAttribute('charisma', 2);
		const attack = character.getAttack(EquipmentName.dagger);
		attack.enableTriggeredEffect({effectName: TriggeredEffectName.divineBlow});
		const modifier = attack.modifiers.test.fixed.get(RoleAbilityName.divineBlow);
		expect(modifier).toBeDefined();
		expect(modifier?.getTotalAttributeBonuses(sheetAttributes.getValues())).toBe(2);
	});
});
