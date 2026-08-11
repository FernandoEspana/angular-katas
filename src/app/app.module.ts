import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddNameComponent } from './kata-01-add-name/add-name.component';
import { FilterListComponent } from './kata-02-filter-list/filter-list.component';
import { EditDeleteComponent } from './kata-03-edit-delete/edit-delete.component';
import { UserListComponent } from './kata-04-input-output/user-list.component';
import { UserCardComponent } from './kata-04-input-output/user-card.component';
import { HttpListComponent } from './kata-05-http-list/http-list.component';
import { SignupFormComponent } from './kata-06-reactive-form/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNameComponent,
    FilterListComponent,
    EditDeleteComponent,
    UserListComponent,
    UserCardComponent,
    HttpListComponent,
    SignupFormComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
