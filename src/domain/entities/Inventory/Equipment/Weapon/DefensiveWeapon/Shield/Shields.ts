import {HeavyShield} from './HeavyShield';
import {LightShield} from './LightShield';
import {type ShieldName} from './ShieldName';
import {type ShieldStatic} from './ShieldStatic';

export class Shields {
	static map: Record<ShieldName, ShieldStatic> = {
		heavyShield: HeavyShield,
		lightShield: LightShield,
	};
}
