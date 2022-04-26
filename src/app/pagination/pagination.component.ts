import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input('totalItems') totalItems = 205;
  @Input('itemsPerPage') itemsPerPage = 10;
  @Output('pageChange') pageChange = new EventEmitter();

  page = 1;
  pages = [];

  constructor() {}

  ngOnInit(): void {
    this.changePage();
  }

  changePage(page = 1) {
    if (page < 1) page = 1;
    let numPages = this.numPages();
    if (page > numPages) page = numPages;

    this.page = page;
    this.pages = [];

    let start = 0;
    let end = page - 1 + this.itemsPerPage;
    if (numPages > 10) {
      start = page - 4;
      if (start < 1) start = 1;
    }
    if (page < numPages - 4) {
      end = page + 4;
    } else {
      end = numPages;
    }
    for (var i = start; i <= end; i++) {
      this.pages.push(i);
    }

    this.pageChange.emit({
      page: page,
      skip: this.itemsPerPage * (page - 1),
      limit: this.itemsPerPage,
    });
  }

  numPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
