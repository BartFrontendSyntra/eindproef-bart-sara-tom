import { Component, inject, input } from '@angular/core';
import { CommentService } from '../../services/comment-service';

@Component({
  selector: 'app-observation-comments',
  imports: [],
  templateUrl: './observation-comments.html',
  styleUrl: './observation-comments.css',
})
export class ObservationComments {

  observationId = input.required<number|undefined>();
  commentService = inject(CommentService);
  

}
