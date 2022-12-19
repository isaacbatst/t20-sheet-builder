import {Skill} from './Skill';

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const skill = new Skill({
			attributeModifier: {attribute: 'dexterity', modifier: 0},
			characterLevel: 1,
			isTrained: false,
			name: 'any-name',
			other: 0,
		});

		expect(skill.getTotal()).toBe(0);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		const skill = new Skill({
			attributeModifier: {attribute: 'dexterity', modifier: 2},
			characterLevel: 1,
			isTrained: false,
			name: 'any-name',
			other: 0,
		});

		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const skill = new Skill({
			attributeModifier: {attribute: 'dexterity', modifier: 0},
			characterLevel: 1,
			isTrained: true,
			name: 'any-name',
			other: 0,
		});

		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill with modifier', () => {
		const skill = new Skill({
			attributeModifier: {attribute: 'dexterity', modifier: 2},
			characterLevel: 1,
			isTrained: true,
			name: 'any-name',
			other: 0,
		});

		expect(skill.getTotal()).toBe(4);
	});

	it('should calculate level 1 trained skill with modifier and other bonus', () => {
		const skill = new Skill({
			attributeModifier: {attribute: 'dexterity', modifier: 2},
			characterLevel: 1,
			isTrained: true,
			name: 'any-name',
			other: 2,
		});

		expect(skill.getTotal()).toBe(6);
	});

	it('should calculate level 10 trained skill with modifier and other bonus', () => {
		const skill = new Skill({
			attributeModifier: {attribute: 'dexterity', modifier: 2},
			characterLevel: 10,
			isTrained: true,
			name: 'any-name',
			other: 2,
		});

		expect(skill.getTotal()).toBe(13);
	});
});
