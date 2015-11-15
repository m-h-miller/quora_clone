# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* Notebook
* Tag
* Tagging

### Controllers
* Api::NotebooksController (create, destroy, index, show, update)

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* NotebooksIndex
  - NotebookIndexItem
* NotebookForm
* SearchIndex

### Stores
* Notebook

### Actions
* ApiActions.receiveAllNotebooks
* ApiActions.receiveSingleNotebook
* ApiActions.deleteNotebook

### ApiUtil
* ApiUtil.fetchAllNotebooks
* ApiUtil.fetchSingleNotebook
* ApiUtil.createNotebook
* ApiUtil.editNotebook
* ApiUtil.destroyNotebook

## Gems/Libraries
