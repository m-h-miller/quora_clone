# Schema Information

## users
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
user_name           | string    | not null, indexed, unique
password_digest     | string    | not null
session_token       | string    | not null, indexed, unique
avatar_file_name    | string    | paperclip gem
avatar_content_type | string    | paperclip gem
avatar_file_size    | integer   | paperclip gem
avatar_uploaded_at  | datetime  | paperclip gem
uid                 | string    | omniauth-facebook gem
provider            | string    | omniauth-facebook gem


## user_votes
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | integer   | not null, foreign key (references users)
votable_id   | integer   | not null, foreign key (references target)
votable_type | string    | not null, foreign key (specifies target table in db)
value        | integer   | always 1

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | string    |
author_id   | integer   | not null, foreign key (references users), indexed

## answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
question_id | integer   | not null, foreign key (references questions), indexed
title       | string    | not null
body        | string    |

## topics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | string    | not null

## question_topics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references questions)
topic_id    | integer   | not null, foreign key (references topics)
