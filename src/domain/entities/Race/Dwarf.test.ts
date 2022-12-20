import type {Attributes} from '../Attributes';
import {CharacterFake} from '../CharacterFake';
import {InGameContext} from '../InGameContext';
import {Vision} from '../Vision';
import {Dwarf} from './Dwarf';

describe('Dwarf', () => {
	it('should apply +2 to constitution, +1 to wistom and -1 to dexterity', () => {
		const dwarf = new Dwarf();

		const attributes = dwarf.applyAttributesModifiers({
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			strength: 0,
			wisdom: 0,
		});

		expect(attributes).toEqual<Attributes>({
			strength: 0,
			dexterity: -1,
			constitution: 2,
			intelligence: 0,
			wisdom: 1,
			charisma: 0,
		});
	});

	it('should apply night vision', () => {
		const dwarf = new Dwarf();
		const character = new CharacterFake();
		dwarf.applyAbilities(character);

		expect(character.getVision()).toBe(Vision.dark);
	});

	it('should not activate +2 at perception and survival in build context', () => {
		const dwarf = new Dwarf();
		const character = new CharacterFake();
		dwarf.applyAbilities(character);

		const {perception, survival} = character.getSkills();

		expect(perception.getTotal()).toBe(0);
		expect(survival.getTotal()).toBe(0);
	});

	it('should not activate +2 at perception and survival in game context outside underground', () => {
		const dwarf = new Dwarf();
		const character = new CharacterFake();
		character.context = new InGameContext({isUnderground: false});
		dwarf.applyAbilities(character);

		const {perception, survival} = character.getSkills();

		expect(perception.getTotal()).toBe(0);
		expect(survival.getTotal()).toBe(0);
	});

	it('should activate +2 at perception and survival in game context in the underground', () => {
		const dwarf = new Dwarf();
		const character = new CharacterFake();
		character.context = new InGameContext({isUnderground: true});
		dwarf.applyAbilities(character);

		const {perception, survival} = character.getSkills();

		expect(perception.getTotal(1, character.context)).toBe(2);
		expect(survival.getTotal(1, character.context)).toBe(2);
	});
});
