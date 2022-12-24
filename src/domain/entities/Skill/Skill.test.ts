import {BuildingSheetFake} from '../BuildingSheetFake';
import {RaceAbilityName} from '../RaceAbility/RaceAbilityName';
import {Skill} from './Skill';
import {Modifier} from '../Modifier/Modifier';

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const sheet = new BuildingSheetFake();
		const skill = new Skill({
			attribute: 'dexterity',
		});

		expect(skill.getTotal(sheet.attributes)).toBe(0);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};
		const skill = new Skill({
			attribute: 'dexterity',
		});

		expect(skill.getTotal(sheet.attributes)).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const sheet = new BuildingSheetFake();

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		expect(skill.getTotal(sheet.attributes)).toBe(2);
	});

	it('should calculate level 1 trained skill with modifier', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});

		expect(skill.getTotal(sheet.attributes)).toBe(4);
	});

	it('should calculate level 1 trained skill with modifier and other bonus', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.addOtherModifier(new Modifier(RaceAbilityName.versatile, 2));

		expect(skill.getTotal(sheet.attributes)).toBe(6);
	});

	it('should calculate level 10 trained skill with modifier and other bonus', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};
		sheet.level = 10;
		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.addOtherModifier(new Modifier(RaceAbilityName.versatile, 2));

		expect(skill.getTotal(sheet.attributes, 10)).toBe(13);
	});

	it('should update total by training', () => {
		const sheet = new BuildingSheetFake();
		const skill = new Skill({
			attribute: 'dexterity',
		});
		skill.train();
		const total = skill.getTotal(sheet.attributes);
		expect(total).toBe(2);
	});
});
