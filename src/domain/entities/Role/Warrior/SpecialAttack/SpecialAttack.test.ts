import {ApplyRoleAbility} from '../../../Action/ApplyRoleAbility';
import {BuildingSheetFake} from '../../../Sheet/BuildingSheetFake';
import {SheetFake} from '../../../Sheet/SheetFake';
import {RoleName} from '../../RoleName';
import {SpecialAttack} from './SpecialAttack';
import {SpecialAttackEffectExecution} from './SpecialAttackEffectExecution';
import {SpecialAttackEffectExecutionRecipientAttack} from './SpecialAttackEffectExecutionRecipientAttack';
import {SpecialAttackManaCost} from './SpecialAttackManaCost';

describe('SpecialAttack', () => {
	it('should dispatch add', () => {
		const specialAttack = new SpecialAttack();
		const dispatch = jest.fn();
		const sheet = new BuildingSheetFake();
		specialAttack.addToSheet(sheet, dispatch, RoleName.warrior);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRoleAbility({
			ability: specialAttack,
			source: RoleName.warrior,
		}), sheet);
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
