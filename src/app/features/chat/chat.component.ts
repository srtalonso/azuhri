import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';
import { SimpleMarkdownPipe } from '.. /../shared/pipes/markdown.pipe';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    NgForOf,
    NgClass,
    FormsModule,
    CardModule,
    ScrollPanelModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    SimpleMarkdownPipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
