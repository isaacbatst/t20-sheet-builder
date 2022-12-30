import {AddFixedModifierToSkill} from '../Action/AddFixedModifierToSkill';
import {AddPerLevelModifierToManaPoints} from '../Action/AddPerLevelModifierToManaPoints';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../Modifier/PerLevelModifier/PerLevelModifier';
import {OriginName} from '../Origin/OriginName';
import {SheetBaseFake} from '../Sheet/SheetBaseFake';
import {SkillName} from '../Skill/SkillName';
import {GeneralPowerName} from './GeneralPowerName';
import {IronWill} from './IronWill';

describe('IronWill', () => {
	it('should require wisdom 1', () => {
		const ironWill = new IronWill();
		const sheet = new SheetBaseFake();

		expect(() => {
			ironWill.addToSheet(sheet, jest.fn(), OriginName.acolyte);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});

	it('should dispatch mana points modifier add', () => {
		const ironWill = new IronWill();
		const sheet = new SheetBaseFake();
		sheet.attributes.wisdom = 1;
		const dispatch = jest.fn();
		ironWill.addToSheet(sheet, dispatch, OriginName.acolyte);

		expect(dispatch).toHaveBeenCalledWith(new AddPerLevelModifierToManaPoints({
			modifier: new PerLevelModifier(
				GeneralPowerName.ironWill,
				1,
				true,
				new Set(),
				2,
			),
		}), sheet);
	});

	it('should dispatch will modifier add', () => {
		const ironWill = new IronWill();
		const sheet = new SheetBaseFake();
		sheet.attributes.wisdom = 1;
		const dispatch = jest.fn();
		ironWill.addToSheet(sheet, dispatch, OriginName.acolyte);

		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			modifier: new FixedModifier(GeneralPowerName.ironWill, 2),
			skill: SkillName.will,
		}), sheet);
	});
});
