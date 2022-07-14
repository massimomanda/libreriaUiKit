# UIKit autocomplete

![Angular logo](https://raw.githubusercontent.com/angular/angular/main/aio/src/assets/images/logos/angular/angular.png)


This is a customizable autocomplete component made with Angular 14.

---

## Features

- Reactive-form ready
- Customizable debounce time
- Customizable style
- Customizable minimum characters required to launch the search process

---

## Tech

This library was made using:

- [Angular 14] - The modern web developer's platform!
- [RxJs] - Reactive Extensions Library for JavaScript.


You can find our [public repository][repo] on GitHub.

---

## Installation

To use the Autocomplete component first clone [this repository][repo] and then open it inside your IDE.

Run `ng build uiKit` to build the project. The build artifacts will be stored in the `dist/` directory.

Move to `dist/` directory and run `npm pack`. This will generate a `ui-kit-x.x.x.tgz` (where 'x' stands for version) in the same directory. Remember the location of this file or move it where you need it.

Create or move to your project directory and run `npm i "localfiledirectory\ui-kit-x.x.x.tgz"`.

---

## Usage

Import `ComponentsModule` from `ui-kit` in your root NgModule.

```sh
import { ComponentsModule } from 'ui-kit';
```

```sh
@NgModule({
      declarations: [
        ...
      ],
      imports: [
        ...
        ComponentsModule
      ],
    })
export class AppModule { }
```

You can now use the `<lib-autocomplete>` HTML tag anywhere in your project to include the autocomplete input.

```sh
<lib-autocomplete 
    [placeholder]="'Type something...'"
    [parentFormGroup]="formAutocomplete"
    [controlName]="'autocomplete'"
    [name]="'autocomplete'"
    [for]="'autocomplete'"
    [class]="'primary'"
    [searchResult]="searchResult"
    [isSearching]="isSearchingFlag"
    [debounceValue]="500"
    [minCharactersToStartSearch]="3"
    (onInput)="startSearch($event)"
>
</lib-autocomplete>
```
In order to customize this component you can use various property bindings in your HTML that you can find listed below.
 
### HTML & CSS customizations
  
  | Property | Type | Description |
| ----------- | ----------- | ----------- |
| `[class]` | string | Sets a custom CSS `class` |
| `[type]` | string | Sets input `type` |
| `[placeholder]` | string | Sets `placeholder` |
| `[height]` | string | Sets component `height` |
| `[backgroundInput]` | string | Sets component `background-color` |
| `[for]` | string | Sets `for` attribute |
| `[textLabel]` | string | Sets input `label` |
  
### Forms handling

| Property | Type | Description |
| ----------- | ----------- | ----------- |
| `[parentFormGroup]` | {} as FormGroup | Sets input `parentFormGroup` |
| `[name]` | string | Sets input `name` attribute |
| `[value]` | string | Sets input `value` |
| `[controlName]` | string | Sets input `controlName` |

### Custom properties

| Property | Type | Description |
| ----------- | ----------- | ----------- |
| `[isSearching]` | boolean | Can be used to trigger input's `built-in loader` |
| `[noResult]` | boolean | Can be used to trigger input's built-in `no result found message` |
| `[searchResult]` | any[] | Needed to link your `HTTP response` to the component |
| `[debounceValue]` | number | Sets `delay` between inputs and the start of HTTP calls |
| `[minCharactersToStartSearch]` | number | Sets a `minimum amount of characters` before search starts |
  
### Output properties

| Property | Type | Description |
| ----------- | ----------- | ----------- |
| `(onInput)` | EventEmitter | Can be used to read `input value changes` |
| `(onSelectedOption)` | EventEmitter | Can be used to `read the selected option from the results` |


   [repo]: <https://github.com/massimomanda/libreriaUiKit>
   [Angular 14]: <https://angular.io/>
   [RxJs]: <https://rxjs.dev/>
