import {ApplyRoleAbility} from '../../Action/ApplyRoleAbility';
import {BuildingSheetFake} from '../../BuildingSheetFake';
import {RoleName} from '../RoleName';
import {SpecialAttack} from './SpecialAttack';

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
});
