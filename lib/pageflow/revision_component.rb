module Pageflow
  # RevisionComponent represents a model that is attached to the revision
  # mechanism of Pageflow.
  #
  # In order to be used as a ComponentModel a model is required to
  # have an integer field `perma_id` and a belongs_to field `revision`.
  module RevisionComponent
    extend ActiveSupport::Concern

    ADVISORY_LOCK_TIMEOUT_SECONDS = 5

    class PermaIdGenerationAdvisoryLockTimeout < StandardError; end

    included do
      belongs_to :revision, class_name: 'Pageflow::Revision', touch: true
      before_save :ensure_perma_id
    end

    def copy_to(revision)
      record = dup
      record.revision = revision
      record.save!
    end

    def ensure_perma_id
      self.perma_id ||= (self.class.maximum(:perma_id) || 0) + 1
    end

    module ClassMethods
      # Recommended way to create revision components. Uses an
      # advisory lock to ensure concurrently created records are not
      # assigned the same perma id.
      def create_with_lock!(attributes, &block)
        with_advisory_lock_for_perma_id_generation! do
          create!(attributes, &block)
        end
      end

      def all_for_revision(revision)
        where(revision_id: revision.id)
      end

      def from_perma_ids(revision, perma_ids)
        return [] if revision.blank? || perma_ids.blank?

        perma_ids.map do |perma_id|
          find_by_revision_id_and_perma_id(revision.id, perma_id)
        end.compact
      end

      private

      def with_advisory_lock_for_perma_id_generation!(&block)
        r = with_advisory_lock_result_for_perma_id_generation(&block)
        raise(PermaIdGenerationAdvisoryLockTimeout) unless r.lock_was_acquired?

        r.result
      end

      def with_advisory_lock_result_for_perma_id_generation(&block)
        with_advisory_lock_result("#{table_name}_perma_id",
                                  timeout_seconds: ADVISORY_LOCK_TIMEOUT_SECONDS,
                                  &block)
      end
    end
  end
end
