import { RedirectCommand, Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';

export const routes: Routes = [
    //Ruta raiz que dirige automaticamnete a chat
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    //Ruta /chat que renderiza ChatComponent
    {path: 'chat', component: ChatComponent},
    //Ruta comudin: que se equivoque p ej en la URL, le redirijimos
    {path: '**', redirectTo: 'chat'}
];
