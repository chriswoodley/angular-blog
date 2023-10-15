import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../blog.service'
import { Post } from '../post';
import { BlogPostsComponent } from '../blog-posts/blog-posts.component'
import { BlogPostTagsComponent } from '../blog-post-tags/blog-post-tags.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogPostsSearchComponent } from '../blog-posts-search/blog-posts-search.component';


@Component({
  selector: 'app-blog-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogPostsComponent,
    BlogPostTagsComponent,
    BlogPostsSearchComponent
  ],
  templateUrl: './blog-posts-page.component.html',
  styleUrls: ['./blog-posts-page.component.css']
})
export class BlogPostsPageComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  allTags: string[] = [];
  headingText: string = "All posts"
  isFiltered: boolean = false;

  ngOnInit(): void {
    this.fetchPosts();

    this.route.queryParams
      .subscribe(({tag}) => {
        if (tag) {
          this.isFiltered = true;
          this.headingText = `Posts tagged with: ${tag}`
          this.filteredPosts = this.posts.filter(post => post.tags.includes(tag));
        } else {
          this.isFiltered = false;
          this.headingText = `All posts`;
          this.filteredPosts = this.posts;
        }
      }
    );
  }

  search(e: string) {
    this.searchPosts(e);
  }

  private fetchPosts() {
    this.blogService.getPosts()
      .subscribe((data) => {
        this.posts = data?.posts || [];
        this.filteredPosts = this.posts;
        this.allTags = [...new Set(this.posts.flatMap((post) => post.tags))]
      })
  }

  private searchPosts(searchText: string) {
    this.blogService.searchPosts(searchText)
      .subscribe((data) => {
        if (searchText) {
          this.headingText = `Posts searched with: ${searchText}`
        } else {
          this.headingText = "All posts"
        }
        this.filteredPosts = data?.posts || [];
      })
  }
}
