import type {Attributes} from '../Attributes';
import {CharacterFake} from '../CharacterFake';
import {SkillNameEnum} from '../Skill/SkillName';
import {Human} from './Human';

describe('Human', () => {
	it('should apply +1 to strength, dexterity and constitution', () => {
		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		]);

		const attributes = human.applyAttributesModifiers({
			strength: 0,
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			wisdom: 0,
		});

		expect(attributes).toEqual<Attributes>({
			charisma: 0,
			constitution: 1,
			dexterity: 1,
			intelligence: 0,
			strength: 1,
			wisdom: 0,
		});
	});

	it('should throw error with more than 3 selections', () => {
		expect(() => {
			const human = new Human([
				'constitution',
				'dexterity',
				'strength',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with less than 3 selections', () => {
		expect(() => {
			const human = new Human([
				'constitution',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with repeated attributes', () => {
		expect(() => {
			const human = new Human([
				'constitution',
				'charisma',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should add skills with versatile', () => {
		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [
			{
				name: SkillNameEnum.acrobacia,
				type: 'skill',
			},
		]);

		expect(human.versatileChoices).toContainEqual({
			name: SkillNameEnum.acrobacia,
			type: 'skill',
		});
	});

	it('should apply versatile training chosen skills', () => {
		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [
			{
				name: SkillNameEnum.acrobacia,
				type: 'skill',
			},
			{
				name: SkillNameEnum.adestramento,
				type: 'skill',
			},
		]);

		const character = new CharacterFake();
		human.applyAbilities(character);
		const trainedSkills = character.getTrainedSkills();

		expect(trainedSkills).toContain(SkillNameEnum.acrobacia);
		expect(trainedSkills).toContain(SkillNameEnum.adestramento);
	});
});
