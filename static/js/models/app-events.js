/*
 * Events used to communicate data throughout the app
 */

export const AppEvents = {
  // navigate to a panel in the UI
  NAVIGATE: "navigate",
  // update a search query
  SEARCH: "search",
  // view a bookmark or card
  VIEW_CARD: 'view-card',
  // add a new bookmark or card
  ADD_CARD: "add-card",
  // add a new database to the sidebar
  ADD_DATABASE: "add-database",

  // delete a database
  DELETE_DATABASE: "delete-database",
  // announce a database is being synced
  DATABASE_SYNCING: "database-syncing",
  // announce a database has been synced
  DATABASE_SYNCED: "database-synced",
};
