import {Character} from '../Character';
import {Skill} from './Skill';

const initialAttributes = {
	charisma: 0,
	constitution: 0,
	dexterity: 0,
	intelligence: 0,
	strength: 0,
	wisdom: 0,
};

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const skill = new Skill({
			character: new Character({
				initialAttributes,
			}),
			attribute: 'dexterity',
		});

		expect(skill.getTotal()).toBe(0);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		const skill = new Skill({
			character: new Character({
				initialAttributes: {
					...initialAttributes,
					dexterity: 2,
				},
			}),
			attribute: 'dexterity',
		});

		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const skill = new Skill({
			character: new Character({
				initialAttributes,
			}),
			isTrained: true,
			attribute: 'dexterity',
		});
		expect(skill.getTotal()).toBe(2);
	});

	it('should calculate level 1 trained skill with modifier', () => {
		const skill = new Skill({
			character: new Character({
				initialAttributes: {
					...initialAttributes,
					dexterity: 2,
				},
			}),
			isTrained: true,
			attribute: 'dexterity',
		});

		expect(skill.getTotal()).toBe(4);
	});

	it('should calculate level 1 trained skill with modifier and other bonus', () => {
		const skill = new Skill({
			character: new Character({
				initialAttributes: {
					...initialAttributes,
					dexterity: 2,
				},
			}),
			isTrained: true,
			attribute: 'dexterity',
			other: 2,
		});

		expect(skill.getTotal()).toBe(6);
	});

	it('should calculate level 10 trained skill with modifier and other bonus', () => {
		const skill = new Skill({
			character: {
				getAttributes() {
					return {
						...initialAttributes,
						dexterity: 2,
					};
				},
				getLevel() {
					return 10;
				},
			},
			isTrained: true,
			attribute: 'dexterity',
			other: 2,
		});

		expect(skill.getTotal()).toBe(13);
	});
});
