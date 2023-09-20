import {BuildingSheet} from '../../../../Sheet/BuildingSheet/BuildingSheet';
import {Transaction} from '../../../../Sheet/Transaction';
import {SkillName} from '../../../../Skill/SkillName';
import {GeneralPowerName} from '../../GeneralPowerName';
import {Dodge} from './Dodge';

describe('Dodge', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		dodge.addToSheet(transaction);
		const defenseModifier = sheet.getSheetDefense().getDefense().fixedModifiers.get(GeneralPowerName.dodge);
		expect(defenseModifier).toBeDefined();
		expect(defenseModifier?.baseValue).toBe(2);
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		dodge.addToSheet(transaction);
		const skillModifier = sheet.getSkills()[SkillName.reflexes].skill.fixedModifiers.get(GeneralPowerName.dodge);
		expect(skillModifier).toBeDefined();
		expect(skillModifier?.baseValue).toBe(2);
	});

	it('should require dexterity +1', () => {
		const dodge = new Dodge();
		expect(() => {
			dodge.addToSheet(transaction);
			dodge.verifyRequirements(transaction.sheet);
		}).toThrow('Requisito não preenchido: Destreza +1');
	});
});
