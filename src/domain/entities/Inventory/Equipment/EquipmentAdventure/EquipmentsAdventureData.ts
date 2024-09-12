import {EquipmentData} from '../EquipmentData';
import {EquipmentName} from '../EquipmentName';
import {type EquipmentAdventureName} from './EquipmentAdventureName';

export class EquipmentsAdventureData {
	static readonly map: {
		[N in EquipmentAdventureName]: EquipmentData<N>;
	} = {
			sacredSymbol: new EquipmentData({
				improvementCategory: null,
				description: 'Um medalhão de madeira'
				+	' ou metal com o símbolo de uma divindade. Se você'
				+	' estiver vestindo (normalmente com uma corrente'
				+	' ao redor do pescoço) ou empunhando o símbolo'
				+	' sagrado de um deus do qual é devoto, recebe +1 em'
				+	'testes de resistência.',
				equipmentName: EquipmentName.sacredSymbol,
				price: 5,
				translatedName: 'Símbolo Sagrado',
				usageLimitType: 'dress',
			}),
			backpack: new EquipmentData({
				description: 'Uma bolsa de lona com tiras para ser'
				+ ' carregada nas costas. Não conta como item vestido.',
				equipmentName: EquipmentName.backpack,
				improvementCategory: null,
				price: 2,
				translatedName: 'Mochila',
				usageLimitType: null,
				slots: null,
			}),
			sleepingBag: new EquipmentData({
				description: 'Um colchão com uma coberta'
        + ' fina o bastante para ser enrolada e amarrada,'
        + ' é especialmente útil para aventureiros, que nunca'
        + ' sabem onde vão passar a noite. Dormir ao relento'
        + ' sem um acampamento e um saco de dormir diminui'
        + ' sua recuperação de PV e PM (veja a página 106).',
				equipmentName: EquipmentName.sleepingBag,
				improvementCategory: null,
				price: 1,
				translatedName: 'Saco de Dormir',
				usageLimitType: 'dress',
			}),
		};
}
