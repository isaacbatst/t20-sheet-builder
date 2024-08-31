import {EquipmentName} from '../../Inventory';
import {EquipmentClothing} from '../../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {GeneralPowerName, OriginPowerName} from '../../Power';
import {SkillName} from '../../Skill';
import {Origin} from '../Origin';
import {type SerializedBlueBlood, type OriginBenefit} from '../OriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedAristocrat} from '../SerializedOrigin';

export class Aristocrat extends Origin<SerializedBlueBlood, SerializedAristocrat> {
	static readonly originName = OriginName.aristocrat;
	static equipments = 'Joia de família no valor de T$ 300, traje da corte.';
	static skills: SkillName[] = [SkillName.diplomacy, SkillName.cheat, SkillName.nobility];
	static generalPowers: GeneralPowerName[] = [GeneralPowerName.command];
	static originPower = OriginPowerName.blueBlood;

	readonly name = Aristocrat.originName;
	constructor(chosenBenefits: Array<OriginBenefit<SerializedBlueBlood>>) {
		super(chosenBenefits, {
			skills: Aristocrat.skills,
			generalPowers: Aristocrat.generalPowers,
			originPower: Aristocrat.originPower,
		}, [
			new EquipmentClothing(EquipmentName.familyJewel, 300),
		]);
	}

	override serialize(): SerializedAristocrat {
		return {
			name: this.name,
			chosenBenefits: this.serializeBenefits(),
			equipments: this.serializeEquipments(),
		};
	}
}
