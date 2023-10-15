import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../blog.service'
import { Post } from '../post';
import { BlogPostsComponent } from '../blog-posts/blog-posts.component'
import { BlogPostTagsComponent } from '../blog-post-tags/blog-post-tags.component';


@Component({
  selector: 'app-blog-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    BlogPostsComponent,
    BlogPostTagsComponent
  ],
  templateUrl: './blog-posts-page.component.html',
  styleUrls: ['./blog-posts-page.component.css']
})
export class BlogPostsPageComponent {
  private blogService = inject(BlogService);
  posts: Post[] = [];
  allTags: string[] = [];

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.blogService.getPosts()
      .subscribe((data) => {
        this.posts = data?.posts || [];
        this.allTags = [...new Set(this.posts.flatMap((post) => post.tags))]
      })
  }
}
