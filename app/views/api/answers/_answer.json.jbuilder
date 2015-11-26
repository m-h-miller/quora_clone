json.extract!(
  answer,
  :id, :title, :body, :question_id, :author_id
)

json.author do
  json.partial! 'api/users/minimal_user', user: answer.author
end
