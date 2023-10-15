import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import BlogSearch from '../models/blog-search';
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-blog-posts-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './blog-posts-search.component.html',
  styleUrls: ['./blog-posts-search.component.css']
})
export class BlogPostsSearchComponent {
  blogSearchModel = new BlogSearch()

  @Output()
  onSubmitEvent = new EventEmitter<string>();

  onSubmit() {
    this.onSubmitEvent.emit(this.blogSearchModel.searchText)
  }
}
