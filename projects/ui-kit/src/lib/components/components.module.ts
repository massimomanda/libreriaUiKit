import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RoundButtonComponent } from './round-button/round-button.component';
import { ToastComponent } from './toast/toast.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';




@NgModule({
  declarations: [
    ButtonComponent,
    WelcomeComponent,
    RoundButtonComponent,
    ToastComponent,
    InputComponent,
    CheckboxComponent,
    TextareaComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,
  ],
  exports:[ButtonComponent,WelcomeComponent,RoundButtonComponent,ToastComponent,InputComponent, TextareaComponent, CheckboxComponent],
  
})
export class ComponentsModule { }
