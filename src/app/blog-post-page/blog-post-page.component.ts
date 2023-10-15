import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Post } from '../post';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, BlogPostComponent],
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.css']
})
export class BlogPostPageComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  postId: number = -1;
  post: Post | undefined;

  constructor() {
    this.postId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    if (!this.postId || Number.isNaN(this.postId)) {
      this.router.navigate(['not-found']);
    } else {
      this.fetchPost()
    }
  }

  private fetchPost() {
    this.blogService.getPost(this.postId)
      .subscribe((post) => {
        if (!post) {
          this.router.navigate(['not-found'])
        }

        this.post = post
      });
  }
}
