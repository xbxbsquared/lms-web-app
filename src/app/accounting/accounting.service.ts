import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) { }

  getOffices(): Observable<any> {
    return  this.http.get('/offices?orderBy=id');
  }

  getAccountingRules(useHttpParams?: boolean): Observable<any> {
    let httpParams = new HttpParams();
    if (useHttpParams) {
      httpParams = httpParams.set('associations', 'all');
    }
    return this.http.get('/accountingrules', { params: httpParams });
  }

  getCurrencies(): Observable<any> {
    return this.http.get('/currencies');
  }

  getPaymentTypes(): Observable<any> {
    return this.http.get('/paymenttypes');
  }

  createJournalEntry(journalEntry: any): Observable<any> {
    return this.http.post('/journalentries', journalEntry);
  }

  getJournalEntry(transactionId: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('transactionId', transactionId);
    httpParams = httpParams.set('transactionDetails', 'true');
    return this.http.get(`/journalentries`, { params: httpParams });
  }

  // filterBy: officeId, glAccountId, manualEntriesOnly, fromDate, toDate, transactionId
  getJournalEntries(filterBy: any, orderBy: string, sortOrder: string, offset: number, limit: number) {
    let httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy);
    filterBy.forEach(function (filter: any) {
      if (filter.value) {
        httpParams = httpParams.set(filter.type, filter.value);
      }
    });
    return this.http.get('/journalentries', {
      params: httpParams
    });
  }

  revertTransaction(transactionId: string, comments: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('command', 'reverse');
    let data = {};
    if (comments) {
      data = { comments: comments };
    }
    return this.http.post(`/journalentries/${transactionId}`, data, { params: httpParams });
  }

  getGlAccounts() {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('manualEntriesAllowed', 'true');
    httpParams = httpParams.set('usage', '1');
    httpParams = httpParams.set('disabled', 'false');
    return this.http.get(`/glaccounts`, { params: httpParams });
  }

  getFinancialActivityAccounts() {
    return this.http.get('/financialactivityaccounts');
  }

  getFinancialActivityAccountsTemplate() {
    return this.http.get('/financialactivityaccounts/template');
  }

  createFinancialActivityAccount(financialActivityAccount: any) {
    return this.http.post('/financialactivityaccounts', financialActivityAccount);
  }

  getFinancialActivityAccount(financialActivityAccountId: number, template: boolean) {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/financialactivityaccounts/${financialActivityAccountId}`, { params: httpParams });
  }

  updateFinancialActivityAccount(financialActivityAccountId: number, financialActivityAccount: any) {
    return this.http.put(`/financialactivityaccounts/${financialActivityAccountId}`, financialActivityAccount);
  }

  deleteFinancialActivityAccount(financialActivityAccountId: number) {
    return this.http.delete(`/financialactivityaccounts/${financialActivityAccountId}`);
  }

  getChartOfAccounts() {
    return this.http.get('/glaccounts');
  }

  getChartOfAccountsTemplate() {
    return this.http.get('/glaccounts/template');
  }

  createGlAccount(glAccount: any) {
    return this.http.post('/glaccounts', glAccount);
  }

  getGlAccount(glAccountId: string, template: boolean = false) {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/glaccounts/${glAccountId}`, { params: httpParams });
  }

  updateGlAccount(glAccountId: number, glAccount: any) {
    return this.http.put(`/glaccounts/${glAccountId}`, glAccount);
  }

  deleteGlAccount(glAccountId: number) {
    return this.http.delete(`/glaccounts/${glAccountId}`);
  }

  getAccountingClosures() {
    return this.http.get('/glclosures');
  }

  createAccountingClosure(accountingClosure: any) {
    return this.http.post('/glclosures', accountingClosure);
  }

  getAccountingClosure(accountingClosureId: number) {
    return this.http.get(`/glclosures/${accountingClosureId}`);
  }

  deleteAccountingClosure(accountingClosureId: number) {
    return this.http.delete(`/glclosures/${accountingClosureId}`);
  }

  updateAccountingClosure(accountingClosureId: number, accountingClosure: any) {
    return this.http.put(`/glclosures/${accountingClosureId}`, accountingClosure);
  }

  getAccountingRulesTemplate() {
    return this.http.get('/accountingrules/template');
  }

  createAccountingRule(accountingRule: any) {
    return this.http.post('/accountingrules', accountingRule);
  }

  getAccountingRule(accountingRuleId: string) {
    return this.http.get(`/accountingrules/${accountingRuleId}`);
  }

  deleteAccountingRule(accountingRuleId: number) {
    return this.http.delete(`/accountingrules/${accountingRuleId}`);
  }

  updateAccountingRule(accoutingRuleId: number, accountingRule: any) {
    return this.http.put(`/accountingrules/${accoutingRuleId}`, accountingRule);
  }

  executePeriodicAccruals(periodicAccruals: any) {
    return this.http.post('/runaccruals', periodicAccruals);
  }

  getProvisioningEntries() {
    return this.http.get('/provisioningentries');
  }

  createProvisioningEntry(provisioningEntry: any) {
    return this.http.post('/provisioningentries', provisioningEntry);
  }

  getProvisioningEntry(provisioningEntryId: string) {
    return this.http.get(`/provisioningentries/${provisioningEntryId}`);
  }

  getLoanProducts() {
    return this.http.get('/loanproducts');
  }

  getProvisioningCategories() {
    return this.http.get('/provisioningcategory');
  }

  getProvisioningEntryEntries(entryId: string) {
    const httpParams = new HttpParams().set('entryId', entryId);
    return this.http.get('/provisioningentries/entries', { params: httpParams });
  }

  getProvisioningJournalEntries(entryId: string) {
    const httpParams = new HttpParams().set('entryId', entryId);
    return this.http.get('/journalentries/provisioning', { params: httpParams });
  }

  createProvisioningJournalEntries(provisioningEntryId: string) {
    const httpParams = new HttpParams().set('command', 'createjournalentry');
    return this.http.post(`/provisioningentries/${provisioningEntryId}`, {}, { params: httpParams });
  }

  recreateProvisioningEntries(provisioningEntryId: string) {
    const httpParams = new HttpParams().set('command', 'recreateprovisioningentry');
    return this.http.post(`/provisioningentries/${provisioningEntryId}`, {}, { params: httpParams });
  }

  retrieveOpeningBalances(officeId: number) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('officeId', officeId.toString());
    return this.http.get('/journalentries/openingbalance', { params: httpParams });
  }

  defineOpeningBalances(openingBalances: any) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('command', 'defineOpeningBalance');
    return this.http.post(`/journalentries`, openingBalances, { params: httpParams });
  }

}