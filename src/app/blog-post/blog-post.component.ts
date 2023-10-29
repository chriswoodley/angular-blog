import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { BlogPostTagsComponent } from '../blog-post-tags/blog-post-tags.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogPostTagsComponent
  ],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent {
  @Input()
  post!: Post|undefined;

  @Input()
  path: string = '/posts';

  @Input()
  editable: boolean = false;

  private route: ActivatedRoute = inject(ActivatedRoute);

  showFullPost: boolean = !!this.route.snapshot.params['id']
}
