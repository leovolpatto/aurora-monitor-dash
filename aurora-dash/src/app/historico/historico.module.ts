import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoricoPage } from './historico.page';
import { ReportService } from '../services/report.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,    
    RouterModule.forChild([{ path: '', component: HistoricoPage }])
  ],
  declarations: [HistoricoPage]
})
export class HistoricoPageModule {}
