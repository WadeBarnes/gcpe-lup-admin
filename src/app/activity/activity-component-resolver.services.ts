import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SearchService } from 'app/services/search.service';
import { ApiService } from 'app/services/api';

@Injectable()
export class ActivityComponentResolver implements Resolve<Observable<object>> {
  constructor(
    private searchService: SearchService,
    private api: ApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    const activity = route.paramMap.get('activityId');
    if (activity) {
      return this.searchService.getItem(activity, 'RecentActivity');
    } else {
      const pageNum = Number(route.queryParams['pageNum'] ? route.queryParams['pageNum'] : 1);
      const pageSize = Number(route.queryParams['pageSize'] ? route.queryParams['pageSize'] : 10);
      const sortBy = route.queryParams['sortBy'] ? route.queryParams['sortBy'] : '-dateAdded';
      const keywords = route.params.keywords;
      return this.searchService.getSearchResults(keywords,
        'RecentActivity',
        null,
        pageNum,
        pageSize,
        sortBy,
        null,
        true);
    }
  }
}
