require 'rails_helper'

RSpec.describe "fruits/index", type: :view do
  before(:each) do
    assign(:fruits, [
      Fruit.create!(
        name: "Name",
        desc: "Desc"
      ),
      Fruit.create!(
        name: "Name",
        desc: "Desc"
      )
    ])
  end

  it "renders a list of fruits" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
    assert_select cell_selector, text: Regexp.new("Name".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Desc".to_s), count: 2
  end
end
