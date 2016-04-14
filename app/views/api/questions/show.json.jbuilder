json.partial!('question', question: @question)

json.answers do
  json.array!(@question.answers) do |answer|
    json.partial! 'api/answers/answer', answer: answer
  end
end
