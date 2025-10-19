Provider.import_from_csv!(Rails.root.join('db/csv/providers.csv'))
Plan.import_from_csv!(Rails.root.join('db/csv/plans.csv'))
puts 'seed完了'
