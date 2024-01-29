describe("Practice suit", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(
    "Visit every time in the base url before executing any test case",
    () => {
      cy.visit("/");
      // click element list
      cy.contains("Elements").click();

      // Click the button
    cy.get(".element-list.collapse.show").should("be.visible");
    }
  );

  it("Element Testing", () => {
    // Click the button
    cy.get(".element-list.collapse.show").should("be.visible");

    //Click the text Box
    cy.get(".element-list.collapse.show").within(() => {
      cy.contains("Text Box").click();
    });
    cy.get(".col-md-6").should("exist");
    cy.get(".col-12.mt-4.col-md-6").within(() => {
      cy.get("#userName").type("Md Shawkat Hossain Sohan");
      //check with invalid useremail
      cy.get("#userEmail").type("shsoh");
      cy.get("#currentAddress-wrapper").type("Dhaka Narayaganj");
      cy.get("#permanentAddress").type("Dhaka Narayanganj");
      cy.get("#submit").click();
      cy.get("#userEmail")
        .scrollIntoView()
        .should("have.css", "border-color", "rgb(255, 0, 0)");
      cy.get("#userEmail").clear();
      cy.get("#userEmail").type("shsohan47@gmail.com");
      cy.get("#submit").click();
      cy.get(".border.col-md-12.col-sm-12").should("be.visible");
    });
  });

  it("Test the check Box panel", () => {
    

    //Click the text Box
    cy.get(".element-list.collapse.show").within(() => {
      cy.contains("Check Box").click();
    });
    cy.get(".rct-option.rct-option-expand-all").click();
    cy.get(".rct-text")
      .eq(0)
      .within(() => {
        cy.get(".rct-icon.rct-icon-parent-open").click();
      });
    cy.get(".display-result.mt-4").should("be.visible");
  });
  it("check the radio button functionality",()=>
  {
    //Click the text Box
    cy.get(".element-list.collapse.show").within(() => {
        cy.contains("Radio Button").click();
      });
      cy.get("#yesRadio").check({force:true})
      cy.get(".mt-3").should("have.text","You have selected Yes");
      cy.get("#impressiveRadio").check({force:true})
      cy.get(".mt-3").should("have.text","You have selected Impressive");
      cy.get("#noRadio").should("be.disabled")
      

  })
  function registrationForm (fname,lname,mail,age,salary,department)
  {
    cy.get('.modal-content').within(()=>
      {
        cy.get('#firstName').type(fname);
        cy.get('#lastName').type(lname);
        cy.get('#userEmail').type(mail)
        cy.get('#age').type(age);
        cy.get('#salary').type(salary);
        cy.get('#department').type(department)
        cy.get('#submit').click();

      })
  }
  function clearRegistrationForm (fname,lname,mail,age,salary,department)
  {
    cy.get('.modal-content').within(()=>
      {
        cy.get('#firstName').clear()
        cy.get('#lastName').clear();
        cy.get('#userEmail').clear()
        cy.get('#age').clear();
        cy.get('#salary').clear();
        cy.get('#department').clear()
        

      })
  }
  it.only("Test case for web table",()=>
  {
     //Click the text Box
     cy.get(".element-list.collapse.show").within(() => {
        cy.contains("Web Tables").click();
      });
      //Click to add content on the table
      cy.get('#addNewRecordButton').click();

      //check weather invalid field handle the error properly
      registrationForm("shawkat","sohan","sh","18","30000","P&E");
      cy.get('.modal-content').within(()=>
      {
        
        //cy.get('#firstName').should("have.css","border-color","rgb(255, 0, 0)");
        cy.get('#userEmail').should("have.css","border-color","rgb(220, 53, 69)");
      });

      //check weather valid field test case
      clearRegistrationForm()
      registrationForm("shawkat","sohan","shsohan47@gmail.com","18","30000","P&E");
      cy.wait(1000);

      cy.get('.ReactTable.-striped.-highlight').contains("shawkat");
  })
});
