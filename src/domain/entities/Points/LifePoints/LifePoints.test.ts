import type {Attributes} from '../../Attributes';
import {Level} from '../../Levels';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {FixedModifiersList} from '../../Modifier/FixedModifier/FixedModifiersList';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {PerLevelModifiersList} from '../../Modifier/PerLevelModifier/PerLevelModifiersList';
import {RaceAbilityName} from '../../RaceAbility/RaceAbilityName';
import {RoleName} from '../../Role/RoleName';
import {PointsMaxCalculatorFactory} from '../PointsMaxCalculatorFactory';
import {LifePoints} from './LifePoints';

describe('LifePoints', () => {
	it('should calculate max', () => {
		const modifiers = new FixedModifiersList();
		modifiers.add(new FixedModifier(RoleName.arcanist, 8, new Set(['constitution'])));
		modifiers.add(new FixedModifier(RaceAbilityName.hardAsRock, 3));
		const perLevelModifiers = new PerLevelModifiersList();
		perLevelModifiers.add(new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false));
		perLevelModifiers.add(new PerLevelModifier(RoleName.arcanist, 2, false, new Set(['constitution'])));
		const attributes: Attributes = {charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
		const maxCalculator = PointsMaxCalculatorFactory.make(attributes, Level.levelThree);

		const lifePoints = new LifePoints({
			maxCalculator,
			modifiers,
			perLevelModifiers,
		});

		expect(lifePoints.getMax(maxCalculator)).toBe(23);
	});
});
