import {CharacterFake} from '../CharacterFake';
import {ProgressionStep} from '../ProgressionStep';
import {Step} from '../ActionDescriptionGenerator/ActionDescriptionGenerator';
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

	it('should apply +2 to reflexes skill', () => {
		const dodge = new Dodge();
		const character = new CharacterFake();
		dodge.apply(character);

		const skills = character.getSkills();

		expect(skills.reflexes.modifierOthers.getTotal()).toBe(2);
	});

	it('should save dodge appliance step', () => {
		const dodge = new Dodge();
		const character = new CharacterFake();
		dodge.apply(character);

		expect(character.progressionSteps)
			.toContainEqual(new ProgressionStep(Step.dodgeAppliance, character));
	});
});
