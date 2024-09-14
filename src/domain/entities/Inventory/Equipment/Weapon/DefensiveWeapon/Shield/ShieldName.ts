import {EquipmentName} from '../../../EquipmentName';

const shieldNames = [EquipmentName.heavyShield, EquipmentName.lightShield] as const;

export type ShieldName = typeof shieldNames[number];

export const isShieldName = (name: string): name is ShieldName => shieldNames.includes(name as ShieldName);

