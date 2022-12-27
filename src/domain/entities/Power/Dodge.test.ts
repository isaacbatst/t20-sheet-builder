import {AddFixedModifierToDefense} from '../Action/AddFixedModifierToDefense';
import {AddFixedModifierToSkill} from '../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {RaceAbilityName} from '../RaceAbility/RaceAbilityName';
import {BuildingSheetFake} from '../Sheet/BuildingSheetFake';
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

		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToDefense({
			modifier: new FixedModifier(GeneralPowerName.dodge, 2),
		}));
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		sheet.attributes.dexterity = 1;
		dodge.addToSheet(sheet, dispatch, RaceAbilityName.versatile);

		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			skill: SkillName.reflexes,
			modifier: new FixedModifier(GeneralPowerName.dodge, 2),
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
