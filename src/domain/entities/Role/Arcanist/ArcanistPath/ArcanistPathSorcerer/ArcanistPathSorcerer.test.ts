import {AddFixedModifierToLifePoints} from '../../../../Action/AddFixedModifierToLifePoints';
import {LearnSpell} from '../../../../Action/AddSpell';
import {ChangeTormentaPowersAttribute} from '../../../../Action/ChangeTormentaPowersAttribute';
import {DecreaseAttribute} from '../../../../Action/DecreaseAttribute';
import {PickGeneralPower} from '../../../../Action/PickGeneralPower';
import {TrainSkill} from '../../../../Action/TrainSkill';
import {DamageType} from '../../../../Damage/DamageType';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {Shell} from '../../../../Power';
import {SheetBaseFake} from '../../../../Sheet/SheetBaseFake';
import {SkillName} from '../../../../Skill';
import {IllusoryDisguise} from '../../../../Spell';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistLineageDraconic} from './ArcanistLineageDraconic/ArcanistLineageDraconic';
import {ArcanistLineageFaerie} from './ArcanistLineageFaerie/ArcanistLineageFaerie';
import {ArcanistLineageRed} from './ArcanistLineageRed/ArcanistLineageRed';
import {ArcanistPathSorcerer} from './ArcanistPathSorcerer';

describe('ArcanistPathSorcerer', () => {
	it('should create sorcerer with draconic lineage', () => {
		const lineage = new ArcanistLineageDraconic(DamageType.fire);
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		const sheet = new SheetBaseFake();
		const dispatch = vi.fn();
		arcanistPath.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSupernaturalLineage);
		expect(dispatch).toHaveBeenCalledWith(
			new AddFixedModifierToLifePoints({
				modifier: new FixedModifier(
					RoleAbilityName.arcanistSupernaturalLineage,
					0,
					new Set(['charisma']),
				),
			}),
			sheet,
		);
	});

	it('should create sorcerer with faerie lineage', () => {
		const spell = new IllusoryDisguise();
		const lineage = new ArcanistLineageFaerie(spell);
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		const sheet = new SheetBaseFake();
		const dispatch = vi.fn();
		arcanistPath.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSupernaturalLineage);

		expect(dispatch).toHaveBeenCalledWith(
			new LearnSpell({
				source: RoleAbilityName.arcanistSupernaturalLineage,
				spell,
			}),
			sheet,
		);

		expect(dispatch).toHaveBeenCalledWith(
			new TrainSkill({
				source: RoleAbilityName.arcanistSupernaturalLineage,
				name: SkillName.cheat,
			}),
			sheet,
		);
	});

	it('should create sorcerer with red lineage', () => {
		const power = new Shell();
		const lineage = new ArcanistLineageRed(power, 'wisdom');
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		const sheet = new SheetBaseFake();
		const dispatch = vi.fn();
		arcanistPath.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSupernaturalLineage);

		expect(dispatch).toHaveBeenCalledWith(
			new PickGeneralPower({
				power,
				source: RoleAbilityName.arcanistSupernaturalLineage,
			}),
			sheet,
		);

		expect(dispatch).toHaveBeenCalledWith(
			new ChangeTormentaPowersAttribute({
				attribute: 'wisdom',
				source: RoleAbilityName.arcanistSupernaturalLineage,
			}),
			sheet,
		);
	});
});
