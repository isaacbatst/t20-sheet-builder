import type {Equipment} from '../Inventory';
import type {GeneralPowerName, OriginPowerName} from '../Power';
import type {SkillName} from '../Skill';
import type {Origin} from './Origin';
import type {OriginBenefit} from './OriginBenefit';

export type OriginStatic<Args extends unknown[] = [OriginBenefit[]]> = {
	equipments: Equipment[];
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
	new(...args: Args): Origin;
};
