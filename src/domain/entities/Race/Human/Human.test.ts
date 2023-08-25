import {GeneralPowerName} from '../../Power';
import {Dodge} from '../../Power/GeneralPower/CombatPower/Dodge/Dodge';
import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {Human} from './Human';
import {Versatile} from './Versatile/Versatile';
import type {VersatileChoice} from './Versatile/VersatileChoice';
import {VersatileChoicePower} from './Versatile/VersatileChoicePower';
import {VersatileChoiceSkill} from './Versatile/VersatileChoiceSkill';

describe('Human', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

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

		human.addToSheet(transaction);

		expect(sheet.getSheetAttributes().getValues()).toEqual({
			strength: 1,
			dexterity: 1,
			constitution: 1,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
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

		human.addToSheet(transaction);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(animalHandling);

		const skills = sheet.getSkills();
		expect(skills[SkillName.acrobatics].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.animalHandling].skill.getIsTrained()).toBe(true);
	});

	it('should apply versatile training chosen skill and power', () => {
		const acrobatics: VersatileChoice = new VersatileChoiceSkill(SkillName.acrobatics);
		const dodge = new VersatileChoicePower(new Dodge());

		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		], [acrobatics, dodge]);

		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		human.addToSheet(transaction);

		const versatile = new Versatile();
		versatile.addChoice(acrobatics);
		versatile.addChoice(dodge);

		const skills = sheet.getSkills();
		const powers = sheet.getSheetPowers().getGeneralPowers();
		expect(skills[SkillName.acrobatics].skill.getIsTrained()).toBe(true);
		expect(powers.get(GeneralPowerName.dodge)).toBeDefined();
	});
});
