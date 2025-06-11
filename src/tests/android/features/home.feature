Feature: feature file to verify home screen

  Background:
    Given User is on home page

  @Android @HomeTest
  Scenario: TEST-101 : Verify home page
    Then User verifies home page is displayed

  @Android @HomeTest
  Scenario: TEST-102 : Verify home page - background & relaunch app
    When User backgrounds app for 5 secs & resume back
    Then User verifies home page is displayed

  @Android @HomeTest
  Scenario: TEST-103 : Verify home page - background & relaunch app
    When User turn off wifi
    And User backgrounds app for 5 secs & resume back
    Then User verifies home page is displayed