import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { MetricsComponent } from './components/metrics/metrics.component';
import { MainComponent } from './components/main/main.component';
import { MemoryComponent } from './components/memory/memory.component';
import { WeightsComponent } from './components/weights/weights.component';
import { TripleStoreComponent } from './components/triple-store/triple-store.component';
import { BenchmarksComponent } from './components/benchmarks/benchmarks.component';
import { ResultsComponent } from './components/results/results.component';
import { InfoComponent } from './components/info/info.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  { path: '', component: MetricsComponent },
  { path: 'metrics', component: MetricsComponent },
  { path: 'weights', component: WeightsComponent },
  { path: 'triple-stores', component: TripleStoreComponent },
  { path: 'memory', component: MemoryComponent },
  { path: 'benchmarks', component: BenchmarksComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'info', component: InfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
