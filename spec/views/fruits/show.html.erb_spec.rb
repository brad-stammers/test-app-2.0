require 'rails_helper'

RSpec.describe "fruits/show", type: :view do
  before(:each) do
    assign(:fruit, Fruit.create!(
      name: "Name",
      desc: "Desc"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Desc/)
  end
end
