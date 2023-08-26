/* eslint-disable @typescript-eslint/naming-convention */
import {Deities} from './Devotion';
import {Armors} from './Inventory/Equipment/Weapon/DefensiveWeapon/Armor/Armors';
import {HeavyArmors} from './Inventory/Equipment/Weapon/DefensiveWeapon/Armor/HeavyArmor/HeavyArmors';
import {LightArmors} from './Inventory/Equipment/Weapon/DefensiveWeapon/Armor/LightArmor/LightArmors';
import {ExoticWeapons} from './Inventory/Equipment/Weapon/OffensiveWeapon/ExoticWeapon/ExoticWeapons';
import {FireArmWeapons} from './Inventory/Equipment/Weapon/OffensiveWeapon/FireArmWeapon/FireArmWeapons';
import {MartialWeapons} from './Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/MartialWeapons';
import {SimpleWeapons} from './Inventory/Equipment/Weapon/OffensiveWeapon/SimpleWeapon/SimpleWeapons';
import {Origins} from './Origin';
import {TormentaPowers} from './Power';
import {Races} from './Race';
import {ArcanistPathWizardFocuses} from './Role/Arcanist/ArcanistPath/ArcanisPathWizard/ArcanistPathWizardFocuses';
import {Roles} from './Role/Roles';
import {Spells} from './Spell';

export const Content = {
	getDeities: () => Deities,
	getHeavyArmors: () => HeavyArmors,
	getLightArmors: () => LightArmors,
	getExoticWeapons: () => ExoticWeapons,
	getFireArmWeapons: () => FireArmWeapons,
	getMartialWeapons: () => MartialWeapons,
	getSimpleWeapons: () => SimpleWeapons,
	getOrigins: () => Origins,
	getTormentaPowers: () => TormentaPowers,
	getRaces: () => Races,
	getRoles: () => Roles,
	getArcanistPathWizardFocuses: () => ArcanistPathWizardFocuses,
	getSpells: () => Spells,
	getArmors: () => Armors,
};
