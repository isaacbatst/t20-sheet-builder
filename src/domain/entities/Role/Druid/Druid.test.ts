import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {SpellCircle, SpellSchool} from '../../Spell';
import {CureWounds} from '../../Spell/Divine/CureWounds';
import {DivineProtection} from '../../Spell/Divine/DivineProtection';
import {RoleAbilityName} from '../RoleAbilityName';
import {Druid} from './Druid';

describe('Druid', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;
	let druid: Druid;

	beforeEach(() => {
		druid = new Druid([
			[SkillName.animalHandling, SkillName.athletics, SkillName.animalRide, SkillName.knowledge],
		],
		[new CureWounds(), new DivineProtection()],
		new Set([SpellSchool.abjuration, SpellSchool.evocation, SpellSchool.divination]),
		);
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
		druid.addToSheet(transaction);
	});

	it('should have faithful devote ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.druidFaithfulDevote)).toBeDefined();
	});

	it('should allow 2 granted powers as faithfull devote', () => {
		const devotion = sheet.getSheetDevotion();
		expect(devotion.getGrantedPowerCount()).toBe(2);
	});

	it('should have wild empathy ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.wildEmpathy)).toBeDefined();
	});

	it('should have druid spells ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.druidSpells)).toBeDefined();
	});

	it('should learn first level divine spells on 3 schools', () => {
		const spells = sheet.getSheetSpells();
		expect(spells.getLearnedCircles().divine).toEqual(new Set([SpellCircle.first]));
		expect(spells.getLearnedSchools().divine).toEqual(new Set([SpellSchool.abjuration, SpellSchool.evocation, SpellSchool.divination]));
	});

	it('should have 2 spells on 1st circle', () => {
		const spells = sheet.getSheetSpells().getSpells();
		expect(spells.size).toBe(2);
	});

	it('should have wisdom modifier on mana', () => {
		const manaFixedModifiers = sheet.getSheetManaPoints().getFixedModifiers();
		expect(manaFixedModifiers.get(RoleAbilityName.druidSpells)).toBeDefined();
	});
});
