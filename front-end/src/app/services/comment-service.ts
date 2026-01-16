import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api/observations/{observation_id}/comments';


  getComments(observationId: number): Promise<Comment[]> {
    const url = this.apiUrl.replace('{observation_id}', observationId.toString());
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      return response.json();
    });
  }

  postComment(observationId: number, content: string, isPublic: boolean): Promise<Comment> {
    const url = this.apiUrl.replace('{observation_id}', observationId.toString());
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({ body: content, is_public: isPublic })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      return response.json();
    });
  }

}

export interface Comment {
  id: number;
  observation_id: number;
  user_id: number;
  body: string;
  is_public: boolean;
  created_at: string;
  user?: {
    id: number;
    username: string;
  };
}