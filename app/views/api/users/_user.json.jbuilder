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

# json.answers(
#   user.answers
# )     # possibly serve up hash of answer ids for delete button checking

    # serve a hash of UserTopic IDs
json.topics Hash[user.topics.map{ |topic| [ topic.id, true ] } ]
