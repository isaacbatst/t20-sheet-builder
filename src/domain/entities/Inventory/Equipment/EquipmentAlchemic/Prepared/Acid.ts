import {EquipmentName} from '../../EquipmentName';
import {EquipmentAlchemic} from '../EquipmentAlchemic';
import {EquipmentAlchemicCategory} from '../EquipmentAlchemicCategory';

export class Acid extends EquipmentAlchemic {
	override alchemicCategory: EquipmentAlchemicCategory = EquipmentAlchemicCategory.prepared;
	override price = 10;
	override description: string = 'Frasco de vidro contendo um ácido alquímico'
  + ' altamente corrosivo. Para usar o ácido, você'
  + ' gasta uma ação padrão e escolhe uma criatura em'
  + ' alcance curto. Essa criatura sofre 2d4 pontos de dano'
  + ' de ácido (Reflexos CD Des reduz à metade).';

	override name: EquipmentName = EquipmentName.acid;
	override isWieldable = true;
}
