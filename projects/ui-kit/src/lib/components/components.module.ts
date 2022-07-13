import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RoundButtonComponent } from './round-button/round-button.component';
import { ToastComponent } from './toast/toast.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { HttpClientModule } from '@angular/common/http';
import { CloseButtonComponent } from './close-button/close-button.component';
import { ImgLoaderComponent } from './img-loader/img-loader.component';

@NgModule({
  declarations: [
    ButtonComponent,
    WelcomeComponent,
    RoundButtonComponent,
    ToastComponent,
    InputComponent,
    CheckboxComponent,
    TextareaComponent,
    AutocompleteComponent,
    CloseButtonComponent,
    ImgLoaderComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  exports: [
    ButtonComponent,
    WelcomeComponent,
    RoundButtonComponent,
    ToastComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    AutocompleteComponent,
    CloseButtonComponent,
    ImgLoaderComponent,
  ],
})
export class ComponentsModule {}
