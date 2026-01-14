import { Component } from '@angular/core';
import { ObservationList } from "../../components/observation-list/observation-list";

@Component({
  selector: 'app-messages',
  imports: [ObservationList],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {

}
