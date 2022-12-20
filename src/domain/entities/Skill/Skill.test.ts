import {CharacterFake} from '../CharacterFake';
import {Skill} from './Skill';

const attributes = {};

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const character = new CharacterFake();
		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			attribute: 'dexterity',
			name: 'acrobatics',
		});

		expect(skill.getTotal()).toBe(0);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};
		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			attribute: 'dexterity',
			name: 'acrobatics',
		});

		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const character = new CharacterFake();

		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			isTrained: true,
			attribute: 'dexterity',
			name: 'acrobatics',
		});
		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill with modifier', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			isTrained: true,
			attribute: 'dexterity',
			name: 'acrobatics',
		});

		expect(skill.getTotal()).toBe(4);
	});

	it('should calculate level 1 trained skill with modifier and other bonus', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			isTrained: true,
			attribute: 'dexterity',
			otherModifiers: [{sourceName: 'any-source', value: 2}],
			name: 'acrobatics',
		});

		expect(skill.getTotal()).toBe(6);
	});

	it('should calculate level 10 trained skill with modifier and other bonus', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			dexterity: 2,
		};
		character.level = 10;
		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			isTrained: true,
			attribute: 'dexterity',
			otherModifiers: [{sourceName: 'any-source', value: 2}],
			name: 'acrobatics',
		});

		expect(skill.getTotal(10)).toBe(13);
	});

	it('should update total by training', () => {
		const character = new CharacterFake();
		const skill = new Skill({
			characterAttributes: character.getAttributes(),
			attribute: 'dexterity',
			name: 'acrobatics',
		});
		skill.train();
		const total = skill.getTotal();
		expect(total).toBe(2);
	});
});
