import {GeneralPowerName, OriginPowerName} from '../Power';
import {SkillName} from '../Skill';
import {OriginData} from './OriginData';
import {OriginName} from './OriginName';

export class OriginCatalog {
	static readonly items: Readonly<Record<OriginName, OriginData>> = {
		acolyte: new OriginData({
			equipments: 'Símbolo sagrado, traje de sacerdote.',
			skills: [SkillName.cure, SkillName.religion, SkillName.will],
			generalPowers: [GeneralPowerName.medicine, GeneralPowerName.ironWill],
			originName: OriginName.acolyte,
			originPower: OriginPowerName.churchMember,
		}),
		amnesic: new OriginData({
			equipments: 'Um ou mais itens (somando até T$ 500), aprovados pelo mestre, que podem ser uma pista misteriosa do seu passado.',
			generalPowers: [],
			originName: OriginName.amnesic,
			originPower: OriginPowerName.gradualMemories,
			skills: [],
		}),
		animalsFriend: new OriginData({
			equipments: 'Cão de caça, cavalo, pônei ou trobo (escolha um).',
			generalPowers: [],
			originName: OriginName.animalsFriend,
			originPower: OriginPowerName.specialFriend,
			skills: [SkillName.animalHandling, SkillName.animalRide],
		}),
		aristocrat: new OriginData({
			equipments: 'Joia de família no valor de T$ 300, traje da corte.',
			generalPowers: [GeneralPowerName.command],
			originName: OriginName.aristocrat,
			originPower: OriginPowerName.blueBlood,
			skills: [SkillName.diplomacy, SkillName.cheat, SkillName.nobility],
		}),
		artisan: new OriginData({
			equipments: 'Instrumentos de ofício (qualquer), um item que você possa fabricar de até T$ 50.',
			generalPowers: [],
			originName: OriginName.artisan,
			originPower: OriginPowerName.fruitsOfLabor,
			skills: [SkillName.craft, SkillName.will],
		}),
		artist: new OriginData({
			equipments: 'Estojo de disfarces ou um instrumento musical a sua escolha.',
			generalPowers: [],
			originName: OriginName.artist,
			originPower: OriginPowerName.artisticDomain,
			skills: [SkillName.acting, SkillName.cheat],
		}),
	};
}
