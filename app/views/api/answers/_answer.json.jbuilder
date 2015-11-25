json.extract!(
  answer,
  :id, :title, :body, :question_id, :author_id
)

json.author do
  json.partial! 'api/users/user', user: answer.author
end
