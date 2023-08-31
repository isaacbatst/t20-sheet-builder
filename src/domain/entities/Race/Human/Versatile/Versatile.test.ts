import {vi} from 'vitest';
import {Dodge} from '../../../Power/GeneralPower/CombatPower/Dodge/Dodge';
import {SwordAndShieldStyle} from '../../../Power/GeneralPower/CombatPower/FightStyle/SwordAndShieldStyle';
import {TwoHandsStyle} from '../../../Power/GeneralPower/CombatPower/FightStyle/TwoHandsStyle';
import {SkillName} from '../../../Skill/SkillName';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RaceName} from '../../RaceName';
import {Versatile} from './Versatile';
import {VersatileChoicePower} from './VersatileChoicePower';
import {VersatileChoiceSkill} from './VersatileChoiceSkill';
import {TrainSkill} from '../../../Action/TrainSkill';
import {PickGeneralPower} from '../../../Action/PickGeneralPower';
import {BuildingSheet} from '../../../Sheet';
import {Transaction} from '../../../Sheet/Transaction';
import {GeneralPowerName} from '../../../Power/GeneralPower/GeneralPowerName';

describe('Versatile', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should add choice', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));

		expect(versatile.effects.passive.default.choices).toEqual([new VersatileChoiceSkill(SkillName.acrobatics)]);
	});

	it('should not add repeated choice', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));

		expect(() => {
			versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		}).toThrowError('REPEATED_VERSATILE_CHOICE');
	});

	it('should not allow more than two choices', () => {
		const versatile = new Versatile();

		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		versatile.addChoice(new VersatileChoiceSkill(SkillName.animalHandling));

		expect(() => {
			versatile.addChoice(new VersatileChoiceSkill(SkillName.fight));
		}).toThrow('EXCEEDED_CHOICES_QUANTITY');
	});

	it('should not allow 2 powers', () => {
		const versatile = new Versatile();

		versatile.addChoice(new VersatileChoicePower(new TwoHandsStyle()));

		expect(() => {
			versatile.addChoice(new VersatileChoicePower(new SwordAndShieldStyle()));
		}).toThrow('FORBIDDEN_TWO_POWERS');
	});

	it('should allow 1 power and 1 skill', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		versatile.addChoice(new VersatileChoicePower(new TwoHandsStyle()));

		expect(versatile.effects.passive.default.choices).toEqual([
			new VersatileChoiceSkill(SkillName.acrobatics),
			new VersatileChoicePower(new TwoHandsStyle()),
		]);
	});

	it('should not allow apply without choices', () => {
		const versatile = new Versatile();
		expect(() => {
			versatile.addToSheet(transaction);
		}).toThrow('MISSING_CHOICES');
	});

	it('should train chosen skills', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		versatile.addChoice(new VersatileChoiceSkill(SkillName.animalHandling));
		versatile.addToSheet(transaction);

		const firstChoice = sheet.getSkills()[SkillName.acrobatics];
		const secondChoice = sheet.getSkills()[SkillName.animalHandling];

		expect(firstChoice.skill.getIsTrained()).toBe(true);
		expect(secondChoice.skill.getIsTrained()).toBe(true);
	});

	it('should apply chosen power', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		versatile.addChoice(new VersatileChoicePower(new Dodge()));
		transaction.sheet.getSheetAttributes().getValues().dexterity = 1;
		versatile.addToSheet(transaction);

		const firstChoice = sheet.getSkills()[SkillName.acrobatics];
		const secondChoice = sheet.getSheetPowers().getGeneralPowers().get(GeneralPowerName.dodge);
		expect(firstChoice.skill.getIsTrained()).toBe(true);
		expect(secondChoice).toBeDefined();
	});
});
