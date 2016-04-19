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

json.user_votes do
  json.array!(question.user_votes) do |user_vote|
    json.partial! 'api/votes/voters', user_vote: user_vote
  end
end
