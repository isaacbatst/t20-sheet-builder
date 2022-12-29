import type {ActionInterface} from '../../Sheet/SheetActions';
import {BuildingSheetFake} from '../../Sheet/BuildingSheetFake';
import {Dodge} from '../../Power/Dodge';
import {GeneralPowerName} from '../../Power/GeneralPowerName';
import {SkillName} from '../../Skill/SkillName';
import {RaceAbilityName} from '../RaceAbilityName';
import {Versatile} from './Versatile';
import {RaceName} from '../../Race/RaceName';
import {VersatileChoice} from './VersatileChoice';
import {VersatileChoiceSkill} from './VersatileChoiceSkill';
import {VersatileChoicePower} from './VersatileChoicePower';
import {TwoHandsStyle} from '../../Power/TwoHandsStyle';
import {SwordAndShieldStyle} from '../../Power/SwordAndShieldStyle';

describe('Versatile', () => {
	it('should add choice', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));

		expect(versatile.effects.default.choices).toEqual([new VersatileChoiceSkill(SkillName.acrobatics)]);
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

		expect(versatile.effects.default.choices).toEqual([
			new VersatileChoiceSkill(SkillName.acrobatics),
			new VersatileChoicePower(new TwoHandsStyle()),
		]);
	});

	it('should not allow apply without choices', () => {
		const versatile = new Versatile();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		expect(() => {
			versatile.addToSheet(sheet, dispatch, RaceName.human);
		}).toThrow('MISSING_CHOICES');
	});

	it('should train chosen skills', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		versatile.addChoice(new VersatileChoiceSkill(SkillName.animalHandling));

		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		versatile.addToSheet(sheet, dispatch, RaceName.human);

		expect(dispatch).toHaveBeenCalledWith({
			type: 'trainSkill',
			payload: {
				name: SkillName.acrobatics,
				source: RaceAbilityName.versatile,
			},
		}, sheet);

		expect(dispatch).toHaveBeenCalledWith({
			type: 'trainSkill',
			payload: {
				name: SkillName.acrobatics,
				source: RaceAbilityName.versatile,
			},
		}, sheet);
	});

	it('should apply chosen power', () => {
		const versatile = new Versatile();
		versatile.addChoice(new VersatileChoiceSkill(SkillName.acrobatics));
		versatile.addChoice(new VersatileChoicePower(new Dodge()));

		const sheet = new BuildingSheetFake();
		sheet.attributes.dexterity = 1;
		const dispatch = jest.fn();
		versatile.addToSheet(sheet, dispatch, RaceName.human);

		expect(dispatch).toHaveBeenCalledWith({
			type: 'trainSkill',
			payload: {
				name: SkillName.acrobatics,
				source: RaceAbilityName.versatile,
			},
		}, sheet);

		expect(dispatch).toHaveBeenCalledWith({
			type: 'pickGeneralPower',
			payload: {
				power: new Dodge(),
				source: RaceAbilityName.versatile,
			},
		}, sheet);
	});
});
