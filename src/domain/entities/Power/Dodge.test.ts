import type {ActionInterface} from '../CharacterAction';
import {CharacterFake} from '../CharacterFake';
import {SkillName} from '../Skill/SkillName';
import {Dodge} from './Dodge';
import {GeneralPowerNameEnum} from './GeneralPowerName';

describe('Dodge', () => {
	it('should dispatch defense bonus', () => {
		const dodge = new Dodge();
		const character = new CharacterFake();
		dodge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith<[ActionInterface<'addOtherModifierToDefense'>]>({
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

		expect(character.dispatch).toHaveBeenCalledWith<[ActionInterface<'addOtherModifierToSkill'>]>({
			type: 'addOtherModifierToSkill',
			payload: {
				source: GeneralPowerNameEnum.dodge,
				skill: SkillName.reflexes,
				value: 2,
			},
		});
	});
});
