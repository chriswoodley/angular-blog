import { Routes } from '@angular/router';
import { BlogPostsPageComponent } from './blog-posts-page/blog-posts-page.component';
import { BlogPostPageComponent } from './blog-post-page/blog-post-page.component';
import { CreateBlogPostPageComponent } from './create-blog-post-page/create-blog-post-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountProfilePageComponent } from './account-profile-page/account-profile-page.component';
import { authGuard } from './auth.guard';
import { NewAccountPageComponent } from './new-account-page/new-account-page.component';
import { AccountBlogPostsPageComponent } from './account-blog-posts-page/account-blog-posts-page.component';
import { AccountBlogPostPageComponent } from './account-blog-post-page/account-blog-post-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogPostsPageComponent,
    title: 'Blog Posts Page'
  },
  {
    path: 'posts',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'posts/create',
    component: CreateBlogPostPageComponent,
    title: 'Create Blog Post Page'
  },
  {
    path: 'posts/:id',
    component: BlogPostPageComponent,
    title: 'Blog Post Page'
  },
  {
    path: 'account',
    component: AccountPageComponent,
    title: 'Account Page'
  },
  {
    path: 'account/new',
    component: NewAccountPageComponent,
    title: 'New Account Page'
  },
  {
    path: 'account/profile',
    component: AccountProfilePageComponent,
    title: 'Account Profile Page',
    canActivate: [authGuard]
  },
  {
    path: 'account/posts',
    component: AccountBlogPostsPageComponent,
    title: 'Account Blog Posts Page',
    canActivate: [authGuard]
  },
  {
    path: 'account/posts/:id',
    component: AccountBlogPostPageComponent,
    title: 'Account Blog Post Page',
    canActivate: [authGuard]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },
];
