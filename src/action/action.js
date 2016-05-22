/**
 * Describe the action identifies the action that occurs in the application.
 */
const Action = {
  APP_INIT: 'INIT',

  LOAD_APP_DATA: 'LOADE_APP_DATA',

  /**
   * Action to show note content screen.
   */
  SHOW_NOTE_CONTENT: 'SHOW_NOTES_ACTION',

  /**
   * Action to show notebook content screen.
   */
  SHOW_NOTEBOOK_CONTENT: 'SHOW_NOTEBOOKS_ACTION',

  /**
   * Action to show tag content screen.
   */
  SHOW_TAG_CONTENT: 'SHOW_TAGS_ACTION',

  /**
   * When a note is selected.
   */
  SELECT_NOTE: 'SELECT_NOTE',

  /**
   * When a new tag is added to a note.
   */
  ADD_TAG_NOTE: 'ADD_TAG',

  /**
   * Alter a note existing.
   */
  ALTER_NOTE: 'ALTER_NOTE',

  NEW_NOTE: 'NEW_NOTE',

  DELETE_NOTE: 'DELETE_NOTE'
}

module.exports = Action
