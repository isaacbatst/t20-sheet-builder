import {type EquipmentData} from '../EquipmentData';
import {EquipmentName} from '../EquipmentName';
import {EquipmentAnimalData} from './EquipmentAnimalData';
import {type EquipmentAnimalName} from './EquipmentAnimalName';

export class EquipmentsAnimalData {
	static readonly map: {
		[N in EquipmentAnimalName]: EquipmentData<N>;
	} = {
			horse: new EquipmentAnimalData({
				description: 'A montaria mais comum no Reinado.'
      + ' Pode ser usado como parceiro montaria (veja a'
      + ' página 262). Cavalos sem treinamento se assustam'
      + ' facilmente, sendo necessário um teste de Cavalgar'
      + ' (CD 20) por rodada para permanecer montado'
      + ' durante um combate. Cavalos de guerra dispensam'
      + ' esse teste.',
				equipmentName: EquipmentName.horse,
				price: 75,
				translatedName: 'Cavalo',
			}),
			hound: new EquipmentAnimalData({
				description: 'Este cachorro valente e leal'
      + ' pode ser usado como parceiro perseguidor por per'
      + ' sonagens treinados em Adestramento ou montaria '
      + ' por personagens Pequenos e Minúsculos',
				equipmentName: EquipmentName.hound,
				price: 150,
				translatedName: 'Cão de Caça',
			}),
			pony: new EquipmentAnimalData({
				description: 'A montaria mais comum entre raças'
      + ' Pequenas. Pode ser usado como parceiro montaria'
      + ' (veja a página 262). Pôneis sem treinamento se'
      + ' assustam facilmente, sendo necessário um teste'
      + ' de Cavalgar (CD 20) por rodada para permanecer'
      + ' montado durante um combate. Pôneis de guerra'
      + ' dispensam esse teste.',
				equipmentName: EquipmentName.pony,
				price: 5,
				translatedName: 'Pônei',
			}),
			trobo: new EquipmentAnimalData({
				description: 'Estas enormes aves, também chamadas'
      + 'de pássaros-touros, são parecidas com avestruzes'
      + 'com chifres, couro e cascos. Não têm asas. Possuem'
      + 'poucas penas, que servem apenas como ornamento.'
      + 'Muito dóceis, trobos são usados em áreas rurais'
      + 'como animais de carga e tração, mas também podem'
      + 'ser usados como montaria (veja a página 262)',
				equipmentName: EquipmentName.trobo,
				price: 60,
				translatedName: 'Trobo',
			}),
		};
}
