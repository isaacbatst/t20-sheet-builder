import {ApplyRoleAbility} from '../../../Action/ApplyRoleAbility';
import {BuildingSheetFake} from '../../../Sheet/BuildingSheetFake';
import {SheetFake} from '../../../Sheet/SheetFake';
import {SpecialAttack} from './SpecialAttack';
import {SpecialAttackEffectExecution} from './SpecialAttackEffectExecution';
import {SpecialAttackEffectExecutionRecipientAttack} from './SpecialAttackEffectExecutionRecipientAttack';
import {SpecialAttackManaCost} from './SpecialAttackManaCost';
import {RoleName} from '../../RoleName';

describe('SpecialAttack', () => {
	it('should dispatch add', () => {
		const specialAttack = new SpecialAttack();
		const dispatch = jest.fn();
		specialAttack.addToSheet(new BuildingSheetFake(), dispatch, RoleName.warrior);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRoleAbility({
			ability: specialAttack,
			source: RoleName.warrior,
		}));
	});

	it('should add attack modifier', () => {
		const specialAttack = new SpecialAttack();
		const sheet = new SheetFake();
		const execution = new SpecialAttackEffectExecution(
			new SpecialAttackEffectExecutionRecipientAttack(),
			new SpecialAttackManaCost(1),
			1,
		);
		specialAttack.effects.plusFour.activate(sheet, execution);
	});
});
