import {isHeavyArmorName, type HeavyArmorName} from './HeavyArmor';
import {isLightArmorName, type LightArmorName} from './LightArmor';

export type ArmorName = LightArmorName | HeavyArmorName;

export function isArmorName(name: string): name is ArmorName {
	return isLightArmorName(name) || isHeavyArmorName(name);
}
