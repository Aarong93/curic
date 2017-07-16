class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.integer :guest_id
      t.integer :party_id

      t.timestamps
    end
  end
end
