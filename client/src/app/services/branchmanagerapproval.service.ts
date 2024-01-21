import {Injectable} from '@angular/core';
import {Branchmanagerapproval} from '../entities/branchmanagerapproval';
import {HttpClient} from '@angular/common/http';
import {ApiManager} from '../shared/api-manager';

@Injectable({
  providedIn: 'root'
})
export class BranchmanagerapprovalService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Branchmanagerapproval[]>{
    const branchmanagerapprovals = await this.http.get<Branchmanagerapproval[]>(ApiManager.getURL('branchmanagerapprovals')).toPromise();
    return branchmanagerapprovals.map((branchmanagerapproval) => Object.assign(new Branchmanagerapproval(), branchmanagerapproval));
  }

}
