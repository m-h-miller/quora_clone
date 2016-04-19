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

    # N + 1 array appropach
# json.user_votes do
#   json.array!(question.user_votes) do |user_vote|
#     json.partial! 'api/votes/voters', user_vote: user_vote
#   end
# end
#

    # alternate way of typing what is below
# json.voters do
#   question.user_votes.each do |user_vote|
#     json.set! user_vote.user_id, true
#   end
# end

# creates a hash of upvoters for quick look-up when toggling vote button text
json.upvoters Hash[question.user_votes.map{ |vote| [ vote.user_id, true ] } ]
