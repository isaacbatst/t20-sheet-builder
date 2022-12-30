import {ApplyRaceAbility} from '../../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../../Action/ApplyRaceModifiers';
import {BuildingSheetFake} from '../../Sheet/BuildingSheetFake';
import {GeneralPowerName} from '../../Power/GeneralPowerName';
import {Versatile} from './Versatile/Versatile';
import {SkillName} from '../../Skill/SkillName';
import {Human} from './Human';
import {RaceName} from '../RaceName';
import {VersatileChoiceSkill} from './Versatile/VersatileChoiceSkill';
import type {VersatileChoice} from './Versatile/VersatileChoice';
import {VersatileChoicePower} from './Versatile/VersatileChoicePower';
import {Dodge} from '../../Power/Dodge';

describe('Human', () => {
	it('should apply +1 to strength, dexterity and constitution', () => {
		const acrobatics = new VersatileChoiceSkill(SkillName.acrobatics);
		const animalHandling = new VersatileChoiceSkill(SkillName.animalHandling);

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		]);
		human.addVersatilChoice(acrobatics);
		human.addVersatilChoice(animalHandling);

		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		human.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceModifiers({
			modifiers: {
				constitution: 1,
				dexterity: 1,
				strength: 1,
			},
			updatedAttributes: {
				constitution: 1,
				dexterity: 1,
				strength: 1,
			},
		}), sheet);
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
			new VersatileChoiceSkill(SkillName.acrobatics),
		]);

		expect(human.versatileChoices).toContainEqual(new VersatileChoiceSkill(SkillName.acrobatics));
	});

	it('should apply versatile with chosen skills', () => {
		const acrobatics: VersatileChoice = new VersatileChoiceSkill(SkillName.acrobatics);
		const animalHandling: VersatileChoice = new VersatileChoiceSkill(SkillName.animalHandling);

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [
			acrobatics,
			animalHandling,
		]);

		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		human.addToSheet(sheet, dispatch);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(animalHandling);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: versatile,
			source: RaceName.human,
		}), sheet);
	});

	it('should apply versatile training chosen skill and power', () => {
		const acrobatics: VersatileChoice = new VersatileChoiceSkill(SkillName.acrobatics);
		const dodge = new VersatileChoicePower(new Dodge());

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [acrobatics, dodge]);

		const sheet = new BuildingSheetFake();
		sheet.attributes.dexterity = 1;
		const dispatch = jest.fn();
		human.addToSheet(sheet, dispatch);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(dodge);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			source: RaceName.human, ability: versatile,
		}), sheet);
	});
});
