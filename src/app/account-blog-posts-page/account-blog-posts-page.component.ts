import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostsPageComponent } from '../blog-posts-page/blog-posts-page.component';
import { AuthService } from '../auth.service';
import { AuthUser } from '../auth-user';
import { tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { BlogPostsComponent } from '../blog-posts/blog-posts.component';
import { BlogPostsSearchComponent } from '../blog-posts-search/blog-posts-search.component';
import { BlogPostTagsComponent } from '../blog-post-tags/blog-post-tags.component';

@Component({
  selector: 'app-account-blog-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogPostsComponent,
    BlogPostsSearchComponent,
    BlogPostTagsComponent
  ],
  templateUrl: './account-blog-posts-page.component.html',
  styleUrls: ['./account-blog-posts-page.component.css']
})
export class AccountBlogPostsPageComponent
  extends BlogPostsPageComponent
  implements OnInit {

  private authService: AuthService = inject(AuthService);
  authUser!: AuthUser | undefined;
  path: string = '/account/posts';

  constructor() {
    super();
  }

  protected override fetchPosts() {
    this.authUser = this.authService.authUser;

    if (this.authUser?.id) {
      this.blogService.getPostsByUser(this.authUser.id)
        .pipe(
          tap((data) => {
            this.posts = data?.posts || [];
            this.filteredPosts = this.posts;
            this.allTags = [...new Set(this.posts.flatMap((post) => post.tags))];
          })
        )
        .subscribe()
    }
  }

  protected override searchPosts(searchText: string) {
    if (searchText.trim()) {
      this.blogService.searchPosts(searchText)
        .pipe(
          tap((data) => {
            if (searchText) {
              this.headingText = `Your posts searched with: ${searchText}`;
            } else {
              this.headingText = "All of your posts";
            }

            this.filteredPosts = data?.posts?.filter(
              ({userId}) => userId === this.authUser?.id
            ) || [];
          })
        )
        .subscribe();
    } else {
      this.fetchPosts();
    }
  }

  protected override filterByTag() {
    this.route.queryParams
      .pipe(
        tap(({tag}) => {
          if (tag) {
            this.isFiltered = true;
            this.headingText = `Your posts tagged with: ${tag}`
            this.filteredPosts = this.posts.filter(
              post => post.tags
                .includes(tag) && post.userId === this.authUser?.id
            );
          } else {
            this.isFiltered = false;
            this.headingText = `All of your posts`;
            this.filteredPosts = this.posts;
          }
        })
      )
      .subscribe();
  }
}
