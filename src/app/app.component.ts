import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Katas</h1>
    <section><h2>01 · Add name</h2><app-add-name></app-add-name></section>
    <section><h2>02 · Filter list</h2><app-filter-list></app-filter-list></section>
    <section><h2>03 · Edit / delete</h2><app-edit-delete></app-edit-delete></section>
    <section><h2>04 · Input / Output</h2><app-user-list></app-user-list></section>
    <section><h2>05 · HttpClient</h2><app-http-list></app-http-list></section>
    <section><h2>06 · Reactive form</h2><app-signup-form></app-signup-form></section>
  `,
})
export class AppComponent {}
