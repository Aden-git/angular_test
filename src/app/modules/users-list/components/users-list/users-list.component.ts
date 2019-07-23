import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, finalize } from 'rxjs/operators';
import { ApiService } from '../../../../core/services';
import { UserInterface, PageInfoInterface } from '../../../../core/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList = new BehaviorSubject<UserInterface[]>([]);
  loading: boolean;

  usersCount: number;
  itemsPerPage: number;
  selectedPageIndex: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(({ page }) => {
        const timeoutId = setTimeout(() => {
          this.loading = true;
        }, 300);
        this.selectedPageIndex = page - 1;

        return this.apiService.fetchUsersData(page).pipe(
          finalize(() => {
            clearTimeout(timeoutId);
            this.loading = false;
          })
        );
      })
    ).subscribe((data: PageInfoInterface) => {
      this.userList.next(data.data);
      this.setPageInfo(data);
    });
  }

  pageChanged(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }

  private setPageInfo(data: PageInfoInterface) {
    this.usersCount = data.total;
    this.itemsPerPage = data.per_page;
    this.selectedPageIndex = data.page - 1;
  }
}
