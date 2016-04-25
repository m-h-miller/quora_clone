json.extract!(
  user,
  :id, :user_name
)

json.image_url asset_path(user.avatar.url)


json.questions do
  json.array!(user.questions) do |question|
    json.partial! 'api/questions/question', question: question
  end
end

json.answers(
  user.answers
)

    # serve a hash of UserTopic IDs
json.topics Hash[user.topics.map{ |topic| [ topic.id, true ] } ]
