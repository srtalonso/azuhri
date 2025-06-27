import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'app-footer',
  imports: [ToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    //Declaramos variable del año automático
    currentYear = new Date().getFullYear();
}
