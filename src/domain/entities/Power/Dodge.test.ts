import type {Action} from '../CharacterAction';
import {CharacterFake} from '../CharacterFake';
import {SkillNameEnum} from '../Skill/SkillName';
import {Dodge} from './Dodge';
import {GeneralPowerNameEnum} from './GeneralPowerName';

describe('Dodge', () => {
	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		const character = new CharacterFake();
		dodge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith<[Action<'addOtherModifierToDefense'>]>({
			type: 'addOtherModifierToDefense',
			payload: {
				source: GeneralPowerNameEnum.dodge,
				value: 2,
			},
		});
	});

	it('should dispatch reflexes bonus', () => {
		const dodge = new Dodge();
		const character = new CharacterFake();
		dodge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith<[Action<'addOtherModifierToSkill'>]>({
			type: 'addOtherModifierToSkill',
			payload: {
				source: GeneralPowerNameEnum.dodge,
				skill: SkillNameEnum.reflexes,
				value: 2,
			},
		});
	});
});
