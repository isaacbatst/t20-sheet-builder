import {EquipmentName} from '../../EquipmentName';
import {EquipmentAlchemic} from '../EquipmentAlchemic';
import {EquipmentAlchemicCategory} from '../EquipmentAlchemicCategory';

export class LoveElixir extends EquipmentAlchemic {
	override alchemicCategory: EquipmentAlchemicCategory = EquipmentAlchemicCategory.prepared;
	override price = 100;
	override description: string = 'Um humanoide que beba'
  + ' este líquido adocicado fica apaixonado pela primeira'
  + ' criatura que enxergar (condição enfeitiçado; Vontade'
  + ' CD Car anula). O efeito dura 1d3 dias.';

	override name: EquipmentName = EquipmentName.loveElixir;
	override isWieldable = true;
}
