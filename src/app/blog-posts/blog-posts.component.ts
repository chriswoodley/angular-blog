import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from '../blog-post/blog-post.component'
import { Post } from '../post';

@Component({
  selector: 'app-blog-posts',
  standalone: true,
  imports: [
    CommonModule,
    BlogPostComponent
  ],
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent {
  @Input()
  posts: Post[] = []
}
