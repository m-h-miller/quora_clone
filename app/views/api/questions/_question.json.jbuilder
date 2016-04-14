json.extract!(
  question,
  :id, :title, :body, :created_at
)

json.author do
  json.partial! 'api/users/minimal_user', user: question.author
end

json.topics do
  json.array!(question.topics) do |topic|
    json.partial! 'api/topics/topic', topic: topic
  end
end
