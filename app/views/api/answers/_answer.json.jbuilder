json.extract!(
  answer,
  :id, :title, :body, :question_id, :author_id
)

json.author(
  answer.author
)
