import { Module } from "@nestjs/common";
import { ConnectionModule } from "src/config/connection.module";
import { TreatmentController } from "./controller/treatment.controller";
import { TreatmentService } from "./services/treatment.service";
import { MedicalConditionController } from "./controller/medical-condition.controller";
import { MedicalConditionService } from "./services/medical-condition.service";
import { MedicineController } from "./controller/medicine.controller";
import { MedicineService } from "./services/medicine.service";

@Module({
  imports: [ConnectionModule],
  controllers: [
    TreatmentController,
    MedicalConditionController,
    MedicineController,  
  ],
  providers: [
    TreatmentService,
    MedicalConditionService,
    MedicineService,     
  ],
  exports: [
    TreatmentService,
    MedicalConditionService,
    MedicineService,     
  ],
})
export class MasterPageModule {}
