
Feature: Report Fly tipping
  As a Swansea citizen
  I would like to easily report fly tipping
  So that my environment can be kept safe and clean

  Scenario: Report Fly tipping
    Given access to the app
    When I submit the details of a fly tipping incident
    Then the council will be notified of the fly tipping incident
