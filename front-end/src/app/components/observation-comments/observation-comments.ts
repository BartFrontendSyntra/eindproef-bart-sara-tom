import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment-service';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-observation-comments',
  imports: [FormsModule],
  templateUrl: './observation-comments.html',
  styleUrl: './observation-comments.css',
})
export class ObservationComments {

  observationId = input.required<number|undefined>();
  commentService = inject(CommentService);
  authService = inject(AuthenticationService);
  
  comments = signal<Comment[]>([]);
  newCommentBody = '';
  isPublic = true;

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

  canChooseVisibility(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Ranger' || role === 'Admin';
  }

  postNewComment() {
    if (!this.newCommentBody.trim() || this.observationId() === undefined) {
      return;
    }

    // Visitors must always post public comments
    const isPublicComment = this.canChooseVisibility() ? this.isPublic : true;

    this.commentService.postComment(
      this.observationId()!,
      this.newCommentBody,
      isPublicComment
    ).then(newComment => {
      // Add new comment to the list
      this.comments.update(comments => [newComment, ...comments]);
      // Clear the form
      this.newCommentBody = '';
      this.isPublic = true;
    }).catch(error => {
      console.error('Error posting comment:', error);
    });
  }

}