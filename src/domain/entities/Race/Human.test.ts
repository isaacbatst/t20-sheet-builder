import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import {SheetFake} from '../SheetFake';
import {GeneralPowerNameEnum} from '../Power/GeneralPowerName';
import type {VersatileChoice} from '../RaceAbility/Human/Versatile';
import {Versatile} from '../RaceAbility/Human/Versatile';
import {SkillName} from '../Skill/SkillName';
import {Human} from './Human';

describe('Human', () => {
	it('should apply +1 to strength, dexterity and constitution', () => {
		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		]);

		const sheet = new SheetFake();

		human.applyAttributesModifiers({
			strength: 0,
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			wisdom: 0,
		}, sheet.dispatch);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceModifiers({
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
		}));
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
				name: SkillName.acrobatics,
				type: 'skill',
			},
		]);

		expect(human.versatileChoices).toContainEqual({
			name: SkillName.acrobatics,
			type: 'skill',
		});
	});

	it('should apply versatile with chosen skills', () => {
		const acrobatics: VersatileChoice = {
			name: SkillName.acrobatics,
			type: 'skill',
		};
		const animalHandling: VersatileChoice = {
			name: SkillName.animalHandling,
			type: 'skill',
		};

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [
			acrobatics,
			animalHandling,
		]);

		const sheet = new SheetFake();
		human.applyAbilities(sheet);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(animalHandling);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: versatile,
		}));
	});

	it('should apply versatile training chosen skill and power', () => {
		const acrobatics: VersatileChoice = {
			name: SkillName.acrobatics,
			type: 'skill',
		};
		const dodge: VersatileChoice = {
			name: GeneralPowerNameEnum.dodge,
			type: 'power',
		};

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [acrobatics, dodge]);

		const sheet = new SheetFake();
		human.applyAbilities(sheet);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(dodge);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: versatile,
		}));
	});
});
