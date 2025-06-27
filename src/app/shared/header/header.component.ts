import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-header',
  imports: [ToolbarModule,
            ButtonModule,
            RippleModule],
  templateUrl: './header.component.html',     //Archivo de plantilla html
  styleUrl: './header.component.css',         //Archivo de stilos css
  encapsulation: ViewEncapsulation.None       //Desabilita encapsulacon para poder aplicar estilos globales
})

export class HeaderComponent {
  //Vamos  configurar el modo oscuro (true) o claro (false)
  darkMode = false;

  //Alterna modo claro/oscuro
  toggleTheme (){
  this.darkMode = !this.darkMode; // cambia el estado de
  document.body.classList.toggle('dark', this.darkMode);    //Aplica o remueve clase en el body
  }
}
