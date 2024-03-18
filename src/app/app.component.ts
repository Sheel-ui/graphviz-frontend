import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Table } from './models/table.model';
import { Graph } from './models/graph.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'graphviz-frontend';
  predictions: number = 5;
  tokens: number = 1;
  temperature: number = 1.0;
  files: string[] = [];
  fileStatus: string = "";
  formGroup! : FormGroup;
  selected: string='#3f51b5'
  default: string='rgba(0,0,0,.62)'
  graphData!: Graph;
  tableData!: Table;
  charttype: string= 'bar';
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  visualType: string = 'Graph';

  constructor(private fb : FormBuilder, public appService: AppService){}

  ngOnInit() {
    this.formGroup = new FormGroup({
      'query': new FormControl()
   });
    this.appService.getFileList().subscribe(data=>{
      this.files=data.files;
      this.fileStatus=this.files[0];
    })

  }

  onFormSubmit(){
    console.log(this.formGroup.value.query);
    this.appService.generate(this.formGroup.value.query,this.fileStatus).subscribe(data=>{
      if (data.result_type == 'graph') {
        this.graphData = data.data as Graph;
        this.visualType = 'Graph';
      } else if (data.result_type == 'table') {
        this.tableData = data.data as Table;
        this.visualType = 'Table'
      }
    })
}

  getfiles(){
    this.appService.getFileList().subscribe(data=>{
      this.files=data.files;
      this.fileStatus=this.files[0];
    })
  }

  onFileSelected(event: any): void {
    this.fileStatus = event.target.files[0].name ?? null;
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.appService.uploadFile(formData).subscribe(data=>{
      this.getfiles()
    })
  }

  setFile(file:any){
    this.fileStatus = file;
    console.log(this.formGroup.value.query);
    this.appService.generate(this.formGroup.value.query,this.fileStatus).subscribe(data=>{
      if (data.result_type == 'graph') {
        this.graphData = data.data as Graph;
        this.visualType = 'Graph';
      } else if (data.result_type == 'table') {
        this.tableData = data.data as Table;
        this.visualType = 'Table'
      }

    })
  }

}
