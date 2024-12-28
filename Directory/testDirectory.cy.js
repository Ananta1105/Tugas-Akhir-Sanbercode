import DirectoryPage from "./directory.cy";

describe('Search Directory Feature',()=>{
    beforeEach(()=>{
        DirectoryPage.accessWebsite()
    });

    // Success Direct to menu Directory
    it('Success Direct to menu Directory', ()=>{
        DirectoryPage.textLogin().should('have.text','Login');
        DirectoryPage.inputUsername().type('Admin');
        DirectoryPage.inputPassword().type('admin123');
        cy.intercept("GET","**/directory/employees?limit=14&offset=0").as('employees?limit=14&offset=0');
        DirectoryPage.buttonLogin().click();
        DirectoryPage.menuDirectory().click();
        cy.wait('@employees?limit=14&offset=0').then((intercept)=>{
        expect(intercept.response.statusCode).to.equal(200);});
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Directory');
      });
    
    //Success search Employee with Complete Data
    it('Success search Employee with Complete Data', ()=>{
      DirectoryPage.textLogin().should('have.text','Login');
      DirectoryPage.inputUsername().type('Admin');
      DirectoryPage.inputPassword().type('admin123')
      DirectoryPage.buttonLogin().click();
      DirectoryPage.menuDirectory().click();
      DirectoryPage.inputEmployeeName().type('Peter');
      cy.get('div[role=listbox]').should('not.be.empty').contains('Peter Mac Anderson').first().click();
      DirectoryPage.clickJobTitle();
      DirectoryPage.selectJobTitle();
      DirectoryPage.clickLocation();
      DirectoryPage.optionLocation();
      DirectoryPage.selectLocation(); 
      cy.intercept('GET', '**/directory/employees?limit=14&offset=0&locationId=2&empNumber=3&jobTitleId=2').as('directorySearchRequest');
      DirectoryPage.clickSearch();
      cy.wait('@directorySearchRequest').its('response.statusCode').should('eq', 200);
      DirectoryPage.ProfileUser();
    });
    

    //'Success search Employee with Input Username and select Job Title'
    it('Success search Employee with Input Username and select Job Title', ()=>{
      DirectoryPage.textLogin().should('have.text','Login');
      DirectoryPage.inputUsername().type('Admin');
      DirectoryPage.inputPassword().type('admin123')
      DirectoryPage.buttonLogin().click();
      DirectoryPage.menuDirectory().click();
      DirectoryPage.inputEmployeeName().type('Peter');
      cy.get('div[role=listbox]').should('not.be.empty').contains('Peter Mac Anderson').first().click();
      DirectoryPage.clickJobTitle();
      DirectoryPage.selectJobTitle();
      cy.intercept('GET', '**/directory/employees?limit=14&offset=0&empNumber=3&jobTitleId=2').as('directorySearchRequest');
      DirectoryPage.clickSearch();
      cy.wait('@directorySearchRequest').its('response.statusCode').should('eq', 200);
      DirectoryPage.ProfileUser();
    });

    //'Success search Employee with Input Username and select Location'
    it('Success search Employee with Input Username and select Location', ()=>{
      DirectoryPage.textLogin().should('have.text','Login');
      DirectoryPage.inputUsername().type('Admin');
      DirectoryPage.inputPassword().type('admin123')
      DirectoryPage.buttonLogin().click();
      DirectoryPage.menuDirectory().click();
      DirectoryPage.inputEmployeeName().type('Peter');
      cy.get('div[role=listbox]').should('not.be.empty').contains('Peter Mac Anderson').first().click();
      DirectoryPage.clickLocation();
      DirectoryPage.optionLocation();
      DirectoryPage.selectLocation();
      cy.intercept('GET', '**/directory/employees?limit=14&offset=0&locationId=2&empNumber=3').as('directorySearchRequest');
      DirectoryPage.clickSearch();
      cy.wait('@directorySearchRequest').its('response.statusCode').should('eq', 200);
      DirectoryPage.ProfileUser();
    });

    //'Success search Employee with input Employee Name'
    it('Success search Employee with input Employee Name', ()=>{
      DirectoryPage.textLogin().should('have.text','Login');
      DirectoryPage.inputUsername().type('Admin');
      DirectoryPage.inputPassword().type('admin123');
      DirectoryPage.buttonLogin().click();
      DirectoryPage.menuDirectory().click();
      DirectoryPage.inputEmployeeName().type('Peter');
      cy.get('div[role=listbox]').should('not.be.empty').contains('Peter Mac Anderson').click();
      cy.intercept('GET', '**/directory/employees?limit=14&offset=0&empNumber=3').as('directorySearchRequest');
      DirectoryPage.clickSearch();
      cy.wait('@directorySearchRequest').its('response.statusCode').should('eq', 200);
      DirectoryPage.ProfileUser();
    });

});