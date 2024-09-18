import { Component } from '@angular/core';
import { Country } from '../../model/country.model';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Landmark } from '../../model/landmark.model';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  countries:Array<Country>;
  selectedLandmark :Landmark;
  constructor(
    private data:DataService,
    private dialogRef: MatDialogRef<EditComponent>,
    private http:HttpClient){
    this.countries=data.countries;
    this.selectedLandmark=data.selectedLandmark;
  }
  close(){
    this.dialogRef.close();
  }
  save(name:string,detail:string,url:string,country:number,idx:number){
    let jsonObj={
      name:name,
      detail:detail,
      url:url,
      country:country,
    }
    let jsonString= JSON.stringify(jsonObj);
    this.http.put(this.data.apiEndpoint+"/landmark/"+ idx ,jsonString,
      {observe:'response'}).subscribe((response)=>{
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
        this.dialogRef.close()
      });
  }
}
