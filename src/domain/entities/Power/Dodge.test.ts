import {Modifier} from '../Modifier/Modifier';
import type {ActionInterface} from '../SheetActions';
import {BuildingSheetFake} from '../SheetFake';
import {SkillName} from '../Skill/SkillName';
import {Dodge} from './Dodge';
import {GeneralPowerName} from './GeneralPowerName';

describe('Dodge', () => {
	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();
		sheet.attributes.dexterity = 1;
		dodge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'addOtherModifierToDefense'>]>({
			type: 'addOtherModifierToDefense',
			payload: {
				modifier: new Modifier(GeneralPowerName.dodge, 2),
			},
		});
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();
		sheet.attributes.dexterity = 1;
		dodge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'addOtherModifierToSkill'>]>({
			type: 'addOtherModifierToSkill',
			payload: {
				skill: SkillName.reflexes,
				modifier: new Modifier(GeneralPowerName.dodge, 2),
			},
		});
	});

	it('should require dexterity +1', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();

		expect(() => {
			dodge.apply(sheet);
		}).toThrow('REQUIREMENT_NOT_ACHIEVED');
	});
});
