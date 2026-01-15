import { Component, inject, signal } from '@angular/core';
import { ObservationService, Observation } from '../../services/observation-service';
import { UserService, User } from '../../services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-admin-component',
  imports: [FormsModule],
  templateUrl: './users-admin-component.html',
  styleUrl: './users-admin-component.css',
})
export class UsersAdminComponent {

  userService = inject(UserService);

  users = signal<User[]>([]);
  roles = signal<string[]>(['Admin', 'Ranger', 'Visitor']);
  editingId = signal<number | null>(null);
  tempEditModel = signal<User | null>(null);

  ngOnInit() {
    this.loadUsers();
  }
  async loadUsers() {
    this.userService.getUsers()
    .then(usrs => this.users.set(usrs))
    .catch(error => console.error('Error loading users:', error));
  }
  startEdit(id: number) {
    this.editingId.set(id);
    const user = this.users().find(u => u.id === id);
    if (user) {
      this.tempEditModel.set({ ...user });
    }
  }

  cancelEdit() {
    this.editingId.set(null);
    this.tempEditModel.set(null);
  }

  updateUser(id: number, user: User) {
   const updatedData = this.tempEditModel();
    if (!updatedData) return;

    // Send updatedData to your API service
    this.userService.updateUser(id, updatedData).catch(error => {
      console.error('Error updating user:', error);
      return;
    });

    // On success, update the main signal list locally:
    this.users.update(list => 
      list.map(u => u.id === updatedData.id ? updatedData : u)
    );

    // Close the edit mode
    this.tempEditModel.set(null);
    this.editingId.set(null);
  }

}
