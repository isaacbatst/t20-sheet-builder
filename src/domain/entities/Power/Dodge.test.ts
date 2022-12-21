import {Modifier} from '../Modifier/Modifier';
import type {ActionInterface} from '../SheetActions';
import {SheetFake} from '../SheetFake';
import {SkillName} from '../Skill/SkillName';
import {Dodge} from './Dodge';
import {GeneralPowerNameEnum} from './GeneralPowerName';

describe('Dodge', () => {
	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		const sheet = new SheetFake();
		dodge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'addOtherModifierToDefense'>]>({
			type: 'addOtherModifierToDefense',
			payload: {
				modifier: new Modifier(GeneralPowerNameEnum.dodge, 2),
			},
		});
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		const sheet = new SheetFake();
		dodge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'addOtherModifierToSkill'>]>({
			type: 'addOtherModifierToSkill',
			payload: {
				skill: SkillName.reflexes,
				modifier: new Modifier(GeneralPowerNameEnum.dodge, 2),
			},
		});
	});
});
