# Phase 5: Reminders and Garbage Collection

## Rails
### Models
* Reminder

### Controllers
* Api::RemindersController (create, destroy, index, show, update)

### Views
* reminders/index.json.jbuilder

## Flux
### Views (React Components)
* RemindersIndex
  - ReminderIndexItem
* ReminderShow
* ReminderForm

### Stores
* Reminder

### Actions
* ApiActions.receiveAllReminders
* ApiActions.receiveSingleReminder
* ApiActions.deleteReminder

### ApiUtil
* ApiUtil.fetchAllReminders
* ApiUtil.fetchSingleReminder
* ApiUtil.createReminder
* ApiUtil.updateReminder
* ApiUtil.destroyReminder

## Gems/Libraries
