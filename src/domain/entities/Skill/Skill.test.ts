import {CharacterFake} from '../CharacterFake';
import {RaceAbilityNameEnum} from '../RaceAbility/RaceAbilityName';
import {Skill} from './Skill';

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const character = new CharacterFake();
		const skill = new Skill({
			attribute: 'dexterity',
		});

		expect(skill.getTotal(character.attributes)).toBe(0);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};
		const skill = new Skill({
			attribute: 'dexterity',
		});

		expect(skill.getTotal(character.attributes)).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const character = new CharacterFake();

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		expect(skill.getTotal(character.attributes)).toBe(2);
	});

	it('should calculate level 1 trained skill with modifier', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});

		expect(skill.getTotal(character.attributes)).toBe(4);
	});

	it('should calculate level 1 trained skill with modifier and other bonus', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
			otherModifiers: [{source: RaceAbilityNameEnum.versatile, value: 2}],
		});

		expect(skill.getTotal(character.attributes)).toBe(6);
	});

	it('should calculate level 10 trained skill with modifier and other bonus', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};
		character.level = 10;
		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
			otherModifiers: [{source: RaceAbilityNameEnum.versatile, value: 2}],
		});

		expect(skill.getTotal(character.attributes, 10)).toBe(13);
	});

	it('should update total by training', () => {
		const character = new CharacterFake();
		const skill = new Skill({
			attribute: 'dexterity',
		});
		skill.train();
		const total = skill.getTotal(character.attributes);
		expect(total).toBe(2);
	});
});
