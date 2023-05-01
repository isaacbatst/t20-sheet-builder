import type {Attributes} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Levels';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {FixedModifiersListTotalCalculator} from '../../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {PerLevelModifiersListTotalCalculator} from '../../Modifier/PerLevelModifier/PerLevelModifiersListTotalCalculator';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {RoleName} from '../../Role/RoleName';
import {PointsMaxCalculator} from '../PointsMaxCalculator';
import {ManaPoints} from './ManaPoints';

describe('ManaPoints', () => {
	it('should calculate max on level one', () => {
		const manaPoints = new ManaPoints();
		manaPoints.modifiers.add(new FixedModifier(RoleName.arcanist, 8, new Set(['constitution'])));
		manaPoints.modifiers.add(new FixedModifier(RaceAbilityName.hardAsRock, 3));
		manaPoints.perLevelModifiers.add(new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false));
		manaPoints.perLevelModifiers.add(new PerLevelModifier(RoleName.arcanist, 2, false, new Set(['constitution'])));
		const attributes: Attributes = {charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
		const fixedCalculator = new FixedModifiersListTotalCalculator(attributes);
		const perLevelCalculator = new PerLevelModifiersListTotalCalculator(attributes, Level.three);
		const maxCalculator = new PointsMaxCalculator(fixedCalculator, perLevelCalculator);

		expect(manaPoints.getMax(maxCalculator)).toBe(23);
	});
});
