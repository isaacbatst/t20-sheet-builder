import type {Equipment} from '../Inventory';
import type {GeneralPowerName, OriginPowerName} from '../Power';
import type {SkillName} from '../Skill';
import type {Static} from '../Static';
import type {Origin} from './Origin';

export type OriginStatic<T extends Origin = Origin> = Static<T, {
	equipments: Equipment[];
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
}>;
