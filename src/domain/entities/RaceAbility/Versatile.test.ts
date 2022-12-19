import {CharacterFake} from '../CharacterFake';
import {GeneralPowerNameEnum} from '../Power/GeneralPowerName';
import {SkillNameEnum} from '../Skill/SkillName';
import {Versatile} from './Versatile';

describe('Versatile', () => {
	it('should add choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});

		expect(versatile.choices).toEqual([{type: 'skill', name: SkillNameEnum.acrobacia}]);
	});

	it('should not add repeated choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});

		expect(() => {
			versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});
		}).toThrowError('REPEATED_VERSATILE_CHOICE');
	});

	it('should not allow more than two choices', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});
		versatile.addChoice({type: 'skill', name: SkillNameEnum.adestramento});

		expect(() => {
			versatile.addChoice({type: 'skill', name: SkillNameEnum.luta});
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
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});
		versatile.addChoice({type: 'power', name: GeneralPowerNameEnum.twoHandsStyle});

		expect(versatile.choices).toEqual([
			{type: 'skill', name: SkillNameEnum.acrobacia},
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
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});
		versatile.addChoice({type: 'skill', name: SkillNameEnum.adestramento});

		const character = new CharacterFake();
		versatile.apply(character);

		expect(character.getTrainedSkills()).toContain(SkillNameEnum.acrobacia);
		expect(character.getTrainedSkills()).toContain(SkillNameEnum.adestramento);
	});

	it('should apply chosen power', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: SkillNameEnum.acrobacia});
		versatile.addChoice({type: 'power', name: GeneralPowerNameEnum.dodge});

		const character = new CharacterFake();
		versatile.apply(character);

		expect(character.getTrainedSkills()).toContain(SkillNameEnum.acrobacia);
		expect(character.getDefenseOtherModifiers()).toContainEqual({
			sourceName: GeneralPowerNameEnum.dodge,
			value: 2,
		});
	});
});
