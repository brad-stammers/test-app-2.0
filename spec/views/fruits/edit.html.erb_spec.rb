require 'rails_helper'

RSpec.describe "fruits/edit", type: :view do
  let(:fruit) {
    Fruit.create!(
      name: "MyString",
      desc: "MyString"
    )
  }

  before(:each) do
    assign(:fruit, fruit)
  end

  it "renders the edit fruit form" do
    render

    assert_select "form[action=?][method=?]", fruit_path(fruit), "post" do

      assert_select "input[name=?]", "fruit[name]"

      assert_select "input[name=?]", "fruit[desc]"
    end
  end
end
