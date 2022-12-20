import {CharacterFake} from '../../CharacterFake';
import {InGameContext} from '../../InGameContext';
import {Vision} from '../../Vision';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.getVision()).toBe(Vision.dark);
	});

	it('should not activate +2 at perception and survival in build context', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		const {perception, survival} = character.getSkills();

		expect(perception.getTotal()).toBe(0);
		expect(survival.getTotal()).toBe(0);
	});

	it('should not activate +2 at perception and survival in game context outside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		character.context = new InGameContext({isUnderground: false});
		rockKnowledge.apply(character);

		const {perception, survival} = character.getSkills();
		const level = character.getLevel();
		const context = character.getContext();

		expect(perception.getTotal(level, context)).toBe(0);
		expect(survival.getTotal(level, context)).toBe(0);
	});

	it('should activate +2 at perception and survival in game context inside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		character.context = new InGameContext({isUnderground: true});
		rockKnowledge.apply(character);

		const {perception, survival} = character.getSkills();
		const level = character.getLevel();
		const context = character.getContext();

		expect(perception.getTotal(level, context)).toBe(2);
		expect(survival.getTotal(level, context)).toBe(2);
	});
});
