# Changelog

## [Unreleased]

### Added

- Info alert to primary contact form
- Admin Roster view. This view shows information about campers who are full registered for a given camp and allows users to download camp reports for a selected week.
- New component, Logout, which logs out the current user when rendered.
- New route, /reset-password, which renders the new Logout component if a user is already authenticated.
- Display capacity/registrants/waitlist for each camp under Admin -> Camp Sessions.
- Added new endpoint, updateManyCampers, to appClient
- Added AdminRosterSwimming component
- Added new route /admin/rosters/:campId/swimming to render AdminRosterSwimming

### Changed

- added hyperlink to registration page
- reworded 'Thank You' page in first time wizard
- Camp schedules are now sorted by start date.
- Admin Camps view refactor. The Camps view is now sortable and searchable.
- Admin Campers view refactor. The Campers view is now sortable and searchable.
- Campers and Contact Information now display properly on admin pages.
- Confirmation message upon successful registration

### Removed

- First page help screen from FirstTimeWizard
- descriptive text and hyperlink from camp list displays

## [1.0.1] - 2018-12-31

### Added

- This changelog.
- Many visual tweaks, form validations and loading indicators.
- Support for Early Bird pricing
- First time user wizard for collecting contact information upfront.

### Changed

- None.

### Removed

- Links with no content.
