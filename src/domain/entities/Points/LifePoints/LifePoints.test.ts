import type {Attributes} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Levels';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {RoleName} from '../../Role/RoleName';
import {PointsMaxCalculatorFactory} from '../PointsMaxCalculatorFactory';
import {LifePoints} from './LifePoints';

describe('LifePoints', () => {
	it('should calculate max', () => {
		const lifePoints = new LifePoints();
		lifePoints.modifiers.add(new FixedModifier(RoleName.arcanist, 8, new Set(['constitution'])));
		lifePoints.modifiers.add(new FixedModifier(RaceAbilityName.hardAsRock, 3));
		lifePoints.perLevelModifiers.add(new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false));
		lifePoints.perLevelModifiers.add(new PerLevelModifier(RoleName.arcanist, 2, false, new Set(['constitution'])));
		const attributes: Attributes = {charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
		const maxCalculator = PointsMaxCalculatorFactory.make(attributes, Level.three);

		expect(lifePoints.getMax(maxCalculator)).toBe(23);
	});
});
