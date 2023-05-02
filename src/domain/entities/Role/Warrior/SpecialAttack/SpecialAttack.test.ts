import {ApplyRoleAbility} from '../../../Action/ApplyRoleAbility';
import {BuildingSheetFake} from '../../../Sheet/BuildingSheetFake';
import {RoleName} from '../../RoleName';
import {SpecialAttack} from './SpecialAttack';
import {vi} from 'vitest';

describe('SpecialAttack', () => {
	it('should dispatch add', () => {
		const specialAttack = new SpecialAttack();
		const dispatch = vi.fn();
		const sheet = new BuildingSheetFake();
		specialAttack.addToSheet(sheet, dispatch, RoleName.warrior);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRoleAbility({
			ability: specialAttack,
			source: RoleName.warrior,
		}), sheet);
	});
});
