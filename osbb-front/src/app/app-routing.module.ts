import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {AdvertisementComponent} from "./components/advertisement/advertisement.component";
import {DiscussionComponent} from "./components/discussion/discussion.component";
import {DocumentsComponent} from "./components/documents/documents.component";
import {LoginComponent} from "./components/login/login.component";
import {NewsComponent} from "./components/news/news.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'advertisement',
    component: AdvertisementComponent
  },
  {
    path: 'discussion',
    component: DiscussionComponent
  },
  {
    path: 'documents',
    component: DocumentsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'news',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
