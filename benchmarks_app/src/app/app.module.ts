import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterbarComponent } from './components/footerbar/footerbar.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { MainComponent } from './components/main/main.component';
import { WeightsComponent } from './components/weights/weights.component';
import { TripleStoreComponent } from './components/triple-store/triple-store.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

// Service
import { MetricsService } from './service/metrics.service';
import { MemoryComponent } from './components/memory/memory.component';
import { BenchmarksComponent } from './components/benchmarks/benchmarks.component';
import { ResultsComponent } from './components/results/results.component';

import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterbarComponent,
    MetricsComponent,
    MainComponent,
    WeightsComponent,
    MemoryComponent,
    TripleStoreComponent,
    BenchmarksComponent,
    ResultsComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule
  ],
  providers: [ MetricsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
