import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog-post-tags',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './blog-post-tags.component.html',
  styleUrls: ['./blog-post-tags.component.css']
})
export class BlogPostTagsComponent {
  @Input()
  tags: string[] = [];

  @Input()
  isFilter: boolean = false;
}
