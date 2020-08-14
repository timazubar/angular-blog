import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from './../shared/interfaces/interfaces';
import { PostsService } from './../../shared/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  remove(id: string) {}

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
