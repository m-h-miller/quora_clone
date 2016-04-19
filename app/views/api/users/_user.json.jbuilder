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

# doing it the other way
# json.user_votes do
#   json.array!(user.user_votes) do |vote|
#     json.partial! 'api/votes/voters', vote: vote
#   end
# end
