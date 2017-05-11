# SQL and ActiveRecord
:link: *[w3d1](#w3d1) :: [w3d2](#w3d2) :: [w3d3](#w3d3) :: [w3d4](#w3d4) :: [w3d5](#w3d5)* :link:

## w3d1

### Assessment02
+ [Practice][assessment-prep-2]
  + We'll implement a simple version of a well-known card game. We'll announce
  the specific game, and you can look up the basic rules ahead of time.

[assessment-prep-2]: https://github.com/appacademy/assessment-prep#assessment-2

### Readings (67 min)
+ [Programming Paradigms][paradigms] (5 min)
+ SQL Fundamentals
    + [SQL For The Impatient][sql-intro] (20 min)
    + [A Visual Explanation of Joins][visual-joins] (5 min)
    + [Self-Joins][self] (5 min)
    + [Formatting SQL Code][sql-formatting] (5 min)
    + [Subqueries][subquery] (5 min)
    + [NULL][null] (2 min)
    + [CASE][case] (5 min)
    + [COALESCE][coalesce] (5 min)
+ [PostgreSQL Setup][postgres-setup] (10 min)

[paradigms]: readings/paradigms.md
[sql-intro]: readings/sql-intro.md
[visual-joins]: https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
[self]: readings/self-joins.md
[sql-formatting]: readings/formatting.md
[subquery]: https://sqlbolt.com/topic/subqueries
[null]: readings/null.md
[case]: http://www.postgresqltutorial.com/postgresql-case/
[coalesce]: http://www.postgresqltutorial.com/postgresql-coalesce/
[postgres-setup]: readings/setup.md

### Homeworks (80 min)
+ Complete [SQL Bolt Tutorial][sql-bolt] sections 1 - 12 (80 min)

[sql-bolt]: https://sqlbolt.com/

### Projects
+ **Solo** [SQL Zoo][sqlzoo-readme]

[sqlzoo-readme]: projects/sqlzoo

### Project Solutions
+ [Video solution to Julie Andrews query][julie-andrews-vid]
+ [Video solution to Craiglockhart to Sighthill query][craiglockhart-vid]

[julie-andrews-vid]: https://vimeo.com/184539804
[craiglockhart-vid]: https://vimeo.com/184539167

## w3d2

### Video Lectures (65 min)
:closed_lock_with_key: `go_video_go`
+ :movie_camera: [RDBMS Intro][rdbms-intro-video] (10 min)
+ :movie_camera: [Building a Database][build-db-video] (25 min)
+ :movie_camera: [ORM Intro][orm-intro-video] (5 min)
+ :movie_camera: [ORM Demo][orm-demo-video] (25 min)
+ :movie_camera: [CSS Display Property][css-display-video]

[rdbms-intro-video]: https://vimeo.com/167596295
[build-db-video]: https://vimeo.com/167593816
[orm-intro-video]: https://vimeo.com/167805228
[orm-demo-video]: https://vimeo.com/167672029
[css-dispay-video]: #

### Readings (17 min)
+ [SQLite3][sqlite3] (15 min)
+ [Heredocs][heredocs] (5 min)
+ [Little Bobby Tables][xkcd-bobby-tables] (2 min)
+ [CSS Display Property][css-display]

[sqlite3]: readings/sqlite3.md
[heredocs]: readings/heredocs.md
[xkcd-bobby-tables]: http://xkcd.com/327/
[css-display]: #

### Homeworks (35 min)
+ [Plays-Playwrights ORM][plays-orm] (35 min)

[plays-orm]: homeworks/plays

### Additional Resources
+ [PostgreSQL Tutorial][postgresql]
  + Familiarize yourself with Section 2 - 12, but don't try to remember
    it all. Keep this for future reference.

[postgresql]: http://www.postgresqltutorial.com/

### Study Hall 9 - 10am

### Projects
+ [CSS Display Exercise][css-display-exercise]
+ [AA Questions][aa-questions]

[css-display-exercise]: #
[aa-questions]: projects/aa_questions

## w3d3

### Videos (73 min)
:closed_lock_with_key: `go_video_go`
+ :movie_camera: [Starting a new Rails Project][rails-intro-video] (7 min)
+ :movie_camera: [Migrations][migrations-video] (14 min)
+ :movie_camera: [Models][models-video] (8 min)
+ :movie_camera: [Basic Associations (belongs_to, has_many)][associations-video]  (12 min)
+ :movie_camera: [More Associations (has_many through:...)][associations-2-video] (12 min)
+ :movie_camera: [Validations][validations-video] (13 min)
+ :movie_camera: [Indices][indices-video] (7 min)
+ :movie_camera: [CSS Inherits][css-inherits]
+ :movie_camera: [CSS Reset][css-reset]

[rails-intro-video]: https://vimeo.com/167799435
[migrations-video]: https://vimeo.com/167799434
[models-video]: https://vimeo.com/167799436
[associations-video]: https://vimeo.com/167799432
[associations-2-video]: https://vimeo.com/167799430
[validations-video]: https://vimeo.com/167799437
[indices-video]: https://vimeo.com/167799431
[css-inherits]: #
[css-reset]: #

### Homeworks (45 min)
+ [Intro to Rails][intro-rails-homework] (45 min)

[intro-rails-homework]: homeworks/intro_rails

### Additional Resources
+ [Creating a new Rails project][first-rails-project]
+ [Migrations][ar-migrations]
+ [ORM Review and Intro to Active Record][ar-orm]
+ Associations:  
  + [`belongs_to` and `has_many`][belongs-to-has-many]
  + [`has_many :through`][has-many-through]
  + [`has_one`][has-one]
  + [Unconventional Associations][unconventional-associations]
  + for now, always specify `class_name`/`primary_key`/`foreign_key`
+ [Basic][validations] and [Custom][custom-validations] Validations
  + [Miscellaneous][validations-misc]
+ [ActiveRecord and Indexes][ar-indexing]

[first-rails-project]: readings/first-rails-project.md
[ar-migrations]: readings/migrations.md
[ar-orm]: readings/orm.md
[belongs-to-has-many]: readings/belongs-to-has-many.md
[has-many-through]: readings/has-many-through.md
[has-one]: readings/has-one.md
[unconventional-associations]: readings/unconventional-associations.md
[validations]: readings/validations.md
[custom-validations]: readings/custom-validations.md
[validations-misc]: readings/validations-misc.md
[ar-indexing]: readings/indexing.md

### Projects
+ [CSS Reset Exercise][css-reset-exercise]
+ [Associations Exercise][associations-exercise]
+ [URL Shortener][url-shortener]

[css-reset-exercise]: #
[associations-exercise]: projects/associations_exercise
[url-shortener]: projects/url_shortener

## w3d4

### Assessment03 Practice
+ [Practice][assessment-prep-3]

[assessment-prep-3]: https://github.com/appacademy/assessment-prep#assessment-3

### Videos
+ [CSS Float & Clearfix][css-float-video]

[css-float-video]: #

### Readings (65 min)
+ [ActiveRecord::Relation][relation] (15 min)
+ [ActiveRecord and Joins][ar-joins] (25 min)
+ [Scopes][scopes] (10 min)
+ [More on Querying][querying-ii] (15 min)
+ [CSS Float & Clearfix][css-float]

[relation]: readings/relation.md
[ar-joins]: readings/joins.md
[scopes]: readings/scopes.md
[querying-ii]: readings/querying-ii.md
[css-float]: #

### Homeworks (60 min)
+ [Movie Buff in Training][movie-buff-hw] (30 min)
+ [N+1 Buster][n1-buster] (30 min)

[n1-buster]: homeworks/n_1_buster
[movie-buff-hw]: homeworks/active_record_warmup

### Additional Resources
+ [Ternary Logic in SQL][sql-ternary-logic]

[sql-ternary-logic]: readings/sql-ternary-logic.md

### Study Hall 9 - 10am

### Projects
+ [CSS Float Exercise][css-float-exercise]
+ [Movie Buff][movie-buff]
+ [Polls][polls-app]

[css-float-exercise]: #
[movie-buff]: projects/movie_buff
[polls-app]: projects/polls_app

## w3d5

### Videos
+ :movie_camera: [CSS Flexbox][css-flex-video]

[css-flex-video]: #

### Readings (60 min)
+ [Metaprogramming][metaprogramming] (20 min)
+ [Class Instance Variables][class-instance-variables] (15 min)
+ [Demo: send][meta-send] (5 min)
+ [Demo: macros][meta-macros] (5 min)
+ [Nontechnical Overview of SQL][sql-nontech] (15 min)
+ [CSS Flexbox][css-flex]

[metaprogramming]: readings/metaprogramming.md
[class-instance-variables]: readings/class-instance-variables.md
[meta-send]: demos/send.rb
[meta-macros]: demos/macros.rb
[sql-nontech]: readings/sql_nontech.md
[css-flex]: #

### Homework (30 min)
+ [Metacorgis][metacorgi-hw] (30 min)

[metacorgi-hw]: homeworks/meta_corgis

### Project
+ [CSS Flex Exercise][css-flex-exercise]
+ **Solo**: [Build Your Own ActiveRecord][build-your-own-ar]

[css-flex-exercise]: #
[build-your-own-ar]: projects/active_record_lite

### :joy_cat: **Happy Hour!** :joy_cat:
