import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    QuillModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    QuillModule,
  ],
})
export class SharedModule {}
