def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the letters in whazzername,
  # ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but not like "stallone sylvester" or "zylvester ztallone"

  matcher = "%#{whazzername.split(//).join("%")}%"
  Movie.joins(:actors).where("UPPER(actors.name) LIKE UPPER(?)", matcher)

  # Note: The below code also works:
  # Actor.where("name ilike ?", matcher).first.movies

  # As the Postgres docs say,
  # "the keyword ILIKE can be used instead of LIKE to make the match case insensitive according to the active locale.
  # This is not in the SQL standard but is a PostgreSQL extension."
end

def bad_years
  # List the years in which a movie with a rating above 8 was not released.
  Movie.select(:yr, "MAX(score)").group(:yr).having("MAX(score) < 8").pluck(:yr)
end

def golden_age
  # Find the decade with the highest average movie score.
  Movie
    .select("AVG(score), (yr / 10) * 10 AS decade")
    .group("decade")
    .order("avg(score) DESC")
    .first
    .decade
end

def costars(name)
  # List the names of the actors that the named actor has ever appeared with.
  # Hint: use a subquery

  subquery = Movie.select(:id).joins(:actors).where("actors.name = ?", name)
  
  Movie
    .joins(:actors)
    .where("actors.name != ?", name)
    .where("movies.id IN (?)", subquery)
    .distinct
    .pluck(:name)
end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie

  Actor
    .select(:name)
    .joins("LEFT OUTER JOIN castings on castings.actor_id = actors.id")
    .where("castings.movie_id IS NULL")
    .count
end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names

  Actor
    .select(:name, :id, "MAX(movies.yr) - MIN(movies.yr) AS career")
    .joins(:movies)
    .order("career DESC, name")
    .group(:id)
    .limit(3)
end

