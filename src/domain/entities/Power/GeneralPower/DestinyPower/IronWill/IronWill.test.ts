import {AddFixedModifierToSkill} from '../../../../Action/AddFixedModifierToSkill';
import {AddPerLevelModifierToManaPoints} from '../../../../Action/AddPerLevelModifierToManaPoints';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../../../Modifier/PerLevelModifier/PerLevelModifier';
import {OriginName} from '../../../../Origin/OriginName';
import {TransactionFake} from '../../../../Sheet/TransactionFake';
import {SkillName} from '../../../../Skill/SkillName';
import {GeneralPowerName} from '../../GeneralPowerName';
import {IronWill} from './IronWill';

describe('IronWill', () => {
	it('should require wisdom 1', () => {
		const ironWill = new IronWill();
		const transaction = new TransactionFake();
		expect(() => {
			ironWill.addToSheet(transaction, OriginName.acolyte);
			ironWill.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});

	it('should dispatch mana points modifier add', () => {
		const ironWill = new IronWill();
		const transaction = new TransactionFake();
		transaction.sheet.getSheetAttributes().getValues().wisdom = 1;
		ironWill.addToSheet(transaction, OriginName.acolyte);

		expect(transaction.run).toHaveBeenCalledWith(new AddPerLevelModifierToManaPoints({
			payload: {
				modifier: new PerLevelModifier(
					GeneralPowerName.ironWill,
					1,
					true,
					new Set(),
					2,
				),
			},
			transaction,
		}));
	});

	it('should dispatch will modifier add', () => {
		const ironWill = new IronWill();
		const transaction = new TransactionFake();
		transaction.sheet.getSheetAttributes().getValues().wisdom = 1;
		ironWill.addToSheet(transaction, OriginName.acolyte);

		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(GeneralPowerName.ironWill, 2),
				skill: SkillName.will,
			}, transaction,
		}));
	});
});
