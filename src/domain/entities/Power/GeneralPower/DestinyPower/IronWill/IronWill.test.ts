import {AddFixedModifierToSkill} from '../../../../Action/AddFixedModifierToSkill';
import {AddPerLevelModifierToManaPoints} from '../../../../Action/AddPerLevelModifierToManaPoints';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../../../Modifier/PerLevelModifier/PerLevelModifier';
import {OriginName} from '../../../../Origin/OriginName';
import {BuildingSheet} from '../../../../Sheet/BuildingSheet/BuildingSheet';
import {Transaction} from '../../../../Sheet/Transaction';
import {SkillName} from '../../../../Skill/SkillName';
import {GeneralPowerName} from '../../GeneralPowerName';
import {IronWill} from './IronWill';

describe('IronWill', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should require wisdom 1', () => {
		const ironWill = new IronWill();
		expect(() => {
			ironWill.addToSheet(transaction, OriginName.acolyte);
			ironWill.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});

	it('should dispatch mana points modifier add', () => {
		const ironWill = new IronWill();
		transaction.sheet.getSheetAttributes().getValues().wisdom = 1;
		ironWill.addToSheet(transaction, OriginName.acolyte);
		const manaModifier = sheet.getSheetManaPoints().getPerLevelModifiers().get(GeneralPowerName.ironWill);
		expect(manaModifier).toBeDefined();
		expect(manaModifier?.baseValue).toBe(1);
		expect(manaModifier?.includeFirstLevel).toBe(true);
		expect(manaModifier?.frequency).toBe(2);
	});

	it('should dispatch will modifier add', () => {
		const ironWill = new IronWill();
		transaction.sheet.getSheetAttributes().getValues().wisdom = 1;
		ironWill.addToSheet(transaction, OriginName.acolyte);
		const willModifier = sheet.getSkills()[SkillName.will].skill.fixedModifiers.get(GeneralPowerName.ironWill);
		expect(willModifier).toBeDefined();
		expect(willModifier?.baseValue).toBe(2);
	});
});
