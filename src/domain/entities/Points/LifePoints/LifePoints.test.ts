import type {Attributes} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Level';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {RoleName} from '../../Role/RoleName';
import {PointsMaxCalculatorFactory} from '../PointsMaxCalculatorFactory';
import {LifePoints} from './LifePoints';

describe('LifePoints', () => {
	it('should calculate max', () => {
		const lifePoints = new LifePoints();
		lifePoints.fixedModifiers.add(new FixedModifier(RoleName.arcanist, 8, new Set(['constitution'])));
		lifePoints.fixedModifiers.add(new FixedModifier(RaceAbilityName.hardAsRock, 3));
		lifePoints.perLevelModifiers.add(new PerLevelModifier({
			source: RaceAbilityName.hardAsRock,
			value: 1,
			includeFirstLevel: false,
		}));
		lifePoints.perLevelModifiers.add(new PerLevelModifier({
			source: RoleName.arcanist,
			value: 2,
			includeFirstLevel: false,
			attributeBonuses: new Set(['constitution']),
		}));
		const attributes: Attributes = {charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
		const maxCalculator = PointsMaxCalculatorFactory.make(attributes, Level.three);

		expect(lifePoints.getMax(maxCalculator)).toBe(23);
	});
});
