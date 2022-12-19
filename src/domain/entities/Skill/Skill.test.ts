import {CharacterFake} from '../CharacterFake';
import {Skill} from './Skill';

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const skill = new Skill({
			character: new CharacterFake(),
			attribute: 'dexterity',
			name: 'acrobacia',
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
			character,
			attribute: 'dexterity',
			name: 'acrobacia',
		});

		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const skill = new Skill({
			character: new CharacterFake(),
			isTrained: true,
			attribute: 'dexterity',
			name: 'acrobacia',
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
			character,
			isTrained: true,
			attribute: 'dexterity',
			name: 'acrobacia',
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
			character,
			isTrained: true,
			attribute: 'dexterity',
			other: 2,
			name: 'acrobacia',
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
			character,
			isTrained: true,
			attribute: 'dexterity',
			other: 2,
			name: 'acrobacia',
		});

		expect(skill.getTotal(10)).toBe(13);
	});

	it('should update total by training', () => {
		const character = new CharacterFake();
		const skill = new Skill({
			character,
			attribute: 'dexterity',
			name: 'acrobacia',
		});
		skill.train();
		const total = skill.getTotal();
		expect(total).toBe(2);
	});
});
