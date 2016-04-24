# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160422003007) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "author_id",   null: false
    t.integer  "question_id", null: false
    t.string   "title",       null: false
    t.string   "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "answers", ["author_id"], name: "index_answers_on_author_id", using: :btree
  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "question_topics", force: :cascade do |t|
    t.integer  "question_id", null: false
    t.integer  "topic_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "question_topics", ["question_id", "topic_id"], name: "index_question_topics_on_question_id_and_topic_id", unique: true, using: :btree
  add_index "question_topics", ["question_id"], name: "index_question_topics_on_question_id", using: :btree
  add_index "question_topics", ["topic_id"], name: "index_question_topics_on_topic_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body"
    t.integer  "author_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "questions", ["author_id"], name: "index_questions_on_author_id", using: :btree
  add_index "questions", ["title"], name: "index_questions_on_title", unique: true, using: :btree

  create_table "topics", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "topics", ["name"], name: "index_topics_on_name", unique: true, using: :btree

  create_table "user_topics", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "topic_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_topics", ["topic_id"], name: "index_user_topics_on_topic_id", using: :btree
  add_index "user_topics", ["user_id", "topic_id"], name: "index_user_topics_on_user_id_and_topic_id", unique: true, using: :btree
  add_index "user_topics", ["user_id"], name: "index_user_topics_on_user_id", using: :btree

  create_table "user_votes", force: :cascade do |t|
    t.integer "user_id",      null: false
    t.integer "votable_id",   null: false
    t.string  "votable_type", null: false
    t.integer "value"
  end

  add_index "user_votes", ["user_id", "votable_id", "votable_type"], name: "index_user_votes_on_user_id_and_votable_id_and_votable_type", unique: true, using: :btree
  add_index "user_votes", ["votable_id", "votable_type"], name: "index_user_votes_on_votable_id_and_votable_type", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "user_name",           null: false
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "uid"
    t.string   "provider"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
