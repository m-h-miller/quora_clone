# Quorum

[Heroku link][heroku] **NB:** Replace this link after Lily's super cool Heroku lecture.

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Quorum is a Quora-inspired web application built using Ruby on Rails & React.js. Quorum allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account.
- [ ] Log in / Log out.
- [ ] A user can create, read, edit, and delete questions.
- [ ] A user can create, read, edit, and delete answers for questions.
- [ ] A user can create, read, edit, and delete comments on answers.
- [ ] A user can follow questions, topics, and users. This adds the subject's activity to the user's home feed.
- [ ] A user can view different feeds based on topic & user.
- [ ] Tag questions with multiple 'topics' and search questions by 'topics' (tags).
- [ ] Search through questions & answers for blocks of text.

- [ ] Bonus features are listed below.

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication & Heroku Deployment (1 day)

In Phase 1, I will begin by implementing user signup and authentication using BCrypt. There will be a basic landing page after signup that will contain the container for the application's root React component. The site should already be deployed live via Heroku on day 1.

[Details][phase-one]

### Phase 1b: Question Model and JSON API (1 day)

Before building out the front end, I will begin by setting up a full JSON API for Questions.
Next, I will set up Flux, the React Router, and the React view structure for the main application. After the basic Flux architecture has been set up, a Question store will be implemented and a set of actions corresponding to the needed CRUD functionality created.
Once this is done, I will create React views for the Questions `Index`, `IndexItem` and `Form`. At the end of Phase 1b, Questions can be created, read, edited and destroyed in the browser.


[Details][phase-one]

### Phase 2: Flux Architecture and Answers/Comments CRUD (2 days)

In phase 2, I will extend the JSON API to include answers & comments. I will likewise be implementing React views & components to handle the rendering in browser.


[Details][phase-two]

### Phase 3: Topic and Tags (2 days)

Phase 3 adds organization to the Questions. Questions belong to a Topics, which have their own `Index` views. Create JSON API for Topics. Questions can also now be tagged with multiple tags. Users can bring up questions in a separate `SearchIndex` view by searching for their tags. Once the tag search is implemented, I will extend this to a fuzzy search through every Question's content.

[Details][phase-three]

### Phase 4: Allow Complex Styling in Question (1 day)

Using quill.js, allow for complex styling of questions?

[Details][phase-four]

### Phase 5: Styling Cleanup and Seeding (2 days)

I will do all of the styling throughout the project, but I am reserving this time to truly polish the design. I also will try to figure out bonus features.

[Details][phase-five]


### Bonus Features (TBD)
- [ ] Prettify transitions.
- [ ] Use javascript library for cleaner tag selection.
- [ ] Pagination / infinite scroll for Indeces.
- [ ] Apply complex styling to questions/answers while editing (embedded images, basic styling, formatted lists).
- [ ] Voting functionality.

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
