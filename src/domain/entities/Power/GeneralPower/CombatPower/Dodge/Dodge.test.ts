import {vi} from 'vitest';
import {AddFixedModifierToDefense} from '../../../../Action/AddFixedModifierToDefense';
import {AddFixedModifierToSkill} from '../../../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {RaceAbilityName} from '../../../../Race/RaceAbilityName';
import {TransactionFake} from '../../../../Sheet/TransactionFake';
import {SkillName} from '../../../../Skill/SkillName';
import {GeneralPowerName} from '../../GeneralPowerName';
import {Dodge} from './Dodge';

describe('Dodge', () => {
	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		const transaction = new TransactionFake();
		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		dodge.addToSheet(transaction, RaceAbilityName.versatile);

		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToDefense({
			payload: {
				modifier: new FixedModifier(GeneralPowerName.dodge, 2),
			},
			transaction,
		}));
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		const transaction = new TransactionFake();
		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		dodge.addToSheet(transaction, RaceAbilityName.versatile);

		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			payload: {
				skill: SkillName.reflexes,
				modifier: new FixedModifier(GeneralPowerName.dodge, 2),
			},
			transaction,
		}));
	});

	it('should require dexterity +1', () => {
		const dodge = new Dodge();
		const transaction = new TransactionFake();
		expect(() => {
			dodge.addToSheet(transaction, RaceAbilityName.versatile);
			dodge.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});
});
