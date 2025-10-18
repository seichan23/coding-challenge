# frozen_string_literal: true

require 'csv'
module CsvImportable
  class FileNotFoundError < StandardError; end
  class UniqueKeyMissingError < StandardError; end

  ENCODING = 'UTF-8'

  extend ActiveSupport::Concern

  class_methods do
    # NOTE: 現時点ではレコード数が少ないため1件ずつsave!で十分と判断。
    #       大量データに対応する必要が出た場合は upsert_all などでのバルクインサートに置き換える。
    def import_from_csv!(file_path)
      raise ArgumentError if file_path.blank?
      raise FileNotFoundError unless File.exist?(file_path)

      CSV.foreach(file_path, headers: true, encoding: ENCODING).with_index(2) do |row, line_number|
        attrs = row.to_h.slice(*csv_attributes).compact
        unique_value = attrs[csv_upsert_unique_key]

        raise UniqueKeyMissingError if unique_value.blank?

        record = find_or_initialize_by(csv_upsert_unique_key => unique_value)
        record.assign_attributes(attrs)
        record.save!
      rescue ActiveRecord::RecordInvalid => e
        Rails.logger.error("[#{name}] 行数#{line_number}: #{e.record.errors.full_messages.join(", ")}(入力内容: #{row.to_h})")
        raise
      rescue UniqueKeyMissingError
        Rails.logger.error("[#{name}] 行数#{line_number}: ユニークキー#{csv_upsert_unique_key}が空です(入力内容: #{row.to_h})")
        raise
      end
    end

    private

    def csv_attributes
      raise NotImplementedError
    end

    def csv_upsert_unique_key
      raise NotImplementedError
    end
  end
end
