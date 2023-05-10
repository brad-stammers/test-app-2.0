require 'rails_helper'

RSpec.describe "fruits/new", type: :view do
  before(:each) do
    assign(:fruit, Fruit.new(
      name: "MyString",
      desc: "MyString"
    ))
  end

  it "renders new fruit form" do
    render

    assert_select "form[action=?][method=?]", fruits_path, "post" do

      assert_select "input[name=?]", "fruit[name]"

      assert_select "input[name=?]", "fruit[desc]"
    end
  end
end
