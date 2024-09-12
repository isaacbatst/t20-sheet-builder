import {EquipmentName} from '../EquipmentName';
import {EquipmentAlchemicCategory} from './EquipmentAlchemicCategory';
import {EquipmentAlchemicData} from './EquipmentAlchemicData';
import {type EquipmentAlchemicName} from './EquipmentAlchemicName';

export class EquipmentsAlchemicData {
	static readonly map: {
		[N in EquipmentAlchemicName]: EquipmentAlchemicData<N>;
	} = {
			acid: new EquipmentAlchemicData({
				alchemicCategory: EquipmentAlchemicCategory.prepared,
				description: 'Frasco de vidro contendo um ácido alquímico'
        + ' altamente corrosivo. Para usar o ácido, você'
        + ' gasta uma ação padrão e escolhe uma criatura em'
        + ' alcance curto. Essa criatura sofre 2d4 pontos de dano'
        + ' de ácido (Reflexos CD Des reduz à metade).',
				equipmentName: EquipmentName.acid,
				price: 10,
				translatedName: 'Ácido',
				usageLimitType: 'wield',
			}),
			bomb: new EquipmentAlchemicData({
				alchemicCategory: EquipmentAlchemicCategory.prepared,
				description: ' Uma granada rudimentar. Para usar a'
        + ' bomba, você precisa empunhá-la, gastar uma ação de'
        + ' movimento para acender seu pavio e uma ação padrão'
        + ' para arremessá-la em um ponto em alcance curto.'
        + ' Criaturas a até 3m desse ponto sofrem 6d6 pontos de'
        + ' dano de impacto (Reflexos CD Des reduz à metade).',
				equipmentName: EquipmentName.bomb,
				price: 50,
				translatedName: 'Bomba',
				usageLimitType: 'wield',
			}),
			loveElixir: new EquipmentAlchemicData({
				alchemicCategory: EquipmentAlchemicCategory.prepared,
				description: 'Um humanoide que beba'
        + 'este líquido adocicado fica apaixonado pela primeira'
        + 'criatura que enxergar (condição enfeitiçado; Vontade'
        + 'CD Car anula). O efeito dura 1d3 dias.',
				equipmentName: EquipmentName.loveElixir,
				price: 100,
				translatedName: 'Elixir do Amor',
				usageLimitType: 'wield',
			}),
		};
}
