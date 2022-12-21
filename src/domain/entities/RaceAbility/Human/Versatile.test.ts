import type {ActionInterface} from '../../CharacterAction';
import {CharacterFake} from '../../CharacterFake';
import {Dodge} from '../../Power/Dodge';
import {GeneralPowerNameEnum} from '../../Power/GeneralPowerName';
import {SkillNameEnum} from '../../Skill/SkillName';
import {RaceAbilityNameEnum} from '../RaceAbilityName';
import {Versatile} from './Versatile';

describe('Versatile', () => {
	it('should add choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});

		expect(versatile.choices).toEqual([{type: 'skill', name: SkillNameEnum.acrobatics}]);
	});

	it('should not add repeated choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});

		expect(() => {
			versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});
		}).toThrowError('REPEATED_VERSATILE_CHOICE');
	});

	it('should not allow more than two choices', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});
		versatile.addChoice({type: 'skill', name: SkillNameEnum.animalHandling});

		expect(() => {
			versatile.addChoice({type: 'skill', name: SkillNameEnum.fight});
		}).toThrow('EXCEEDED_CHOICES_QUANTITY');
	});

	it('should not allow 2 powers', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'power', name: GeneralPowerNameEnum.twoHandsStyle});

		expect(() => {
			versatile.addChoice({type: 'power', name: GeneralPowerNameEnum.swordAndShieldStyle});
		}).toThrow('FORBIDDEN_TWO_POWERS');
	});

	it('should allow 1 power and 1 skill', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});
		versatile.addChoice({type: 'power', name: GeneralPowerNameEnum.twoHandsStyle});

		expect(versatile.choices).toEqual([
			{type: 'skill', name: SkillNameEnum.acrobatics},
			{type: 'power', name: GeneralPowerNameEnum.twoHandsStyle},
		]);
	});

	it('should not allow apply without choices', () => {
		const versatile = new Versatile();
		const character = new CharacterFake();
		expect(() => {
			versatile.apply(character);
		}).toThrow('MISSING_CHOICES');
	});

	it('should train chosen skills', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});
		versatile.addChoice({type: 'skill', name: SkillNameEnum.animalHandling});

		const character = new CharacterFake();
		versatile.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith<[ActionInterface<'trainSkill'>]>({
			type: 'trainSkill',
			payload: {
				name: SkillNameEnum.acrobatics,
				source: RaceAbilityNameEnum.versatile,
			},
		});

		expect(character.dispatch).toHaveBeenCalledWith<[ActionInterface<'trainSkill'>]>({
			type: 'trainSkill',
			payload: {
				name: SkillNameEnum.acrobatics,
				source: RaceAbilityNameEnum.versatile,
			},
		});
	});

	it('should apply chosen power', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobatics});
		versatile.addChoice({type: 'power', name: GeneralPowerNameEnum.dodge});

		const character = new CharacterFake();
		versatile.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith<[ActionInterface<'trainSkill'>]>({
			type: 'trainSkill',
			payload: {
				name: SkillNameEnum.acrobatics,
				source: RaceAbilityNameEnum.versatile,
			},
		});

		expect(character.dispatch).toHaveBeenCalledWith<[ActionInterface<'pickPower'>]>({
			type: 'pickPower',
			payload: {
				power: new Dodge(),
				source: RaceAbilityNameEnum.versatile,
			},
		});
	});
});
