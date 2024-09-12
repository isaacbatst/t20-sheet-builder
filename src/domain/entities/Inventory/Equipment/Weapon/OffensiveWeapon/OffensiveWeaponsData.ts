import {Critical} from '../../../../Attack';
import {DamageType} from '../../../../Damage/DamageType';
import {DiceRoll} from '../../../../Dice';
import {EquipmentName} from '../../EquipmentName';
import {WeaponPurposeMelee, WeaponPurposeRangedShooting, WeaponPurposeRangedThrowing} from '../WeaponPurpose';
import {OffensiveWeaponData} from './OffensiveWeaponData';
import {type OffensiveWeaponName} from './OffensiveWeaponName';

//  Armas Simples
//  Adaga
//  Espada curta
//  Foice
//  Clava
//  Lança
//  Maça
//  Bordão
//  Pique
//  Tacape
//  Azagaia
//  Besta leve
//  Virotes (20)
//  Funda
//  Pedras (20)
//  Arco curto
//  Flechas (20)
//  Armas Marciais
//  Machadinha
//  Cimitarra
//  Espada longa
//  Florete
//  Machado de batalha
//  Mangual
//  Preço Dano Crítico Alcance
//  Corpo a Corpo — Leves
//  T$ 2
//  T$ 10
//  T$ 4
//  —
//  T$ 2
//  T$ 12
//  —
//  T$ 2
//  —
//  1d4
//  1d6
//  1d6
//  19
//  19
//  x3
//  Corpo a Corpo — Uma Mão
//  1d6
//  1d6
//  1d8
//  x2
//  x2
//  x2
//  Corpo a Corpo — Duas Mãos
//  1d6/1d6
//  1d8
//  1d10
//  x2
//  x2
//  x2
//  Ataque à Distância — Uma Mão
//  T$ 1
//  T$ 35
//  T$ 2
//  —
//  T$ 0,5
//  T$ 30
//  T$ 1
//  1d6
//  1d8
//  —
//  1d4
//  Tipo
//  Curto
//  —
//  —
//  —
//  Curto
//  —
//  —
//  Perfuração
//  Perfuração
//  Corte
//  Espaços
//  1
//  1
//  1
//  Impacto
//  Perfuração
//  Impacto
//  Impacto
//  —
//  —
//  x2
//  19
//  —
//  x2
//  —
//  —
//  Ataque à Distância — Duas Mãos
//  1d6
//  —
//  x3
//  —
//  Médio
//  Médio
//  —
//  Médio
//  —
//  Médio
//  —
//  Preço Dano Crítico Alcance
//  Corpo a Corpo — Leves
//  T$ 6
//  T$ 15
//  T$ 15
//  T$ 20
//  T$ 10
//  T$ 8
//  Martelo de guerra
//  Picareta
//  Tridente
//  144
//  Capítulo Três
//  T$ 12
//  T$ 8
//  T$ 15
//  1d6
//  x3
//  Corpo a Corpo — Uma Mão
//  1d6
//  1d8
//  1d6
//  1d8
//  1d8
//  1d8
//  1d6
//  1d8
//  18
//  19
//  18
//  x3
//  x2
//  x3
//  x4
//  x2
//  Curto
//  —
//  —
//  —
//  —
//  —
//  —
//  —
//  Curto
//  Perfuração
//  Impacto
//  Perfuração
//  Perfuração
//  —
//  Impacto
//  —
//  Perfuração
//  —
//  Tipo
//  Corte
//  Corte
//  Corte
//  Perfuração
//  Corte
//  Impacto
//  Impacto
//  Perfuração
//  Perfuração
//  1
//  1
//  1
//  2
//  2
//  2
//  1
//  1
//  1
//  1
//  1
//  2
//  1
//  Espaços
//  1
//  1
//  1
//  1
//  1
//  1
//  1
//  1
//  1
//  Isaac Batista isaacbatst@gmail.com
// Tabela 3-3: Armas (Continuação)
//  Armas Marciais
//  Alabarda
//  Alfange
//  Gadanho
//  Lança montada
//  Machado de guerra
//  Marreta
//  Montante
//  Arco longo
//  Flechas (20)
//  Besta pesada
//  Virotes (20)
//  Armas Exóticas
//  Chicote
//  Espada bastarda
//  Katana
//  Machado anão
//  Corrente de espinhos
//  Machado táurico
//  Rede
//  Armas de Fogo
//  Pistola
//  Preço Dano Crítico Alcance
//  Corpo a Corpo — Duas Mãos
//  T$ 10
//  T$ 75
//  T$ 18
//  T$ 10
//  T$ 20
//  T$ 20
//  T$ 50
//  1d10
//  2d4
//  2d4
//  1d8
//  1d12
//  3d4
//  2d6
//  x3
//  18
//  x4
//  x3
//  x3
//  x2
//  19
//  Ataque à Distância — Duas Mãos
//  T$ 100
//  T$ 1
//  T$ 50
//  T$ 2
//  1d8
//  —
//  1d12
//  —
//  x3
//  —
//  19
//  —
//  —
//  —
//  —
//  —
//  —
//  —
//  —
//  Preço Dano Crítico Alcance
//  T$ 2
//  T$ 35
//  T$ 100
//  T$ 30
//  1d3
//  Tipo
//  Corte/perfuração
//  Corte
//  Corte
//  Perfuração
//  Espaços
//  2
//  2
//  2
//  2
//  Corte
//  Impacto
//  Corte
//  Médio
//  —
//  Médio
//  —
//  Corpo a Corpo — Uma Mão
//  x2
//  1d10/1d12
//  1d8/1d10
//  1d10
//  19
//  19
//  x3
//  Corpo a Corpo — Duas Mãos
//  T$ 25
//  T$ 50
//  2d4/2d4
//  2d8
//  19
//  x3
//  Ataque à Distância — Uma Mão
//  T$ 20
//  —
//  —
//  —
//  —
//  —
//  —
//  —
//  —
//  Curto
//  Preço Dano Crítico Alcance
//  Ataque à Distância — Leve
//  T$ 250
//  Balas (20)
//  T$ 20
//  2d6
//  —
//  19/x3
//  —
//  Ataque à Distância — Duas Mãos
//  Mosquete
//  Balas (20)
//  T$ 500
//  T$ 20
//  2d8
//  —
//  19/x3
//  —
//  Curto
//  —
//  Médio
//  —
//  Perfuração
//  —
//  Perfuração
//  —
//  Tipo
//  Corte
//  Corte
//  Corte
//  Corte
//  Corte
//  Corte
//  —
//  Tipo
//  Perfuração
//  —
//  Perfuração
//  —
//  2
//  2
//  2
//  2
//  1
//  2
//  1
//  Espaços
//  1
//  1
//  1
//  1
//  2
//  2
//  1
//  Espaços
//  1
//  1
//  2
//  1

export class OffensiveWeaponsData {
	static map: {
		[N in OffensiveWeaponName]: OffensiveWeaponData<N>;
	} = {
			assegai: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				price: 1,
				purposes: [
					new WeaponPurposeMelee({
						penalty: 5,
					}),
					new WeaponPurposeRangedThrowing({
						range: 'medium',
					}),
				],
				translatedName: 'Azagaia',
				equipmentName: EquipmentName.assegai,
			}),
			bastardSword: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.bastardSword,
				price: 35,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Espada Bastarda',
			}),
			baton: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.baton,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Tacape',
			}),
			battleAxe: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.battleAxe,
				price: 10,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Machado de Batalha',
				critical: new Critical(20, 3),
			}),
			chainofThorns: new OffensiveWeaponData({
				damage: new DiceRoll(2, 4),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.chainofThorns,
				price: 25,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Corrente de Espinhos',
				critical: new Critical(19),
				slots: 2,
			}),
			club: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.club,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Clava',
			}),
			cutlass: new OffensiveWeaponData({
				damage: new DiceRoll(2, 4),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.cutlass,
				price: 15,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Alfanje',
				slots: 2,
				critical: new Critical(18),
			}),
			dagger: new OffensiveWeaponData({
				damage: new DiceRoll(1, 4),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.dagger,
				price: 2,
				purposes: [
					new WeaponPurposeMelee({
						customTestAttributes: new Set(['dexterity']),
					}),
					new WeaponPurposeRangedThrowing({
						range: 'short',
					}),
				],
				translatedName: 'Adaga',
				critical: new Critical(19),
			}),
			dwarfAxe: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.dwarfAxe,
				price: 50,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Machado Anão',
				critical: new Critical(20, 3),
			}),
			flail: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.flail,
				price: 8,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Mangual',
			}),
			foil: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.foil,
				price: 20,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Florete',
				critical: new Critical(18),
			}),
			halberd: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: [DamageType.cutting, DamageType.piercing],
				description: '',
				equipmentName: EquipmentName.halberd,
				price: 15,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Alabarda',
				critical: new Critical(20, 3),
				slots: 2,
			}),
			handAndaHalfSword: new OffensiveWeaponData({
				damage: new DiceRoll(2, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.handAndaHalfSword,
				price: 50,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Montante',
				critical: new Critical(19),
				slots: 2,
			}),
			hatchet: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.hatchet,
				price: 6,
				purposes: [
					new WeaponPurposeMelee(),
					new WeaponPurposeRangedThrowing({
						range: 'short',
					}),
				],
				translatedName: 'Machadinha',
				critical: new Critical(20, 3),
			}),
			heavyCrossbow: new OffensiveWeaponData({
				damage: new DiceRoll(1, 12),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.heavyCrossbow,
				price: 50,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Besta Pesada',
				critical: new Critical(19),
				slots: 2,
			}),
			horns: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.horns,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Chifres',
				isBuyable: false,
			}),
			katana: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.katana,
				price: 100,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Katana',
				critical: new Critical(19),
			}),
			lightCrossbow: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.lightCrossbow,
				price: 35,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Besta Leve',
				critical: new Critical(19),
			}),
			longBow: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.longBow,
				price: 50,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
					damageAttribute: 'strength',
				}),
				translatedName: 'Arco Longo',
				critical: new Critical(20, 3),
				slots: 2,
			}),
			longSword: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.longSword,
				price: 15,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Espada Longa',
				critical: new Critical(19),
			}),
			mace: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.mace,
				price: 12,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Maça',
			}),
			mountedSpear: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.mountedSpear,
				price: 10,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Lança Montada',
				critical: new Critical(20, 3),
				slots: 2,
			}),
			musket: new OffensiveWeaponData({
				damage: new DiceRoll(1, 12),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.musket,
				price: 500,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Mosquete',
				critical: new Critical(19, 3),
				slots: 2,
			}),
			pickaxe: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.pickaxe,
				price: 8,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Picareta',
				critical: new Critical(20, 4),
			}),
			pike: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.pike,
				price: 2,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Pique',
			}),
			pistol: new OffensiveWeaponData({
				damage: new DiceRoll(2, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.pistol,
				price: 250,
				purposes: new WeaponPurposeRangedShooting({
					range: 'short',
				}),
				translatedName: 'Pistola',
				critical: new Critical(19, 3),
			}),
			scimitar: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.scimitar,
				price: 15,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Cimitarra',
				critical: new Critical(18),
			}),
			scythe: new OffensiveWeaponData({
				damage: new DiceRoll(2, 4),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.scythe,
				price: 18,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Gadanho',
				critical: new Critical(20, 4),
				slots: 2,
			}),
			shortSword: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.shortSword,
				price: 10,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Espada Curta',
				critical: new Critical(19),
			}),
			shortbow: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.shortbow,
				price: 30,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Arco Curto',
				critical: new Critical(20, 3),
			}),
			sickle: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.sickle,
				price: 4,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Foice',
				critical: new Critical(19, 3),
			}),
			sling: new OffensiveWeaponData({
				damage: new DiceRoll(1, 4),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.sling,
				price: 0,
				purposes: new WeaponPurposeRangedShooting({
					range: 'short',
					damageAttribute: 'strength',
				}),
				translatedName: 'Funda',
			}),
			spear: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.spear,
				price: 2,
				purposes: [
					new WeaponPurposeMelee(),
					new WeaponPurposeRangedThrowing({
						range: 'short',
					}),
				],
				translatedName: 'Lança',
			}),
			staffStick: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.staffStick,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Bordão',
				slots: 2,
			}),
			tauricAxe: new OffensiveWeaponData({
				damage: new DiceRoll(2, 8),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.tauricAxe,
				price: 50,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Machado Táurico',
				critical: new Critical(20, 3),
				slots: 2,
			}),
			trident: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.trident,
				price: 15,
				purposes: [
					new WeaponPurposeMelee(),
					new WeaponPurposeRangedThrowing({
						range: 'short',
					}),
				],
				translatedName: 'Tridente',
			}),
			warAxe: new OffensiveWeaponData({
				damage: new DiceRoll(1, 12),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.warAxe,
				price: 20,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Machado de Guerra',
				critical: new Critical(20, 3),
				slots: 2,
			}),
			warHammer: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.warHammer,
				price: 12,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Martelo de Guerra',
				critical: new Critical(20, 3),
			}),
			whip: new OffensiveWeaponData({
				damage: new DiceRoll(1, 3),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.whip,
				price: 2,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Chicote',
			}),
		};
}
