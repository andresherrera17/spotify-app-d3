import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _serviceAuth: AuthService) { }

  ngOnInit(): void {
    this.getReleases();
  }

  getReleases(){
    this._serviceAuth.getNewReleases().subscribe(data => {
      console.log(data);
    })
  }

}
