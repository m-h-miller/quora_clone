json.extract!(
  question,
  :id, :title, :body
)

json.author do
  json.partial! 'api/users/minimal_user', user: question.author
end

json.answers do
  json.array!(question.answers) do |answer|
    json.partial! 'api/answers/answer', answer: answer
  end
end
