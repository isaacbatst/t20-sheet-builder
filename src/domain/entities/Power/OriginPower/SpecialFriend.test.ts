import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {OriginName} from '../../Origin';
import {TransactionFake} from '../../Sheet/TransactionFake';
import {SkillName} from '../../Skill/SkillName';
import {OriginPowerName} from './OriginPowerName';
import {SpecialFriend} from './SpecialFriend';

describe('SpecialFriend', () => {
	it('should dispatch animalHandling modifier add', () => {
		const specialFriend = new SpecialFriend(SkillName.acrobatics);
		const transaction = new TransactionFake();
		specialFriend.addToSheet(transaction, OriginName.animalsFriend);
		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(OriginPowerName.specialFriend, 5),
				skill: SkillName.animalHandling,
			},
			transaction,
		}));
	});

	it('should dispatch custom skill modifier add', () => {
		const specialFriend = new SpecialFriend(SkillName.acrobatics);
		const transaction = new TransactionFake();
		specialFriend.addToSheet(transaction, OriginName.animalsFriend);
		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(OriginPowerName.specialFriend, 2),
				skill: SkillName.acrobatics,
			},
			transaction,
		}));
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
