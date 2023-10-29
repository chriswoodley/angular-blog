import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostPageComponent } from '../blog-post-page/blog-post-page.component';
import { BlogPostComponent } from '../blog-post/blog-post.component';

@Component({
  selector: 'app-account-blog-post-page',
  standalone: true,
  imports: [CommonModule, BlogPostComponent],
  templateUrl: './account-blog-post-page.component.html',
  styleUrls: ['./account-blog-post-page.component.css']
})
export class AccountBlogPostPageComponent
  extends BlogPostPageComponent
  implements OnInit {

  @Input()
  path: string = '/account/posts'

  constructor() {
    super();
  }
}
