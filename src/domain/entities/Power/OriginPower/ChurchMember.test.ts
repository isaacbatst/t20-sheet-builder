import {RolePlayEffect} from '../../Ability/RolePlayEffect';
import {AddRolePlayEffect} from '../../Action/AddRolePlayEffect';
import {SheetBaseFake} from '../../Sheet/SheetBaseFake';
import {ChurchMember} from './ChurchMember';
import {OriginPowerName} from './OriginPowerName';

describe('ChurchMember', () => {
	it('should dispatch role play effect add', () => {
		const churchMember = new ChurchMember();
		const sheet = new SheetBaseFake();
		const dispatch = jest.fn();

		churchMember.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new AddRolePlayEffect({
			effect: new RolePlayEffect(OriginPowerName.churchMember, expect.any(String)),
		}), sheet);
	});
});
