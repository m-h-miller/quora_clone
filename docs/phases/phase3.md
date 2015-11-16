# Phase 3: Topics and Tags (2 days)

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
