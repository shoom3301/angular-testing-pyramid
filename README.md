## Angular testing pyramid

|        Main page (quotes list)      |              Quote page               |
| ----------------------------------- | ------------------------------------- |
| ![main page](assets/main_page.png)  | ![quote_page](assets/quote_page.png)  |

### Actions:
1. The quotes list display
2. Open/close the "add quote" form
3. Create new quote (+ form validation)
4. Open the quote page
5. Back to the main page

### Tests (e2e / integration / contract / unit)

#### E2E:

##### [Quotes app:](e2e/src/app.e2e.ts)

1. A list of quotes should be displayed on the page
2. The created quote should be appended to list
3. Quote page should be opened on click to quote item

#### Integration:

##### [Quote page:](src/modules/quote-page/quote-page.component.spec.ts)
1. Displayed text of quote is correct
2. Displayed author of quote is correct
3. Page should be changed to main on click to "To quotes list"

##### [Main page:](src/modules/quotes-page/quotes-page.component.spec.ts)
1. Title of page contains correct text
2. Quotes list is displayed and count of displayed quotes matches the input data
3. Quote create form is opened by default
4. Form is closing when "X" button is clicked
5. Form is opening when "Create quote" button is clicked

##### [Quotes list:](src/modules/quotes-list/quotes-list.component.spec.ts)
1. Count of displayed quotes matches the input data
2. Text of first quote is correct
3. Author of first quote is correct
4. First quote item have link to its page

##### [Quote create form:](src/modules/quote-create-form/quote-create-form.component.spec.ts)
1. Text of error validation is not displayed by default
2. Validation error is displayed, when:
    1. Author name length less than 2 characters
    2. Text less than 2 characters
    3. Author name length greater than 64 characters
    4. Text length greater than 256 characters
    5. Author is not filled
    6.Text is not filled
3. Validation error is not displayed, when:
    1. length of author name > 2 & < 64 and length of text > 2 & < 256
4. Form submitting
    1. When form is valid
        1. The entered data is sent
        2. Fields of form cleans
    4. When form is not valid
        1. The entered data is not sent

#### Contract:

##### [Quotes API:](src/services/quotes.service.spec.ts)
1. loadQuotesList() - requests a list of quotes
2. loadQuote() - requests quote by id
3. createQuote() - quote creating

#### Unit:

##### [Store effects:](src/store/effects/quotes.effect.spec.ts)
1. When QuotesFetchAll is triggered, a list of quotes is requested and the QuotesFetchedAll event is created
2. When QuotesFetchOne is triggered, a quote is requested and the QuotesFetchedOne event is created
3. When QuotesCreate is triggered, the quote is sent to the server and the QuotesFetchedOne event is created

##### [Store reducers:](src/store/reducers/quotes.reducer.spec.ts)
1. QuotesFetchedAll must replace quotes list in store
2. QuotesFetchedOne must append quote to the list in store
3. QuotesFetchedOne must do not append quote to the list in store, if quote is exist in list
4. QuotesFetchedOne must append quote to the list in store, if quote is not exist in list

##### [Quote page resolver:](src/router/resolvers/quote.resolver.spec.ts)
1. Creates QuotesFetchOne action, for loading data from server
2. Gives quote from store by id from router
3. If the store does not have the expected quote, then it expects its appearance (filter)

##### [Quotes page resolver:](src/router/resolvers/quotes.resolver.spec.ts)
1. Creates QuotesFetchAll action, for loading data from server
2. Gives Observable with quotes list from store
3. Observable with a list of quotes can send new data
