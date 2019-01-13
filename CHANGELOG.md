# Changelog

## [Unreleased]

### Added

- Warning for all Users when cookies are currently disabled.
- Prompt for all Users to use the latest version of Chrome or Firefox.

## [1.0.2] - 2019-01-10

### Added

- Both Admins and Users will receive confirmation emails on all successful payments.
- Admin roster view.
- Admins can generate camp reports (Contact, Swimming, and Monday) via the roster detail page.
- Admins can quickly assign swimming strength attributes to campers via the roster detail page.
- Admins can sort and search items in the Camp, Camper and Roster list pages.

### Changed

- **Combined wet-wild-camp and wet-wild-camp-backend into a single git repository (monorepo)**
- Adjusted verbiage on the first-time User wizard
- Campers and Contact Information now display properly for Admins.
- Camp schedules are now sorted by start date for Users.
- Replaced `/register` with `/signup` for unauthenticated Users.
- Fixed error message not appearing on checkout screen except in limited cases for Users.
- Fixed error message not appearing when a User attempts to register an account with an email address already on file.
- Improved browser support for IE9, IE10, IE11.

### Removed

- First step from the first-time User wizard.

## [1.0.1] - 2018-12-31

### Added

- This changelog.
- Allow Users to perform password resets.
- Support for SMTP relays.
- Support for Early Bird pricing.
- First-time User wizard to collect contact information and guide new Users.

### Changed

- Many visual tweaks, form validations and loading indicators.

### Removed

- Mailgun.io dependency.
- Privacy Policy, Help, and Terms of Service links which lead to no content.
