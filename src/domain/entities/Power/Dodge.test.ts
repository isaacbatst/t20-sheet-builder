import {CharacterFake} from '../CharacterFake';
import {Dodge} from './Dodge';
import {GeneralPowerNameEnum} from './GeneralPowerName';

describe('Dodge', () => {
	it('should apply +2 to defense', () => {
		const dodge = new Dodge();

		const character = new CharacterFake();

		dodge.apply(character);

		expect(character.getDefenseOtherModifiers()).toContainEqual({
			sourceName: GeneralPowerNameEnum.dodge,
			value: 2,
		});
	});
});
