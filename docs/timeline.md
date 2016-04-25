## Implementation

### Phase 1: User Authentication & Heroku Deployment

In Phase 1, I implemented user signup and authentication functionality using BCrypt. Users can likewise sign in securely with Facebook, via OAuth. Users are redirected to a landing page after signup that contains the application's root React component. Users are able to upload a profile picture via the Paperclip Gem, which is stored on Amazon Web Services' S3 Cloud Storage.

[Details][phase-one]

### Phase 2: Backend, Associations & JSON API

In phase 2, I built the Minimum Viable Product for my Rails back-end, the main Question & Answer interface. The back-end serves a JSON API, to be digested by the JavaScript front-end. At this point, users can Create, Read, Edit, and Delete top level Questions as well as Answers to Questions. This phase is backed by RSpec and Test Driven Development to create an air-tight back-end.

[Details][phase-two]


### Phase 3: Topics

Topics were a unique challenge in developing Quorum. They required join tables for both Questions and Users. Rails lacked built-in methods for querying a many-to-many relationship for several topics worth of questions. I ended up with a fairly complex base query for questions:

    @questions = Question
      .joins(:question_topics)
      .where('question_topics.topic_id' => topics)
      .select('distinct questions.*')*
      .includes(:topics)
      .order(created_at: order)
      .page(page).per(10)

[Details][phase-three]

### Phase 4: Voting

Optimizing the back-end was a fascinating problem for me. I chose to write several nested JSON views, as minimalist as possible, so that I could serve up only what was absolutely necessary. For example, when checking if a Question has been upvoted, Quorum serves a Hash of upvoters' ids rather than natively passing an array of full-scale objects.

    json.extract! question, (...args)
    json.upvoters Hash[question.user_votes.map{ |vote| [ vote.user_id, true ] } ]

[Details][phase-four]

### Phase 5: Flux Architecture and Top Level React Components

Next, I set up Flux, the React Router, and the React view structure for the main application.

[Details][phase-five]


### Phase 6: Small Components and Search Bar

I refactor-ed code, creating small modular components like delete buttons.

[Details][phase-six]




[heroku]: http://quorum-app.herokuapp.com
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
