import type {Attributes} from '../../Attributes';
import {Level} from '../../Levels';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {FixedModifiersList} from '../../Modifier/FixedModifier/FixedModifiersList';
import {FixedModifiersListTotalCalculator} from '../../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {PerLevelModifiersList} from '../../Modifier/PerLevelModifier/PerLevelModifiersList';
import {PerLevelModifiersListTotalCalculator} from '../../Modifier/PerLevelModifier/PerLevelModifiersListTotalCalculator';
import {PointsMaxCalculator} from '../PointsMaxCalculator';
import {RaceAbilityName} from '../../RaceAbility/RaceAbilityName';
import {RoleName} from '../../Role/RoleName';
import {ManaPoints} from './ManaPoints';

describe('ManaPoints', () => {
	it('should calculate max on level one', () => {
		const modifiers = new FixedModifiersList();
		modifiers.add(new FixedModifier(RoleName.arcanist, 8, new Set(['constitution'])));
		modifiers.add(new FixedModifier(RaceAbilityName.hardAsRock, 3));
		const perLevelModifiers = new PerLevelModifiersList();
		perLevelModifiers.add(new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false));
		perLevelModifiers.add(new PerLevelModifier(RoleName.arcanist, 2, false, new Set(['constitution'])));
		const attributes: Attributes = {charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
		const fixedCalculator = new FixedModifiersListTotalCalculator(attributes);
		const perLevelCalculator = new PerLevelModifiersListTotalCalculator(attributes, Level.levelThree);
		const maxCalculator = new PointsMaxCalculator(fixedCalculator, perLevelCalculator);

		const lifePoints = new ManaPoints({
			maxCalculator,
			modifiers,
			perLevelModifiers,
		});

		expect(lifePoints.getMax(maxCalculator)).toBe(23);
	});
});
