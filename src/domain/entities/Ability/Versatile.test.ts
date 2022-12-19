import {CharacterFake} from '../CharacterFake';
import {Versatile} from './Versatile';

describe('Versatile', () => {
	it('should add choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: 'acrobacia'});

		expect(versatile.choices).toEqual([{type: 'skill', name: 'acrobacia'}]);
	});

	it('should not add repeated choice', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: 'acrobacia'});

		expect(() => {
			versatile.addChoice({type: 'skill', name: 'acrobacia'});
		}).toThrowError('REPEATED_VERSATILE_CHOICE');
	});

	it('should not allow more than two choices', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'skill', name: 'acrobacia'});
		versatile.addChoice({type: 'skill', name: 'adestramento'});

		expect(() => {
			versatile.addChoice({type: 'skill', name: 'luta'});
		}).toThrow('EXCEEDED_CHOICES_QUANTITY');
	});

	it('should not allow 2 powers', () => {
		const versatile = new Versatile();

		versatile.addChoice({type: 'power', name: 'twoHandsStyle'});

		expect(() => {
			versatile.addChoice({type: 'power', name: 'swordAndShieldStyle'});
		}).toThrow('FORBIDDEN_TWO_POWERS');
	});

	it('should allow 1 power and 1 skill', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: 'acrobacia'});
		versatile.addChoice({type: 'power', name: 'twoHandsStyle'});

		expect(versatile.choices).toEqual([
			{type: 'skill', name: 'acrobacia'},
			{type: 'power', name: 'twoHandsStyle'},
		]);
	});

	it('should not allow apply without choices', () => {
		const versatile = new Versatile();
		const character = new CharacterFake();
		expect(() => {
			versatile.apply(character);
		}).toThrow('MISSING_CHOICES');
	});

	it('should train choosed skills', () => {
		const versatile = new Versatile();
		versatile.addChoice({type: 'skill', name: 'acrobacia'});
		versatile.addChoice({type: 'skill', name: 'adestramento'});

		const character = new CharacterFake();
		versatile.apply(character);

		expect(character.getTrainedSkills()).toContain('acrobacia');
		expect(character.getTrainedSkills()).toContain('adestramento');
	});
});
