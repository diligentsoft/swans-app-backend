require 'config'
require 'date'
require 'active_support/time'

Config.load_and_set_settings(
    Config.setting_files('config', ENV['ENVIRONMENT'] || 'local')
)