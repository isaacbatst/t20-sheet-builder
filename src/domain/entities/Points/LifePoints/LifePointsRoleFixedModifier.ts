import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import type {LifePointsRoleFixedModifierValueGetter} from './LifePointsRoleFixedModifierValueGetter';

export class LifePointsRoleFixedModifier extends FixedModifier {
	override getValue(getter: LifePointsRoleFixedModifierValueGetter): number {
		return super.getValue(getter);
	}
}
