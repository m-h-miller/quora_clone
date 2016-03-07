# Phase 3: Topics and Tags (2 days)

Phase 3 adds organization to the Questions. Questions belong to a Topics, which have their own `Index` views. Create JSON API for Topics. Questions can also now be tagged with multiple tags. Users can bring up questions in a separate `SearchIndex` view by searching for their tags. Once the tag search is implemented, I will extend this to a fuzzy search through every Question's content.

## Rails
### Models
* Topic
* Tag
* Tagging

### Controllers
* Api::TopicsController (create, destroy, index, show, update)

### Views
* topics/index.json.jbuilder
* topics/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* TopicsIndex
  - TopicsItem
* TopicForm
* SearchIndex

### Stores
* Topic

### Actions
* ApiActions.receiveAllTopics
* ApiActions.receiveSingleTopic
* ApiActions.deleteTopic

### ApiUtil
* ApiUtil.fetchAllTopics
* ApiUtil.fetchSingleTopic
* ApiUtil.createTopic
* ApiUtil.editTopic
* ApiUtil.destroyTopic

## Gems/Libraries
