# == Schema Information
#
# Table name: shortened_urls
#
#  id           :integer          not null, primary key
#  long_url     :string(255)      not null
#  short_url    :string(255)      not null
#  submitter_id :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

class ShortenedUrl < ActiveRecord::Base
  validates :long_url, :short_url, :submitter_id, presence: true
  validates :short_url, uniqueness: true
  validate :no_spamming, :nonpremium_max

  belongs_to(
    :submitter,
    class_name: 'User',
    foreign_key: :submitter_id,
    primary_key: :id
  )

  has_many :taggings,
  primary_key: :id,
  foreign_key: :shortened_url_id,
  class_name: :Tagging,
  dependent: :destroy

  has_many :tag_topics,
  through: :taggings,
  source: :tag_topic

  has_many :visits, dependent: :destroy
  # TA: Again, the association would return the same user multiple times. You
  # may uncomment the lambda below to eliminate duplicates in the result set.
  has_many(
    :visitors,
    # -> { distinct },
    through: :visits,
    source: :visitor
  )

  def self.create_for_user_and_long_url!(user, long_url)
    ShortenedUrl.create!(
      submitter_id: user.id,
      long_url: long_url,
      short_url: ShortenedUrl.random_code
    )
  end

  def self.random_code
    loop do
      random_code = SecureRandom.urlsafe_base64(16)
      return random_code unless ShortenedUrl.exists?(short_url: random_code)
    end
  end

  def num_clicks
    visits.count
  end

  def num_uniques
    # TA: You can just write `visitors.count` if you're using the lambda above.
    # visitors.count
    # TA: Alternatively, if your `#visitors` returns duplicates, you can count
    # the unique values like so:
    visits.select("user_id").distinct.count
  end

  def num_recent_uniques
    visits
      .select('user_id')
      .where("created_at > ?", 10.minutes.ago)
      .distinct
      .count
  end

  def no_spamming
    last_minute = ShortenedUrl
    .where("created_at >= ?", 1.minute.ago)
    .where(submitter_id: submitter_id)
    .length

    errors[:maximum] << "of five short urls per minute" if last_minute >= 5
  end

  def nonpremium_max
    return if User.find(self.submitter_id).premium

    number_of_urls =
      ShortenedUrl
      .where(submitter_id: submitter_id)
      .length

    if number_of_urls >= 5
      errors[:Only] << "premium members can create more than 5 short urls"
    end
  end

  def self.prune(n)
    # run `rake prune:old_urls[n]` to see this task in action
    ShortenedUrl
    .joins('LEFT JOIN visits ON visits.shortened_url_id = shortened_urls.id')
    .destroy_all("visits.created_at < '#{n.minutes.ago}'
    OR (visits.id IS NULL and shortened_urls.created_at < '#{n.minutes.ago}')")
  end


end
