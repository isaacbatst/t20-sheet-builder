import {AddOtherModifierToDefense} from '../Action/AddOtherModifierToDefense';
import {AddOtherModifierToSkill} from '../Action/AddOtherModifierToSkill';
import {BuildingSheetFake} from '../Sheet/BuildingSheetFake';
import {Modifier} from '../Modifier/Modifier';
import {RaceAbilityName} from '../RaceAbility/RaceAbilityName';
import {SkillName} from '../Skill/SkillName';
import {Dodge} from './Dodge';
import {GeneralPowerName} from './GeneralPowerName';

describe('Dodge', () => {
	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		sheet.attributes.dexterity = 1;
		dodge.addToSheet(sheet, dispatch, RaceAbilityName.versatile);

		expect(dispatch).toHaveBeenCalledWith(new AddOtherModifierToDefense({
			modifier: new Modifier(GeneralPowerName.dodge, 2),
		}));
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		sheet.attributes.dexterity = 1;
		dodge.addToSheet(sheet, dispatch, RaceAbilityName.versatile);

		expect(dispatch).toHaveBeenCalledWith(new AddOtherModifierToSkill({
			skill: SkillName.reflexes,
			modifier: new Modifier(GeneralPowerName.dodge, 2),
		}));
	});

	it('should require dexterity +1', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		expect(() => {
			dodge.addToSheet(sheet, dispatch, RaceAbilityName.versatile);
		}).toThrow('REQUIREMENT_NOT_ACHIEVED');
	});
});
