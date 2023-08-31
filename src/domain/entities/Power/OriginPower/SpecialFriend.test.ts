import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {OriginName} from '../../Origin';
import {BuildingSheet} from '../../Sheet/BuildingSheet/BuildingSheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {OriginPowerName} from './OriginPowerName';
import {SpecialFriend} from './SpecialFriend';

describe('SpecialFriend', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch animalHandling modifier add', () => {
		const specialFriend = new SpecialFriend(SkillName.acrobatics);
		specialFriend.addToSheet(transaction);

		const skillModifier = sheet.getSkills()[SkillName.animalHandling].skill.fixedModifiers.get(OriginPowerName.specialFriend);
		expect(skillModifier).toBeDefined();
		expect(skillModifier?.baseValue).toBe(5);
	});

	it('should dispatch custom skill modifier add', () => {
		const specialFriend = new SpecialFriend(SkillName.acrobatics);
		specialFriend.addToSheet(transaction);
		const skillModifier = sheet.getSkills()[SkillName.acrobatics].skill.fixedModifiers.get(OriginPowerName.specialFriend);
		expect(skillModifier).toBeDefined();
		expect(skillModifier?.baseValue).toBe(2);
	});

	it('should not allow custom skill to be fight', () => {
		expect(() => {
			const specialFriend = new SpecialFriend(SkillName.fight);
		}).toThrow('INVALID_SKILL');
	});

	it('should not allow custom skill to be aim', () => {
		expect(() => {
			const specialFriend = new SpecialFriend(SkillName.aim);
		}).toThrow('INVALID_SKILL');
	});
});
