import {CharacterFake} from '../../CharacterFake';
import type {InMapCharacter} from '../../CharacterInterface';
import {Vision} from '../../Vision';
import {RaceAbilityNameEnum} from '../RaceAbilityName';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.getVision()).toBe(Vision.dark);
	});

	it('should provide +2 at perception and survival', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		const {perception, survival} = character.getSkills();

		expect(perception.modifierOthers.modifiers[0]).toEqual(
			expect.objectContaining({
				sourceName: RaceAbilityNameEnum.rockKnowledge,
				value: 2,
			}),
		);

		expect(survival.modifierOthers.modifiers[0]).toEqual(
			expect.objectContaining({
				sourceName: RaceAbilityNameEnum.rockKnowledge,
				value: 2,
			}),
		);
	});
});
