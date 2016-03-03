json.results do
  json.array! @search_results.map(&:searchable) do |result|
    if result.class == User
      json.user result.as_json(only: [:id, :user_name])
      json._type "User"
    elsif result.class == Question
      json.question result.as_json(only: [:id, :title])
      json._type "Question"
    elsif result.class == Answer
      json.answer result.as_json(only: [:id, :title, :question_id])
      json._type "Answer"
    end
  end
end
