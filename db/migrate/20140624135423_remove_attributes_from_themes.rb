class RemoveAttributesFromThemes < ActiveRecord::Migration[4.2]
  def change
    remove_column :pageflow_themes, :copyright_link_url, :string
    remove_column :pageflow_themes, :copyright_link_label, :string
    remove_column :pageflow_themes, :imprint_link_url, :string
    remove_column :pageflow_themes, :imprint_link_label, :string

    rename_column :pageflow_themes, :name, :css_dir
  end
end
