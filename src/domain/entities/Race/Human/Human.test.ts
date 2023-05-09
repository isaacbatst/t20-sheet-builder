import {ApplyRaceAbility} from '../../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../../Action/ApplyRaceModifiers';
import {Dodge} from '../../Power/GeneralPower/CombatPower/Dodge/Dodge';
import {TransactionFake} from '../../Sheet/TransactionFake';
import {SkillName} from '../../Skill/SkillName';
import {RaceName} from '../RaceName';
import {Human} from './Human';
import {Versatile} from './Versatile/Versatile';
import type {VersatileChoice} from './Versatile/VersatileChoice';
import {VersatileChoicePower} from './Versatile/VersatileChoicePower';
import {VersatileChoiceSkill} from './Versatile/VersatileChoiceSkill';

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

		const transaction = new TransactionFake();
		human.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceModifiers({
			payload: {
				modifiers: {
					constitution: 1,
					dexterity: 1,
					strength: 1,
				},
			},
			transaction,
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

		const transaction = new TransactionFake();
		human.addToSheet(transaction);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(animalHandling);

		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceAbility({
			payload: {
				ability: versatile,
				source: RaceName.human,
			},
			transaction,
		}));
	});

	it('should apply versatile training chosen skill and power', () => {
		const acrobatics: VersatileChoice = new VersatileChoiceSkill(SkillName.acrobatics);
		const dodge = new VersatileChoicePower(new Dodge());

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [acrobatics, dodge]);

		const transaction = new TransactionFake();
		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		human.addToSheet(transaction);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(dodge);

		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceAbility({
			payload: {
				source: RaceName.human, ability: versatile,
			},
			transaction,
		}));
	});
});
