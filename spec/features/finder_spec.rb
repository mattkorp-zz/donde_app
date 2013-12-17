require 'spec_helper'

describe "Sign Up Page" do

  xit "sends you to contact list" do
    visit '/'
    expect(page).to have_content("Username")
    fill_in '#username', with: 'matt'
    fill_in '#password', with: 'matt'
  end
end

describe "Login Page" do
  before(:each) do
    @user = User.new({
        username: "matt",
        email: "matt@matt.com",
        password: "matt",
        password_confirmation: "matt"
    })
    @user.save

  end

  it "sends you to contact list" do
    visit '/'
    expect(page).to have_content("Log In")
    fill_in 'username', with: 'matt'
    fill_in 'password', with: 'matt'
    click_button 'Login'
    expect(page).to have_content("Contacts")
  end

end

describe "Contacts Page" do
# can you visit '#/contacts'?
  xit "sends you to contact list" do
    visit '/'
    expect(page).to have_content("Contacts")
    fill_in '#username', with: 'matt'
    fill_in '#password', with: 'matt'
    click_button 'Login'
    expect(page).to have_content("Contacts")
  end
end
