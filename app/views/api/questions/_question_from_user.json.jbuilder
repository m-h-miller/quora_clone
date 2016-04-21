# this minimal _question avoids passing user avatar unnecessarily
# it is only called from _user.json.jbuilder
# so, the author information is obviously included

json.extract!(
  question,
  :id, :title, :body, :created_at
)

json.topics do
  json.array!(question.topics) do |topic|
    json.partial! 'api/topics/topic', topic: topic
  end
end

# creates a hash of upvoters for quick look-up when toggling vote button text
json.upvoters Hash[question.user_votes.map{ |vote| [ vote.user_id, true ] } ]
