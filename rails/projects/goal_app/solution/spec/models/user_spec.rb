require 'rails_helper'

RSpec.describe User, :type => :model do

  User.create!(username: "Gerald", password: "password")

  describe "password encryption" do
    it "does not save passwords to the database" do
      User.create!(username: "mary_mack", password: "abcdef")
      user = User.find_by_username("mary_mack")
      expect(user.password).not_to be("abcdef")
    end

    it "encrypts the password using BCrypt" do
      expect(BCrypt::Password).to receive(:create)
      User.new(username: "mary_mack", password: "abcdef")
    end
  end

  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should have_many(:goals) }
  it { should have_many(:cheers_given) }
  it { should have_many(:cheers_received).through(:goals) }
end
