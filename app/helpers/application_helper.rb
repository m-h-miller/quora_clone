module ApplicationHelper
  def authenticity_token
    <<-HTML.html_safe
      <input
        type="hidden"
        name="authenticity_token"
        value="#{ form_authenticity_token }">
    HTML
  end

  def delete_action
    <<-HTML.html_safe
      <input
        type="hidden"
        name="_method"
        value="DELETE" >
    HTML
  end
  
end
