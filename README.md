# Frontend Candidate Test
## Introduction

We have a quick coding challenge we'd like you to try. The goal is for you to have a bit of fun showing us your frontend skills and to give us a sense for how you write code and solve problems.

We have a simple API that returns a JSON array containing details of top rated **movies**. We would like you to use **HTML**, **CSS** and **JavaScript** to read the API and display it in a **table**. You'll then build upon this to add **sorting** and **filtering** capabilities.

- Feel free to use any frameworks you would like to achieve the task ⚡
- Don't hesitate to ask questions if you need clarification 😄 
- Try to explain and talk about your thought process and decisions as you go 🤔

## API

### Movies

An array of movie objects with the following structure:

```json
{
  "id": "tt0111161",
  "url": "https://www.imdb.com/title/tt0111161/?ref_=adv_li_tt",
  "imageUrl": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg",
  "title": "The Shawshank Redemption",
  "imdbRating": 9.3,
  "metascoreRating": 80,
  "runtimeMins": 142,
  "genres": [
    "Drama"
  ],
  "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  "director": "Frank Darabont",
  "actors": [
    "Tim Robbins",
    "Morgan Freeman",
    "Bob Gunton",
    "William Sadler"
  ],
  "votes": "2360251",
  "gross": "28,341,469"
}
```

**API:** https://6049e293fb5dcc001796aba6.mockapi.io/movies

See MockAPI documentation for query options: https://mockapi.io/docs

## Tasks

### 1. Query the movie API

Simply query the movie API and print out the response.

### 2. Display the data in a HTML table

Include as many columns as possible. E.g. the title, an <img> element showing the `imageUrl`, the list of actors etc.

### 3. Format numeric columns

Let's improve the formatting of numeric columns (e.g. `votes` and `gross`).

- Align numeric columns headers and values to the right.
- Format numeric values as numbers grouped by thousands. E.g. "2360251" becomes "2,360,251".

### 4. Sorting

Allow the user to sort the table by clicking a column header.

  - By default the table should not be sorted.
  - Clicking a column header should cycle it through the following sorting states: `NONE -> ASC -> DESC -> NONE`.
  - When a column is sorted, show the sort direction next to the header name.

**Discuss:** How would you implement multiple levels of sorting?

### 5. Basic filtering

Add a text input field above the table which filters the rows.

  - Rows should be displayed in the table if **ANY** of the values in the row contain the search input.

### 6. Filtering specific columns

Instead of filtering on any values in the rows, add a "column" dropdown which allows users to choose a specific column (row property) to filter on.

For example, if the user chooses the **title** column in the dropdown, the filtering should only apply to rows where the `title` property contains the search input.

### 7. Filtering operators

So far the filtering comparison has always been a partial string match (e.g. does the row value "contain" the search input?).

Now we'd like to give users the ability to choose a filtering "operator" that determines how comparisons are made.

Add an additional "operator" dropdown between the column dropdown and the filter input. Allow the user to choose one of the following operators:

- **Equals** - Matches when the search input exactly equals the row value.
- **Not equals** - Opposite of **equals**.
- **Greater than** - Matches when the search input is greater than (`>`) the row value.
- **Less than**
- **Contains** - Partial string match.
- **Not contains** - Opposite of **contains**.

For example, the user should be able to filter all movies with a rating higher than 9.

### 8. Wildcard operators

Add a new operator called "Contains wildcard" that allows users to filter using wildcard characters (`*`). This is similar to the `LIKE` operator in SQL.

Examples:

- If the filter column is "title" and the filter input is `The*`, the table should show all rows with titles that begin with "The".

- If the filter column is "title" and the filter input is `*r`, the table should show all rows with titles that end with the letter "r".

### 9. Filtering on array columns

When filtering on a column with array values (e.g. `genres` and `actors`), allow the user to specify a comma-separated list of values. The filtering logic should match rows where **ANY** of the comma-separated values matches **AT LEAST ONE** element in the row array.

For example, if the user is filtering on the "genre" column, uses the "equals" operator and specifies "Drama, Action" as the input, it should match all rows where at least one of the genres exactly equals "Drama" or "Action".

### 10. Multiple filters!

Allow the user to add and remove multiple filters. When the user has configured multiple filters, a row should only appear in the table if it satisfies **ALL** filters.

### 11. Save sort and filter states

Store all the configured filters and current sort state locally in the browser so that if the page is refreshed the previous state is applied again.

### 12. Multi-select dropdown for array filters

The `genres` and `actors` movie properties are arrays. When the user creates a filter based on these properties, instead of showing a text input, show them a select input that allows them to choose multiple values. The select input should provide all possible options for the user to choose from.

Feel free to implement this as a normal `<select>` element, or using a plugin/library of your choice.

### 13. Graph movie views by date

There's an additional API which returns an array of objects containing a date and the number of times the movie was viewed. When the user clicks a movie in the table, show an overlay which shows this data in a graph.

Feel free to use any charting library you like.

For example, an API call for the first movie (https://6049e293fb5dcc001796aba6.mockapi.io/movies/tt0111161/views) will return the following structure:

```json
[
  {"id":"1","movieId":"tt0111161","date":"2021-03-11T05:44:05.868Z","views":87793},
  {"id":"26","movieId":"tt0111161","date":"2021-03-11T04:06:48.454Z","views":33206},
  {"id":"51","movieId":"tt0111161","date":"2021-03-10T13:00:39.555Z","views":45890},
  {"id":"76","movieId":"tt0111161","date":"2021-03-11T10:39:42.410Z","views":12449},
  {"id":"99","movieId":"tt0111161","date":"2021-03-10T19:52:59.474Z","views":23673},
  {"id":"100","movieId":"tt0111161","date":"2021-03-10T18:59:34.462Z","views":81708}
]
```

**Bonus**: Only load the charting library on demand (if no movie is clicked, the library shouldn't be downloaded in the browser).

## Quick discussion

You don't have to implement these tasks, but let's discuss how you might achieve them:

1. Make the table header row sticky and limit the height of the table so that it scrolls.

2. Implement pagination.

3. Instead of loading all 50 movies at once, load 1 page at a time with a configurable limit of items per page. 

    For example, if `limit=7` only 7 items will be fetched per page from the API:

    - First <https://6049e293fb5dcc001796aba6.mockapi.io/movies?page=1&limit=7>
    - Then <https://6049e293fb5dcc001796aba6.mockapi.io/movies?page=2&limit=7> 
    - ...etc until all movies are loaded

