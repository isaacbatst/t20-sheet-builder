import {AddFixedModifierToLifePoints} from '../../../../Action/AddFixedModifierToLifePoints';
import {LearnSpell} from '../../../../Action/LearnSpell';
import {ChangeTormentaPowersAttribute} from '../../../../Action/ChangeTormentaPowersAttribute';
import {PickGeneralPower} from '../../../../Action/PickGeneralPower';
import {TrainSkill} from '../../../../Action/TrainSkill';
import {DamageType} from '../../../../Damage/DamageType';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {Shell} from '../../../../Power';
import {TransactionFake} from '../../../../Sheet/TransactionFake';
import {SkillName} from '../../../../Skill';
import {IllusoryDisguise, SpellCircle} from '../../../../Spell';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistLineageDraconic} from './ArcanistLineage/ArcanistLineageDraconic/ArcanistLineageDraconic';
import {ArcanistLineageFaerie} from './ArcanistLineage/ArcanistLineageFaerie/ArcanistLineageFaerie';
import {ArcanistLineageRed} from './ArcanistLineage/ArcanistLineageRed/ArcanistLineageRed';
import {ArcanistPathSorcerer} from './ArcanistPathSorcerer';

describe('ArcanistPathSorcerer', () => {
	it('should create sorcerer with draconic lineage', () => {
		const lineage = new ArcanistLineageDraconic(DamageType.fire);
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		const transaction = new TransactionFake();
		arcanistPath.addToSheet(transaction, RoleAbilityName.arcanistSupernaturalLineage);
		expect(transaction.run).toHaveBeenCalledWith(
			new AddFixedModifierToLifePoints({
				payload: {
					modifier: new FixedModifier(
						RoleAbilityName.arcanistSupernaturalLineage,
						0,
						new Set(['charisma']),
					),
				},
				transaction,
			}));
	});

	it('should create sorcerer with faerie lineage', () => {
		const spell = new IllusoryDisguise();
		const lineage = new ArcanistLineageFaerie(spell);
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		const transaction = new TransactionFake();
		transaction.sheet.getSheetSpells().learnCircle(SpellCircle.first, 'arcane');
		arcanistPath.addToSheet(transaction, RoleAbilityName.arcanistSupernaturalLineage);

		expect(transaction.run).toHaveBeenCalledWith(
			new LearnSpell({
				payload: {
					source: RoleAbilityName.arcanistSupernaturalLineage,
					spell,
				},
				transaction,
			}),
		);

		expect(transaction.run).toHaveBeenCalledWith(
			new TrainSkill({
				payload: {
					source: RoleAbilityName.arcanistSupernaturalLineage,
					skill: SkillName.cheat,
				},
				transaction,
			}),
		);
	});

	it('should create sorcerer with red lineage', () => {
		const power = new Shell();
		const lineage = new ArcanistLineageRed(power, 'wisdom');
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		const transaction = new TransactionFake();
		arcanistPath.addToSheet(transaction, RoleAbilityName.arcanistSupernaturalLineage);

		expect(transaction.run).toHaveBeenCalledWith(
			new PickGeneralPower({
				payload: {
					power,
					source: RoleAbilityName.arcanistSupernaturalLineage,
				},
				transaction,
			}),
		);

		expect(transaction.run).toHaveBeenCalledWith(
			new ChangeTormentaPowersAttribute({
				payload: {
					attribute: 'wisdom',
					source: RoleAbilityName.arcanistSupernaturalLineage,
				},
				transaction,
			}),
		);
	});
});
