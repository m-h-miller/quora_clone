# Quorum
[Quorum][heroku]


## Summary

Quorum is a Quora-inspired web app built in Ruby on Rails, React.js, and jQuery.
Quorum allows users to:

- [ ] Create an account.
- [ ] Log in / Log out.
- [ ] Create, read, edit, and delete Questions.
- [ ] Create, read, edit, and delete Answers to Questions.
- [ ] Tag questions with multiple Topics.
- [ ] View feeds based on Topics.
- [ ] Search for Questions, Users, and Answers.
- [ ] Pagination / infinite scroll for content.
- [ ] Voting functionality.

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Topics

Topics offered a unique challenge when building Quorum. Using a single join table to connect Questions and Topics was not enough, because I also wanted to persist Topics associated with a User in the database. Optimizing queries has been a big part of making an app with this many associations. For example, my index action query for Questions, on the landing page of the app:

    @questions = Question
      .joins(:question_topics)
      .where('question_topics.topic_id' => topics)
      .select('distinct questions.*')*
      .includes(:author, :topics, :user_votes)
      .order(created_at: order)
      .page(page).per(10)



## Implementation Timeline

### Phase 1: User Authentication & Heroku Deployment (2 days)

In Phase 1, I implemented user signup and authentication functionality using BCrypt. Users can likewise sign in securely with Facebook, via OAuth. Users are redirected to a landing page after signup that contains the application's root React component. Users are able to upload a profile picture via the Paperclip Gem, which is stored on Amazon Web Services' S3 Cloud Storage.

[Details][phase-one]
^^^^^

### Phase 2: Backend, Associations & JSON API (2 days)

In phase 2, I built the Minimum Viable Product for my Rails back-end. It serves a JSON API, to be digested by the JavaScript front-end. At this point, users can Create, Read, Edit, and Delete top level Questions as well as Answers to Questions. This phase used RSpec and Test Driven Development to create an air-tight back-end.

[Details][phase-two]
^^^^^

### Phase 3: Topics (1 day)

Topics were a unique challenge in developing Quorum. They required join tables for both Questions and Users. Rails lacked built-in methods for querying a many-to-many relationship for several topics worth of questions. I ended up with a fairly complex base query for questions:

    @questions = Question
      .joins(:question_topics)
      .where('question_topics.topic_id' => topics)
      .select('distinct questions.*')*
      .includes(:topics)

[Details][phase-three]
&&&&&&

### Phase 4: Voting (1 day)

Optimizing the back-end was a fascinating problem for me. I chose to write several nested JSON views, as minimalist as possible, so that I could serve up only what was absolutely necessary. For example, when checking if a Question has been upvoted, Quorum serves a Hash of upvoters' ids rather than natively passing an array of full-scale objects.

    json.extract! question, (...args)
    json.upvoters Hash[question.user_votes.map{ |vote| [ vote.user_id, true ] } ]

[Details][phase-four]

### Phase 5: Flux Architecture and Top Level React Components (1.5 days)

Next, I will set up Flux, the React Router, and the React view structure for the main application. After the basic Flux architecture has been set up, a Question store will be implemented and a set of actions corresponding to the needed CRUD functionality created.
Once this is done, I will create React views for the Questions `Index`, `IndexItem` and `Form`. At the end of Phase 1b, Questions can be created, read, edited and destroyed in the browser.

In phase 2, I will extend the JSON API to include answers & comments. I will likewise be implementing React views & components to handle the rendering in browser.

[Details][phase-five]


### Phase 6: Small Components and Search Bar (1.5 days)

Phase 3 adds organization to the Questions. Questions belong to a Topics, which have their own `Index` views. Create JSON API for Topics. Questions can also now be tagged with multiple tags. Users can bring up questions in a separate `SearchIndex` view by searching for their tags. Once the tag search is implemented, I will extend this to a fuzzy search through every Question's content.

[Details][phase-six]


### Phase 7: Styling Cleanup and Seeding (1 days)

I will do all of the styling throughout the project, but I am reserving this time to truly polish the design.

[Details][phase-seven]


[heroku]: http://quorum-app.herokuapp.com
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
