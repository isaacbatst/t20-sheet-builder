import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {OriginName} from '../../Origin/OriginName';
import {SheetBaseFake} from '../../Sheet/SheetBaseFake';
import {SkillName} from '../../Skill/SkillName';
import {OriginPowerName} from './OriginPowerName';
import {SpecialFriend} from './SpecialFriend';

describe('SpecialFriend', () => {
	it('should dispatch animalHandling modifier add', () => {
		const specialFriend = new SpecialFriend(SkillName.acrobatics);
		const sheet = new SheetBaseFake();
		const dispatch = jest.fn();
		specialFriend.addToSheet(sheet, dispatch);
		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			modifier: new FixedModifier(OriginPowerName.specialFriend, 5),
			skill: SkillName.animalHandling,
		}), sheet);
	});

	it('should dispatch custom skill modifier add', () => {
		const specialFriend = new SpecialFriend(SkillName.acrobatics);
		const sheet = new SheetBaseFake();
		const dispatch = jest.fn();
		specialFriend.addToSheet(sheet, dispatch);
		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			modifier: new FixedModifier(OriginPowerName.specialFriend, 2),
			skill: SkillName.acrobatics,
		}), sheet);
	});

	it('should not allow custom skill to be fight', () => {
		expect(() => {
			const specialFriend = new SpecialFriend(SkillName.fight);
		}).toThrow('INVALID_SKILL');
	});

	it('should not allow custom skill to be aim', () => {
		expect(() => {
			const specialFriend = new SpecialFriend(SkillName.aim);
		}).toThrow('INVALID_SKILL');
	});
});
