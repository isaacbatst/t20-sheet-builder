import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill';
import {SpellCircle, SpellName} from '../../Spell';
import {CureWounds} from '../../Spell/Divine/CureWounds';
import {DivineProtection} from '../../Spell/Divine/DivineProtection';
import {FaithShield} from '../../Spell/Divine/FaithShield';
import {RoleAbilityName} from '../RoleAbilityName';
import {Cleric} from './Cleric';

describe('Cleric', () => {
	let cleric: Cleric;
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		cleric = new Cleric([
			[SkillName.knowledge, SkillName.cure],
		], [
			new FaithShield(),
			new DivineProtection(),
			new CureWounds(),
		]);
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);

		cleric.addToSheet(transaction);
	});

	it('should have faithful devote ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.faithfulDevote)).toBeDefined();
	});

	it('should allow 2 granted powers as faithfull devote', () => {
		const devotion = sheet.getSheetDevotion();
		expect(devotion.getGrantedPowerCount()).toBe(2);
	});

	it('should have spells ability', () => {
		const roleAbilities = sheet.getSheetAbilities().getRoleAbilities();
		expect(roleAbilities.get(RoleAbilityName.clericSpells)).toBeDefined();
	});

	it('should be learn first level divine spells', () => {
		const spells = sheet.getSheetSpells();
		expect(spells.getLearnedCircles().divine).toContain(SpellCircle.first);
	});

	it('should learn initial spells', () => {
		const spells = sheet.getSheetSpells().getSpells();
		expect(spells.has(SpellName.faithShield)).toBe(true);
		expect(spells.has(SpellName.divineProtection)).toBe(true);
		expect(spells.has(SpellName.cureWounds)).toBe(true);
	});

	it('should have wisdom mana bonus', () => {
		const mana = sheet.getSheetManaPoints();
		const modifier = mana.getFixedModifiers().get(RoleAbilityName.clericSpells);
		expect(modifier?.attributeBonuses).toContain('wisdom');
	});
});
