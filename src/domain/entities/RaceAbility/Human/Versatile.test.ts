import type {ActionInterface} from '../../SheetActions';
import {BuildingSheetFake} from '../../SheetFake';
import {Dodge} from '../../Power/Dodge';
import {GeneralPowerName} from '../../Power/GeneralPowerName';
import {SkillName} from '../../Skill/SkillName';
import {RaceAbilityName} from '../RaceAbilityName';
import {Versatile} from './Versatile';

describe('Versatile', () => {
	it('should add choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillName.acrobatics});

		expect(versatile.choices).toEqual([{type: 'skill', name: SkillName.acrobatics}]);
	});

	it('should not add repeated choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillName.acrobatics});

		expect(() => {
			versatile.addChoice({type: 'skill', name: SkillName.acrobatics});
		}).toThrowError('REPEATED_VERSATILE_CHOICE');
	});

	it('should not allow more than two choices', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'skill', name: SkillName.acrobatics});
		versatile.addChoice({type: 'skill', name: SkillName.animalHandling});

		expect(() => {
			versatile.addChoice({type: 'skill', name: SkillName.fight});
		}).toThrow('EXCEEDED_CHOICES_QUANTITY');
	});

	it('should not allow 2 powers', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'power', name: GeneralPowerName.twoHandsStyle});

		expect(() => {
			versatile.addChoice({type: 'power', name: GeneralPowerName.swordAndShieldStyle});
		}).toThrow('FORBIDDEN_TWO_POWERS');
	});

	it('should allow 1 power and 1 skill', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillName.acrobatics});
		versatile.addChoice({type: 'power', name: GeneralPowerName.twoHandsStyle});

		expect(versatile.choices).toEqual([
			{type: 'skill', name: SkillName.acrobatics},
			{type: 'power', name: GeneralPowerName.twoHandsStyle},
		]);
	});

	it('should not allow apply without choices', () => {
		const versatile = new Versatile();
		const sheet = new BuildingSheetFake();
		expect(() => {
			versatile.apply(sheet);
		}).toThrow('MISSING_CHOICES');
	});

	it('should train chosen skills', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillName.acrobatics});
		versatile.addChoice({type: 'skill', name: SkillName.animalHandling});

		const sheet = new BuildingSheetFake();
		versatile.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'trainSkill'>]>({
			type: 'trainSkill',
			payload: {
				name: SkillName.acrobatics,
				source: RaceAbilityName.versatile,
			},
		});

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'trainSkill'>]>({
			type: 'trainSkill',
			payload: {
				name: SkillName.acrobatics,
				source: RaceAbilityName.versatile,
			},
		});
	});

	it('should apply chosen power', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillName.acrobatics});
		versatile.addChoice({type: 'power', name: GeneralPowerName.dodge});

		const sheet = new BuildingSheetFake();
		versatile.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'trainSkill'>]>({
			type: 'trainSkill',
			payload: {
				name: SkillName.acrobatics,
				source: RaceAbilityName.versatile,
			},
		});

		expect(sheet.dispatch).toHaveBeenCalledWith<[ActionInterface<'pickPower'>]>({
			type: 'pickPower',
			payload: {
				power: new Dodge(),
				source: RaceAbilityName.versatile,
			},
		});
	});
});
