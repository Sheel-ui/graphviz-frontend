import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../../models/page.model';
import { MatPaginator } from '@angular/material/paginator';
import { Table } from '../../models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})



export class TableComponent {
  @Input() metadata!: Table;

  ELEMENT_DATA!: any;

  displayedColumns: string[] = [];
  dataSource!:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnint(){
    console.log(this.metadata);
    this.displayedColumns = this.metadata.columns;
    this.dataSource = new MatTableDataSource(this.metadata.rows);
  }

  ngOnChanges(){
    console.log(this.metadata);
    this.displayedColumns = this.metadata.columns;
    this.dataSource = new MatTableDataSource(this.metadata.rows);
  }

}

//Give me list of all students
