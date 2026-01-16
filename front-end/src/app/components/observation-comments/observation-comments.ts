import { Component, inject, input, signal } from '@angular/core';
import { CommentService, Comment } from '../../services/comment-service';

@Component({
  selector: 'app-observation-comments',
  imports: [],
  templateUrl: './observation-comments.html',
  styleUrl: './observation-comments.css',
})
export class ObservationComments {

  observationId = input.required<number|undefined>();
  commentService = inject(CommentService);
  
  comments = signal<Comment[]>([]);

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    if (this.observationId() === undefined) {
      return;
    }
    this.commentService.getComments(this.observationId()!).then(comments => {
      this.comments.set(comments);
    });
  }

}