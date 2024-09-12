import {EquipmentName} from '../../../../EquipmentName';
import {HeavyArmorData} from './HeavyArmorData';
import {type HeavyArmorName} from './HeavyArmorName';

export class HeavyArmorCatalog {
	static items: {
		[N in HeavyArmorName]: HeavyArmorData<N>;
	} = {
			brunea: new HeavyArmorData({
				armorPenalty: 2,
				defenseBonus: 5,
				description: 'Colete de couro coberto com pla'
				+ ' quetas de metal sobrepostas, como escamas de um'
				+ ' peixe. Por ser barata de produzir, é a armadura mais'
				+ ' utilizada no Reinado por soldados de infantaria e'
				+ ' guardas de castelo.',
				equipmentName: EquipmentName.brunea,
				price: 50,
				translatedName: 'Brunea',
			}),
			chainMail: new HeavyArmorData({
				description: ' Longa veste de anéis metá'
        + ' licos interligados, formando uma malha flexível e'
        + ' resistente, que vai até os joelhos',
				armorPenalty: 2,
				defenseBonus: 6,
				equipmentName: EquipmentName.chainMail,
				price: 150,
				translatedName: 'Cota de Malha',
			}),
			fullPlate: new HeavyArmorData({
				armorPenalty: 5,
				defenseBonus: 10,
				description: 'A mais forte e pesada'
        + ' das armaduras, formada por placas de metal forjadas'
        + ' e encaixadas de modo a cobrir o corpo inteiro. Inclui'
        + ' uma túnica acolchoada para ser usada sob as placas.'
        + ' Correias e fivelas distribuem o peso da armadura'
        + ' pelo corpo inteiro.',
				equipmentName: EquipmentName.fullPlate,
				price: 3000,
				translatedName: 'Armadura Completa',
			}),
		};
}
